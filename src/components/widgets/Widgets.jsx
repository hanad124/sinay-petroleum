import "./widgets.scss";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

const Widget = ({ type }) => {
  // temporary
  let amount = 100;
  const diff = 20;
  let data;

  switch (type) {
    case "employees":
      data = {
        title: "EMPLOYEES",
        amount : 34,
        isMoney: false,
        link: "see all employees",
        icon: (
          <PersonOutlineOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    case "customers":
      data = {
        title: "CUSTOMERS",
        amount : 328,
        isMoney: false,
        link: "see all customers",
        icon: (
          <SupportAgentOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218, 165, 32, 0.2)",
            }}
          />
        ),
      };
      break;

    case "purchase":
      data = {
        title: "PURCHASE",
        amount : 1.2+"k",
        isMoney: true,
        link: "see details",
        icon: (
          <PaidOutlinedIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    case "sales":
      data = {
        title: "SALES",
        amount : 3.6+"k",
        isMoney: true,
        link: "see all net sales",
        icon: (
          <AccountBalanceOutlinedIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2)",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <div className="title">{data.title}</div>
        <div className="counter">
          {data.isMoney && "$"}
          {data.amount}
        </div>
        {/* <div className="link"></div> */}
      </div>

      <div className="right">
        <div className="percentage positive">
          {/* <ExpandLessOutlinedIcon />
          {diff} */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
