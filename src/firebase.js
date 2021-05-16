 import firebase from 'firebase/app'
 import 'firebase/auth'
 import  'firebase/firestore';
 import 'firebase/storage'
 
 const firebaseConfig = {
    apiKey: "AIzaSyBHNDkFZCWEAZ6_erPvrreOoTsClBsk7r8",
    authDomain: "poke-api-auth-9a1f8.firebaseapp.com",
    projectId: "poke-api-auth-9a1f8",
    storageBucket: "poke-api-auth-9a1f8.appspot.com",
    messagingSenderId: "103034651660",
    appId: "1:103034651660:web:f66a997e696f05aadf9a29"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {auth, firebase, db, storage}