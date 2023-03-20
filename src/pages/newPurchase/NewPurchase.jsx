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
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { async } from "@firebase/util";

const NewPurchase = () => {
  const navigate = useNavigate();
  const [fuelData, setFuelData] = useState([]);
  const [data, setData] = useState([]);
  const [suppName, setSuppName] = useState("");
  const [suppID, setSuppID] = useState("");
  const [fuelID, setFuelID] = useState("");
  const [suppPhone, setSuppPhone] = useState("");
  const [suppEmail, setSuppEmail] = useState("");
  const [fuelTank, setFuelTank] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [litter, setLitter] = useState("");
  const [pricePerLitter, setPricePerLitter] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [perchaseDate, setPerchaseDate] = useState("");

  const suppData = [];
  const fulTempData = [];

  //CHECK FUEL PRICE
  useEffect(() => {
    if (fuelType == "Bazine") {
      setPricePerLitter(1.25);
    } else if (fuelType == "Ethanol") {
      setPricePerLitter(1);
    } else if (fuelType == "Gasoline") {
      setPricePerLitter(0.5);
    } else if (fuelType == "Kerosene") {
      setPricePerLitter(0.25);
    } else if (fuelType == "Diesel Fuel") {
      setPricePerLitter(1.75);
    }
  }, [fuelType]);

  //Fuel Total
  useEffect(() => {
    setTotalPrice(litter * pricePerLitter);
  }, [litter, pricePerLitter]);

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

  // FETCH SUPPLIER NAME
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

  // FETCH SUPPLIER DETAILS
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "suppliers", suppID);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());

      const supphone = docSnap.data().phone;
      const supemail = docSnap.data().email;

      setSuppPhone(supphone);
      setSuppEmail(supemail);
    };
    fetchData();
  }, [suppID]);

  // FETCH FUEL TYPE
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "fuel"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setFuelData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  // FETCH FUEL DETAILS
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "fuel", fuelID);
      const docSnap = await getDoc(docRef);

      const tanknum = docSnap.data().tankNumber;
      setFuelTank(tanknum);
    };
    fetchData();
  }, [fuelID]);

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
      perchaseDate: perchaseDate,
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
            <div className="wrapper-cols-2">
              <p className="fullName">Supplier Name</p>
              <select
                name="supp-name"
                className="supp_name"
                onChange={(e) => {
                  suppData.filter((el) => {
                    if (el.id == e.target.value) {
                      setSuppID(el.id);
                      setSuppName(el.supname);
                    }
                  });
                }}
              >
                {data.map((el) => {
                  suppData.push({ id: el.id, supname: el.fullName });
                  return <option value={el.id}>{el.fullName}</option>;
                })}
              </select>
              <p className="phone">Supplier Phone</p>
              <input
                type="text"
                value={suppPhone}
                onChange={(e) => setSuppPhone(e.target.value)}
              />
              <p className="phone">Supplier Email</p>
              <input
                type="text"
                value={suppEmail}
                onChange={(e) => setSuppEmail(e.target.value)}
              />
              <p className="address">Fuel Type</p>
              <select
                name="fuel-tank"
                className="fuel_tank"
                // value={fuelType}
                onChange={(e) => {
                  fuelData.filter((el) => {
                    if (el.id == e.target.value) {
                      setFuelID(el.id);
                      setFuelType(el.fuelType);
                    }
                  });
                }}
              >
                {fuelData.map((el) => {
                  fulTempData.push({ id: el.id, fuelType: el.fuelType });
                  return <option value={el.id}>{el.fuelType}</option>;
                })}
              </select>
            </div>
            <div className="wrapper-cols-3">
              <p className="address">Fuel Tunk</p>
              <input
                type="text"
                value={fuelTank}
                onChange={(e) => setFuelTank(e.target.value)}
              />
              <p className="address">Litters</p>
              <input
                type="text"
                value={litter}
                onChange={(e) => setLitter(e.target.value)}
              />
              <p className="address">Price per litter</p>
              <input
                type="text"
                value={pricePerLitter}
                onChange={(e) => setPricePerLitter(e.target.value)}
              />
              <p className="address">Total price</p>
              <input
                type="text"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
              />
            </div>
            <div className="wrapper-cols-4">
              <input
                type="date"
                className="purch_date"
                onChange={(e) => setPerchaseDate(e.target.value)}
              />
              <div className="status-wrapper">
                <div className="group1">
                  <input
                    type="radio"
                    id="pending"
                    name="status"
                    value="Pending"
                  />
                  <label for="pending">Pending</label>
                </div>
                <div className="group2">
                  <input
                    type="radio"
                    id="approved"
                    name="status"
                    value="Approved"
                  />
                   <label for="approved">Approved</label>
                </div>
              </div>
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
