import "./editPurchase.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import PurchaseContext from "../../context/PurchaseContext";
import { useState, useEffect, useContext } from "react";
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

const EditPurchase = () => {
  const { purchaseId, SetPurchaseId } = useContext(PurchaseContext);
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
  const [status, setStatus] = useState(false);

  const suppData = [];
  const fulTempData = [];
  console.log(status);

  const exectPurchID = JSON.parse(localStorage.getItem("purchaseID"));

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

  //GET PURCHASE DATA
  useEffect(() => {
    const fetchData = async () => {
      console.log(exectPurchID ? "ID: " + exectPurchID : "BAD");
      const docRef = doc(db, "purchase", exectPurchID);
      const docSnap = await getDoc(docRef);

      const testSupNam = docSnap.data().suppName;

      exectPurchID ? setSuppName(testSupNam) : setSuppName("BAD");
      setSuppPhone(docSnap.data().suppPhone);
      setSuppEmail(docSnap.data().suppEmail);
      setFuelType(docSnap.data().fuelType);
      setFuelTank(docSnap.data().fuelTank);
      setLitter(docSnap.data().litter);
      setPricePerLitter(docSnap.data().pricePerLitter);
      setTotalPrice(docSnap.data().totalPrice);
      setPerchaseDate(docSnap.data().perchaseDate);
      setStatus(docSnap.data().status);
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      await setDoc(doc(db, "purchase", exectPurchID), {
        suppName: suppName,
        suppPhone: suppPhone,
        suppEmail: suppEmail,
        fuelTank: fuelTank,
        fuelType: fuelType,
        litter: litter,
        pricePerLitter: pricePerLitter,
        totalPrice: totalPrice,
        status: status,
        perchaseDate: perchaseDate,
      });
      alert("data has updated sucessfully!");
      navigate(-1);
    } catch (error) {
      console.log(error);
      alert("something wrong!");
    }
  };

  return (
    <div className="editPurchase">
      <Sidebar />
      <div className="editPurchaseContainer">
        <Navbar />
        <div className="wrapper">
          <div className="title">Update Purchase</div>
          <div className="wrapper-cols">
            <div className="wrapper-cols-2">
              <p className="fullName">Supplier Name</p>
              <select
                name="supp-name"
                className="supp_name"
                value={suppName}
                onChange={(e) => {
                  // setSuppName(e.target.value);
                  // console.log(suppName);
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
                disabled
                value={suppPhone}
                onChange={(e) => setSuppPhone(e.target.value)}
              />
              <p className="phone">Supplier Email</p>
              <input
                type="text"
                disabled
                value={suppEmail}
                onChange={(e) => setSuppEmail(e.target.value)}
              />
              <p className="address">Fuel Type</p>
              <select
                name="fuel-tank"
                className="fuel_tank"
                value={fuelType}
                onChange={(e) => {
                  fuelData.filter((el) => {
                    if (el.id == e.target.value) {
                      setFuelType(el.fuelType);
                      setFuelID(el.id);
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
                value={perchaseDate}
                onChange={(e) => setPerchaseDate(e.target.value)}
              />
              <div className="status-wrapper">
                <div className="group1">
                  <input
                    type="radio"
                    id="pending"
                    name="status"
                    checked={!status ? "checked" : false}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <label for="pending">Pending</label>
                </div>
                <div className="group2">
                  <input
                    type="radio"
                    id="approved"
                    name="status"
                    // checked={status ? "checked" : false}
                    onChange={(e) => setStatus(e.target.value)}
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

export default EditPurchase;
