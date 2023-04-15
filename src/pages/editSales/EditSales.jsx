import "./editSales.scss";
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

const UpdateSales = () => {
  const navigate = useNavigate();
  const [fuelData, setFuelData] = useState([]);
  const [data, setData] = useState([]);
  const [customerName, setcustomerName] = useState("");
  const [customerID, setcustomerID] = useState("");
  const [fuelID, setFuelID] = useState("");
  const [customerPhone, setcustomerPhone] = useState("");
  const [customerEmail, setcustomerEmail] = useState("");
  const [fuelTank, setFuelTank] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [litter, setLitter] = useState("");
  const [pricePerLitter, setPricePerLitter] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [perchaseDate, setPerchaseDate] = useState("");
  const [status, setStatus] = useState("Pending");

  const customerData = [];
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

  // FETCH SPECIFIC CUSTOMER
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "customers", customerID);
      const docSnap = await getDoc(docRef);

      const cusname = docSnap.data().name;

      setcustomerName(cusname);
    };
    fetchData();
  }, [customerID]);

  // FETCH CUSTOMER NAME
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

  // FETCH CUSTOMER DETAILS
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "customers", customerID);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());

      const supphone = docSnap.data().phone;
      const supemail = docSnap.data().email;

      setcustomerPhone(supphone);
      setcustomerEmail(supemail);
    };
    fetchData();
  }, [customerID]);

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

  const handleUpdate = async () => {
    await addDoc(collection(db, "sales"), {
      customerName: customerName,
      customerPhone: customerPhone,
      customerEmail: customerEmail,
      fuelTank: fuelTank,
      fuelType: fuelType,
      litter: litter,
      pricePerLitter: pricePerLitter,
      totalPrice: totalPrice,
      perchaseDate: perchaseDate,
      status: status,
      time: dayDate + "/" + months[monthDate] + "/" + yearDate,
    });

    alert("data has added sucessfully!");
    navigate(-1);
  };

  return (
    <div className="newSales">
      <Sidebar />
      <div className="newSalesContainer">
        <Navbar />
        <div className="wrapper">
          <div className="title">Update Sales</div>
          <div className="wrapper-cols">
            <div className="wrapper-cols-2">
              <p className="fullName">Customer Name</p>
              <select
                name="supp-name"
                className="supp_name"
                value={customerName}
                onChange={(e) => {
                  customerData.filter((el) => {
                    if (el.id == e.target.value) {
                      setcustomerID(el.id);
                      setcustomerName(el.supname);
                    }
                  });
                }}
              >
                {data.map((el) => {
                  customerData.push({ id: el.id, supname: el.fullName });
                  return <option value={el.id}>{el.fullName}</option>;
                })}
              </select>
              <p className="phone">customer Phone</p>
              <input
                type="text"
                disabled
                value={customerPhone}
                onChange={(e) => setSuppPhone(e.target.value)}
              />
              <p className="phone">customer Email</p>
              <input
                type="text"
                disabled
                value={customerEmail}
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
                disabled
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
                disabled
                value={pricePerLitter}
                onChange={(e) => setPricePerLitter(e.target.value)}
              />
              <p className="address">Total price</p>
              <input
                type="text"
                disabled
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
                    onClick={() => {
                      setStatus("Pending");
                    }}
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
                    onClick={() => {
                      setStatus("Approved");
                    }}
                  />
                   <label for="approved">Approved</label>
                </div>
              </div>
            </div>
          </div>
          <button className="btn-save" onClick={handleUpdate}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSales;
