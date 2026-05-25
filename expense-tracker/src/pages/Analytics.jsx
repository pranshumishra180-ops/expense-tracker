import { PieChart, Pie,  Cell, Tooltip,ResponsiveContainer} from "recharts";
import "../styles/Analytics.scss";
import api from "../services/api"
import { useEffect, useState } from "react";
import { LineChart, Line,XAxis,YAxis, CartesianGrid,} from "recharts";

function Analytics() {

 const [monthlyData, setMonthlyData] = useState([]);

const [data, setData] = useState([]);
  

  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#06b6d4",
    "#f43f5e",
  ];

  useEffect(() => {

  async function fetchSummary() {

    try {

      // CATEGORY DATA
      const response = await api.get(
        "/expenses/summary"
      );

      console.log(response.data);

      const categoryData = Object.entries(
        response.data.CategorySummary || {}
      ).map(([key, value]) => ({

        name: key,

        value: value,

      }));

      setData(categoryData);

      // MONTHLY DATA
      const monthlyResponse =
        await api.get(
          "/expenses/monthly"
        );

      console.log(monthlyResponse.data);

      setMonthlyData(
        monthlyResponse.data
      );

    } catch (err) {

      console.log(err);
    }
  }

  fetchSummary();

}, []);


  return (

    <div className="analytics-page">

      <h1>
        Expense Analytics
      </h1>

      <div className="chart-container">

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={140}
              label
            >

              {
                data.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />

                ))
              }

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-container">

  <h2>Monthly Expenses</h2>

  <ResponsiveContainer
    width="100%"
    height={300}
  >

    <LineChart data={monthlyData}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="amount"
        stroke="#8884d8"
      />

    </LineChart>

  </ResponsiveContainer>

</div>

    </div>
  );
}

export default Analytics;