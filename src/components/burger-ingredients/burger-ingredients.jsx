import React from "react";
import PropTypes from 'prop-types';
import { IngredientModel } from '../../utils/loaddata';
import st from './burger-ingredients.module.css';
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { useModal } from "../../hooks/useModal";

export const BurgerIngredients = ({ingredients}) => {
  const tabs = [
    { id: 1, name: 'Булки', type: 'bun', ref: React.useRef(null) },
    { id: 2, name: 'Соусы', type: 'sauce', ref: React.useRef(null) },
    { id: 3, name: 'Основное', type: 'main', ref: React.useRef(null) },
  ]
  
  const [curTab, setCurTab] = React.useState('buns');
  
  const TabClick = (value) => {
    setCurTab(value);
    scrollMove(value);
  };

  const scrollMove = (value) => {
    const elem = tabs.find(p => p.type === value);
    
    if (!elem) return;
    
    const ref = elem.ref
    
    if (!ref || !ref.current) return;
    
    ref.current.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  const { isModalOpen, openModal, closeModal } = useModal();
  const [curElement, setCurElement] = React.useState({});
  const setCurrentElement = (item) => {
    setCurElement(item);
    openModal();
  }
  return(
    <div >
      <h1 className={`${st.header} text_type_main-large`}>Соберите бургер</h1>
      <div className={st.tabList}>
          {tabs.map((tab) => <Tab key={tab.id} 
            active={curTab === tab.type} 
            onClick={() => TabClick(tab.type)} >{tab.name} </Tab>)}
      </div>
      
      <div className={st.ingredients}>
        {tabs.map((tab) => (
          <div key={tab.id} ref={tab.ref} className={st.Container}>
              <h2 className={`${st.headerTitle} text_type_main-medium`}>{tab.name}</h2>
              
              <div className={st.ingredientList}>
                {ingredients
                  .filter(item => item.type === tab.type)
                  .map(item => (
                    <div 
                    key={item._id} 
                    className={st.ingredientItem} 
                    onClick={() => setCurrentElement(item)}>
                      <img src={item.image} alt={item.name}/>
                      <Counter count={1} />
                      <div className={st.ingredientBlock}>
                        <p className="text_type_main-medium">{item.price}</p>
                        <CurrencyIcon type="primary"/>
                      </div>
                      <p className="text_type_main-default">{item.name}</p>
                    </div>
                  ))}
              </div>
             
          </div>
        ))}

        {isModalOpen && (
          <Modal onClose={() => closeModal()}>
            <IngredientDetails info={curElement} />
          </Modal>)}
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientModel).isRequired
};


