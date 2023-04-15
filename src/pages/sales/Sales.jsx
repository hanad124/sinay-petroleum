import "./sales.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import SalesContext from "../../context/SalesContext";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const userColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "customerName",
    headerName: "Name",
    width: 170,
  },

  {
    field: "customerPhone",
    headerName: "Phone",
    width: 100,
  },
  // {
  //   field: "suppEmail",
  //   headerName: "Email",
  //   width: 150,
  // },
  {
    field: "fuelType",
    headerName: "Fuel",
    width: 70,
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
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

const Sales = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [salesStatus, setSalesStatus] = useState([]);
  // const { salesId, SetSalesId } = useContext(SalesContext);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "sales"),
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

  //FETCH SELLS STATUS
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "sales"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push(doc.data().status);
        });
        setSalesStatus(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const clickUser = (id) => {
    localStorage.setItem("salesID", JSON.stringify(id));
  };

  const editUserBtn = (id) => {
    localStorage.setItem("salesID", JSON.stringify(id));
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "sales", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="" style={{ textDecoration: "none" }}>
              <div className="viewButton" onClick={() => ""}>
                View
              </div>
            </Link> */}
            <Link to="/sales/edit-sales">
              <div
                className="editButton"
                onClick={() => editUserBtn(params.row.id)}
              >
                Edit
              </div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const statusColumn = [
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: () => {
        return (
          <div className="cellAction">
            <div className={`status ${salesStatus}`}>{salesStatus}</div>;
          </div>
        );
      },
    },
  ];

  return (
    <div className="purchase">
      <Sidebar />
      <div className="purchaseContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Sales
            <div
              className="link"
              onClick={() => {
                navigate("/sales/new-sales");
              }}
            >
              Add New
            </div>
          </div>
          <DataGrid
            className="datagrid"
            rows={data}
            columns={userColumns.concat(actionColumn).concat(statusColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            // checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Sales;
