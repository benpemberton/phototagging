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
import ScoreModal from "./ScoreModal";
import {
  setStartTime,
  cleanUserList,
  setEndTime,
  setUserScore,
  getUser,
  isInTopTen,
  updateTopTen,
  getPosition,
} from "./firestoreCalls";

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);

function App() {
  const [listOpen, setListOpen] = useState(false);
  const [mousePos, setMousePos] = useState(null);
  const [imgPos, setImgPos] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userID, setUserID] = useState(null);
  const [score, setScore] = useState(null);
  const [scoreModal, setScoreModal] = useState(false);
  const [leaderModal, setLeaderModal] = useState(false);
  const [topTenScores, setTopTenScores] = useState(null);

  useEffect(() => {
    startOfGame();
  }, []);

  useEffect(() => {
    console.log(userID);
  }, [userID]);

  useEffect(() => {
    if (markers.length === 4) {
      endOfGame();
    }
  }, [markers]);

  useEffect(() => {
    if (score) {
      topTenChecks();
    }
  }, [score]);

  async function startOfGame() {
    await cleanUserList();
    const id = await setStartTime();
    setUserID(id);
  }

  async function endOfGame() {
    const docRef = doc(db, "users", userID);

    await setEndTime(docRef);

    const user = await getUser(docRef);

    const time = await calculateTime(user);

    setUserScore(docRef, time);

    setScore(time);
  }

  async function topTenChecks() {
    const topTen = await isInTopTen(score);
    console.log(topTen);
    if (topTen) {
      setTopTenScores(topTen);
      setScoreModal(true);
    }
  }

  async function calculateTime(user) {
    const difference = user.end - user.start;

    return (Math.round(difference) / 1000).toFixed(2);
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

    const character = await getPosition(dbName);

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

  function submitBtnClick(name) {
    updateTopTen(name, score, topTenScores);
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
      {scoreModal && <ScoreModal score={score} handler={submitBtnClick} />}
    </div>
  );
}

export default App;
