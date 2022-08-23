import React from "react";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function LeaderModal(props) {
  return (
    <div className="leader-modal">
      <FontAwesomeIcon icon={faXmark} onClick={props.handler} />
      {props.users.map((user, index) => {
        return (
          <div key={uniqid()} className="leaderboard-entry">
            <p>{index + 1}:</p>
            <p>{user.name}</p>
            <p>{user.score}</p>
          </div>
        );
      })}
    </div>
  );
}
