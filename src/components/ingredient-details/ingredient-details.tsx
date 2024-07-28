import React from 'react';
import st from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { setSelectedIngredient } from '../../services/ingredient-details';

interface IElementTextProp {
  name: string;
  value: number | undefined;
}

const ElementText: React.FC<IElementTextProp> = ({name, value = ""})
: React.JSX.Element => {
  
  return (
    <div>
      <p className="text_type_main-default text_color_inactive">{name}</p>
      <span className='text_type_digits-default'>{value}</span>
    </div>
  );
}

export const IngredientDetails: React.FC = ()
: React.JSX.Element => {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector(store => store.burgerIngredients);

  React.useEffect(() => {
    const item = ingredients?.find((it) => it._id === id);

    if (item) dispatch(setSelectedIngredient(item));
  }, [dispatch, ingredients, id]);

  const { selectedIngredient } = useAppSelector(store => store.ingredientDetails);

  return (
    <>
    (
      {selectedIngredient} && 
      <div className={st.infoContainer}>
        <h1 className="text_type_main-large mr-10 ml-10">{"Детали ингредиента"}</h1>
        <img 
        src={selectedIngredient?.image_large} 
        className={st.infoImage} 
        alt='Фото ингредиента' />
          <p className={`text_type_main-medium mt-4 mb-6`}>{selectedIngredient?.name}</p>
          <div className={st.infoCalories}>
              <ElementText name='Калории, ккал' value={selectedIngredient?.calories} />
              <ElementText name='Белки, г' value={selectedIngredient?.proteins} />
              <ElementText name='Жиры, г' value={selectedIngredient?.fat} />
              <ElementText name='Углеводы, г' value={selectedIngredient?.carbohydrates} />
          </div>
      </div>
    )
    </>
  );
}