import { useRef } from "react";
import { msToMinsSecsAndMs } from "../utils/convertTime";
import uniqid from "uniqid";
import styles from "../sass/components/LeaderModal.module";

const LeaderModal = ({ topTenScores, setLeaderModal }) => {
  const leaderRef = useRef();

  const closeModal = (e) => {
    if (leaderRef.current.contains(e.target)) return;
    setLeaderModal(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.bgModal} onClick={closeModal}>
        <div className={styles.leaderModal} ref={leaderRef}>
          {topTenScores.map((user, index) => {
            return (
              <div key={uniqid()} className={styles.leaderboardEntry}>
                <span>{index + 1}:</span>
                <span>{msToMinsSecsAndMs(user.score)} seconds</span>
                <span className={styles.user}>{user.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaderModal;
