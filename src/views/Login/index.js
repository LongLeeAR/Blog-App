import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect } from "react";

const firebaseConfig = {
  // databaseURL: 'https://blog-381109-default-rtdb.asia-southeast1.firebasedatabase.app',
  apiKey: "AIzaSyDFZJT5zwR0TbgPIehbdDnyPshPWt4_Q0s",
  authDomain: "blog-381109.firebaseapp.com",
  databaseURL: "https://blog-381109-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blog-381109",
  storageBucket: "blog-381109.appspot.com",
  messagingSenderId: "568926773323",
  appId: "1:568926773323:web:fa54b98869660aa4f82dce"
};


export const Login = () => {
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }, [])

  return <></>
}