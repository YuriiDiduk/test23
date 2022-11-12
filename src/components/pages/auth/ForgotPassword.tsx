import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormTextInput } from "components/common/Form/FormElements/FormTextInput";
import { EMAIL_VALIDATION } from "const";
import { Button } from "components/common/Button/Button";
import { AuthRoute } from "const/routes";
import { Link } from "react-router-dom";
import s from "./AuthPage.module.scss";
import { useDispatch } from "react-redux";
import { forgotPassAction } from "actions/authActions";
import { useLoading } from "hooks/useLoading";

interface FormValues {
  email: string;
}

const defaultValues = {
  email: "",
};

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const isLoading = useLoading("authReducer");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const url = `${window.location.origin}/api/reset-password`;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const sendData = {
      ...data,
      link: url,
    };
    dispatch(forgotPassAction(sendData));
  };

  return (
    <>
      <h1 className="h2">Forgot Password?</h1>
      <p className={s.p}>Don’t worry! Reseting your password is easy.</p>
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
        <Button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          size="long"
          filled="fill-bright"
          value="Reset Password"
          isLoading={isLoading}
        />
      </form>
      <Link to={AuthRoute.ROOT} className={s.link}>
        I remembered my password!
      </Link>
    </>
  );
};
