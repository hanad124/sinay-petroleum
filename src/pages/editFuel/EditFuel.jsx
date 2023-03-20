import "./editFuel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FuelContext from "../../context/FuelContext";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  getDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";

const EditFuel = () => {
  const { fuelId, SetFuelId } = useContext(FuelContext);
  const navigate = useNavigate();
  const [tankNumber, setTankNumber] = useState("1");
  const [capacity, setCapacity] = useState("300");
  const [fuelType, setFuelType] = useState("Bazine");

  //CHECK TANK CAPACITY
  useEffect(() => {
    if (tankNumber == "1") {
      setCapacity("300 litters");
    } else if (tankNumber == "2") {
      setCapacity("1,200 litters");
    } else if (tankNumber == "3") {
      setCapacity("500 litters");
    } else if (tankNumber == "4") {
      setCapacity("830 litters");
    } else if (tankNumber == "5") {
      setCapacity("2,100 litters");
    }
  }, [tankNumber]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "fuel", fuelId);
      const docSnap = await getDoc(docRef);

      const fuelTank = docSnap.data().tankNumber;
      const fuelCapacity = docSnap.data().capacity;
      const typeOfFuel = docSnap.data().fuelType;

      setTankNumber(fuelTank);
      setFuelType(typeOfFuel);
      setCapacity(fuelCapacity);
    };
    fetchData();
  }, []);

  console.log(fuelType);

  const handleUpdate = async () => {
    try {
      await setDoc(doc(db, "fuel", fuelId), {
        tankNumber: tankNumber,
        capacity: capacity,
        fuelType: fuelType,
      });
      alert("data has updated sucessfully!");
      navigate(-1);
    } catch (error) {
      console.log(error);
      alert("something wrong!");
    }
  };

  return (
    <div className="editFuel">
      <Sidebar />
      <div className="editFuelContainer">
        <Navbar />
        <div className="wrapper">
          <div className="title">Update Fuel</div>
          <div className="wrapper-cols">
            <div className="wrapper-cols-1"></div>
            <div className="wrapper-cols-2">
              <p className="fullName">Tank Number</p>
              <select
                name="tank-number"
                className="tank_number"
                value={tankNumber}
                onChange={(e) => {
                  setTankNumber(e.target.value);
                  if (tankNumber == "1") {
                    setCapacity("300");
                  } else if (tankNumber == "2") {
                    setCapacity("1200");
                  } else if (tankNumber == "3") {
                    setCapacity("500");
                  }
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <p className="phone">Capacity</p>
              <input
                type="text"
                disabled
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
            <div className="wrapper-cols-3">
              <p className="address">Fuel Type</p>
              <select
                name="fuel-type"
                className="fuel_type"
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
              >
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel Fuel">Diesel Fuel</option>
                <option value="Ethanol">Ethanol</option>
                <option value="Bazine">Bazine</option>
                <option value="Kerosene">Kerosene</option>
              </select>
            </div>
          </div>
          <button className="btn-save" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFuel;
