import "./purchase.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Purchase = () => {
  return (
    <div className="purchase">
      <Sidebar />
      <div className="purchaseContainer">
        <Navbar />
        <div className="">PURCHASE</div>
      </div>
    </div>
  );
};

export default Purchase;
