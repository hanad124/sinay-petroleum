import "./singleUser.scss";
import sampleImg from "../../assets/sample-img.jpg";
import peroloader from "../../assets/preloader.gif";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const NewUser = () => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [password, setpassword] = useState("");
  const [roll, setRoll] = useState("");
  const [jionDate, setJionDate] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = JSON.parse(localStorage.getItem("userID"));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());
      const userImg = docSnap.data().image;
      const userName = docSnap.data().username;
      const userAddress = docSnap.data().address;
      const userID = userId;
      const userPhone = docSnap.data().phone;
      const userEmail = docSnap.data().email;
      const userPassword = docSnap.data().password;
      const userRoll = docSnap.data().roll;
      const userJionDate = docSnap.data().time;

      setPicture(userImg);
      setName(userName);
      setAddress(userAddress);
      setpassword(userPassword);
      setRoll(userRoll);
      setJionDate(userJionDate);
      setPhone(userPhone);
      setEmail(userEmail);
      setId(userID);

      setLoading(false);
    };
    fetchData();
  }, []);
  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <img src={peroloader} alt="preloader" className="preloader" />
    );
  }
  return (
    <div className="newUser">
      <Sidebar />
      <div className="newUserContainer">
        <Navbar />
        <div className="wrapper">
          <div className="back-btn" onClick={handleBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              className="back-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Back
          </div>
          <div className="wrapper-cols">
            <div className="wrapper-cols-1">
              <img src={picture} alt="" className="userPicture" />
              <div className="userName">
                <div className="name">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 userIcon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <p>{name}</p>
                </div>
                <div className="location">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 locationIcon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>

                  <p>{address}</p>
                </div>
              </div>
            </div>
            <div className="wrapper-cols-col2">
              <div className="wrapper-cols-col2_one">
                <p className="id">
                  ID: <span>{id}</span>
                </p>
                <p className="userphone">
                  Phone: <span>{phone}</span>
                </p>
                <p className="useremail">
                  Email: <span>{email}</span>
                </p>
              </div>
              <div className="wrapper-cols-col2_two">
                <p className="userpassword">
                  password: <span>{password.replace(/./g, "*")}</span>
                </p>
                <p className="userroll">
                  Roll: <span>{roll}</span>
                </p>
                <p className="jionDate">
                  Jioin Date: <span>{jionDate}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
