import React from 'react';
import st from './ingredient-info.module.css';
import PropTypes from 'prop-types';
import { IngredientModel } from '../../utils/loaddata';

const ElementText = ({name, value}) => {
  return (
    <div>
      <p className="text_type_main-default text_color_inactive">{name}</p>
      <span className='text_type_digits-default'>{value}</span>
    </div>
  );
}

ElementText.propTypes = {
  name: PropTypes.string.isRequired, 
  value: PropTypes.number.isRequired
};

export function IngredientInfo({ info })
{
  return (
    <div className={st.infoContainer}>
      <h1 className="text_type_main-large mr-10 ml-10">{"Детали ингредиента"}</h1>
      <img 
      src={info.image_large} 
      className={st.infoImage} 
      alt='image_large' />
        <p className={`text_type_main-medium mt-4 mb-6`}>{info.name}</p>
        <div className={st.infoCalories}>
            <ElementText name='Калории, ккал' value={info.calories} />
            <ElementText name='Белки, г' value={info.proteins} />
            <ElementText name='Жиры, г' value={info.fat} />
            <ElementText name='Углеводы, г' value={info.carbohydrates} />
        </div>
    </div>
  );
}

IngredientInfo.propTypes = {
  info: IngredientModel
};