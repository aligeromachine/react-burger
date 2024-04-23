import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import st from "./modal.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClick, overlay }) => {
  return <div className={overlay} onClick={onClick}></div>;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
  overlay: PropTypes.string.isRequired,
};

export const Modal = ({ onClose, children }) => {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const modalRoot = document.getElementById("modals");

  return createPortal(
    <div>
      <div className={st.modal}>
        <button className={st.close_button} onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
      <ModalOverlay overlay={st.overlay} onClick={() => onClose()} />
    </div>,
    modalRoot
  );

}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;