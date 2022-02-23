export default function Score(props) {
  return (
    <div className="score">
      <p>Score: {props.time ? props.time + "s" : null} </p>
    </div>
  );
}
