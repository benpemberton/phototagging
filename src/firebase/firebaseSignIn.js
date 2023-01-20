import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseSignIn = async (cb) => {
  const auth = getAuth();
  signInAnonymously(auth).catch((err) => console.log(err));

  onAuthStateChanged(auth, (user) => {
    if (user) {
      cb(true);
    } else {
      console.log("Firebase: no user signed in");
    }
  });
};

export default firebaseSignIn;
