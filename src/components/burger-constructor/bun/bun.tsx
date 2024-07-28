import React from 'react';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from 'react-dnd';
import { bunAdd } from '../../../services/burger-constructor';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { IIngredientsExtId } from "../../../interfaces/ingredient-inner";

interface IBunProps {
  position: "top" | "bottom";
}

interface ICollectedProps {
	isHover: boolean;
}

export const Bun: React.FC<IBunProps> = ({ position })
: React.JSX.Element => {
	
	const dispatch = useAppDispatch();
	const { constructorBun } = useAppSelector(store => store.burgerConstructor);
	
	const [{ isHover }, dropTarget] = useDrop<IIngredientsExtId, unknown, ICollectedProps>({
		accept: 'bun',
		collect: monitor => ({
			isHover: monitor.isOver()
		}),
		drop(payload) {dispatch(bunAdd(payload));},
	});

	return (
		<div ref={dropTarget}>
			{constructorBun
			? <ConstructorElement
				type={position}
				isLocked={true}
				text={`${constructorBun.name} ${position === 'top' ? '(верх)' : '(низ)'}`}
				thumbnail={constructorBun.image_mobile}
				price={constructorBun.price}
				extraClass='ml-8 mb-4' />
			:
			<div 
			className={`constructor-element ml-8 mb-4 constructor-element_pos_${position} ${isHover ? 'on-hover': ''}`}>
				<span className="constructor-element__text mt-4" style={{fontSize: 'larger'}}>Выберите булки</span>
			</div>
			}
		</div>
	)
}
