import "./share.css";
import autosize from "autosize";
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";

// mui-icons imports
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";

// context imports
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";

export default function Share() {
  const { user } = useContext(AuthContext);
  const shareTextArea = useRef(null);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    autosize(shareTextArea.current);
  }, []);

  const handleSubmit = async () => {
    if (!shareTextArea.current.value) return;
    setLoading(true);
    try {
      const body = {
        user: user._id,
        description: shareTextArea.current.value,
      };
      if (file) {
        const data = new FormData();
        data.append("image", file);
        const imgUrl = await axios.post("/uploads", data);
        body.image = imgUrl.data.image;
      }
      await axios.post("/posts", body);
      setFile(null);
      shareTextArea.current.value = "";
      setLoading(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <form className="shareTop">
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
            placeholder={`What's in your mind ${user.username}?`}
            rows={1}
          ></textarea>
        </form>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img
              className="shareImg"
              src={URL.createObjectURL(file)}
              alt="share"
            />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
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
            {!loading ? (
              "Share"
            ) : (
              <CircularProgress size={20} className="loadingIndicator" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
