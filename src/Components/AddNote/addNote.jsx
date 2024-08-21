import React, { useState } from "react";
import { supabase } from "../../createClient";
import styles from "./addNote.module.css";

function AddNote(props) {
  const locationName = props.location;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("");
  const [age, setAge] = useState("");
  const [wordCount, setWordCount] = useState("");

  const locationArray = ["lindholmspiren", "fontänen", "bädden", "hållplatsen"];
  const currentLocation = locationArray.find((place) =>
    locationName.includes(place)
  );

  const colorOptions = [
    { name: "Lila", hex: "#BB51D6" },
    { name: "Grön", hex: "#3CA36B" },
    { name: "Röd", hex: "#FF603D" },
    { name: "Rosa", hex: "#E171C9" },
    { name: "Blå", hex: "#87A4EF" },
  ];

  async function createPost(event) {
    event.preventDefault();

    const newPost = {
      title: title,
      content: content,
      author: author || "Anonymous",
      location: currentLocation,
      color: color,
      age: age,
    };

    const { data, error } = await supabase
      .from("posts")
      .upsert([newPost])
      .select();

    console.log(data);
    console.log(error);

    if (error) {
      console.error("Error creating post:", error);
    } else {
      props.addNewPost(data[0]);
    }
  }

  return (
    <form onSubmit={createPost} className={styles.addNoteForm}>
      <input
        type="text"
        placeholder="Din titel här..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.titleInput}
      />
      <div className={styles.solidLine}></div>
      <textarea
        maxLength="500"
        placeholder="Jag var med om... nått"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textInput}
      />
      <div className={styles.wordCount}>/500 tecken</div>
      <div className={styles.solidLine}></div>

      <input
        type="text"
        placeholder="Ålder"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className={styles.ageInput}
      />
      <input
        type="text"
        placeholder="Skriv ditt namn eller var anonym"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className={styles.nameInput}
      />
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="">Välj Postit Färg</option>
        {colorOptions.map((colorOption, index) => (
          <option key={index} value={colorOption.hex}>
            {colorOption.name} - {colorOption.hex}
          </option>
        ))}
      </select>
      <button className={styles.submitButton} type="submit">
        Add note
      </button>
    </form>
  );
}

export default AddNote;
