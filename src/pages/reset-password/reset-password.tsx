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

interface IResetPassword {
  token: string;
  password: string;
}

export const ResetPassword = () => {

  const { form, onChange } = useForm<IResetPassword>({ token: "", password: "" });
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission

    resetPassword(form).then(resposne => {
      if (resposne.success) {
        localStorage.removeItem("forgotSuccess");
        navigate("/login");
      }
    });

    return null;
  }

  return (
    <Form 
      onSubmit={onSubmit}
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
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      />
      
      <Button
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
}
