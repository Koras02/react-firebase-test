// firebase앱 초기화 == 8.0.0 부터는 * as 를 사용하지 않는다.
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA6XeAYiuR42wpkPYvzBZBLYgAlKfNQHOc",
    authDomain: "react-test-1-d30e4.firebaseapp.com",
    projectId: "react-test-1-d30e4",
    storageBucket: "react-test-1-d30e4.appspot.com",
    messagingSenderId: "527162692231",
    appId: "1:527162692231:web:1f229189bd7286274e1e22",
}

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();