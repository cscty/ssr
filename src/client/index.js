import * as ReactDOM from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
import store from "../store";
ReactDOM.hydrateRoot(
  document.getElementById("app"),
  <Provider store={store}>
    <App />
  </Provider>
);
