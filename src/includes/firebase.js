import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBTr0JJ8sSTgioOXCcJwJm3PmuDEHHKc0U",
    authDomain: "movies-c3e6f.firebaseapp.com",
    projectId: "movies-c3e6f",
    storageBucket: "movies-c3e6f.appspot.com",
    messagingSenderId: "902392835471",
    appId: "1:902392835471:web:b0cb91fa9dcf4eac37affa"
  };
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);

   const auth = firebase.auth();

   const database = firebase.firestore();

   const storage = firebase.storage();

   const userCollection = database.collection('users');

   const moviesCollection = database.collection('movies');

   export {

     auth,
     database,
     storage,
     userCollection,
     moviesCollection
   }