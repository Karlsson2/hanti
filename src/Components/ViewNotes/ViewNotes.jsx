import { supabase } from "../../createClient.js";
import { useEffect, useState } from "react";
import Note from "../Note/Note.jsx";
import styles from "./ViewNotes.module.css";
import Header from "../Header/Header.jsx";
import AddNote from "../AddNote/addNote.jsx";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

function ViewNotes(props) {
  const [posts, setPosts] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [addNote, setAddNote] = useState(false); // default to false

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const { data } = await supabase
      .from("posts")
      .select()
      .eq("location", props.location)
      .order("created_at", { ascending: false });
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
    setAddNote(false);
  }

  function addNewPost(newPost) {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Prepend the new post to the list
    closeAddNote(); // Close the "Add Note" form
  }

  return (
    <>
      <Header location={props.location}></Header>
      {selectedNote && (
        <div className={styles.notePopup}>
          <div className={styles.notePopupContent}>
            <button
              className={styles.notePopupContentButtonBlack}
              onClick={closeNote}
            >
              X
            </button>
            <Note
              title={selectedNote.title}
              content={selectedNote.content} // Full brödtext här
              author={selectedNote.author}
              className={styles.popupNote}
              color={selectedNote.color}
              age={selectedNote.age}
              popUpTitleClass={styles.popUpTitleClass}
            />
          </div>
        </div>
      )}
      {addNote && (
        <div className={styles.notePopup}>
          <div className={styles.notePopupContent}>
            <button
              className={styles.notePopupContentButton}
              onClick={closeAddNote}
            >
              X
            </button>
            <AddNote
              location={props.location}
              addNewPost={addNewPost} // Pass the addNewPost function
            />
          </div>
        </div>
      )}
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url("/${props.location}.png")` }}
      ></div>
      <div className={styles.overlay}></div>
      <div className={styles.notesContainer}>
        {props.addNote === "true" && (
          <div onClick={handleAddClick} className={styles.addNoteContainer}>
            <h2 className={styles.noteTitle}>Vad har du varit med om här?</h2>
            <p className={styles.noteSubText}>
              Skriv här...{" "}
              <FontAwesomeIcon icon={faPencil} className={styles.faPencil} />
            </p>
          </div>
        )}
        {posts.map((post) => (
          <Note
            key={post.id}
            title={post.title}
            content={
              post.content.length > 20
                ? post.content.substring(0, 20) + "..."
                : post.content
            }
            author={post.author}
            color={post.color}
            age={post.age}
            onClick={() => handleNoteClick(post)}
          />
        ))}
      </div>
    </>
  );
}

export default ViewNotes;
