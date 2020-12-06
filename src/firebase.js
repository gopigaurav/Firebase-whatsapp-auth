import firebase from 'firebase';



const firebaseConfig = {
    apiKey: "AIzaSyBx9EkRXW2JIh0DpW0TjxCyTDBhE0cqjYs",
    authDomain: "whatsapp-clone-49aaf.firebaseapp.com",
    projectId: "whatsapp-clone-49aaf",
    storageBucket: "whatsapp-clone-49aaf.appspot.com",
    messagingSenderId: "662152507017",
    appId: "1:662152507017:web:ece390635501b9e8d56058",
    measurementId: "G-S8TN6KXEJL"
  };
// auth by google
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;