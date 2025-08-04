// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWUwO9oT5JjHCfzTs9Lris1Zf-ZKDmi-k",
  authDomain: "restaurant-d5031.firebaseapp.com",
  projectId: "restaurant-d5031",
  storageBucket: "restaurant-d5031.appspot.com",
  messagingSenderId: "383927974678",
  appId: "1:383927974678:web:95c92a19d706eef6e22e37"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const messaging = getMessaging(app);

export { auth, messaging };
