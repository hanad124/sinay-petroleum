import "./employee.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EditEmployeeContext from "../../context/EditEmployeeContext";
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
    field: "fullName",
    headerName: "Employee",
    width: 220,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
          {params.row.fullName}
        </div>
      );
    },
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
  },

  {
    field: "address",
    headerName: "Address",
    width: 190,
  },

  {
    field: "gender",
    headerName: "Gender",
    width: 90,
  },

  {
    field: "age",
    headerName: "Age",
    width: 60,
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

const Employee = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { employeeId, SetEmployeeId } = useContext(EditEmployeeContext);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "employees"),
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
    localStorage.setItem("employeeID", JSON.stringify(id));
  };

  const editUserBtn = (id) => {
    localStorage.setItem("employeeID", JSON.stringify(id));
    // navigate("/users/edit-user");
    SetEmployeeId(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "employees", id));
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
            <Link to="/employees/edit-employee">
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
    <div className="employees">
      <Sidebar />
      <div className="employeesContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Employees
            <div
              className="link"
              onClick={() => {
                navigate("/employees/new-employee");
                localStorage.removeItem("userID");
                setEditUser("");
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

export default Employee;
