// pages imports
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./components/login/Login";
import Register from "./components/register/register";

import { useEffect, useContext } from "react";

// context imports
import { AuthContext } from "./context/AuthContext";

// auth services imports
import { getCurrentUser } from "./context/AuthService";

// react-router imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    getCurrentUser(dispatch);
  }, []);

  console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
