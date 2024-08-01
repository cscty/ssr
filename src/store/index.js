import { configureStore } from "@reduxjs/toolkit";
import counter from "./counter";

export const getServerStore = () => {
  return configureStore({
    reducer: {
      counter,
    },
  });
};

const config = {
  reducer: {
    counter,
  },
};

if (typeof window !== "undefined" && window.INITIAL_STATE) {
  config.preloadedState = window.INITIAL_STATE;
}
export default configureStore(config);
