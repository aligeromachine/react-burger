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

export const BurgerIngredients = () => {
	const tabs =  [
		{ id: 1, name: 'Булки', type: 'bun', ref: React.useRef(null) },
		{ id: 2, name: 'Соусы', type: 'sauce', ref: React.useRef(null) },
		{ id: 3, name: 'Начинки', type: 'main', ref: React.useRef(null) },
	]
	// По заданию нужно сделать логику переключения табов, когда идет скролл ингредиентов в списке слева. 
	// Это сделать можно с помощью библиотеки react-intersection-observer
	// A я это сделал с помощью reduce
	const [curTab, setCurTab] = React.useState('bun');
	const onScroll = (e) => {
    const top = e.target.getBoundingClientRect().top;
		const distances = tabs.map(p => {
			return {
				name: p.type, 
				delta: Math.abs(p.ref.current.getBoundingClientRect().top - top),
			}
		});
		const tmp = distances.reduce((acc, item) => acc.delta < item.delta ? acc : item, {});
		if (tmp) if (tmp.name !== curTab) setCurTab(tmp.name);
	}
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
				
				<div className={st.ingredients} onScroll={onScroll}>
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