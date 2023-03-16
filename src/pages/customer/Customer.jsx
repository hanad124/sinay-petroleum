import "./customer.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Customer = () => {
  return <div className="customer">
    <Sidebar />
    <div className="customerContainer">
      <Navbar />
      <div className="">CUSTOMER</div>
    </div>
  </div>;
};

export default Customer;
