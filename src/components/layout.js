import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import Global from "./global";
import Helmet from "react-helmet";
const Layout = ({ children }) => {
  const [themeval, setthemeval] = useState("dark");
  const [color, setcolor] = useState("white");
  const [textcolor, settextcolor] = useState("black");
  let currenturl = "";
  if (typeof window !== `undefined`) currenturl = window.location.href;

  const setColorMode = (value) => {
    setthemeval(value);
    if (typeof window !== `undefined`)
      window.localStorage.setItem("color-mode", value);
  };
  useEffect(() => {
    themeval === "light" ? setcolor("#f7f7f7") : setcolor("#303633");
    themeval === "light" ? settextcolor("#2D353C") : settextcolor("#c9c9db");
  }, [themeval]);
  useEffect(() => {
    if (typeof window !== `undefined`) {
      if (window.localStorage.getItem("color-mode") === "light") {
        setColorMode("light");
      } else setColorMode("dark");
    } else setColorMode("dark");
  }, []);

  return (
    <>
      {/* <Global {...textcolor} {...color}/> */}
      <Helmet>
        <html lang="en" />

        <script
          data-ad-client="ca-pub-3445418722858710"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
      </Helmet>
      <main>{children}</main>
    </>
  );
};
const Sun = () => (
  <svg
    width={"1.5rem"}
    height={"1.5rem"}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 3.25C5.38084 3.25 3.25 5.38084 3.25 8C3.25 10.6192 5.38084 12.75 8 12.75C10.6192 12.75 12.75 10.6192 12.75 8C12.75 5.38084 10.6192 3.25 8 3.25ZM8 11.75C7.25832 11.75 6.5333 11.5301 5.91661 11.118C5.29993 10.706 4.81928 10.1203 4.53545 9.43506C4.25162 8.74984 4.17736 7.99584 4.32206 7.26841C4.46675 6.54098 4.8239 5.8728 5.34835 5.34835C5.8728 4.8239 6.54098 4.46675 7.26841 4.32206C7.99584 4.17736 8.74984 4.25162 9.43506 4.53545C10.1203 4.81928 10.706 5.29993 11.118 5.91661C11.5301 6.5333 11.75 7.25832 11.75 8C11.7489 8.99422 11.3534 9.94739 10.6504 10.6504C9.94739 11.3534 8.99422 11.7489 8 11.75Z"
      fill={themeval === "dark" ? "white" : "black"}
    />
    <path
      d="M7.5 0.5H8.5V2H7.5V0.5Z"
      fill={themeval === "dark" ? "white" : "black"}
    />
    <path
      d="M7.5 14H8.5V15.5H7.5V14Z"
      fill={themeval === "dark" ? "white" : "black"}
    />
    <path
      d="M14 7.5H15.5V8.5H14V7.5Z"
      fill={themeval === "dark" ? "white" : "black"}
    />
    <path
      d="M0.5 7.5H2V8.5H0.5V7.5Z"
      fill={themeval === "dark" ? "white" : "black"}
    />
    <path
      d="M12.1465 12.8536L12.8536 12.1465L13.8536 13.1465L13.1465 13.8536L12.1465 12.8536Z"
      fill={themeval === "dark" ? "white" : "black"}
    />
    <path
      d="M2.14645 2.85361L2.85358 2.14648L3.85358 3.14648L3.14645 3.85361L2.14645 2.85361Z"
      fill={themeval === "dark" ? "white" : "black"}
    />
    <path
      d="M2.14639 13.1465L3.14639 12.1465L3.85352 12.8535L2.85352 13.8535L2.14639 13.1465Z"
      fill={themeval === "dark" ? "white" : "black"}
    />
    <path
      d="M12.1465 3.14648L13.1465 2.14648L13.8536 2.85361L12.8536 3.85361L12.1465 3.14648Z"
      fill={themeval === "dark" ? "white" : "black"}
    />
  </svg>
);
const Moon = () => (
  <svg
    width={"1.5rem"}
    height={"1.5rem"}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.4245 11.045C17.7468 11.225 17.0487 11.3161 16.3475 11.316C14.2125 11.316 12.2075 10.486 10.7015 8.98001C9.71255 7.98536 9.00156 6.74887 8.63942 5.39381C8.27727 4.03874 8.27661 2.61242 8.6375 1.25701C8.68257 1.08755 8.68228 0.909206 8.63667 0.739884C8.59106 0.570562 8.50172 0.416212 8.37762 0.292316C8.25352 0.16842 8.09903 0.0793356 7.92963 0.0339989C7.76023 -0.0113379 7.58189 -0.0113329 7.4125 0.0340134C5.71566 0.486197 4.16756 1.37664 2.9235 2.61601C-0.9745 6.51401 -0.9745 12.859 2.9235 16.759C3.85003 17.6907 4.95214 18.4294 6.16604 18.9323C7.37994 19.4353 8.68154 19.6924 9.9955 19.689C11.3091 19.6927 12.6104 19.4357 13.824 18.9329C15.0376 18.4302 16.1394 17.6916 17.0655 16.76C18.3058 15.5157 19.1967 13.9668 19.6485 12.269C19.6934 12.0996 19.693 11.9214 19.6474 11.7522C19.6018 11.583 19.5126 11.4287 19.3887 11.3048C19.2648 11.1809 19.1105 11.0917 18.9413 11.0461C18.7721 11.0005 18.5939 11.0001 18.4245 11.045V11.045ZM15.6525 15.346C14.9115 16.0911 14.03 16.6818 13.0592 17.084C12.0883 17.4862 11.0474 17.6918 9.9965 17.689C8.94529 17.6916 7.90399 17.4858 6.93283 17.0835C5.96166 16.6811 5.07988 16.0903 4.3385 15.345C1.2205 12.226 1.2205 7.15001 4.3385 4.03101C4.94101 3.42918 5.6366 2.92843 6.3985 2.54801C6.28698 3.98707 6.48745 5.43325 6.98623 6.7877C7.485 8.14216 8.27031 9.37297 9.2885 10.396C10.3093 11.4174 11.5397 12.2049 12.8948 12.704C14.2498 13.2032 15.6971 13.4021 17.1365 13.287C16.754 14.0476 16.2531 14.7426 15.6525 15.346V15.346Z"
      fill={themeval === "dark" ? "white" : "black"}
    />
  </svg>
);
export default Layout;
