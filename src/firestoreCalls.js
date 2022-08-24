import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore/lite";

async function cleanUserList(db) {
  try {
  const users = await getDocs(collection(db, "users"));

  let deleteList = [];

  users.forEach((user) => {
      deleteList.push(user.id);
  });

  deleteList.forEach((id) => {
    deleteDoc(doc(db, "users", id));
  });
} catch (err) {
  console.log(err)
}
}

const createUserEntry = async (score, db) => {
  try {
    const colRef = collection(db, "users");

    const userRef = await addDoc(colRef, {
      score
    });

    return userRef.id;

  } catch (err) {
    throw new Error(err.message);
  }
}

async function setStartTime(db) {
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

async function getTopTen(db) {
  const colRef = collection(db, "topTen");
  const dbTopTen = await getDocs(colRef);

  return dbTopTen;
}

async function createArray(topTen) {
  let topTenArray = [];

  topTen.forEach((user) => {
    topTenArray.push(user.data());
  });

  topTenArray.sort((a, b) => {
    return a.score - b.score;
  });

  return topTenArray;
}

async function isInTopTen(db, score) {
  const dbTopTen = await getTopTen(db);
  let topTenArray = await createArray(dbTopTen);

  if (topTenArray.length < 10 || Number(score) < Number(topTenArray[9].score)) {
    return true;
  } else return false;
}

async function updateTopTen(name, score) {
  const dbTopTen = await getTopTen(db);
  let topTenArray = await createArray(dbTopTen);

  topTenArray.push({
    score: score,
    name: name,
  });

  topTenArray.sort((a, b) => {
    return a.score - b.score;
  });

  if (topTenArray.length > 10) {
    dbTopTen.forEach((user) => {
      if (user.data().score === topTenArray[topTenArray.length - 1].score) {
        deleteDoc(doc(db, "topTen", user.id));
      }
    });
  }

  addDoc(collection(db, "topTen"), {
    score: score,
    name: name,
  });

  topTenArray.pop();

  return topTenArray;
}

async function getPosition(db, name) {
  try {
    const colRef = collection(db, "characterPositions");
    const docs = await getDocs(colRef);

    let character;

    docs.forEach((doc) => {
      if (doc.id === name) {
        character = doc.data();
      }
    });

    return character;
  } catch (err) {
    console.log(err);
  }
}

export {
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
  createUserEntry
};
