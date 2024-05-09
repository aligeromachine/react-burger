import React from 'react';
import st from './notbun.module.css';
import PropTypes from 'prop-types';
import { 
  ConstructorElement, 
  DragIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';

import { IngredientModel } from '../../../utils/loaddata';
import { ingredientsAdd, moveCard, ingredientsDel } from '../../../services/burger-constructor';

export const NotBun = () => {
  const dispatch = useDispatch();
  const { constructorIngredients } = useSelector(store => store.burgerConstructor);
  const removeIngredient = (item) => dispatch(ingredientsDel(item));
    
  const [{ isHover }, dropTarget] = useDrop({
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
          handle={removeIngredient}/>)}
      </div>
      :
      <div className={`constructor-element ml-8 mb-4 ${isHover ? 'on-hover' : ''}`}>
        <span className="constructor-element__text mt-4" style={{fontSize: 'larger'}}>Выберите начинку</span>
      </div>
      }
    </div>
  );
}

const ConstructorElem = ({ item, index, handle }) => {
  const dispatch = useDispatch();
  const ref = React.useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'ConstructorElem',
    item: { moveIndex: index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ConstructorElem',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      if (index === item.moveIndex) {
        return;
      }

      const rect = ref.current.getBoundingClientRect()
      const rectAbs = Math.abs(rect.bottom - rect.top);
      const offset = monitor.getClientOffset();
      const delta = offset.y - rect.top;
      
      if (index < item.moveIndex && delta < rectAbs) {
        return;
      }
      if (index > item.moveIndex && delta > rectAbs) {
        return;
      }
      dispatch(moveCard({ x: index, y: item.moveIndex }))
    },
  });

  drag(drop(ref));
  const opacity = isDragging ? 0.5 : 1;

  return (
    <div 
    className={st.constructorItem} 
    style={{opacity}} 
    ref={ref}>
      <DragIcon/>
      <ConstructorElement
      text={item.name}
      thumbnail={item.image_mobile}
      price={item.price}
      handleClose={() => handle(item)}/>
    </div>
  )
};

ConstructorElem.propTypes = {
  item: IngredientModel,
  index: PropTypes.number.isRequired,
  handle: PropTypes.func.isRequired
};