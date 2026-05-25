const express = require("express")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const expenseRoutes = require("./routes/expense.routes");
 const  app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://10.95.247.97:5173"
    ],
    credentials: true,
  })
);
app.use(cookieParser());


app.use("/api/users",userRoutes);
app.use("/api/expenses", expenseRoutes);
module.exports = app;