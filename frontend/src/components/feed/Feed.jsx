import "./feed.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

// components imports
import Share from "../share/Share";
import Post from "../post/Post";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ userId }) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getTimelinePosts = async () => {
      try {
        const posts = userId
          ? await axios.get(`/posts/profile/${userId}`)
          : await axios.get("/posts/timeline");
        setPosts(posts.data.posts);
      } catch (err) {
        console.log(err);
      }
    };
    getTimelinePosts();
  }, [userId]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!userId || user._id === userId) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
