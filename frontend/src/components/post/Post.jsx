import "./post.css";

// mui-icons imports
import { MoreVert } from "@mui/icons-material";

export default function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src="/assets/person/1.jpeg"
              alt="profile"
              className="postProfileImg"
            />
            <span className="postUsername">John smilga</span>
            <span className="postDate">5 mins ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="moreVert" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            Hey i am john and it is my first post
          </span>
          <img src="/assets/post/1.jpeg" alt="post" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="assets/like.png" alt="like" className="likeIcon" />
            <img src="assets/heart.png" alt="heart" className="likeIcon" />
            <span className="postLikeCounter">93 people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentLabel">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
