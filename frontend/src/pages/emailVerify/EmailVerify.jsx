import "./emailVerify.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

export default function EmailVerify() {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.post("/auth/verify-email", {
          verificationToken: token,
          email,
        });
        setVerificationStatus(true);
      } catch (err) {
        console.log(err);
        setError(err.response.data);
      }
    };
    verify();
  }, []);

  if (!verificationStatus) {
    return (
      <div className="notVerified">
        <div className="emailVerifyBox">
          <span className="notVerifiedText">
            {error ? error.msg : "Verifying Email"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="emailVerify">
      <div className="emailVerifyBox">
        <span className="emailVerifyText">Email was successfully verified</span>
        <Link className="no-dec" to="/">
          <button className="verifyLoginButton">Go To Home</button>
        </Link>
      </div>
    </div>
  );
}
