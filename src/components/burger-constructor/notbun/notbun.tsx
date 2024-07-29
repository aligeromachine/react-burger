import React from 'react';
import st from './notbun.module.css';
import { 
  ConstructorElement, 
  DragIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { ingredientsAdd, moveCard, ingredientsDel } from '../../../services/burger-constructor';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { IIngredientsExtId } from '../../../interfaces/ingredient-inner';
import { IIngredient } from '../../../interfaces/ingredient-response';

export const NotBun = () => {
  
  const dispatch = useAppDispatch();
  const { constructorIngredients } = useAppSelector(store => store.burgerConstructor);
  const removeIngredient = (item: IIngredientsExtId) => dispatch(ingredientsDel(item));
    
  const [{ isHover }, dropTarget] = useDrop<IIngredient, unknown, {isHover: boolean}> ({
    accept: 'notbun',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(payload) {dispatch(ingredientsAdd(payload));}, 
  });

  return (
    <div ref={dropTarget}>
      {constructorIngredients && constructorIngredients.length > 0 
      ?   
      <div className={st.constructorList}>
        {constructorIngredients.map((item, index) =>
          <ConstructorElem 
          key={item.uniqueId}
          index={index}
          item={item}
          removeIngredient={removeIngredient}/>)}
      </div>
      :
      <div className={`constructor-element ml-8 mb-4 ${isHover ? 'on-hover' : ''}`}>
        <span className="constructor-element__text mt-4" style={{fontSize: 'larger'}}>Выберите начинку</span>
      </div>
      }
    </div>
  );
}

interface INotBunProps {
  item: IIngredientsExtId;
  index: number;
  // eslint-disable-next-line no-unused-vars
  removeIngredient: (item: IIngredientsExtId) => void;
}

const ConstructorElem = ({ item, index, removeIngredient }: INotBunProps)
: React.JSX.Element  => {
  
  const handleClick = () => removeIngredient(item);
  const dispatch = useAppDispatch();
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag<{index: number}, unknown, {isDragging: boolean}>({
    type: 'ConstructorElem',
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<{index: number}, unknown, {}>({
    accept: 'ConstructorElem',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      if (index === item.index) {
        return;
      }

      const rect = ref.current.getBoundingClientRect()
      const rectAbs = Math.abs(rect.bottom - rect.top);
      const offset = monitor.getClientOffset();
      const delta =  offset?.y || 0 - rect.top;
      
      if (index < item.index && delta < rectAbs) {
        return;
      }
      if (index > item.index && delta > rectAbs) {
        return;
      }
      dispatch(moveCard({ x: index, y: item.index }))
    },
  });

  drag(drop(ref));
  const opacity = isDragging ? 0.5 : 1;

  return (
    <div 
    className={st.constructorItem} 
    style={{opacity}} 
    ref={ref}>
      <DragIcon type='primary'/>
      <ConstructorElement
      text={item.name}
      thumbnail={item.image_mobile}
      price={item.price}
      handleClose={handleClick}/>
    </div>
  )
}

