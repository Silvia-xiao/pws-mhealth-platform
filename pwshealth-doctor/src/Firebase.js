import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA5tl8XYFHmmY_jbpGLthdQR5dWyMUTqhw",
    authDomain: "pws-project-fddff.firebaseapp.com",
    projectId: "pws-project-fddff",
    storageBucket: "pws-project-fddff.appspot.com",
    messagingSenderId: "595620721304",
    appId: "1:595620721304:web:6f9f6ce9de0e1b7b9416ed",
    measurementId: "G-GK5Y29EZCQ"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;

