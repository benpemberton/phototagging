export default function ShowLeaderboard(props) {
  return (
    <div className="show-leaderboard">
      <h2>View leaderboard</h2>
      <button onClick={props.handler}>Show</button>
    </div>
  );
}
