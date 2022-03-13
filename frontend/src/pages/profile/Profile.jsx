import "./profile.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// components imports
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  // created the new profileRightTop design for the profile page
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/users/${id}`);
        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getUser();
  }, [id]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? user.coverPicture
                    : "/assets/person/noCover.png"
                }
                alt="cover"
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "/assets/person/noAvatar.png"
                }
                alt="profile"
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <span className="profileName">{user.username}</span>
              <span className="profileDesc">Hey all, how's it going</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userId={id} />
            <Rightbar user={user} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
}
