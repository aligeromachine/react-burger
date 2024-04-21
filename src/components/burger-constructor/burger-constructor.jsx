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
import { OrderNumber } from "../order-number/order-number";

export const BurgerConstructor = ({ingredients}) => {
  const bun = ingredients.find(x => x.type === "bun");
  const Ingredients = ingredients.filter(x => x.type !== "bun");

  const [isOrderVisible, setIsOrderVisible] = React.useState(false);

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
            onClick={() => setIsOrderVisible(true)}
          >
            <span>Оформить заказ</span>
          </Button>
          
          <div className={st.modalContainer} id='constructor-order-modal'>
            {isOrderVisible && (
              <Modal 
              modalId='constructor-order-modal' 
              onClose={() => setIsOrderVisible(false)}>
                <OrderNumber />
              </Modal>
            )}
          </div>
        </div>
      </div>
     
    </div>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientModel).isRequired
};