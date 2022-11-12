import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "styles/styles.scss";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import App from "./routes/App";
import { Toast } from "./components/common/Toast/Toast";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toast />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
