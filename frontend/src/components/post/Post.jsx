import "./post.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

// timeago imports
import { format } from "timeago.js";

// context imports
import { AuthContext } from "../../context/AuthContext";

// mui-icons imports
import { MoreVert } from "@mui/icons-material";

export default function Post({ post }) {
  const { user } = useContext(AuthContext);
  const [postUser, setPostUser] = useState({});

  useEffect(() => {
    if (!post.user) return;
    const getPostUser = async () => {
      try {
        const user = await axios.get(`/users/${post.user}`);
        setPostUser(user.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getPostUser();
  }, [post.userId]);

  const [likes, setLikes] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));

  const handleLike = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`);
      setLikes(!isLiked ? likes + 1 : likes - 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={
                postUser.profilePicture
                  ? `/assets/${postUser.profilePicture}`
                  : "/assets/person/noAvatar.png"
              }
              alt="profile"
              className="postProfileImg"
            />
            <span className="postUsername">{postUser.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="moreVert" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          {post.image && (
            <img src={`/assets/${post.photo}`} alt="post" className="postImg" />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src="assets/like.png"
              alt="like"
              className="likeIcon"
              onClick={handleLike}
            />
            <img
              src="assets/heart.png"
              alt="heart"
              className="likeIcon"
              onClick={handleLike}
            />
            <span className="postLikeCounter">{likes} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentLabel">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
