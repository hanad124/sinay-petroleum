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
  // active sidebar hooks
  const [dashboardActive, setActiveDashboard] = useState(false);
  const [employeeActive, setActiveEmployee] = useState(false);
  const [supplierActive, setActiveSupplier] = useState(false);
  const [fuelActive, setActiveFuel] = useState(false);
  const [PurchaseActive, setActivePurchase] = useState(false);
  const [customerActive, setActiveCustomer] = useState(false);
  const [salesActive, setActiveSales] = useState(false);
  const [usersActive, setActiveUsers] = useState(false);

  const roll = JSON.parse(localStorage.getItem("roll"));

  useEffect(() => {
    if (roll == "user") {
      setAccess(false);
    } else {
      setAccess(true);
    }
  }, []);

useEffect(() => {
  setActiveDashboard(true);
},[])

  return (
    <div className="sidebar">
      <Link to="/">
        <div className="title">sinay petroleum</div>
      </Link>
      <div className="seprator"></div>
      <ul className="list">
          <li className={`${dashboardActive ? "active" : ""}`} onClick={() => {
            setActiveDashboard(true);
            setActiveEmployee(false);
            setActiveSupplier(false);
            setActiveFuel(false);
            setActivePurchase(false);
            setActiveCustomer(false);
            setActiveSales(false);
            setActiveUsers(false);
          }}> 
            <Link to="/">
            <DashboardIcon className="icon" />
            <span>Dashaord</span>
          </Link>
          </li>
          <li className={`${employeeActive ? "active" : ""}`} onClick={() => {
            setActiveDashboard(false);
            setActiveEmployee(true);
            setActiveSupplier(false);
            setActiveFuel(false);
            setActivePurchase(false);
            setActiveCustomer(false);
            setActiveSales(false);
            setActiveUsers(false);
          }}>
            <Link to="/employees" className={`${access ? "" : "hideItem"}`}>
            <PersonOutlineOutlinedIcon className="icon" />
            <span>Employee</span> </Link>
          </li>
          <li className={`${supplierActive ? "active" : ""}`} onClick={() => {
            setActiveDashboard(false);
            setActiveEmployee(false);
            setActiveSupplier(true);
            setActiveFuel(false);
            setActivePurchase(false);
            setActiveCustomer(false);
            setActiveSales(false);
            setActiveUsers(false);
          }}><Link to="/supplier">
            <PersonPinOutlinedIcon className="icon" />
            <span>Supplier</span></Link>
          </li>
          <li className={`${fuelActive ? "active" : ""}`} onClick={() => {
            setActiveDashboard(false);
            setActiveEmployee(false);
            setActiveSupplier(false);
            setActiveFuel(true);
            setActivePurchase(false);
            setActiveCustomer(false);
            setActiveSales(false);
            setActiveUsers(false);
          }}><Link to="/fuel">
            <LocalGasStationOutlinedIcon className="icon" />
            <span>Fuel</span></Link>
          </li>
          <li className={`${PurchaseActive ? "active" : ""}`} onClick={() => {
            setActiveDashboard(false);
            setActiveEmployee(false);
            setActiveSupplier(false);
            setActiveFuel(false);
            setActivePurchase(true);
            setActiveCustomer(false);
            setActiveSales(false);
            setActiveUsers(false);
          }}><Link to="/purchase">
            <ShoppingBasketOutlinedIcon className="icon" />
            <span>Purchase</span> </Link>
          </li>
          <li  className={`${customerActive ? "active" : ""}`} onClick={() => {
            setActiveDashboard(false);
            setActiveEmployee(false);
            setActiveSupplier(false);
            setActiveFuel(false);
            setActivePurchase(false);
            setActiveCustomer(true);
            setActiveSales(false);
            setActiveUsers(false);
          }}> <Link to="/customer">
            <SupportAgentOutlinedIcon className="icon" />
            <span>Customer</span></Link>
          </li>
          <li  className={`${salesActive ? "active" : ""}`} onClick={() => {
            setActiveDashboard(false);
            setActiveEmployee(false);
            setActiveSupplier(false);
            setActiveFuel(false);
            setActivePurchase(false);
            setActiveCustomer(false);
            setActiveSales(true);
            setActiveUsers(false);
          }}><Link to="/sales">
            <MonetizationOnOutlinedIcon className="icon" />
            <span>Sales</span></Link>
          </li>
          <li  className={`${usersActive ? "active" : ""}`} onClick={() => {
            setActiveDashboard(false);
            setActiveEmployee(false);
            setActiveSupplier(false);
            setActiveFuel(false);
            setActivePurchase(false);
            setActiveCustomer(false);
            setActiveSales(false);
            setActiveUsers(true);
          }}> <Link to="/users" className={`${access ? "" : "hideItem"}`}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Users</span></Link>
          </li>
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
          <KeyboardArrowDownOutlinedIcon
            className={`"icon arrow " ${showReports ? "rotate" : ""}`}
          />
          {/* {showReports ? (
            <KeyboardArrowDownOutlinedIcon className="icon arrow" />
          ) : ( */}
          {/* )} */}
        </li>
        <Link to="/purchaseReport">
          <li className={`sub_rep ${showReports ? "show-sub_rep" : ""}`}>
            <SummarizeOutlinedIcon className="icon" />
            <span>Purchase report</span>
          </li>
        </Link>
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
