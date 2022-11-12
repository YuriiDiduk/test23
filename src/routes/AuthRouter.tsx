import React from "react";
import { ForgotPassword } from "components/pages/auth/ForgotPassword";
import { Signin } from "components/pages/auth/Signin";
import { Route, Routes } from "react-router";
import { AuthRoute, NotFoundRoute } from "../const/routes";
import { AuthWrapper } from "components/layouts/authWrapper/AuthWrapper";
import { Navigate } from "react-router-dom";

export const AuthRouter = () => {
  return (
    <AuthWrapper>
      <Routes>
        <Route path="*" element={<Navigate to={`/${NotFoundRoute}`} />} />
        <Route index element={<Signin />} />
        <Route path={AuthRoute.FORGOT_PASSWORD} element={<ForgotPassword />} />
      </Routes>
    </AuthWrapper>
  );
};
