import React from 'react';
import s from "./Avatar.module.scss";
import cn from "classnames";
import { Icon } from '../Icon';

interface IProps {
  avatar: string | undefined;
  className?: string;
  size?: number;
}

export const Avatar = ({avatar, className, size = 48}: IProps) => {
  return (
    <div
      className={cn(s.holder, className, !avatar && s.default)}
      style={{ width: `${size}px`, height: `${size}px`, minWidth: `${size}px`}}
    >
      {avatar
        ? <img
            src={avatar}
            alt="user avatar"
            className={s.image}
          />
        : <Icon icon="user" className={s.icon} />
      }
    </div>
  );
};
