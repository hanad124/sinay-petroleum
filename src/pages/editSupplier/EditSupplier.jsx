import "./editSupplier.scss";
import noImage from "../../assets/no-pictures.png";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SupplierContext from "../../context/SupplierContext";

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

const EditEmployee = () => {
  const { supplierId, SetSupplierId } = useContext(SupplierContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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
    const fetchData = async () => {
      const docRef = doc(db, "suppliers", supplierId);
      const docSnap = await getDoc(docRef);

      const userfullName = docSnap.data().fullName;
      const userAddress = docSnap.data().address;
      const userPhone = docSnap.data().phone;
      const userEmail = docSnap.data().email;

      setFullName(userfullName);
      setEmail(userEmail);
      setPhone(userPhone);
      setAddress(userAddress);
    };
    fetchData();
  }, []);



  const handleUpdate = async () => {
    try {
      await setDoc(doc(db, "suppliers", supplierId), {
        fullName: fullName,
        phone: phone,
        address: address,
        email: email,
        time: dayDate + "/" + months[monthDate] + "/" + yearDate,
      });
      alert("data has updated sucessfully!");
      navigate(-1);
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
            <div className="wrapper-cols-1"></div>
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
            </div>
            <div className="wrapper-cols-3">
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
          <button className="btn-save" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
