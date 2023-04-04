import "./home.scss";
import { json, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widgets/Widgets";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

function Home() {
  const [show, setShow] = useState(true);

  const username = JSON.parse(localStorage.getItem("username"));
  const myInterval = setInterval(myTimer, 5000);

  function myTimer() {
    setShow(false);
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {show ? (
          <div className="greating">
            <p>
              👋 welcome back,{" "}
              <span style={{ fontWeight: "bold" }}>{username}</span>
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="widgets">
          <Widget type="employees" />
          <Widget type="customers" />
          <Widget type="purchase" />
          <Widget type="sales" />
        </div>
        <div className="charts">
          <Featured />
          <Chart />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transections</div>
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Home;
