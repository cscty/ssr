import { useEffect } from "react";
import store from "../store";
export default function (Component) {
    let count = 0;
    const newComponent = function (...props) {
        useEffect(() => {
            // 客户端渲染，则预获取数据
            if (window.isCSR) {
                Component?.getInitData?.(store);
            }
        }, []);

        return <Component props={{ ...props }} />;
    };
    newComponent.getInitData = Component.getInitData;
    return newComponent;
}
