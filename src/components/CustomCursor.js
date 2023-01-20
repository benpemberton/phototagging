import styles from "../sass/components/CustomCursor.module";

const CustomCursor = ({ top, left }) => {
  const cursorPosition = {
    top: top + "px",
    left: left + "px",
  };

  return <div className={styles.root} style={cursorPosition}></div>;
};

export default CustomCursor;
