import React from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Form } from "../../components/form/form";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router";
import { resetPassword } from "../../utils/requests";
import { Link } from "react-router-dom";
import st from "./reset-password.module.css";

export const ResetPassword = () => {
  const { form, onChange } = useForm();
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    resetPassword(form)
      .then((res) => {
        if (res.success) {
          localStorage.removeItem("forgotSuccess");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <Form 
    title="Восстановление пароля">
      <PasswordInput
        name="password"
        extraClass="mb-2"
        onChange={onChange}
        value={form?.password || ""}
        autoComplete="new-password"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        name={"token"}
        size={"default"}
        extraClass="ml-1"
        value={form?.token || ""}
        onChange={onChange}
        autoComplete="one-time-code"
      />
      <Button
        onClick={(e) => handleReset(e)}
        htmlType="button"
        type="primary"
        size="large"
      >
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
