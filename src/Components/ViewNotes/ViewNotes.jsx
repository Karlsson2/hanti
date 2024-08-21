import { supabase } from "../../createClient.js";
import { useEffect, useState } from "react";
import Note from "../Note/Note.jsx";
import styles from "./ViewNotes.module.css";

function ViewNotes(props) {
  const [posts, setPosts] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

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

  function handleNoteClick(note) {
    setSelectedNote(note);
  }

  function closeNote() {
    setSelectedNote(null);
  }

  return (
    <>
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url("/${props.location}.png")` }}
      ></div>
      <div className={styles.overlay}></div>
      <div className={styles.notesContainer}>
        {posts.map((post) => (
          <Note
            key={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            color={post.color}
            onClick={() => handleNoteClick(post)}
          />
        ))}

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
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewNotes;
