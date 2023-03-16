import "./newEmployee.scss";
import noImage from "../../assets/no-pictures.png";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { async } from "@firebase/util";

const NewEmployee = () => {
  const navigate  = useNavigate();
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

  const handleAdd = async () => {
    await addDoc(collection(db, "employees"), {
      fullName: fullName,
      phone: phone,
      gender: gender,
      image: image,
      age: age,
      address: address,
      email: email,
      time: dayDate + "/" + months[monthDate] + "/" + yearDate,
    });

    alert("data has added sucessfully!");
    navigate(-1);
  };

  return (
    <div className="newEmployee">
      <Sidebar />
      <div className="newEmployeeContainer">
        <Navbar />
        <div className="wrapper">
          <div className="title">Add New Employee</div>
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
              />
              <p className="phone">Phone</p>
              <input type="text" onChange={(e) => setPhone(e.target.value)} />
              <p className="gender">Gender</p>
              <select
                name="gender-type"
                className="gender_type"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="wrapper-cols-3">
              <p className="age">Age</p>
              <input type="text" onChange={(e) => setAge(e.target.value)} />
              <p className="address">Address</p>
              <input type="text" onChange={(e) => setAddress(e.target.value)} />
              <p className="email">Email</p>
              <input type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <button
            className="btn-save"
            onClick={handleAdd}
            disabled={per !== null && per < 100}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEmployee;
