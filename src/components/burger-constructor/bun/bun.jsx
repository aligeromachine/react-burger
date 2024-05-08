import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from 'react-dnd';
import { bunAdd } from '../../../services/burger-constructor';

export const Bun = ({ type }) => {
	const dispatch = useDispatch();
	const { constructorBun } = useSelector(store => store.burgerConstructor);
	
	const [{ isHover }, dropTarget] = useDrop({
		accept: 'bun',
		collect: monitor => ({
			isHover: monitor.isOver()
		}),
		drop(payload) {dispatch(bunAdd(payload))},
	});

	return (
		<div ref={dropTarget}>
			{constructorBun
			? <ConstructorElement
				type={type}
				isLocked={true}
				text={`${constructorBun.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
				thumbnail={constructorBun.image_mobile}
				price={constructorBun.price}
				extraClass='ml-8 mb-4' />
			:
			<div className={`constructor-element ml-8 mb-4 constructor-element_pos_${type} ${isHover ? 'on-hover': ''}`}>
				<span className="constructor-element__text mt-4" style={{fontSize: 'larger'}}>Выберите булки</span>
			</div>
			}
		</div>
	)
}

Bun.propTypes = {
  type: PropTypes.string.isRequired,
};