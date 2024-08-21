import React, { useState } from "react";
import { supabase } from "../../createClient";
import styles from "./addNote.module.css";

function AddNote(props) {
  const locationName = props.location;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState(""); // New state for color
  const [age, setAge] = useState(""); // Assuming there's an age field as well

  const locationArray = ["lindholmspiren", "fontänen", "bädden", "hållplatsen"];
  const currentLocation = locationArray.find((place) =>
    locationName.includes(place)
  );

  // Array of colors with hex values
  const colorOptions = [
    { name: "Lila", hex: "#BB51D6" },
    { name: "Grön", hex: "#3CA36B" },
    { name: "Röd", hex: "#FF603D" },
    { name: "Rosa", hex: "#E171C9" },
    { name: "Blå", hex: "#87A4EF" },
  ];

  async function createPost(event) {
    event.preventDefault();

    const data = {
      title: title,
      content: content,
      author: author || "Anonymous",
      location: currentLocation,
      color: color,
      age: age,
    };

    const { error } = await supabase.from("posts").insert([data]);

    if (error) {
      console.error("Error creating post:", error);
    }
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleAuthorChange(event) {
    setAuthor(event.target.value);
  }

  function handleColorChange(event) {
    setColor(event.target.value);
  }

  function handleAgeChange(event) {
    setAge(event.target.value);
  }

  return (
    <form onSubmit={createPost} className={styles.addNoteForm}>
      <input
        type="text"
        placeholder="Din titel här..."
        value={title}
        onChange={handleTitleChange}
        className={styles.titleInput}
      />
      <textarea
        maxlength="500"
        placeholder="Jag var med om... nått"
        value={content}
        onChange={handleContentChange}
        className={styles.textInput}
      />
      <input
        type="text"
        placeholder="Ålder"
        value={age}
        onChange={handleAgeChange}
        className={styles.ageInput}
      />

      <input
        type="text"
        placeholder="Skriv ditt namn eller var anonym"
        value={author}
        onChange={handleAuthorChange}
        className={styles.nameInput}
      />
      <select value={color} onChange={handleColorChange}>
        <option value="">Välj Postit Färg</option>
        {colorOptions.map((colorOption, index) => (
          <option key={index} value={colorOption.hex}>
            {colorOption.name} - {colorOption.hex}
          </option>
        ))}
      </select>
      <button type="submit">Add note</button>
    </form>
  );
}

export default AddNote;
