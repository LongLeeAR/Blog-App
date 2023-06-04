import { initializeApp } from 'firebase/app';
import { createContext, useContext } from "react";


// Load firebase config from the environment
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const firebaseContext = createContext(null);

export const useFirebaseConfig = () => useContext(firebaseContext);

export const FirebaseProvider = ({children}) => {
  const app = initializeApp(firebaseConfig);

  const firebaseContextValue = {
    app,
  }

  return <firebaseContext.Provider value={firebaseContextValue}>
    {children}
  </firebaseContext.Provider>
}