import React from "react";

export default function ShowLeaderboard({ handleShowLeaderboard }) {
  return (
    <div className="show-leaderboard">
      <h2>View leaderboard</h2>
      <button onClick={handleShowLeaderboard}>Show</button>
    </div>
  );
}
