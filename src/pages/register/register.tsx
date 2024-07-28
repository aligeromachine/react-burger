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

interface IRegister {
  name: string;
  email: string;
  password: string;
}

export const Register: React.FC = ()
: React.JSX.Element => {

  const { form, onChange, onSet } = useForm<IRegister>({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSet(e, userRegisterThunk);
    return null;
  };

  return (
    <Form
      onSubmit={onSubmit}
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
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
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
