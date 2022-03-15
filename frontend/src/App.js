// pages imports
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import EmailVerify from "./pages/emailVerify/EmailVerify";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Notfound from "./pages/notfound/Notfound";

import { useEffect, useContext } from "react";

// context imports
import { AuthContext } from "./context/AuthContext";

// react-router imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const { user, authorizeUser } = useContext(AuthContext);

  useEffect(() => {
    authorizeUser();
  }, []);

  // `${origin}/auth/verify-email?token=${verificationToken}&email=${email}`
  // `${origin}/auth/reset-password?passwordToken=${verificationToken}&email=${email}`;

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/messenger"
          element={user ? <Messenger /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/verify-email" element={<EmailVerify />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
