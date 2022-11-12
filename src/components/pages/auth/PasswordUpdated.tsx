import { Button } from 'components/common/Button/Button';
import * as React from 'react';
import { useNavigate } from 'react-router';
import s from "./AuthPage.module.scss";

export const PasswordUpdated = () => {
  const navigate = useNavigate();

  const linkToLogin = () => () => {
    navigate('/login', {replace: true});
  };

  return (
    <>
      <h1 className="h2">Password Updated</h1>
      <p className={s.p}>
        Your password has been reset sucessfully!
        <br />
        Now login with your new password.
      </p>
      <Button
        onClick={linkToLogin()}
        size="long"
        filled="fill-bright"
        value="Sign In"
      />
    </>
  );
};