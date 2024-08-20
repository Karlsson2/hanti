import "./App.css";
import React, { useState, useEffect } from "react";
import { supabase } from "./createClient";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const { data } = await supabase.from("posts").select();
    setPosts(data);
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.text}>{post.text}</li>
      ))}
    </ul>
  );
}

export default App;
