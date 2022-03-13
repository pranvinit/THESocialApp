import "./share.css";
import autosize from "autosize";
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";

// mui-icons imports
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";

// context imports
import { AuthContext } from "../../context/AuthContext";

export default function Share() {
  const { user } = useContext(AuthContext);
  const shareTextArea = useRef(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    autosize(shareTextArea.current);
  }, []);

  const handleSubmit = async () => {
    const newPost = {
      user: user._id,
      description: shareTextArea.current.value,
    };

    try {
      await axios.post(`/posts`, newPost);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : "/assets/person/noAvatar.png"
            }
            alt="share"
            className="shareProfileImg"
          />
          <textarea
            type="text"
            name="shareText"
            ref={shareTextArea}
            className="shareTextArea"
            placeholder="What's in your mind Pranav?"
            rows={1}
          ></textarea>
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="fileInput" className="shareOption">
              <PermMedia className="shareIcon" htmlColor="tomato" />
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <span className="shareLabel">Image/Video</span>
            </label>
            <div className="shareOption">
              <Label className="shareIcon" htmlColor="blue" />
              <span className="shareLabel">Tag</span>
            </div>
            <div className="shareOption">
              <Room className="shareIcon" htmlColor="green" />
              <span className="shareLabel">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions className="shareIcon" htmlColor="goldenrod" />
              <span className="shareLabel">Feelings</span>
            </div>
          </div>
          <button className="shareButton" onClick={handleSubmit}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
