import React from "react";
import st from "./form.module.css";
import PropTypes from "prop-types";

export const Form = ({ children, title, onSubmit }) => {
  return (
    <section>
      <div className={`${st.content}`}>
        <form onSubmit={onSubmit} className={st.item}>
          <h1 className="text text_type_main-medium">
            {title}
          </h1>
          {children}
        </form>
      </div>
    </section>
  );
};

Form.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
};
