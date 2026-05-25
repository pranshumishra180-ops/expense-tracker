const { Router } = require("express");
const { addExpense,getExpenses,deleteExpense,  getExpenseSummary,getMonthlyExpenses} = require("../controllers/expense.controller");
const authMiddleware = require("../middleware/user.middleware");


const router = Router();

// Add a new expense
router.post("/add",authMiddleware,addExpense);

router.get("/get",authMiddleware,getExpenses);


// Get all expenses



// Delete an expense
router.delete("/delete/:id", authMiddleware,deleteExpense);

// Update an expense
   

// Get expense summary

  router.get( "/summary", authMiddleware, getExpenseSummary);


  router.get("/monthly", authMiddleware, getMonthlyExpenses);

  
module.exports = router;
