import "./supplier.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Supplier = () => {
  return <div className="supplier">
    <Sidebar />
    <div className="supplierContainer">
      <Navbar />
      <div className="">SUPPLIER</div>
    </div>
  </div>;
};

export default Supplier;
