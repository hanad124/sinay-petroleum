import "./singleEmployee.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const SingleEmployee = () => {
  return (
    <div className="singleEmployee">
      <Sidebar />
      <div className="singleEmployeeContainer">
        <Navbar />
        <div className="">SINGLE EMPLOYEE</div>
      </div>
    </div>
  );
};

export default SingleEmployee;
