import React from 'react';
import st from './order-details.module.css';
import orderApprove from '../../images/done.jpg';
import { useSelector } from 'react-redux';

export function OrderDetails() 
{
	const { orderData } = useSelector(store => store.orderDetails);

	return (
    <div className={st.orderContainer}>			
			{orderData && (
				<>
					<p className="text_type_digits-large">{orderData.number}</p>
					<p className="text_type_main-medium">идентификатор заказа</p>
					<img width="120px" height="120px" alt="Заказ принят" src={orderApprove} />
					<p className="text_type_main-default">Ваш  заказ начали готовить</p>
					<p className="text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
				</>
			)}      
    </div>
  );
}