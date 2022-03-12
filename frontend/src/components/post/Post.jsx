import "./post.css";
import { useState } from "react";

// mui-icons imports
import { MoreVert } from "@mui/icons-material";

// dummy data imports
import { Users } from "../../dummyData";

export default function Post({ post }) {
  const postUser = Users.find((u) => u.id === post.userId);

  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes(!isLiked ? likes + 1 : likes - 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={`/assets/${postUser.profilePicture}`}
              alt="profile"
              className="postProfileImg"
            />
            <span className="postUsername">{postUser.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="moreVert" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img src={`/assets/${post.photo}`} alt="post" className="postImg" />
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
