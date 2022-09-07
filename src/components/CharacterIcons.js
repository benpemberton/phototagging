import ridcully from "../assets/ridcully.jpg";
import samVimes from "../assets/sam-vimes.jpg";
import deathOfRats from "../assets/death-of-rats.jpg";
import igor from "../assets/igor.jpg";
import styles from "../sass/components/CharacterIcons.module";

const CharacterIcons = ({ characters }) => {
  const checkIfFound = (name) => {
    if (
      characters.some((character) => {
        return character.name === name && character.found;
      })
    ) {
      return true;
    }
  };

  const getClassNames = (name) => {
    if (!checkIfFound(name)) return styles.character;

    return `${styles.character} ${styles.inactive}`;
  };

  return (
    <div className={`${styles.root} header-item`}>
      <div className={getClassNames("ridcully")}>
        <img src={ridcully} alt="Archchancellor Ridcully" />
        <p className="name">Ridcully</p>
      </div>
      <div className={getClassNames("samVimes")}>
        <img src={samVimes} alt="Sir Samuel Vimes" />
        <p className="name">Sam Vimes</p>
      </div>
      <div className={getClassNames("deathOfRats")}>
        <img src={deathOfRats} alt="The Death of Rats" />
        <p className="name">Death of Rats</p>
      </div>
      <div className={getClassNames("igor")}>
        <img src={igor} alt="Igor" />
        <p className="name">Igor</p>
      </div>
    </div>
  );
};

export default CharacterIcons;
