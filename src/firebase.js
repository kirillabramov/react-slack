import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAkofKtnWd1nwfsATuRY0oX8PuwCcT4-aE',
  authDomain: 'react-slack-clone-94cf5.firebaseapp.com',
  databaseURL: 'https://react-slack-clone-94cf5.firebaseio.com',
  projectId: 'react-slack-clone-94cf5',
  storageBucket: 'react-slack-clone-94cf5.appspot.com',
  messagingSenderId: '354638206218',
  appId: '1:354638206218:web:7be67137e395851d',
};
// Initialize Firebase
console.log(firebase);
firebase.initializeApp(firebaseConfig);

export default firebase;
