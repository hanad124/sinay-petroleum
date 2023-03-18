import "./purchase.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FuelContext from "../../context/FuelContext";
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
    field: "fuelType",
    headerName: "Fuel Type",
    width: 230,
  },

  {
    field: "tankNumber",
    headerName: "Tank Number",
    width: 150,
  },
  {
    field: "capacity",
    headerName: "Capacity",
    width: 190,
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

const Purchase = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { fuelId, SetFuelId } = useContext(FuelContext);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "fuel"),
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

  const clickUser = (id) => {
    localStorage.setItem("fuelID", JSON.stringify(id));
  };

  const editUserBtn = (id) => {
    localStorage.setItem("fuelID", JSON.stringify(id));
    SetFuelId(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "fuel", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="" style={{ textDecoration: "none" }}>
              <div className="viewButton" onClick={() => ""}>
                View
              </div>
            </Link>
            <Link to="/fuel/edit-fuel">
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
  return (
    <div className="purchase">
      <Sidebar />
      <div className="purchaseContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Purchase
            <div
              className="link"
              onClick={() => {
                navigate("/purchase/new-purchase");
                // localStorage.removeItem("userID");
                // setEditUser("");
              }}
            >
              Add New
            </div>
          </div>
          <DataGrid
            className="datagrid"
            rows={data}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            // checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Purchase;
