

async function getPosts() {
    const { data } = await supabase.from("posts").select();
    setPosts(data);
}
async function CreatePost() {
    const { data } = await supabase.from("posts").select();
}