import styles from "./Note.module.css";

function Note({
  title,
  content,
  author,
  className = "",
  color,
  age,
  popUpTitleClass = "",
  onClick,
}) {
  return (
    <div
      className={`${styles.note} ${className}`}
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      <h2 className={`${styles.noteTitle} ${popUpTitleClass}`}>{title}</h2>
      <p className={styles.noteSubText}>{content}</p>
      <p className={styles.noteUser}>
        <strong>
          {author}, {age + " år"}
        </strong>
      </p>
    </div>
  );
}

export default Note;
