import { useEffect } from "react";
import store from "../store";
export default function (Component) {
  const newComponent = function (...props) {
    useEffect(() => {
      if (typeof window !== "undefined" && !window.INITIAL_STATE) {
        Component?.getInitData?.(store);
      }
      return () => {};
    }, []);

    return <Component props={{ ...props }} />;
  };
  newComponent.getInitData = Component.getInitData;
  return newComponent;
}
