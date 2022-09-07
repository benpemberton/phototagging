import Time from "./Time";
import CharacterIcons from "./CharacterIcons";
import styles from "../sass/components/Header.module";

const Header = ({ startGame, user, characters }) => {
  return (
    <div className={styles.root}>
      <h1 className="header-item">Discworld Characters</h1>
      <Time startGame={startGame} user={user} />
      <CharacterIcons characters={characters} />
    </div>
  );
};

export default Header;
