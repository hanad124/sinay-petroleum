import "./chart.scss";

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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

const Chart = () => {
  return (
    <div className="chart">
      <div className="title">Last 6 Months (Revenue)</div>
      <BarChart width={670} height={330} data={data}>
        <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
        <XAxis
          dataKey="name"
          className="XAxis_name"
          style={{ fontSize: "13px" }}
        />
        <Tooltip />
        <Bar dataKey="pv" fill="#10316b" />
        <Bar dataKey="uv" fill="#2352a6" />
      </BarChart>
    </div>
  );
};

export default Chart;
