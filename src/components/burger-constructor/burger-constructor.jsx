import React from "react";
import PropTypes from 'prop-types';
import { IngredientModel } from '../../utils/loaddata';
import st from './burger-constructor.module.css';
import { 
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";

export const BurgerConstructor = ({ingredients}) => {
  const bun = ingredients.find(x => x.type === "bun");
  const Ingredients = ingredients.filter(x => x.type !== "bun");

  const { isModalOpen, openModal, closeModal } = useModal();

  return(
    <div className={st.constructor}>
      <div>        
        <div className={st.Container}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${bun.name} (верх)`}
            thumbnail={bun.image_mobile}
            price={bun.price}
          />
        </div>
        
        <div className={st.ingredientsScroll}>
          {Ingredients.map((it) =>
            <div key={it._id} className={st.Container} >
              <DragIcon/>
              <ConstructorElement
                text={it.name}
                thumbnail={it.image_mobile}
                price={it.price}
                />
            </div>)}
        </div>

        <div className={st.Container}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bun.name} (низ)`}
            thumbnail={bun.image_mobile}
            price={bun.price}
          />
        </div>
        
        <div className={`${st.order} mt-6`}>
          <p className="text text_type_digits-medium mr-2">
            {ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0)}
          </p>
          <span className="pr-10">
            <CurrencyIcon type="primary" />
          </span>

          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => openModal()}
          >
            <span>Оформить заказ</span>
          </Button>
          
          {isModalOpen && (
            <Modal onClose={() => closeModal()}>
              <OrderDetails />
            </Modal>
            )}
        </div>
      </div>
     
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientModel).isRequired
};