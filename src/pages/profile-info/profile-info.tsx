import React from "react";
import {
  PasswordInput,
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { userEditThunk } from "../../services/auth-user";
import { useForm } from "../../hooks/useForm";
import st from "./profile-info.module.css";
import { useAppSelector } from '../../services/store';

interface IProfileInfo {
  name: string;
  email: string;
  password?: string;
}

export const ProfileInfo = () => {

  const { form, setForm, onChange, onSet } = useForm<IProfileInfo>({
    name: "",
    email: "",
    password: "",
  });

  const [ isUserChanged, setIsUserChanged ] = React.useState(false);
  const { user } = useAppSelector((store) => store.user);

  React.useEffect(() => {
    if (user.name && user.email) {
      setForm({ name: user.name, email: user.email });
    }
  }, [user.name, user.email]);

  React.useEffect(() => {
    if (form.name !== user.name || form.email !== user.email || form.password ) {
      setIsUserChanged(true);
    } else {
      setIsUserChanged(false);
    }
  }, [form, user.name, user.email]);

  const onCancel = () => {
    setForm({
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  return (
    <form onSubmit={(e) => onSet(e, userEditThunk)}>
      <Input
        placeholder={"Имя"}
        onChange={onChange}
        icon={"EditIcon"}
        value={form?.name || ""}
        name={"name"}
        size={"default"}
        extraClass="mb-6"
        autoComplete="name" 
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}      
        />
      <EmailInput
        onChange={onChange}
        value={form?.email || ""}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass="mb-6"
        autoComplete="email"
      />
      <PasswordInput
        onChange={onChange}
        value={form?.password || ""}
        name={"password"}
        icon="EditIcon"
        autoComplete="new-password"
      />
      {isUserChanged && (
        <div className={`${st.btn} mt-6`}>
          <Button
            onClick={onCancel}
            htmlType="button"
            type="secondary"
            size="medium"
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
