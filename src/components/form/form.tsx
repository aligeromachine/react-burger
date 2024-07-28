import React from "react";
import st from "./form.module.css";

interface IFormProp {
  title: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => null;
}

export const Form: React.FC<React.PropsWithChildren<IFormProp>> = ({ children, title, onSubmit })
: React.JSX.Element => {
  
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
}
