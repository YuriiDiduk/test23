importScripts('https://www.gstatic.com/firebasejs/9.6.6/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.6/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBh545vB4bGlWtkiRyCwTEjCblv4EMrx_s",
  authDomain: "nexus1-3fef2.firebaseapp.com",
  projectId: "nexus1-3fef2",
  storageBucket: "nexus1-3fef2.appspot.com",
  messagingSenderId: "591726483819",
  appId: "1:591726483819:web:c031d9f2ea57bde023542e",
  measurementId: "G-3L0G20NCN2"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});