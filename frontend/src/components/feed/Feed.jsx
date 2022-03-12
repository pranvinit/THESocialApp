import "./feed.css";

// components imports
import Share from "../share/Share";

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
      </div>
    </div>
  );
}
