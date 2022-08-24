import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";

const cleanUserList = async (db) => {
  const users = await getDocs(collection(db, "users"));

  if (users.length < 10) return;

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
}

const createUserEntry = async (score, db) => {
    const userRef = await addDoc(collection(db, "users"), {
      score
    });
    
    return userRef.id;
}

const updateUserEntry = async (db, id, name) => {
  const userDoc = doc(db, "users", id);

  await updateDoc(userDoc, {
    name
  });
}

const isInTopTen = async (db, score) => {
  const topTen = await getTopTen(db);

  if (topTen.length < 10 || Number(score) < Number(topTen[9].score)) {
    return true;
  } else return false;
}

const getTopTen = async (db) => {
  const users = await getDocs(collection(db, "users"));

  let array = [];

  users.forEach((user) => {
    array.push(user.data());
  });

  array.sort((a, b) => {
    return a.score - b.score;
  });

  return array.slice(0, 10);
}

const getPosition = async (db, name) => {
    const docs = await getDocs(collection(db, "characterPositions"));

    let character;

    docs.forEach((doc) => {
      if (doc.id === name) {
        character = doc.data();
      }
    });

    return character;
}

export {
  cleanUserList,
  createUserEntry,
  updateUserEntry,
  getTopTen,
  isInTopTen,
  getPosition
};
