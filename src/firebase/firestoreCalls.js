import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";

const cleanUserList = async () => {
  try {
    const users = await getDocs(collection(db, "users"));

    if (users.docs.length < 10) return;

    const topTen = await getTopTen(db);

    let deleteList = [];

    users.forEach((user) => {
      if (user.data().score > topTen[9].score) {
        deleteList.push(user.id);
      }
    });

    deleteList.forEach((id) => {
      deleteDoc(doc(db, "users", id));
    });
  } catch (err) {
    console.log(err);
  }
};

const createUserEntry = async (score, name) => {
  const userRef = await addDoc(collection(db, "users"), {
    score,
    name,
  });

  return userRef.id;
};

const updateUserEntry = async (id, name) => {
  const userDoc = doc(db, "users", id);

  await updateDoc(userDoc, {
    name,
  });
};

const isInTopTen = async (score) => {
  const topTen = await getTopTen(db);

  if (topTen.length < 10 || Number(score) < Number(topTen[9].score)) {
    return true;
  } else return false;
};

const getTopTen = async () => {
  const users = await getDocs(collection(db, "users"));

  let array = [];

  users.forEach((user) => {
    array.push(user.data());
  });

  array.sort((a, b) => {
    return a.score - b.score;
  });

  console.log(array.slice(0, 10));

  return array.slice(0, 10);
};

const getPosition = async (name) => {
  const docs = await getDocs(collection(db, "characterPositions"));

  let character;

  docs.forEach((doc) => {
    if (doc.id === name) {
      character = doc.data();
    }
  });

  return character;
};

export {
  cleanUserList,
  createUserEntry,
  updateUserEntry,
  getTopTen,
  isInTopTen,
  getPosition,
};
