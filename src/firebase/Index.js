import firebase from 'firebase/app';
import 'firebase/storage';

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyAgQtngOYrlruqhxaD_Nok4QN5y9DUv9xE",
  authDomain: "rede-governanca.firebaseapp.com",
  databaseURL: "https://rede-governanca.firebaseio.com",
  projectId: "rede-governanca",
  storageBucket: "rede-governanca.appspot.com",
  messagingSenderId: "471210624598",
  appId: "1:471210624598:web:bd4245393b87cd04689df7",
  measurementId: "G-V55PXYJ3TF"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }