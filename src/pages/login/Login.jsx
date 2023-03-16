import "./login.scss";
import { useState, useContext, useEffect } from "react";
import logo from "../../assets/login-logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        const userEmail = doc.data().email;
        const userPassword = doc.data().password;
        if (email == userEmail && password == userPassword) {
          localStorage.setItem("roll", JSON.stringify(doc.data().roll));
          localStorage.setItem("username", JSON.stringify(doc.data().username));
          localStorage.setItem("image", JSON.stringify(doc.data().image));
          localStorage.setItem("accountID", JSON.stringify(doc.id));
          // localStorage.setItem("user", JSON.stringify(doc.data()));
          const user = doc.data();
          dispatch({ type: "LOGIN", payload: user });
          navigate("/");
        } else {
        }
      });
    };
    fetchData();
  };

  const HidePassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <div className="login">
      <div className="login-cols">
        <div className="login-cols-1">
          <div className="logo">
            <img src={logo} alt="logo" />
            <p>
              sinay <br />
              <span>petroleum</span>
            </p>
          </div>
        </div>
        <div className="login-cols-2">
          <h1>login</h1>
          <form className="form">
            <ToastContainer />
            <p className="name">Email</p>
            <input
              type="email"
              id="txtEmail"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="password">Password</p>
            <div className="passWrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="txtPass"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <RemoveRedEyeOutlinedIcon
                  className="eye"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    HidePassword();
                  }}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  className="eye"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    HidePassword();
                  }}
                />
              )}
            </div>
            <br />
            <button
              className="submit-login"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
