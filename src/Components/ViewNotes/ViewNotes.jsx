import { supabase } from "../../createClient.js";
import { useEffect, useState } from "react";
import Note from "../Note/Note.jsx";
import styles from "./ViewNotes.module.css";
import AddNote from "../AddNote/addNote.jsx";

function ViewNotes(props) {
  const [posts, setPosts] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [addNote, setAddNote] = useState(null);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const { data } = await supabase
      .from("posts")
      .select()
      .eq("location", props.location);
    setPosts(data);
  }

  function handleAddClick() {
    setAddNote(true);
  }

  function handleNoteClick(note) {
    setSelectedNote(note);
  }

  function closeNote() {
    setSelectedNote(null);
  }
  function closeAddNote() {
    setAddNote(null);
  }

  return (
    <>
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url("/${props.location}.png")` }}
      ></div>
      <div className={styles.overlay}></div>
      <div className={styles.notesContainer}>
        {props.addNote === "true" && (
          <div onClick={handleAddClick} className={styles.addNoteContainer}>
            <h2 className={styles.noteTitle}>Vad har du varit med om här?</h2>
            <p className={styles.noteSubText}>Berätta din historia</p>
            <p className={styles.noteUser}>Anonym</p>
          </div>
        )}
        {posts.map((post) => (
          <Note
            key={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            color={post.color}
            age={post.age}
            onClick={() => handleNoteClick(post)}
          />
        ))}
        {addNote && (
          <div className={styles.notePopup}>
            <div className={styles.notePopupContent}>
              <button
                className={styles.notePopupContentButton}
                onClick={closeAddNote}
              >
                X
              </button>
              <AddNote location={props.location} />
            </div>
          </div>
        )}
        {selectedNote && (
          <div className={styles.notePopup}>
            <div className={styles.notePopupContent}>
              <button
                className={styles.notePopupContentButton}
                onClick={closeNote}
              >
                X
              </button>
              <Note
                title={selectedNote.title}
                content={selectedNote.content}
                author={selectedNote.author}
                className={styles.popupNote}
                color={selectedNote.color}
                age={selectedNote.age}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewNotes;
