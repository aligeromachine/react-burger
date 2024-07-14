import React from "react";
import {
  PasswordInput,
  EmailInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Form } from "../../components/form/form";
import { useForm } from "../../hooks/useForm";
import { userRegisterThunk } from "../../services/auth-user";
import { Link } from "react-router-dom";
import st from "./register.module.css";

export const Register = () => {
  const { form, onChange, onSet } = useForm();

  return (
    <Form
      onSubmit={(e) => onSet(e, userRegisterThunk)}
      title="Регистрация"
    >
      <Input
        type={"text"}
        placeholder={"Имя"}
        name={"name"}
        size={"default"}
        extraClass="ml-1"
        value={form.name || ""}
        onChange={onChange}
        autoComplete="name"
      />
      <EmailInput
        name={"email"}
        isIcon={false}
        value={form.email || ""}
        onChange={onChange}
        autoComplete="email"
      />
      <PasswordInput
        name={"password"}
        extraClass="mb-2"
        value={form.password || ""}
        onChange={onChange}
        autoComplete="new-password"
      />
      <Button htmlType="submit" type="primary" size="large">
        Зарегистрироваться
      </Button>

      <div>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы? <Link to={'/login'} className={st.link}>Войти</Link>
        </p>
      </div>
    </Form>
  );
};
