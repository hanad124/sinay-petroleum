import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [showReports, setShowReports] = useState(false);
  const [access, setAccess] = useState(false);
  const [clicked, setClicked] = useState(false);

  const roll = JSON.parse(localStorage.getItem("roll"));

  useEffect(() => {
    if (roll == "user") {
      setAccess(false);
    } else {
      setAccess(true);
    }
  }, []);

  const sideBarClick = () => {
    setClicked(true);
    console.log(clicked);
  };

  return (
    <div className="sidebar">
      <Link to="/">
        <div className="title">sinay petroleum</div>
      </Link>
      <div className="seprator"></div>
      <ul className="list">
        <Link to="/">
          <li onClick={sideBarClick} className={`${clicked ? "active" : ""}`}>
            <DashboardIcon className="icon" />
            <span>Dashaord</span>
          </li>
        </Link>
        <Link to="/employees" className={`${access ? "" : "hideItem"}`}>
          <li onClick={sideBarClick} className={`${clicked ? "active" : ""}`}>
            <PersonOutlineOutlinedIcon className="icon" />
            <span>Employee</span>
          </li>
        </Link>
        <Link to="/supplier">
          <li onClick={sideBarClick}>
            <PersonPinOutlinedIcon className="icon" />
            <span>Supplier</span>
          </li>
        </Link>
        <Link to="/fuel">
          <li onClick={sideBarClick}>
            <LocalGasStationOutlinedIcon className="icon" />
            <span>Fuel</span>
          </li>
        </Link>
        <Link to="/purchase">
          <li onClick={sideBarClick}>
            <ShoppingBasketOutlinedIcon className="icon" />
            <span>Purchase</span>
          </li>
        </Link>
        <Link to="/customer">
          <li onClick={sideBarClick}>
            <SupportAgentOutlinedIcon className="icon" />
            <span>Customer</span>
          </li>
        </Link>
        <Link to="/sales">
          <li onClick={sideBarClick}>
            <MonetizationOnOutlinedIcon className="icon" />
            <span>Sales</span>
          </li>
        </Link>
        <Link to="/users" className={`${access ? "" : "hideItem"}`}>
          <li onClick={sideBarClick}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Users</span>
          </li>
        </Link>
        <li
          className="reports"
          onClick={() => {
            !showReports ? setShowReports(true) : setShowReports(false);
          }}
        >
          <SummarizeOutlinedIcon className="icon" />
          <div className="main-rep ">
            <span>Reports</span>
          </div>
          {showReports ? (
            <KeyboardArrowDownOutlinedIcon className="icon arrow" />
          ) : (
            <KeyboardArrowUpOutlinedIcon className="icon arrow" />
          )}
        </li>
        <li className={`sub_rep ${showReports ? "show-sub_rep" : ""}`}>
          <SummarizeOutlinedIcon className="icon" />
          <span>Purchase report</span>
        </li>
        <li className={`sub_rep ${showReports ? "show-sub_rep" : ""}`}>
          <SummarizeOutlinedIcon className="icon" />
          <span>Sales report</span>
        </li>
        <Link to="/login">
          <li
            onClick={() => {
              localStorage.removeItem("user");
            }}
          >
            <LogoutOutlinedIcon className="icon" />
            <span>Log Out</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
