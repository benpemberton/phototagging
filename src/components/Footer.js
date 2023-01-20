import { useState, useEffect } from "react";
import {
  getTopTen,
  isInTopTen,
  createUserEntry,
} from "../firebase/firestoreCalls";
import ShowLeaderboard from "./ShowLeaderboard";
import ScoreForm from "./ScoreForm";
import styles from "../sass/components/Footer.module";

const Footer = ({
  user,
  topTenScores,
  setTopTenScores,
  setLeaderModal,
  handleRestart,
}) => {
  const [score, setScore] = useState();
  const [scoreForm, setScoreForm] = useState(false);
  const [isHighScore, setIsHighScore] = useState(false);

  useEffect(() => {
    if (user?.end) {
      isInTopTen(user.end - user.start)
        .then((value) => {
          value ? setIsHighScore(true) : setIsHighScore(false);
          setScore(user.end - user.start);
          setScoreForm(true);
        })
        .catch((err) => console.log(err));
    } else {
      setScoreForm(false);
    }
  }, [user]);

  const updateTopTen = async () => {
    const topTen = await getTopTen();
    setTopTenScores(topTen);
  };

  const handleSubmitButton = async (name) => {
    try {
      await createUserEntry(user.end - user.start, name);
      await updateTopTen();
      setLeaderModal(true);
      setIsHighScore(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowLeaderboard = async () => {
    if (!topTenScores) {
      try {
        await updateTopTen();
        setLeaderModal(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      setLeaderModal(true);
    }
  };

  return (
    <div className={styles.root}>
      {scoreForm ? (
        <ScoreForm
          score={score}
          handleSubmitButton={handleSubmitButton}
          handleRestart={handleRestart}
          isHighScore={isHighScore}
        />
      ) : (
        <ShowLeaderboard handleShowLeaderboard={handleShowLeaderboard} />
      )}
    </div>
  );
};

export default Footer;
