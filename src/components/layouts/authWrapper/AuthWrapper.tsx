import * as React from "react";
import { makeSelector } from "helpers";
import { useAppSelector } from "hooks/useAppSelector";
import { Navigate, useLocation } from "react-router";
import Logo from "assets/images/logo-dark.svg";
import Check from "assets/images/check.svg";
import s from "./Auth.module.scss";
import { AuthRoute, PrivacyRoute, TermsRoute } from "const/routes";
import cn from "classnames";
import { MuiAuthThemeProvider } from "./MuiAuthThemeProvider";
import { Link } from "react-router-dom";

type IProps = {
  children: JSX.Element;
};

export const AuthWrapper = ({ children }: IProps) => {
  const isAuth = useAppSelector<boolean>(
    makeSelector(["authReducer", "isAuth"])
  );

  const { pathname } = useLocation();

  const isPasswordUpdated = pathname.includes(AuthRoute.PASSWORD_UPDATED);

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <MuiAuthThemeProvider>
      <div className={cn(s.container, "auth")}>
        <div className={s.inner}>
          <div className={s.formWrapper}>
            <div className={s.logoWrapper}>
              {isPasswordUpdated ? (
                <img className={s.check} src={Check} alt="Nexus" />
              ) : (
                <img className={s.logo} src={Logo} alt="Nexus" />
              )}
            </div>
            {children}
          </div>
          <div className={s.links}>
            <Link to={`/${PrivacyRoute}`} className={s.link}>
              Privacy Policy
            </Link>
            <Link to={`/${TermsRoute}`} className={s.link}>
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </MuiAuthThemeProvider>
  );
};
