import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createTheme, NextUIProvider } from "@nextui-org/react";

// 2. Call createTheme and pass your custom values
const darkTheme = createTheme({
  type: 'dark',
})

ReactDOM.render(
  <NextUIProvider theme={darkTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NextUIProvider>,
  document.getElementById("root")
);
