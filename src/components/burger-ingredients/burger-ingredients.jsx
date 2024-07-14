import React from 'react';
import st from '../burger-ingredients/burger-ingredients.module.css';
import { 
	Counter, 
	CurrencyIcon,
	Tab, 
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { IngredientModel } from '../../utils/loaddata';
import { Link, useLocation } from "react-router-dom";

export const BurgerIngredients = () => {
	const tabs =  [
		{ id: 1, name: 'Булки', type: 'bun', ref: React.useRef(null) },
		{ id: 2, name: 'Соусы', type: 'sauce', ref: React.useRef(null) },
		{ id: 3, name: 'Начинки', type: 'main', ref: React.useRef(null) },
	]
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

	const { ingredients } = useSelector(store => store.burgerIngredients);
	const { constructorBun, constructorIngredients } = useSelector(store => store.burgerConstructor);

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
									/>
								))}
							</div>
						</div>
					))}
					
				</div>
			</div>
		</div>
	);
}

const IngredientItem = ({ item, count }) => {
	const [{ opacity }, ref] = useDrag({
		type: item.type === 'bun' ? 'bun' : 'notbun',
		item: item,
		collect: monitor => ({
			opacity: monitor.isDragging() ? 0.5 : 1
		})
	});

	const location = useLocation();

	return (
		<div key={item._id} 
		className={`${st.ingredientItem}`} 
		ref={ref}
		style={{opacity}}>
			<Link
				to={`/ingredients/${item._id}`}
				state={{ background: location }} >

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

			</Link>
		</div>
	)
};

IngredientItem.propTypes = {
	item: IngredientModel.isRequired,
	count: PropTypes.number.isRequired,
};