export default function Dropdown(props) {
  const dropdownPosition = {
    top: props.top + "px",
    left: props.left + 10 + "px",
  };

  function checkForMarker(name) {
    if (props.markers.some((marker) => marker.dbName === name)) {
      return "inactive";
    }
  }

  return (
    <div className="dropdown" style={dropdownPosition}>
      <ul>
        <li
          className={checkForMarker("samVimes")}
          onClick={() => props.handler("samVimes", "Sam Vimes")}
        >
          Sam Vimes
        </li>
        <li
          className={checkForMarker("deathOfRats")}
          onClick={() => props.handler("deathOfRats", "Death of Rats")}
        >
          Death of Rats
        </li>
        <li
          className={checkForMarker("ridcully")}
          onClick={() => props.handler("ridcully", "Ridcully")}
        >
          Ridcully
        </li>
        <li
          className={checkForMarker("igor")}
          onClick={() => props.handler("igor", "Igor")}
        >
          Igor
        </li>
      </ul>
    </div>
  );
}
