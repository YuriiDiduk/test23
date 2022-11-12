import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormTextInput } from "components/common/Form/FormElements/FormTextInput";
import { FormPasswordInput } from "components/common/Form/FormElements/FormPasswordInput";
import { EMAIL_VALIDATION, NOT_EMPTY_VALIDATION } from "const";
import { Button } from "components/common/Button/Button";
import { AuthRoute, PrivacyRoute, TermsRoute } from "const/routes";
import { Link } from "react-router-dom";
import s from "./AuthPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from "actions/authActions";
import { makeSelector } from "helpers";

interface FormValues {
  email: string;
  password: string;
}

export const Signin = () => {
  const isLoading = useSelector<any, boolean>(
    makeSelector(["authReducer", "isLoading"])
  );

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(signinAction(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Controller
          control={control}
          name="email"
          rules={EMAIL_VALIDATION}
          render={({ field }) => {
            return (
              <FormTextInput
                {...field}
                name="email"
                placeholder="Your Email"
                error={errors.email}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="password"
          rules={NOT_EMPTY_VALIDATION}
          render={({ field }) => {
            return (
              <FormPasswordInput
                {...field}
                name="password"
                placeholder="Password"
                error={errors.password}
              />
            );
          }}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          size="long"
          filled="fill-bright"
          value="Sign In"
          isLoading={isLoading}
        />
      </form>
      <Link to={AuthRoute.FORGOT_PASSWORD} className={s.link}>
        Forgot Password?
      </Link>
    </>
  );
};
