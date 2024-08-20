import React, { useState } from "react";
import { supabase } from "../createClient";

function AddNote(props) {
    const locationName = props.location;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const locationArray = ['piren', 'statyn', 'glantan', 'test'];

    const currentLocation = locationArray.find(place => locationName.includes(place));

  async function createPost(event) {
    event.preventDefault();

    const data = {
      title: title,
      content: content,
      author: author || "Anonymous",
      location: currentLocation,
    };

    const { error } = await supabase
      .from("posts")
      .insert([data]); // Pass data as an array

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
