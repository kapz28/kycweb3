import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDpZ8TjjlKn7vb2Y3wbpbrJjnvtb0wmtm8",
  authDomain: "kycweb3.firebaseapp.com",
  databaseURL: "https://kycweb3-default-rtdb.firebaseio.com",
  projectId: "kycweb3",
  storageBucket: "kycweb3.appspot.com",
  messagingSenderId: "909202396410",
  appId: "1:909202396410:web:8a5da4e4833b15f0af2543",
  measurementId: "G-4SVGFDFQ7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// const analytics = getAnalytics(app);

// 2. Call createTheme and pass your custom values
const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      // you can also create your own color
      myColor: '#ff4ecd'

      // ...  more colors
    },
  },

})

ReactDOM.render(
  <NextUIProvider theme={darkTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NextUIProvider>,
  document.getElementById("root")
);
