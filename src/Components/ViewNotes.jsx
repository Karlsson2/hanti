import { supabase } from "../createClient";
import { useEffect, useState } from "react";

function ViewNotes(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
      getPosts();
    }, []);
  
    async function getPosts() {
      const { data } = await supabase.from("posts").select().eq("location", props.location);
      setPosts(data);
    }
  

    return(
        <div>
            <ul>
                {posts.map((post) => (

                    <li key={post.id}>
                        <p>{post.title}</p>
                        <p>{post.text}</p>
                    </li>
                    ))}
            </ul>
        </div>
    )
}
 export default ViewNotes