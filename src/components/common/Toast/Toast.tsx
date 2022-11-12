import React from 'react';
import { ToastContainer } from 'react-toastify';
import s from "./Toast.module.scss";
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';

export const Toast = () => {
  return (
    <div className={s.wrapper}>
      <ToastContainer autoClose={3000} limit={1} position="top-center" />
    </div>
  );
};
