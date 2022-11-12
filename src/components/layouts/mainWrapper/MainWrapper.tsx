import React, { useEffect } from "react";
import { requestForToken, onMessageListener } from "firebase";
import { makeSelector, session } from "helpers";
import { useAppSelector } from "hooks/useAppSelector";
import { Navigate, useLocation } from "react-router-dom";
import { MuiThemeProvider } from "../MuiThemeProvider";
import { useDispatch } from "react-redux";
import { getProfileAction } from "actions/profileActions";
import { UpdateTableContext } from "context/UpdateTableContext";
import { getEthnicityAction } from "actions/patientsActions";
import {
  getNotificationsAction,
  sendTokenAction,
} from "actions/notificationsActions";
import { useContext } from "react";
import { MessagingRoute } from "const/routes";

type IProps = {
  children: JSX.Element[] | JSX.Element;
};

const MainWrapper = ({ children }: IProps) => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const isMessagingPage = pathname.includes(MessagingRoute);

  const { updateTable: updateMessagingTable } = useContext(UpdateTableContext);

  onMessageListener()
    .then((payload: any) => {
      dispatch(getNotificationsAction(null));
      if (isMessagingPage) {
        updateMessagingTable();
      }
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  const isAuth = useAppSelector<boolean>(
    makeSelector(["authReducer", "isAuth"])
  );

  useEffect(() => {
    const token = session.getFirebaseToken();

    const getFirebaseToken = () => {
      requestForToken()
        .then((currentToken) => {
          if (currentToken) {
            session.saveFirebaseToken(currentToken);
            dispatch(sendTokenAction(currentToken));
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    };

    const onFocus = () => {
      dispatch(getNotificationsAction(null));
      if (isMessagingPage) {
        updateMessagingTable();
      }
    };

    if (!token) {
      getFirebaseToken();
    }
    dispatch(getProfileAction(null));
    dispatch(getEthnicityAction(null));
    dispatch(getNotificationsAction(null));
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <MuiThemeProvider>{children}</MuiThemeProvider>;
};

export default MainWrapper;
