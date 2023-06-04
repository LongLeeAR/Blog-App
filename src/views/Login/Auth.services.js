import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const loginService = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const {user: {email, displayName, photoURL, isAnonymous}} = result;
      const loginInfo = {email, displayName, photoURL, isAnonymous};

      localStorage.setItem('user', JSON.stringify(loginInfo));
      localStorage.setItem('token', token);

      return loginInfo;
    }).catch((error) => {
      console.log('Error login: ', error);
      return null;
    });
}

export const logoutService = () => {
  const auth = getAuth();
  return signOut(auth).then(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return true;
  }).catch((error) => {
    console.log('logout error: ', error);
    return false;
  });
}