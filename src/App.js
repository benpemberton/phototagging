import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import discworldImage from "./discworld-characters.jpg";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import "./app.css";

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
  const [open, setOpen] = useState(false);
  const [mousePos, setMousePos] = useState(null);
  const [imgPos, setImgPos] = useState(null);

  function handleClick(e) {
    setOpen(!open);
    setMousePos({ top: e.pageY, left: e.pageX });

    if (!imgPos) {
      const img = document.querySelector("img");
      const rect = img.getBoundingClientRect();
      setImgPos({ top: parseInt(rect.top), left: parseInt(rect.left) });
    }
  }

  async function handleLi(name, e) {
    const relMousePos = {
      top: mousePos.top - imgPos.top,
      left: mousePos.left - imgPos.left,
    };

    const character = await getPositions(name);

    if (
      relMousePos.top > character.yLower &&
      relMousePos.top < character.yUpper &&
      relMousePos.left > character.xLower &&
      relMousePos.left < character.xUpper
    ) {
      console.log("direct hit!");
    }
  }

  return (
    <div className="wrap">
      <div className="header">
        <h1>Discworld Characters</h1>
      </div>
      <div className="image-container">
        <img src={discworldImage} onClick={handleClick} />
        {open && <Dropdown {...mousePos} handler={handleLi} />}
      </div>
      <div className="leaderboard-cta">
        <h2>View leaderboard</h2>
        <button>Show</button>
      </div>
    </div>
  );
}

export default App;
