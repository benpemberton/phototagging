import {
  setUserTime,
  cleanUserList,
  setStartTime,
  checkForUser,
} from "./../firestoreCalls";

test("check user is created after clean up", async () => {
  const userID = setStartTime();

  cleanUserList();

  const docRef = setUserTime(userID);

  expect(checkForUser(docRef)).toBe(true);
});
