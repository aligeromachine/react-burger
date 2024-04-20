import React from "react";
import St from './modal.module.css'
import PropTypes from 'prop-types';

const Modal = ({children, visible, setVisible}) => {
  var rootClasses = [St.myModal];

  if (visible){
    rootClasses.push(St.active);
  }
  
  return(
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={St.myModalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.string,
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
};

export default Modal;