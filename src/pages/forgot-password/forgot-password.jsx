import React from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Form } from "../../components/form/form";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router";
import { forgotPassword } from "../../utils/requests";
import { Link } from "react-router-dom";
import st from "./forgot-password.module.css";

export const ForgotPassword = () => {
  const { form, onChange } = useForm();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (form.forgot === undefined) return;
    
    forgotPassword(form.forgot).then((res) => {
      navigate("/reset-password");
      localStorage.setItem("forgotSuccess", JSON.stringify(res.message));
    });
  };

  return (
  <Form
    onSubmit={onSubmit}
    title="Восстановление пароля"
  >
    <Input
      type="email"
      placeholder={"Укажите e-mail"}
      name={"forgot"}
      size={"default"}
      extraClass="ml-1"
      value={form.forgot || ""}
      onChange={onChange}
      autoComplete="email"
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
};
