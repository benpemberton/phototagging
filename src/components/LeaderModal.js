import React from "react";
import { msToMinsSecsAndMs } from "../utils/convertTime";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function LeaderModal({ topTenScores, setLeaderModal }) {
  return (
    <div className="bg-modal" onClick={() => setLeaderModal(false)}>
      <div className="leader-modal">
        <FontAwesomeIcon icon={faXmark} onClick={() => setLeaderModal(false)} />
        {topTenScores.map((user, index) => {
          return (
            <div key={uniqid()} className="leaderboard-entry">
              <p>{index + 1}:</p>
              <p>{user.name}</p>
              <p>{msToMinsSecsAndMs(user.score)} seconds</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
