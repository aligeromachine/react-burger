import React from 'react';
import st from '../burger-ingredients/burger-ingredients.module.css';
import { 
	Counter, 
	CurrencyIcon,
	Tab, 
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import { setSelectedIngredient } from '../../services/ingredient-details';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { useDrag } from 'react-dnd';
import { IngredientModel } from '../../utils/loaddata';
import {useInView} from 'react-intersection-observer';

export const BurgerIngredients = () => {
	const [curTab, setCurTab] = React.useState('bun');
	const [bunRef, bunInView] = useInView({
    threshold: 0.1
  });
  const [sauceRef, sauceInView] = useInView({
    threshold: 0.1
  });
  const [mainRef, mainInView] = useInView({
    threshold: 0.1
  });
	const tabs =  [
		{ id: 1, name: 'Булки', type: 'bun', ref: bunRef },
		{ id: 2, name: 'Соусы', type: 'sauce', ref: sauceRef },
		{ id: 3, name: 'Начинки', type: 'main', ref: mainRef },
	]
	const handleIngredientScroll = () => {
    switch (true) {
      case bunInView:
        setCurTab('bun');
        break;
      case sauceInView:
        setCurTab('sauce');
        break;
      case mainInView:
        setCurTab('main');
        break;
      default:
        break;
    }
  };
	React.useEffect(() => {
    handleIngredientScroll();
  }, [bunInView, sauceInView, mainInView]);
	
	const onTabClick = (value) => {
    setCurTab(value);
    const elem = tabs.find(p => p.type === value);
    if (!elem) return;    
    const ref = elem.ref;    
    if (!ref || !ref.current) return;    
    ref.current.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

	const dispatch = useDispatch();
	const { ingredients } = useSelector(store => store.burgerIngredients);
	const { constructorBun, constructorIngredients } = useSelector(store => store.burgerConstructor);
	const { selectedIngredient } = useSelector(store => store.ingredientDetails);

	const { isModalOpen, openModal, closeModal } = useModal();

	const setCurrentItem = (item) => {
		dispatch(setSelectedIngredient(item));
		openModal();
	}

	return(
		<div className={`${st.flex}`}>
			<div>
				<h1 className={`${st.header} text_type_main-large`}>Соберите бургер</h1>
				<div className={`${st.flex}`} >
					{tabs.map((tab) => 
					<Tab 
					key={tab.id} 
					active={tab.type === curTab} 
					onClick={() => onTabClick(tab.type)}>
						{tab.name}
					</Tab>)}
				</div>
				
				<div className={st.ingredients} onScroll={handleIngredientScroll}>
					{tabs.map((tab) => (
						<div key={tab.id} className={st.ingredientBlock}>
							<h2 className={`${st.headerTitle} `} ref={tab.ref}>
									{tab.name}
							</h2>
							<div className={st.ingredientList}>
								{ingredients.filter(x => x.type === tab.type).map((it)=>(
									<IngredientItem
									key={it._id}
									item={it}
									count={ it.type === 'bun'
									? (constructorBun && constructorBun._id === it._id ? 2 : 0)
									: (constructorIngredients.filter(x => x._id === it._id).length)}
									handle={setCurrentItem} />
								))}
							</div>
						</div>
					))}

					{isModalOpen && 
					(<Modal onClose={closeModal}>
							<IngredientDetails info={selectedIngredient} />
					</Modal>)
					}
				</div>
			</div>
		</div>
	);
}

const IngredientItem = ({ item, count, handle }) => {
	const [{ opacity }, ref] = useDrag({
		type: item.type === 'bun' ? 'bun' : 'notbun',
		item: item,
		collect: monitor => ({
			opacity: monitor.isDragging() ? 0.5 : 1
		})
	});

	return (
		<div key={item._id} 
		className={`${st.ingredientItem}`} 
		onClick={() => handle(item)}
		ref={ref}
		style={{opacity}}>
			<div className={st.ingredientImage}>
				<img 
				src={item.image} 
				alt={"Изображение ингредиента"} />
				{count > 0 && <Counter count={count}/>}
			</div>
			<div className={st.ingredientPrice}>
				<span className="text_type_main-medium">{item.price}</span>
				<CurrencyIcon type="primary"/>
			</div>
			<span className="text_type_main-default">{item.name}</span>
		</div>
	)
};

IngredientItem.propTypes = {
	item: IngredientModel.isRequired,
	count: PropTypes.number.isRequired,
	handle: PropTypes.func.isRequired
};