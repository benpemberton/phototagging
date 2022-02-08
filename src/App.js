import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import { getFirestore } from "firebase/firestore/lite";
import discworldImage from "./discworld-characters.jpg";
import Dropdown from "./Dropdown";
import { useState } from "react";

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);

function App() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div className="wrap">
      <div className="header">
        <h1>Discworld Characters</h1>
      </div>
      <div className="image-container">
        <img src={discworldImage} onClick={handleClick}></img>
        {open && <Dropdown />}
      </div>
      <div className="leaderboard-cta">
        <h2>View leaderboard</h2>
        <button>Show</button>
      </div>
    </div>
  );
}

export default App;
