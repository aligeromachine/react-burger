import React, { FC, ReactElement } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import st from "./modal.module.css";

interface IModalOverlayProps {
  onClick: () => void;
  overlay?: string;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClick, overlay }) => {
  return <div className={overlay} onClick={onClick}></div>;
}

interface IModalProps {
  onClose: () => void;
  children?: ReactElement[] | ReactElement;
}

export const Modal: FC<IModalProps> =  ({ onClose, children }) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return createPortal(
    <div>
      <div className={st.modal}>
        <button className={st.close_button} onClick={onClose}>
          <CloseIcon onClick={onClose} type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay overlay={st.overlay} onClick={() => onClose()} />
    </div>,
    document.getElementById("modals") as HTMLElement
  );
}

