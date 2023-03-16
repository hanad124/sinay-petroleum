import "./editEmployee.scss";
import noImage from "../../assets/no-pictures.png";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import EditEmployeeContext from "../../context/EditEmployeeContext";

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

const EditEmployee = () => {
  const { employeeId, SetEmployeeId } = useContext(EditEmployeeContext);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("male");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [per, setPer] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "employees", employeeId);
      const docSnap = await getDoc(docRef);

      const userImg = docSnap.data().image;
      const userfullName = docSnap.data().fullName;
      const userAddress = docSnap.data().address;
      const userPhone = docSnap.data().phone;
      const userEmail = docSnap.data().email;
      const usergender = docSnap.data().gender;
      const userAge = docSnap.data().age;

      setFullName(userfullName);
      setEmail(userEmail);
      setPhone(userPhone);
      setAge(userAge);
      setAddress(userAddress);
      setGender(usergender);
      setImage(userImg);
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      // const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "employees", employeeId), {
        fullName: fullName,
        phone: phone,
        gender: gender,
        image: image,
        age: age,
        address: address,
        email: email,
        time: dayDate + "/" + months[monthDate] + "/" + yearDate,
      });
      alert("data has updated sucessfully!");
      navigate("/employees");
    } catch (error) {
      console.log(error);
      alert("something wrong!");
    }
  };

  return (
    <div className="editEmployee">
      <Sidebar />
      <div className="editEmployeeContainer">
        <Navbar />
        <div className="wrapper">
          <div className="title">Update Employee</div>
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
              <p className="fullName">Full name</p>
              <input
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
              <p className="phone">Phone</p>
              <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              <p className="gender">Gender</p>
              <select
                name="gender-type"
                className="gender_type"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="wrapper-cols-3">
              <p className="age">Age</p>
              <input
                type="text"
                className="input_age"
                onChange={(e) => setAge(e.target.value)}
                value={age}
              />
              <p className="address">Address</p>
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              <p className="email">Email</p>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>
          <button
            disabled={per !== null && per < 100}
            className="btn-save"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
