import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import { getFirestore, doc } from "firebase/firestore/lite";
import discworldImage from "./discworld-characters.jpg";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import "./app.css";
import uniqid from "uniqid";
import Score from "./Score";
import ShowLeaderboard from "./ShowLeaderboard";
import BackgroundModal from "./BackgroundModal";
import HighScoreForm from "./HighScoreForm";
import LeaderModal from "./LeaderModal";
import {
  setStartTime,
  cleanUserList,
  setEndTime,
  setUserScore,
  getUser,
  getTopTen,
  createArray,
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
  const [highScoreForm, setHighScoreForm] = useState(false);
  const [leaderModal, setLeaderModal] = useState(false);
  const [topTenScores, setTopTenScores] = useState(null);

  useEffect(() => {
    startOfGame();
  }, []);

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
    try {
      await cleanUserList();
      const id = await setStartTime();
      setUserID(id);
      const dbTopTen = await getTopTen();
      const topTenArray = await createArray(dbTopTen);
      setTopTenScores(topTenArray);
    } catch (err) {
      console.log(err);
    }
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
    if (topTen) {
      setHighScoreForm(true);
    }
  }

  async function calculateTime(user) {
    const difference = user.end - user.start;

    return (Math.round(difference) / 1000).toFixed(2);
  }

  function handleImgClick(e) {
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

  async function handleLiClick(dbName, normalName) {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  async function submitBtnClick(name) {
    const topTen = await updateTopTen(name, score);
    setTopTenScores(topTen);
    setHighScoreForm(false);
    setLeaderModal(true);
  }

  function closeLeaderModal() {
    setLeaderModal(false);
  }

  return (
    <div className="wrap" onClick={handleDocClick}>
      <div className="header">
        <h1>Discworld Characters</h1>
      </div>
      <div className="game-wrap">
        <div className="image-container">
          <div className="info">
            <p className="instructions">
              Find and select the four Discworld characters in the fastest
              possible time
            </p>
            <Score time={score} />
          </div>

          <img
            src={discworldImage}
            alt="A crowd of Discworld characters"
            onClick={handleImgClick}
          />
          {listOpen && (
            <Dropdown {...mousePos} handler={handleLiClick} markers={markers} />
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
      </div>
      <div className="scores-area">
        <div className="scores-area-inner">
          {highScoreForm ? (
            <HighScoreForm score={score} handler={submitBtnClick} />
          ) : (
            <ShowLeaderboard handler={() => setLeaderModal(true)} />
          )}
        </div>
      </div>
      {leaderModal && <BackgroundModal handler={closeLeaderModal} />}
      {leaderModal && (
        <LeaderModal users={topTenScores} handler={closeLeaderModal} />
      )}
    </div>
  );
}

export default App;
