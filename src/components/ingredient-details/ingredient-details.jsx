import React from 'react';
import st from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedIngredient } from '../../services/ingredient-details';

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

export const IngredientDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.burgerIngredients);

  React.useEffect(() => {
    const item = ingredients?.find((it) => it._id === id);

    if (item) dispatch(setSelectedIngredient(item));
  }, [dispatch, ingredients, id]);

  const { selectedIngredient } = useSelector(store => store.ingredientDetails);

  return (
    (
      selectedIngredient && 
      <div className={st.infoContainer}>
        <h1 className="text_type_main-large mr-10 ml-10">{"Детали ингредиента"}</h1>
        <img 
        src={selectedIngredient.image_large} 
        className={st.infoImage} 
        alt='Фото ингредиента' />
          <p className={`text_type_main-medium mt-4 mb-6`}>{selectedIngredient.name}</p>
          <div className={st.infoCalories}>
              <ElementText name='Калории, ккал' value={selectedIngredient.calories} />
              <ElementText name='Белки, г' value={selectedIngredient.proteins} />
              <ElementText name='Жиры, г' value={selectedIngredient.fat} />
              <ElementText name='Углеводы, г' value={selectedIngredient.carbohydrates} />
          </div>
      </div>
    )
  );
}
