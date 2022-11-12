import { VAPID_KEY } from "const/notifications";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBh545vB4bGlWtkiRyCwTEjCblv4EMrx_s",
  authDomain: "nexus1-3fef2.firebaseapp.com",
  projectId: "nexus1-3fef2",
  storageBucket: "nexus1-3fef2.appspot.com",
  messagingSenderId: "591726483819",
  appId: "1:591726483819:web:c031d9f2ea57bde023542e",
  measurementId: "G-3L0G20NCN2",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey: VAPID_KEY,
  });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
