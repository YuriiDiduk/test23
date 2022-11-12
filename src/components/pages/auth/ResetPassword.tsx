import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormPasswordInput } from "components/common/Form/FormElements/FormPasswordInput";
import { CONFIRM_PASSWORD_VALIDATION, PASSWORD_VALIDATION } from "const";
import { Button } from "components/common/Button/Button";
import { AuthRoute } from "const/routes";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./AuthPage.module.scss";
import { useDispatch } from "react-redux";
import { resetPassAction, validateLinkAction } from "actions/authActions";
import { useLoading } from "hooks/useLoading";

interface FormValues {
  password: string;
  confirmPassword: string;
}

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const url = useLocation().search;
  const token = url.slice(url.indexOf("=") + 1);
  const isLoading = useLoading("authReducer");
  const navigate = useNavigate();

  const [isTokenValid, setValid] = useState(false);

  const handleRedirect = (isValid: boolean) => {
    if (isValid) {
      setValid(true);
    } else {
      navigate(AuthRoute.ROOT);
    }
  };

  useEffect(() => {
    dispatch(
      validateLinkAction({ resetToken: token }, { redirect: handleRedirect })
    );
  }, []);

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const watchNewPassword = watch("password");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const sendData = {
      ...data,
      resetToken: token,
    };
    dispatch(
      resetPassAction(sendData, {
        redirect: () => navigate(`/${AuthRoute.PASSWORD_UPDATED}`),
      })
    );
  };

  return (
    <>
      {isTokenValid && (
        <>
          <h1 className="h2">Reset Password</h1>
          <p className={s.p}>
            Almost done, just enter your new password below.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <Controller
              control={control}
              name="password"
              rules={PASSWORD_VALIDATION}
              render={({ field }) => {
                return (
                  <FormPasswordInput
                    {...field}
                    name="password"
                    placeholder="Password"
                    error={errors.password}
                    isShowable={false}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="confirmPassword"
              rules={CONFIRM_PASSWORD_VALIDATION(watchNewPassword)}
              render={({ field }) => {
                return (
                  <FormPasswordInput
                    {...field}
                    name="confirmPassword"
                    placeholder="Password"
                    error={errors.confirmPassword}
                  />
                );
              }}
            />
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              size="long"
              filled="fill-bright"
              value="Submit"
              isLoading={isLoading}
            />
          </form>
        </>
      )}
    </>
  );
};
