import { initializeApp } from 'firebase/app';
import { createContext, useContext, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDFZJT5zwR0TbgPIehbdDnyPshPWt4_Q0s",
  authDomain: "blog-381109.firebaseapp.com",
  databaseURL: "https://blog-381109-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blog-381109",
  storageBucket: "blog-381109.appspot.com",
  messagingSenderId: "568926773323",
  appId: "1:568926773323:web:fa54b98869660aa4f82dce"
};

const firebaseContext = createContext(null);

export const useFirebaseContext = () => useContext(firebaseContext);

export const FirebaseProvider = ({children}) => {
  const app = initializeApp(firebaseConfig);
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const userFromLocal = localStorage.getItem('user');
    if (userFromLocal) {
      setUser(JSON.parse(userFromLocal));
    }
  }, [])

  const firebaseContextValue = {
    user,
    app,
    token,
    setUser,
    setToken
  }

  return <firebaseContext.Provider value={firebaseContextValue}>
    {children}
  </firebaseContext.Provider>
}