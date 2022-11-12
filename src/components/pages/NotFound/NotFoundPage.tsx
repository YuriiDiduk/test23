import * as React from "react";
import s from "./NotFound.module.scss";
import Logo from "assets/images/logo-light.svg";
import Img from "assets/images/404.svg";
import { Button } from "components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import { DashboardRoute } from "const/routes";

type IProps = {};
const NotFoundPage = (props: IProps) => {
  const navigate = useNavigate();

  const handleClickToDashboard = () => {
    navigate(`/${DashboardRoute}`);
  };

  const handleClickToPrevious = () => {
    navigate(-2);
  };

  return (
    <div className={s.container}>
      <header>
        <div className={s.logoWrapper}>
          <img src={Logo} className={s.logo} alt="Nexus logo" />
        </div>
      </header>
      <div className={s.body}>
        <div className={s.content}>
          <div className={s.info}>
            <p className={s.largeText}>Oops...</p>
            <p className="h1">Something went wrong</p>
            <p className="h3">The page you are looking for is missing</p>
          </div>
          <div className={s.btnGroup}>
            <Button
              value="Go to Dashboard"
              icon="pie-chart"
              onClick={handleClickToDashboard}
            />
            <Button
              value="Go back to previous page"
              filled="invisible"
              onClick={handleClickToPrevious}
            />
          </div>
        </div>
        <div className={s.imgWrap}>
          <img src={Img} alt="404 page" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;