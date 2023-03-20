import { useEffect, useState, useContext } from "react";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Employee from "./pages/employee/Employee";
import Supplier from "./pages/supplier/Supplier";
import Fuel from "./pages/fuel/Fuel";
import Purchase from "./pages/purchase/Purchase";
import Customer from "./pages/customer/Customer";
import Sales from "./pages/sales/Sales";
import Users from "./pages/users/Users";
import SinglEmployee from "./pages/singleEmployee/SingleEmployee";
import NewEmployee from "./pages/newEmployee/NewEmployee";
import NewUser from "./pages/newUser/NewUser";
import EditUser from "./pages/editUser/EditUser";
import EditEmployee from "./pages/editEmployee/EditEmployee";
import SingleUser from "./pages/singleUser/SingleUser";
import NewSupplier from "./pages/newSupplier/NewSupplier";
import EditSupplier from "./pages/editSupplier/EditSupplier";
import NewFuel from "./pages/newFuel/NewFuel";
import EditFuel from "./pages/editFuel/EditFuel";
import NewPurchase from "./pages/newPurchase/NewPurchase";
import EditPurchase from "./pages/editPurchase/EditPurchase";

import EditUserContext from "./context/EditUserContext";
import EditEmployeeContext from "./context/EditEmployeeContext";
import SupplierContext from "./context/SupplierContext";
import FuelContext from "./context/FuelContext";
import PurchaseContext from "./context/PurchaseContext";
import { AuthContext } from "./context/AuthContext";

import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const [editUser, setEditUser] = useState([]);
  const [employeeId, SetEmployeeId] = useState([]);
  const [supplierId, SetSupplierId] = useState([]);
  const [fuelId, SetFuelId] = useState([]);
  const [purchaseId, SetPurchaseId] = useState([]);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <EditUserContext.Provider value={{ editUser, setEditUser }}>
          <EditEmployeeContext.Provider value={{ employeeId, SetEmployeeId }}>
            <SupplierContext.Provider value={{ supplierId, SetSupplierId }}>
              <FuelContext.Provider value={{ fuelId, SetFuelId }}>
                <PurchaseContext.Provider value={{ purchaseId, SetPurchaseId }}>
                  <Routes>
                    <Route path="/">
                      <Route path="login" element={<Login />} />
                      <Route
                        index
                        element={
                          <RequireAuth>
                            <Home />
                          </RequireAuth>
                        }
                      />
                      <Route path="/employees">
                        <Route
                          index
                          element={
                            <RequireAuth>
                              <Employee />
                            </RequireAuth>
                          }
                        />
                      </Route>
                      <Route
                        path="/employees/single-employee"
                        element={
                          <RequireAuth>
                            <SinglEmployee />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/employees/new-employee"
                        element={
                          <RequireAuth>
                            <NewEmployee />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/employees/edit-employee"
                        element={
                          <RequireAuth>
                            <EditEmployee />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/supplier"
                        element={
                          <RequireAuth>
                            <Supplier />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/supplier/new-supplier"
                        element={
                          <RequireAuth>
                            <NewSupplier />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/supplier/edit-supplier"
                        element={
                          <RequireAuth>
                            <EditSupplier />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/fuel"
                        element={
                          <RequireAuth>
                            <Fuel />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/fuel/new-fuel"
                        element={
                          <RequireAuth>
                            <NewFuel />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/fuel/edit-fuel"
                        element={
                          <RequireAuth>
                            <EditFuel />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/purchase"
                        element={
                          <RequireAuth>
                            <Purchase />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/purchase/edit-purchase"
                        element={
                          <RequireAuth>
                            <EditPurchase />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/purchase/new-purchase"
                        element={
                          <RequireAuth>
                            <NewPurchase />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/customer"
                        element={
                          <RequireAuth>
                            <Customer />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/sales"
                        element={
                          <RequireAuth>
                            <Sales />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/users"
                        element={
                          <RequireAuth>
                            <Users />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/users/new-user"
                        element={
                          <RequireAuth>
                            <NewUser />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/users/edit-user"
                        element={
                          <RequireAuth>
                            <EditUser />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="/users/single-user"
                        element={
                          <RequireAuth>
                            <SingleUser />
                          </RequireAuth>
                        }
                      />
                    </Route>
                  </Routes>
                </PurchaseContext.Provider>
              </FuelContext.Provider>
            </SupplierContext.Provider>
          </EditEmployeeContext.Provider>
        </EditUserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
