import React from "react";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Form } from "../../components/form/form";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router";
import { forgotPassword } from "../../utils/requests";
import { Link } from "react-router-dom";
import st from "./forgot-password.module.css";

interface IForgotPassword {
  email: string;
}

export const ForgotPassword: React.FC = () 
: React.JSX.Element => {
  
  const { form, onChange } = useForm<IForgotPassword>({email: ""});
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (form.email === undefined) return null;

    forgotPassword(form.email).then(response => {
      if (response.success) {
        navigate("/reset-password");
        localStorage.setItem("forgotSuccess", JSON.stringify(response.message));
      }
    });

    return null;
  };

  return (
    <Form
      onSubmit={onSubmit}
      title="Восстановление пароля"
      >
      <EmailInput
        value={form.email || ""}
        placeholder={"Укажите e-mail"}
        size={"default"}
        extraClass="ml-1"
        onChange={onChange}
      />
      <Button htmlType="submit" type="primary" size="large">
        Восстановить
      </Button>
      
      <div>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <Link to={'/login'} className={st.link}>Войти</Link>
        </p>
      </div>
    </Form>
  );
}
