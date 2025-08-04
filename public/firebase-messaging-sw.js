/* public/firebase-messaging-sw.js */
importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBWUwO9oT5JjHCfzTs9Lris1Zf-ZKDmi-k",
  authDomain: "restaurant-d5031.firebaseapp.com",
  projectId: "restaurant-d5031",
  storageBucket: "restaurant-d5031.appspot.com",
  messagingSenderId: "383927974678",
  appId: "1:383927974678:web:95c92a19d706eef6e22e37"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
