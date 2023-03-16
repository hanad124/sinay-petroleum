import "./fuel.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Fuel = () => {
  return (
    <div className="fuel">
      <Sidebar />
      <div className="fuelContainer">
        <Navbar />
        <div className="">FUEL</div>
      </div>
    </div>
  );
};

export default Fuel;
