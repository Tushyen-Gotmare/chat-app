
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
    apiKey: "AIzaSyD3qpHtpsZANFUX6-YgU-8kfj4-uRpM0FA",
    authDomain: "chat-web-app-5f26f.firebaseapp.com",
    projectId: "chat-web-app-5f26f",
    storageBucket: "chat-web-app-5f26f.appspot.com",
    messagingSenderId: "254381524311",
    appId: "1:254381524311:web:f85a2f3395a892d809aa12"
  };

  const app = firebase.initializeApp(config);
  export const auth = app.auth();
  export const database = app.database();