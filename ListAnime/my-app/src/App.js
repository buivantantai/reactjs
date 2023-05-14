import "./App.css";
import Index from "./project/index";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKFxDEuBJZFlJxd5IHo5gpcR-fwSOYZVA",
  authDomain: "animelist-33c2b.firebaseapp.com",
  databaseURL: "https://animelist-33c2b-default-rtdb.firebaseio.com",
  projectId: "animelist-33c2b",
  storageBucket: "animelist-33c2b.appspot.com",
  messagingSenderId: "574038491686",
  appId: "1:574038491686:web:1d7dcce02cd603102d1ce7",
  measurementId: "G-22R9P6QJHW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div>
      <Index />;
    </div>
  );
}

export default App;
