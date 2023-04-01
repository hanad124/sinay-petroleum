import "./purchaseReport.scss";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import PurRepView from "../purReportView/PurRepView";
import { useReactToPrint } from "react-to-print";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import * as React from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const userColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "suppName",
    headerName: "Name",
    width: 230,
  },

  {
    field: "suppPhone",
    headerName: "Phone",
    width: 130,
  },
  // {
  //   field: "suppEmail",
  //   headerName: "Email",
  //   width: 150,
  // },
  {
    field: "fuelType",
    headerName: "Fuel",
    width: 100,
  },
  {
    field: "fuelTank",
    headerName: "Tank No.",
    width: 70,
  },
  {
    field: "litter",
    headerName: "Litters",
    width: 60,
  },
  {
    field: "pricePerLitter",
    headerName: "Price/Litter",
    width: 90,
  },
  {
    field: "totalPrice",
    headerName: "Total",
    width: 80,
  },
  {
    field: "perchaseDate",
    headerName: "Date",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

const Purchase = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "purchase"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="purchaseReport">
      <Sidebar />
      <div className="purchaseReportContainer">
        <Navbar />
        <div className="" style={{ display: "none" }}>
          <PurRepView ref={componentRef} />
        </div>
        <div className="datatable">
          <div className="datatableTitle">
            Purchase Report
            <div className="link" onClick={handlePrint}>
              <LocalPrintshopOutlinedIcon className="print-icon" />
              Print Report
            </div>
          </div>
          <DataGrid
            className="datagrid"
            rows={data}
            columns={userColumns}
            pageSize={5}
            rowsPerPageOptions={[9]}
            // checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Purchase;
