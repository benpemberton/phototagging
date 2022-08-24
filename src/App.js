import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import { getFirestore, doc } from "firebase/firestore/lite";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import uniqid from "uniqid";
import Header from "./Header";
import StartScreen from "./StartScreen";
import Game from "./Game";
import "./app.css";

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({ id: uniqid() });
  const [startGame, setStartGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [startCounter, setStartCounter] = useState(false);

  useEffect(() => {
    firebaseSignIn();
  }, []);

  useEffect(() => {
    if (startCounter) {
      const interval = setInterval(() => {
        setCounter((counter) => counter + 10);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [startCounter]);

  useEffect(() => {
  }, [counter]);

  const firebaseSignIn = async () => {
    const auth = getAuth();
    signInAnonymously(auth).catch((err) => console.log(err));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        setUser((prevUser) => {
          return {
            ...prevUser,
            uid: user.uid,
          };
        });
      } else console.log("Firebase: no user signed in");
    });
  };

  const toggleCounter = () => {
    setStartCounter(!startCounter);
  };

  return (
    <div className="wrap">
      <Header counter={counter} />
      {startGame ? (
        <Game db={db} toggleCounter={toggleCounter} counter={counter} />
      ) : (
        <StartScreen
          handleStartButton={() => setStartGame(true)}
          isSignedIn={isSignedIn}
        />
      )}
    </div>
  );
};

export default App;
