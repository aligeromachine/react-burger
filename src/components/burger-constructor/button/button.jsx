import React from 'react';
import st from './button.module.css';
import { 
  CurrencyIcon, 
  Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { calcPrice } from '../../../services/burger-constructor';
import { createOrder } from '../../../services/order-details';
import { useModal } from '../../../hooks/useModal';
import { OrderDetails } from '../../order-details/order-details';
import { Modal } from '../../modal/modal';
import { Preloader } from '../../preloader/preloader';

export const ConstructorButton = () => {
	const dispatch = useDispatch();
	const { 
			constructorBun, 
			constructorIngredients, 
			constructorPrice 
	} = useSelector(store => store.burgerConstructor);
  const { loading } = useSelector(store => store.orderDetails);
	
	React.useEffect(() => {
		dispatch(calcPrice());
	}, [dispatch, constructorBun, constructorIngredients]);

	const handleOrder = () => {
    const order = [...constructorIngredients, constructorBun];
		dispatch(createOrder(order));
    openModal();
	};

  const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<div className={`${st.button} mt-6`}>
      <span className='text text_type_digits-medium'>{constructorPrice}</span>
      <CurrencyIcon type="primary" />
      <Button 
      htmlType="button"
      type="primary"
      size="medium"
      onClick={handleOrder}
      disabled={constructorBun===null}>
        <span>Оформить заказ</span>
        </Button>
        {isModalOpen &&
          <Modal onClose={closeModal}>
            <Preloader isLoading={loading !== 'idle' }/>
            <OrderDetails />
          </Modal>
        }
    </div>	
	)
}