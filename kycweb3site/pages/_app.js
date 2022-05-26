import '../styles/globals.css'
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// TODO: Replace with your app's Firebase project configuration
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

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

function MyApp({ Component, pageProps }) {
  return( <Component {...pageProps} />);
}

export default MyApp
