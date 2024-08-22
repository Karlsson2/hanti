import styles from "./Note.module.css";

function Note({ title, content, author, className = "", color, age, onClick }) {
  return (
    <div
      className={`${styles.note} ${className}`}
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      <h2 className={styles.noteTitle}>{title}</h2>
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
