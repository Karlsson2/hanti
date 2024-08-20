import { supabase } from "../../createClient.js";
import { useEffect, useState } from "react";
import Note from "../Note.jsx";
import styles from "./ViewNotes.module.css";

function ViewNotes(props) {

    const [posts, setPosts] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
      getPosts();
    }, []);
  
    async function getPosts() {
      const { data } = await supabase.from("posts").select().eq("location", props.location);
      setPosts(data);
    }

    function handleNoteClick(note) {
        setSelectedNote(note);
      }
    
    function closeNote() {
    setSelectedNote(null);
    }
  

    return (
        <div>
          <ul>
            {posts.map((post) => (
              <li key={post.id} onClick={() => handleNoteClick(post)}>
                <Note title={post.title} text={post.text} author={post.author} />
              </li>
            ))}
          </ul>
    
          {selectedNote && (
            <div className={styles.notePopup}>
              <div className={styles.notePopupContent}>
                <button className={styles.notePopupContentButton} onClick={closeNote}>Close</button>
                <Note title={selectedNote.title} text={selectedNote.text} author={selectedNote.author} />
              </div>
            </div>
          )}
        </div>
      );
    }
    
    export default ViewNotes;