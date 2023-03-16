import "./sales.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Sales = () => {
  return <div className="sales">
    <Sidebar />
    <div className="salesContainer">
      <Navbar />
      <div className="">SALES</div>
    </div>
  </div>;
};

export default Sales;
