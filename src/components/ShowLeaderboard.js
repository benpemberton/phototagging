import React from "react";

export default function ShowLeaderboard({ handleShowLeaderboard }) {
  return (
    <div className="show-leaderboard">
      <button onClick={handleShowLeaderboard}>Show leaderboard</button>
    </div>
  );
}
