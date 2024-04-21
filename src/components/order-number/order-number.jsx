import React from 'react';
import st from './order-number.module.css';
import orderApprove from '../../images/done.jpg';

export const OrderNumber = () => {
  return (
    <div className={st.orderContainer}>
      <p className="text_type_digits-large">034536</p>
      <p className="text_type_main-medium">идентификатор заказа</p>
      <img width="120px" height="120px" alt="Заказ принят" src={orderApprove} />
      <p className="text_type_main-default">Ваш  заказ начали готовить</p>
      <p className="text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}