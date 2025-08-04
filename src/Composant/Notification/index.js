// Notification.js
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";

// 🔐 Clé publique VAPID (depuis Firebase > Paramètres > Cloud Messaging)
const VAPID_KEY = "TON_VAPID_KEY_PUBLIC";

// Ta config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWUwO9oT5JjHCfzTs9Lris1Zf-ZKDmi-k",
  authDomain: "restaurant-d5031.firebaseapp.com",
  projectId: "restaurant-d5031",
  storageBucket: "restaurant-d5031.appspot.com",
  messagingSenderId: "383927974678",
  appId: "1:383927974678:web:95c92a19d706eef6e22e37"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const Message = () => {
  useEffect(() => {
    // 🎯 Demande permission
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("✅ Permission acceptée");

        getToken(messaging, { vapidKey: VAPID_KEY })
          .then((currentToken) => {
            if (currentToken) {
              console.log("🔐 Token admin navigateur :", currentToken);

              // ✅ TODO : Envoyer ce token vers ton API FastAPI
              // Tu peux l’enregistrer dans un fichier .txt ou une base (à toi de voir)
            }
          })
          .catch((err) => {
            console.error("Erreur token : ", err);
          });
      }
    });

    // 🎧 Réception du message
    onMessage(messaging, (payload) => {
      console.log("🔔 Message reçu :", payload);

      // Afficher une notification visuelle
      new window.Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/logo.png"
      });

      // 🔊 Jouer un son (optionnel)
      const audio = new Audio("/notif.mp3");
      audio.play();
    });
  }, []);

  return null;
};

export default Message;
