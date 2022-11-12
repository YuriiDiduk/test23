import React from 'react';
import { showMessage } from 'helpers';
import { Button } from 'components/common/Button/Button';
import s from "./Toast.module.scss";

interface IToastMessage {
  title?: string | string[];
  subtitle?: string;
  btnTitle?: string;
  onClick?(): void;
  isError?: boolean;
}

const handleClose = () => {
  document.getElementsByClassName('Toastify')[0].classList.remove('active');
};

const ToastMessage = (props: IToastMessage) => {
  const { title, onClick, subtitle, btnTitle = 'OK' } = props;

  const renderTitle = () => {
    if (typeof title === 'string') {
      return <span className={s.title}>{title}</span>;
    }
    if (Array.isArray(title)) {
      return title.map((item, index) => {
        const text = item.endsWith('.') ? item : `${item}.`;

        return (
          <span key={index} className={s.title}>
            {text}
          </span>
        );
      });
    }
  };

  return (
    <div className={s.error}>
      {title && renderTitle()}
      {subtitle && <span className={s.subtitle}>{subtitle}</span>}
      <Button
        value={btnTitle}
        onClick={() => {
          if (onClick) {
            onClick();
            handleClose();
          }
        }}
      />
    </div>
  );
};

export const ShowToastMessage = (props: IToastMessage) => {
  const {isError = true} = props;

  return (
    isError ? (
      showMessage.error(<ToastMessage {...props} />, {
        onOpen: () =>
          document.getElementsByClassName('Toastify')[0].classList.add('active'),
        onClose: () => {
          handleClose();
        },
      })
    ) : (
      showMessage.success(<ToastMessage {...props} />, {
        onOpen: () =>
          document.getElementsByClassName('Toastify')[0].classList.add('active'),
        onClose: () => {
          handleClose();
        },
      })
    )
  ) 
  
};
