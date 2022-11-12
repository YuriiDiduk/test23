import NotFoundPage from "components/pages/NotFound/NotFoundPage";
import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  AuthRoute,
  NotFoundRoute,
  PrivacyRoute,
  TermsRoute,
} from "../const/routes";
import { AuthRouter } from "./AuthRouter";
import PrivateRouter from "./PrivateRouter";
import { ResetPassword } from "components/pages/auth/ResetPassword";
import { AuthWrapper } from "components/layouts/authWrapper/AuthWrapper";
import { PasswordUpdated } from "components/pages/auth/PasswordUpdated";
import { Wrapper } from "components/layouts/mainWrapper/Wrapper";
import { Static } from "components/pages/static/Static";
import { Pages } from "const";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={NotFoundRoute} element={<NotFoundPage />} />
      <Route
        path={PrivacyRoute}
        element={
          <Wrapper>
            <Static page={Pages.privacy} />
          </Wrapper>
        }
      />
      <Route
        path={TermsRoute}
        element={
          <Wrapper>
            <Static page={Pages.terms} />
          </Wrapper>
        }
      />
      <Route path={`${AuthRoute.ROOT}/*`} element={<AuthRouter />} />
      <Route
        path={AuthRoute.RESET_PASSWORD}
        element={
          <AuthWrapper>
            <ResetPassword />
          </AuthWrapper>
        }
      />
      <Route
        path={AuthRoute.PASSWORD_UPDATED}
        element={
          <AuthWrapper>
            <PasswordUpdated />
          </AuthWrapper>
        }
      />
      <Route
        path="/*"
        element={
          <Wrapper>
            <PrivateRouter />
          </Wrapper>
        }
      />
    </Routes>
  );
};

export default App;
