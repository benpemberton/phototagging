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

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);

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

async function setStartTime() {
  const colRef = collection(db, "users");

  const userRef = await addDoc(colRef, {
    start: Date.now(),
  });

  return userRef.id;
}

async function setEndTime(ref) {
  await updateDoc(ref, {
    end: Date.now(),
  });
}

async function setUserScore(ref, time) {
  await updateDoc(ref, {
    score: time,
  });
}

async function getUser(ref) {
  const docSnap = await getDoc(ref);

  return docSnap.data();
}

async function isInTopTen(score) {
  const colRef = collection(db, "topTen");
  const topTen = await getDocs(colRef);

  let topTenArray = [];

  topTen.forEach((user) => {
    topTenArray.push(user.data());
  });

  topTenArray.sort((a, b) => {
    return a.score - b.score;
  });

  if (topTenArray.length < 10 || Number(score) < Number(topTenArray[9].score)) {
    return topTenArray;
  } else return false;
}

async function updateTopTen(name, score, topTenScores) {
  const colRef = collection(db, "topTen");
  const topTen = await getDocs(colRef);

  const newArray = topTenScores;

  newArray.push({
    score: score,
    name: name,
  });

  newArray.sort((a, b) => {
    return a.score - b.score;
  });

  if (newArray.length > 10) {
    topTen.forEach((user) => {
      console.log(user);
      if (user.data().score === newArray[newArray.length - 1].score) {
        console.log(user.id);
        deleteDoc(doc(db, "topTen", user.id));
      }
    });
  }

  addDoc(colRef, {
    score: score,
    name: name,
  });
}

async function getPosition(name) {
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

export {
  setStartTime,
  cleanUserList,
  setEndTime,
  setUserScore,
  getUser,
  isInTopTen,
  updateTopTen,
  getPosition,
};
