import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import  'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAM7Ch7YbpX_fP4wfo6_k-D38-RI6KeCwk",
    authDomain: "app1-ecd33.firebaseapp.com",
    projectId: "app1-ecd33",
    storageBucket: "app1-ecd33.appspot.com",
    messagingSenderId: "94695340592",
    appId: "1:94695340592:web:d4fd9ce3d1f642a876cbf5",
    measurementId: "G-9L5NR7KYXQ"
  };

  firebase.initializeApp(firebaseConfig)

  firebase.auth = firebase.auth()
  firebase.db = firebase.firestore()


  export default firebase

