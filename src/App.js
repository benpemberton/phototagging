import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import discworldImage from "./discworld-characters.jpg";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import "./app.css";
import uniqid from "uniqid";
import Score from "./Score";

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);

async function getPositions(name) {
  const colRef = collection(db, "characterPositions");
  const docs = await getDocs(colRef);

  let character;

  docs.forEach((doc) => {
    if (doc.id === name) {
      character = doc.data();
    }
  });

  return character;
}

getPositions();

function App() {
  const [listOpen, setListOpen] = useState(false);
  const [mousePos, setMousePos] = useState(null);
  const [imgPos, setImgPos] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userID, setUserID] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    cleanUserList();
    setStartTime();
  }, []);

  useEffect(() => {
    console.log(userID);
  }, [userID]);

  useEffect(() => {
    if (markers.length === 4) {
      setUserTime();
      checkForHighScore();
    }
  }, [markers]);

  function setStartTime() {
    const colRef = collection(db, "users");
    addDoc(colRef, {
      start: Date.now(),
    }).then((doc) => setUserID(doc.id));
  }

  async function setUserTime() {
    const docRef = doc(db, "users", userID);

    await updateDoc(docRef, {
      end: Date.now(),
    });

    const time = await calculateTime(docRef);

    await updateDoc(docRef, {
      score: time,
    });

    setScore(time);
  }

  async function calculateTime(ref) {
    const docSnap = await getDoc(ref);

    const user = docSnap.data();

    const difference = user.end - user.start;

    return (Math.round(difference) / 1000).toFixed(2);
  }

  async function checkForHighScore() {}

  async function cleanUserList() {
    const colRef = collection(db, "users");
    const users = await getDocs(colRef);

    let deleteList = [];

    users.forEach((user) => {
      if (Object.keys(user.data()).length < 3) {
        deleteList.push(user.id);
      }
    });

    deleteList.forEach((id) => {
      deleteDoc(doc(db, "users", id));
    });
  }

  function handleClick(e) {
    setListOpen(!listOpen);
    setMousePos({ top: e.pageY, left: e.pageX });

    if (!imgPos) {
      const img = document.querySelector("img");
      const rect = img.getBoundingClientRect();
      setImgPos({ top: parseInt(rect.top), left: parseInt(rect.left) });
    }
  }

  function handleDocClick() {
    if (listOpen) {
      setListOpen(false);
    }
  }

  async function handleLi(dbName, normalName) {
    const relMousePos = {
      top: mousePos.top - imgPos.top,
      left: mousePos.left - imgPos.left,
    };

    const character = await getPositions(dbName);

    if (
      relMousePos.top > character.yLower &&
      relMousePos.top < character.yUpper &&
      relMousePos.left > character.xLower &&
      relMousePos.left < character.xUpper
    ) {
      setMarkers((markers) => [
        ...markers,
        {
          dbName: dbName,
          normalName: normalName,
          top: mousePos.top,
          left: mousePos.left,
        },
      ]);
    }
  }

  return (
    <div className="wrap" onClick={handleDocClick}>
      <div className="header">
        <h1>Discworld Characters</h1>
      </div>
      <Score time={score} />
      <div className="image-container">
        <img src={discworldImage} onClick={handleClick} />
        {listOpen && (
          <Dropdown {...mousePos} handler={handleLi} markers={markers} />
        )}
        {markers.map((marker) => {
          return (
            <p
              key={uniqid()}
              className="marker"
              style={{ top: marker.top, left: marker.left }}
            >
              {marker.normalName}
            </p>
          );
        })}
      </div>
      <div className="leaderboard-cta">
        <h2>View leaderboard</h2>
        <button>Show</button>
      </div>
    </div>
  );
}

export default App;
