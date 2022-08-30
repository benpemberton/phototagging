import React, { useRef } from "react";
import { msToMinsSecsAndMs } from "../utils/convertTime";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function LeaderModal({ topTenScores, setLeaderModal }) {
  const leaderRef = useRef();

  const closeModal = (e) => {
    if (leaderRef.current.contains(e.target)) return;
    setLeaderModal(false);
  };

  return (
    <div className="bg-modal" onClick={closeModal}>
      <div className="leader-modal" ref={leaderRef}>
        <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
        {topTenScores.map((user, index) => {
          return (
            <div key={uniqid()} className="leaderboard-entry">
              <span>{index + 1}:</span>
              <span>{msToMinsSecsAndMs(user.score)} seconds</span>
              <span className="user">{user.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
