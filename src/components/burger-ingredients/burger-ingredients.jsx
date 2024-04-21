import React from "react";
import PropTypes from 'prop-types';
import { IngredientModel } from '../../utils/loaddata';
import st from './burger-ingredients.module.css';
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { IngredientInfo } from "../ingredient-info/ingredient-info";


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

  const [isElemVisible, setIsElemVisible] = React.useState(false);
  const [curElement, setCurElement] = React.useState({});
  const setCurrentElement = (item) => {
    setCurElement(item);
    setIsElemVisible(true);
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
                      <p className="text_type_main-default">{item.name}</p>
                      <p className="text_type_main-medium">{item.price}</p>
                      <CurrencyIcon type="primary"/>
                    </div>
                  ))}
              </div>
             
          </div>
        ))}

        <div className={st.modalContainer} id='element-details-modal'>
          {isElemVisible && (
            <Modal            
            modalId='element-details-modal' 
            onClose={() => setIsElemVisible(false)}>
              <IngredientInfo info={curElement} />
            </Modal>)}
        </div>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientModel).isRequired
};


