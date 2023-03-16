import "./navbar.scss";
import avatar from "../../assets/avator.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const showaccount = () => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };

  const roll = JSON.parse(localStorage.getItem("roll"));
  const name = JSON.parse(localStorage.getItem("username"));
  const image = JSON.parse(localStorage.getItem("image"));
  const accountID = JSON.parse(localStorage.getItem("accountID"));

  const AccountClick = () => {
    localStorage.setItem("userID", JSON.stringify(accountID));
    navigate("/users/single-user");
  };

  const handleLogout = () => {
    navigate("login");
    localStorage.removeItem("user");
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="search..." />
          <SearchOutlinedIcon className="icon" />
        </div>
        <div className="items">
          <div className="item">
            <div className="account">
              <div className="roll">{roll}</div>
              <div className="name">{name}</div>
            </div>
            <img
              src={image}
              alt=""
              className={`avatar ${clicked ? "active" : ""}`}
              onClick={showaccount}
            />
            <div className={`account_popup ${clicked ? "show" : ""}`}>
              <div className="userAccount" onClick={AccountClick}>
                <AccountCircleOutlinedIcon className=" icon sitting-icon" />
                <p>Account</p>
              </div>
              <div className="logout" onClick={handleLogout}>
                <LogoutOutlinedIcon className="icon logout-icon" />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
