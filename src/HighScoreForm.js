export default function ScoreModal(props) {
  function handleClick(e) {
    e.preventDefault();
    const input = document.querySelector(".name-input");
    if (input.value === "") {
      input.classList.add("invalid");
    } else {
      props.handler(input.value);
    }
  }

  return (
    <div className="high-score-form">
      <h3>You made the top ten!</h3>
      <p>Your time was {props.score} seconds.</p>
      <form>
        <input
          type="text"
          className="
        name-input"
          placeholder="Enter your name..."
        ></input>
        <button className="score-submit-btn" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}
