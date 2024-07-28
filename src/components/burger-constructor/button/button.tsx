import React from 'react';
import st from './button.module.css';
import { 
  CurrencyIcon, 
  Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { calcPrice, resetIngredients } from '../../../services/burger-constructor';
import { createOrderThunk } from '../../../services/order-details';
import { useModal } from '../../../hooks/useModal';
import { OrderDetails } from '../../order-details/order-details';
import { Modal } from '../../modal/modal';
import { Preloader } from '../../preloader/preloader';
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { IIngredientsExtId } from '../../../interfaces/ingredient-inner';

export const ConstructorButton: React.FC = ()
: React.JSX.Element => {
  
	const dispatch = useAppDispatch();
  const navigate = useNavigate();
	const { 
			constructorBun, 
			constructorIngredients, 
			constructorPrice 
	} = useAppSelector(store => store.burgerConstructor);
  const { loading } = useAppSelector(store => store.orderDetails);
	
	React.useEffect(() => {
		dispatch(calcPrice());
	}, [dispatch, constructorBun, constructorIngredients]);

  const { user } = useAppSelector((store) => store.user);

	const handleOrder = () => {
    if (user.name === "") return navigate("/login");

    const order = [...constructorIngredients, constructorBun] as IIngredientsExtId[];
		dispatch(createOrderThunk(order));
    openModal();
	};

  const { isModalOpen, openModal, closeModal } = useModal();
  
  const handleCloseOrder = () => {
    dispatch(resetIngredients());
    closeModal();
  };

	return (
		<div className={`${st.button} mt-6`}>
      <span className='text text_type_digits-medium'>{constructorPrice}</span>
      <CurrencyIcon type="primary" />
      <Button 
        htmlType="button"
        type="primary"
        size="medium"
        onClick={handleOrder}
        disabled={constructorBun === null}>
        <span>Оформить заказ</span>
      </Button>
      {isModalOpen &&
        <Modal onClose={handleCloseOrder}>
          <Preloader isLoading={loading !== 'succeeded' }/>
          <OrderDetails />
        </Modal>
      }
    </div>	
	)
}