import "./newPurchase.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { async } from "@firebase/util";

const NewPurchase = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState([]);
  const [data, setData] = useState([]);
  const [suppName, setSuppName] = useState("");
  const [suppPhone, setSuppPhone] = useState("");
  const [suppEmail, setSuppEmail] = useState("");
  const [fuelTank, setFuelTank] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [litter, setLitter] = useState("");
  const [pricePerLitter, setPricePerLitter] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const date = new Date();

  const dayDate = date.getDate();
  const monthDate = date.getMonth() + 1;
  const yearDate = date.getFullYear();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "suppliers"),
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

  const handleAdd = async () => {
    await addDoc(collection(db, "purchase"), {
      suppName: suppName,
      suppPhone: suppPhone,
      suppEmail: suppEmail,
      fuelTank: fuelTank,
      fuelType: fuelType,
      litter: litter,
      pricePerLitter: pricePerLitter,
      totalPrice: totalPrice,
      time: dayDate + "/" + months[monthDate] + "/" + yearDate,
    });

    alert("data has added sucessfully!");
    navigate(-1);
  };

  return (
    <div className="newPurchase">
      <Sidebar />
      <div className="newPurchaseContainer">
        <Navbar />
        <div className="wrapper">
          <div className="title">Add New Purchase</div>
          <div className="wrapper-cols">
            {/* <div className="wrapper-cols-1"></div> */}
            <div className="wrapper-cols-2">
              <p className="fullName">Supplier Name</p>
              <select
                name="supp-name"
                className="supp_name"
                // value={store.supname}
                onChange={(e) => {
                  setSuppName(e.target.value);
                  console.log(e.target.value);
                  {
                    data.map((el) => {
                      setStore({ ...store, id: el.id, supname: el.fullName });
                      // console.log(store);
                    });
                  }
                }}
              >
                {data.map((el) => {
                  return <option value={el.id}>{el.fullName}</option>;
                })}
              </select>
              <p className="phone">Supplier Phone</p>
              <input
                type="text"
                // value=""
                onChange={(e) => setSuppPhone(e.target.value)}
              />
              <p className="phone">Supplier Email</p>
              <input
                type="text"
                // value=""
                onChange={(e) => setSuppEmail(e.target.value)}
              />
              <p className="address">Fuel Tank</p>
              <select
                name="fuel-tank"
                className="fuel_tank"
                onChange={(e) => setFuelTank(e.target.value)}
              >
                {/* <option value="Gasoline">Gasoline</option> */}
              </select>
            </div>
            <div className="wrapper-cols-3">
              <p className="address">Fuel Type</p>
              <input
                type="text"
                // value=""
                onChange={(e) => setFuelType(e.target.value)}
              />
              <p className="address">Litters</p>
              <input
                type="text"
                // value=""
                onChange={(e) => setLitter(e.target.value)}
              />
              <p className="address">Price per litter</p>
              <input
                type="text"
                // value=""
                onChange={(e) => setPricePerLitter(e.target.value)}
              />
              <p className="address">Total price</p>
              <input
                type="text"
                // value=""
                onChange={(e) => setTotalPrice(e.target.value)}
              />
            </div>
            <div className="wrapper-cols-4">
              <input
                type="date"
                className="purch_date"
                // value=""
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
          </div>
          <button className="btn-save" onClick={handleAdd}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPurchase;
