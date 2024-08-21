import React, { useState } from "react";
import { supabase } from "../createClient";

function AddNote(props) {
  const locationName = props.location;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState(""); // New state for color
  const [age, setAge] = useState(""); // Assuming there's an age field as well

  const locationArray = ["piren", "statyn", "glantan", "test"];
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
    <div>
      <form onSubmit={createPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
        />
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={handleAgeChange}
        />
        <select value={color} onChange={handleColorChange}>
          <option value="">Select a color</option>
          {colorOptions.map((colorOption, index) => (
            <option key={index} value={colorOption.hex}>
              {colorOption.name} - {colorOption.hex}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Leave this blank if you want to be anonymous"
          value={author}
          onChange={handleAuthorChange}
        />
        <button type="submit">Add note</button>
      </form>
    </div>
  );
}

export default AddNote;
