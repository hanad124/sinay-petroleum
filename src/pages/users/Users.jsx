import "./users.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import EditUserContext from "../../context/EditUserContext";
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
    field: "username",
    headerName: "User",
    width: 220,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  // {
  //   field: "lastName",
  //   headerName: "Last Name",
  //   width: 100,
  // },
  // {
  //   field: "userName",
  //   headerName: "User Name",
  //   width: 100,
  // },
  // {
  //   field: "pass",
  //   headerName: "Age",
  //   width: 80,
  // },
  {
    field: "email",
    headerName: "Email",
    width: 180,
  },

  {
    field: "address",
    headerName: "Address",
    width: 210,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 140,
  },

  {
    field: "roll",
    headerName: "Roll type",
    width: 90,
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

const Users = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { editUser, setEditUser } = useContext(EditUserContext);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
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
    localStorage.setItem("userID", JSON.stringify(id));
  };

  const editUserBtn = (id) => {
    localStorage.setItem("userID", JSON.stringify(id));
    // navigate("/users/edit-user");
    setEditUser(id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
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
            <Link to="/users/single-user" style={{ textDecoration: "none" }}>
              <div
                className="viewButton"
                onClick={() => clickUser(params.row.id)}
              >
                View
              </div>
            </Link>
            <Link to="/users/edit-user">
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
    <div className="users">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Users
            <div
              className="link"
              onClick={() => {
                navigate("/users/new-user");
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

export default Users;
