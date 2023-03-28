import "./editCustomer.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import CustomerContext from "../../context/CustomerContext";
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

const customerID = JSON.parse(localStorage.getItem("customerID"));

const EditCustomer = () => {
  const navigate = useNavigate();
  const { customerId, SetCustomerId } = useContext(CustomerContext);
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
      const docRef = doc(db, "customers", customerId);
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
      await setDoc(doc(db, "customers", customerID), {
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
    <div className="editCustomers">
      <Sidebar />
      <div className="editCustomersContainer">
        <Navbar />
        <div className="wrapper">
          <div className="title">Update Customer</div>
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

export default EditCustomer;
