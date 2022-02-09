export default function Dropdown(props) {
  console.log(props);

  const dropdownPosition = {
    top: props.top + "px",
    left: props.left + 10 + "px",
  };

  return (
    <div className="dropdown" style={dropdownPosition}>
      <ul>
        <li onClick={() => props.handler("samVimes")}>Sam Vimes</li>
        <li onClick={() => props.handler("deathOfRats")}>Death of Rats</li>
        <li onClick={() => props.handler("ridcully")}>Ridcully</li>
        <li onClick={() => props.handler("igor")}>Igor</li>
      </ul>
    </div>
  );
}
