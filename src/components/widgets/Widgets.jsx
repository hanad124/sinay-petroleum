import "./widgets.scss";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const Widget = ({ type }) => {
  const [sales, setSales] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [purchase, setPurchase] = useState(null);

  // temporary
  let data;

  //GET EMPLOYEES LENGTH
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "employees"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setEmployees(list.length);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  //GET CUSTOMERS LENGTH
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "customers"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setCustomers(list.length);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  //GET SALES LENGTH
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "sales"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setSales(list.length);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  //GET PURCHASE LENGTH
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "purchase"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          // list = { id: doc.id, ...doc.data() };
          let sum = 0;
          list.push(doc.data().totalPrice);
          for (let i = 0; i <= list.length; i++) {
            sum += list[i];
            console.log(list[i]);
          }
          // console.log(sum);
        });
        setPurchase(list.length);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  switch (type) {
    case "employees":
      data = {
        title: "EMPLOYEES",
        amount: employees,
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
        amount: customers,
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
        amount: purchase,
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
        amount: sales,
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
