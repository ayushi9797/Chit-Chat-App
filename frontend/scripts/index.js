import {initializeApp} from "firebase/app";
import {getAuth, PhoneAuthProvider} from "firebase/auth";
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

window.onload= function(){
    render();
    window.alert("lord")
}

const firebaseConfig = {
  apiKey: "AIzaSyAhPcORDq34aq65CIxwL4Pely09ZsQGz-8",
  authDomain: "chat-da268.firebaseapp.com",
  projectId: "chat-da268",
  storageBucket: "chat-da268.appspot.com",
  messagingSenderId: "436473280825",
  appId: "1:436473280825:web:7c11ca6fccae83adfe10e8",
  measurementId: "G-FDQPWL0YRV"
};


firebase.initializeApp(firebaseConfig);
const auth= firebase.auth();
const database= firebase.database();
function render(){
    window.recaptchaVerifier()= new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();

}