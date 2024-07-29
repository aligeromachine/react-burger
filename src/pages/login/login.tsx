import React from "react";
import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Form } from "../../components/form/form";
import { useForm } from "../../hooks/useForm";
import { userLoginThunk } from "../../services//auth-user";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../services/store';
import st from "./login.module.css";

interface ILogin {
  email: string;
  password: string;
}

export const Login = () => {
  
  const { form, onChange } = useForm<ILogin>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch(userLoginThunk(form));
    navigate("/");

    return null;
  };

  return (
    <Form
      onSubmit={onSubmit}
      title="Вход"
    >
      <EmailInput
        onChange={onChange}
        value={form.email || ""}
        name={"email"}
        isIcon={false}
        autoComplete="email"
      />
      <PasswordInput
        onChange={onChange}
        value={form.password || ""}
        name={"password"}
        extraClass="mb-2"
        autoComplete="current-password"
      />
      <Button htmlType="submit" type="primary" size="large">
        Войти
      </Button>

      <div>
        <p className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь? <Link to={'/register'} className={st.link}>Зарегистрироваться</Link>
        </p>
      </div>
      <div>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? <Link to={'/forgot-password'} className={st.link}>Восстановить пароль</Link>
        </p>
      </div>
    </Form>
  );
};
