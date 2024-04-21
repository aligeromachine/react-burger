import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import st from "./modal.module.css";
import PropTypes from "prop-types";

function Modal({ onClose, children, modalId }) {
  const closeModal = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  
  React.useEffect(() => {
    window.addEventListener("keydown", closeModal);
    return () => window.removeEventListener("keydown", closeModal);
  }, []);

  const modalRoot = document.getElementById(modalId);

  return createPortal(
    <div>
      <div className={st.modal}>
        <button className={st.close_button} onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
      <div className={st.overlay} onClick={() => onClose()}></div>
    </div>,
    modalRoot
  );

}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  modalId: PropTypes.string.isRequired,
};

export default Modal;