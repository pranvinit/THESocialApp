import "./share.css";
import autosize from "autosize";
import { useEffect, useRef } from "react";

// mui-icons imports
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";

export default function Share() {
  const shareTextArea = useRef(null);

  useEffect(() => {
    autosize(shareTextArea.current);
  }, []);

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src="/assets/person/1.jpeg"
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
            <div className="shareOption">
              <PermMedia className="shareIcon" htmlColor="tomato" />
              <span className="shareLabel">Image/Video</span>
            </div>
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
          <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}
