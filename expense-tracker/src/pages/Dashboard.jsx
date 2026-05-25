import "../styles/Dashboard.scss";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {

  // Summary State
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    totalTransactions: 0,
    CategorySummary: {},
  });

  // Expense Form State
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: "",
  });

  // Expenses State
  const [expenses, setExpenses] = useState([]);


  // search expense 
  const [search, setSearch] = useState("");

  // Edit States
  const [editId, setEditId] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    amount: "",
    category: "",
  });

  // Handle Input Change
  function handleChange(e) {

    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value,
    });
  }

  // Add Expense
  async function handleAddExpense(e) {

    e.preventDefault();

    try {

      const response = await api.post(
        "/expenses/add",
        expenseData
      );

      console.log(response.data);

      alert("Expense Added Successfully");

      fetchSummary();
      fetchExpenses();

      setExpenseData({
        title: "",
        amount: "",
        category: "",
      });

    } catch (err) {

      console.log(err);

      alert(
        err.response.data.message
      );
    }
  }

  // Delete Expense
  async function handleDeleteExpense(id) {

    try {

      const response = await api.delete(
        `/expenses/delete/${id}`
      );

      console.log(response.data);

      alert("Expense Deleted");

      fetchSummary();
      fetchExpenses();

    } catch (err) {

      console.log(err);

      alert(
        err.response.data.message
      );
    }
  }

  // Handle Edit
  function handleEdit(expense) {

    setEditId(expense._id);

    setEditData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
    });
  }

  // Logout
  async function handleLogout() {

    try {

      const response = await api.post(
        "/users/logout"
      );

      console.log(response.data);

      alert("Logout Successful");

      localStorage.removeItem("token");

      window.location.href = "/";

    } catch (err) {

      console.log(err);

      alert(
        err.response.data.message
      );
    }
  }

  // Fetch Summary
  async function fetchSummary() {

    try {

      const response = await api.get(
        "/expenses/summary"
      );

      console.log(response.data);

      setSummary(response.data);

    } catch (err) {

      console.log(err);
    }
  }

  // Fetch Expenses
  async function fetchExpenses() {

    try {

      const response = await api.get(
        "/expenses/get"
      );

      console.log(response.data);

      setExpenses(response.data.expenses);

    } catch (err) {

      console.log(err);
    }
  }

  // Run On Page Load
  useEffect(() => {

    fetchSummary();

    fetchExpenses();

  }, []);

  return (

    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">

        <h2>
          Expense Tracker
        </h2>

        <ul>

      <li>
  <Link to="/dashboard">
    Dashboard
  </Link>
</li>

          <li>Expenses</li>

          <li>
  <Link to="/analytics">
    Analytics
  </Link>
</li>


          <li
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </li>

        </ul>

      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <div className="navbar">

          <h1>
            Dashboard
          </h1>

        </div>

        {/* Summary Cards */}
        <div className="summary-cards">

          {/* Add Expense */}
          <div className="expense-form">

            <h2>Add Expense</h2>

            <form onSubmit={handleAddExpense}>

              <input
                type="text"
                name="title"
                placeholder="Expense Title"
                value={expenseData.title}
                onChange={handleChange}
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={expenseData.amount}
                onChange={handleChange}
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={expenseData.category}
                onChange={handleChange}
              />

              <button type="submit">
                Add Expense
              </button>

            </form>

          </div>

            {
  editId && (

    <div className="expense-form">

      <h2>Edit Expense</h2>



      <form>

        <input
          type="text"
          value={editData.title}
          onChange={(e) =>
            setEditData({
              ...editData,
              title: e.target.value,
            })
          }
        />

        <input
          type="number"
          value={editData.amount}
          onChange={(e) =>
            setEditData({
              ...editData,
              amount: e.target.value,
            })
          }
        />

        <input
          type="text"
          value={editData.category}
          onChange={(e) =>
            setEditData({
              ...editData,
              category: e.target.value,
            })
          }
        />

        <button type="submit">
          Update Expense
        </button>

      </form>

    </div>
  )
}

          {/* Total Expenses */}
          <div className="card">

            <h3>Total Expenses</h3>

            <p>
              ₹
              {summary?.totalExpenses?.toFixed(2) || "0.00"}
            </p>

          </div>

          {/* Transactions */}
          <div className="card">

            <h3>Total Transactions</h3>

            <p>
              {summary?.totalTransactions || 0}
            </p>

          </div>

          {/* Top Category */}
          <div className="card">

            <h3>Top Category</h3>

            <p>
              {
                Object.entries(
                  summary?.CategorySummary || {}
                )
                  .sort((a, b) => b[1] - a[1])[0]?.[0]
                || "No Data"
              }
            </p>

          </div>

        </div>

        {/* Expense List */}
        <div className="expense-list">

          <h2>Recent Expenses</h2>

          <input
  type="text"
  placeholder="Search Expense..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="search-input"
/>

          {
            expenses.length === 0 ? (

              <p>No Expenses Found</p>

            ) : (

              expenses
  .filter((expense) =>

    expense.title
      .toLowerCase()
      .includes(search.toLowerCase())

    ||

    expense.category
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  .map((expense) => (

                <div
                  className="expense-item"
                  key={expense._id}
                >

                  <div>

                    <h3>
                      {expense.title}
                    </h3>

                    <p>
                      {expense.category}
                    </p>

                  </div>

                  <div className="expense-actions">

                    <h2>
                      ₹{expense.amount}
                    </h2>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(expense)
                      }
                    >
                      Edit
                    </button>


                


                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteExpense(expense._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))
            )
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;