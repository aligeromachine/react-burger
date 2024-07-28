import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const useForm = <T>(input: T) => {
  const [form, setForm] = useState(input);
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setForm({...form, [e.target.name]: e.target.value});
  };

  const onSet = (e: React.FormEvent<HTMLFormElement>, func: any) => {
    e.preventDefault();

    dispatch(func(form));
    setForm(input);
  };

  return {form, setForm, onChange, onSet};
}
