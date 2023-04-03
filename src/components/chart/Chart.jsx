import "./chart.scss";
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

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//   },
// ];

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "sales"),
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

  console.log(data);

  return (
    <div className="chart">
      <div className="title">customers transections</div>
      <BarChart width={670} height={330} data={data}>
        <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
        <XAxis
          dataKey="customerName"
          className="XAxis_name"
          style={{ fontSize: "13px" }}
        />
        <Tooltip />
        <Bar dataKey="litter" fill="#2352a6" />
        <Bar dataKey="pricePerLitter" fill="#2352a6" />
        <Bar dataKey="totalPrice" fill="#10316b" />
      </BarChart>
    </div>
  );
};

export default Chart;
