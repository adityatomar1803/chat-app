import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyAsJfUUNKRaReYr04Meb5I93rL2gax7AE8',

  authDomain: 'chat-app-ee819.firebaseapp.com',

  databaseURL:
    'https://chat-app-ee819-default-rtdb.asia-southeast1.firebasedatabase.app',

  projectId: 'chat-app-ee819',

  storageBucket: 'chat-app-ee819.appspot.com',

  messagingSenderId: '619897294289',

  appId: '1:619897294289:web:eee568c70d5f31f1ba24f0',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
