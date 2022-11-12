import cn from "classnames";
import React from "react";
import s from "./Dots.module.scss";

interface IProps {
  isLight: boolean;
  isVisible?: boolean;
}

const LoadingDots:React.FC<IProps> = ({isLight, isVisible}) => {
  return (
    <ul className={cn(s.dots, isVisible && s.visible, isLight && s.light)}>
      <li className={s.dot} />
      <li className={s.dot} />
      <li className={s.dot} />
      <li className={s.dot} />
    </ul>
  );
};

export default LoadingDots;
