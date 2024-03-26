import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATadfF-RAOdrcoWXvn3X5O5OgUa4p0EhY",
    authDomain: "curently-50278.firebaseapp.com",
    databaseURL: "https://curently-50278-default-rtdb.firebaseio.com",
    projectId: "curently-50278",
    storageBucket: "curently-50278.appspot.com",
    messagingSenderId: "293757303825",
    appId: "1:293757303825:web:fd208f19ba7614d98645b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
