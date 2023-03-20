import "./purchase.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import PurchaseContext from "../../context/PurchaseContext";
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
    field: "suppName",
    headerName: "Name",
    width: 170,
  },

  {
    field: "suppPhone",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "suppEmail",
    headerName: "Email",
    width: 150,
  },
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

const Purchase = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { purchaseId, SetPurchaseId } = useContext(PurchaseContext);

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

  const clickUser = (id) => {
    localStorage.setItem("purchaseID", JSON.stringify(id));
  };

  const editUserBtn = (id) => {
    localStorage.setItem("purchaseID", JSON.stringify(id));
    SetPurchaseId(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "purchase", id));
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
            <Link to="/purchase/edit-purchase">
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
