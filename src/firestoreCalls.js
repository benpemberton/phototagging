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

async function setStartTime() {
  const colRef = collection(db, "users");

  const userRef = await addDoc(colRef, {
    start: Date.now(),
  });

  return userRef.id;
}

async function setUserTime(id) {
  const docRef = doc(db, "users", id);

  await updateDoc(docRef, {
    end: Date.now(),
  });

  const time = await calculateTime(docRef);

  await updateDoc(docRef, {
    score: time,
  });

  return docRef;
}

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

async function checkForUser(ref) {
  return await getDoc(ref);
}

export { setUserTime, cleanUserList, setStartTime, checkForUser };
