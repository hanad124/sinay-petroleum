import "./newUser.scss";
import noImage from "../../assets/no-pictures.png";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import EditUserContext from "../../context/EditUserContext";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  getDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const NewUser = () => {
  const { editUser, setEditUser } = useContext(EditUserContext);
  const [file, setFile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roll, setRoll] = useState("user");
  const [username, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [per, setPer] = useState(null);
  const navigate = useNavigate();

  const date = new Date();

  const dayDate = date.getDate();
  const monthDate = date.getMonth() + 1;
  const yearDate = date.getFullYear();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleAdd = async () => {
    try {
      // const res = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        roll: roll,
        phone: phone,
        address: address,
        username: username,
        email: email,
        password: password,
        image: image,
        time: dayDate + "/" + months[monthDate] + "/" + yearDate,
      });
      alert("data has added sucessfully!");
      navigate("/users");
    } catch (error) {
      console.log(error);
      alert("something wrong!");
    }
  };

  const HidePassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <div className="newUser">
      <Sidebar />
      <div className="newUserContainer">
        <Navbar />
        <div className="wrapper">
          <div className="title">Add New User</div>
          <div className="wrapper-cols">
            <div className="wrapper-cols-1">
              <div className="image">
                <div className="icon">
                  <ModeEditOutlinedIcon className="edit-icon" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    style={{ cursor: "pointer" }}
                    // value={image}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <img
                  src={file ? URL.createObjectURL(file) : noImage}
                  alt=""
                  className="user-img"
                />
              </div>
            </div>
            <div className="wrapper-cols-2">
              <p className="roll">Roll type</p>
              <select
                name="roll-type"
                id="roll_type"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <p className="phone">Phone</p>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="address">address</p>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="wrapper-cols-3">
              <p className="userName">Username</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <p className="email">Email</p>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <p className="password">Password</p>
              <div className="pswd-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <RemoveRedEyeOutlinedIcon
                    className="eye"
                    style={{
                      cursor: "pointer",
                      color: "gray",
                      marginRight: ".5rem",
                    }}
                    onClick={() => {
                      HidePassword();
                    }}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    className="eye"
                    style={{
                      cursor: "pointer",
                      color: "gray",
                      marginRight: ".5rem",
                    }}
                    onClick={() => {
                      HidePassword();
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <button
            disabled={per !== null && per < 100}
            className="btn-save"
            onClick={handleAdd}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
