import "./customer.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { DataGrid } from "@mui/x-data-grid";
import CustomerContext from "../../context/CustomerContext";
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
    field: "fullName",
    headerName: "Supplier Name",
    width: 230,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 190,
  },

  {
    field: "address",
    headerName: "Address",
    width: 270,
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

const Customer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { customerId, SetCustomerId } = useContext(CustomerContext);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "customers"),
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

  // const clickUser = (id) => {
  //   localStorage.setItem("employeeID", JSON.stringify(id));
  // };

  const editUserBtn = (id) => {
    localStorage.setItem("customerID", JSON.stringify(id));
    SetCustomerId(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "customers", id));
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
            <Link to="/customers/edit-customer">
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
    <div className="customer">
      <Sidebar />
      <div className="customerContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Customers
            <div
              className="link"
              onClick={() => {
                navigate("/customer/new-customer");
                // localStorage.removeItem("userID");
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

export default Customer;
