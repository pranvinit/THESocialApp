import "./feed.css";
import { useEffect, useState } from "react";
import axios from "axios";

// components imports
import Share from "../share/Share";
import Post from "../post/Post";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getTimelinePosts = async () => {
      try {
        const posts = await axios.get("/posts/timeline");
        setPosts(posts.data.posts);
      } catch (err) {
        console.log(err);
      }
    };
    getTimelinePosts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
