export default function Score(props) {
  if (props.time) {
    return (
      <div className="time">
        <p>Your time was: {props.time} seconds</p>
      </div>
    );
  } else return null;
}
