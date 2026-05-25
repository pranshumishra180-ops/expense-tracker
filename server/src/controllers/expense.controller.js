const Expense = require("../models/expense.model");

async function addExpense(req,res){
    try{
        const {title,amount,category} = req.body;

        const expense = await Expense.create(
            
            {
                title,
                amount,
                category,
                user:req.user.id
            })

            return res.status(201).json({
                message:"Expense added successfully",
                expense
            });
    }
 catch (err){
    console.log(err);
    return res.status(500).json({
        message:err.message
    });
   }
 }

 async function getExpenses(req,res){
    try{
        const expenses = await Expense.find(
            {
                user:req.user.id
            }
        );
          return res.status(200).json({
      expenses,
    });
    }catch(err){
        return res.status(500).json({
            message:err.message
        });
    }
}

const deleteExpense = async (req, res) => {

  try {

    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Expense Deleted",
    });

  } catch (err) {

    res.status(500).json({
      message: "Server Error",
    });
  }
};

async function updateExpense(req,res){
    try{
        const {title,amount,category} = req.body;

        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            {
                title,
                amount,
                category    
            },
            {
                new:true
            }
        );
        if(!expense){
            return res.status(404).json({
                message:"Expense not found"
            });

        }
        return res.status(200).json({
            message:"Expense updated successfully",
            expense
        });
    }

catch(err){
    return res.status(500).json({
        message:err.message
    });
}

}


async function getExpenseSummary(req, res) {
    try{
        const expenses = await Expense.find(
            { user: req.user.id }
        );
        const totalExpenses = expenses.reduce(
            (sum,expense)=> sum + expense.amount,
            0
        );
        const CategorySummary = {};
        expenses.forEach((expense)=>{
            if(CategorySummary[expense.category]){
                CategorySummary[expense.category] += expense.amount;
            }else{
                CategorySummary[expense.category] = expense.amount;
            }
        });
        return res.status(200).json({
            totalExpenses,
            totalTransactions: expenses.length,
            CategorySummary
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getExpenses = async (req, res) => {

  try {

    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      expenses,
    });

  } catch (err) {

    res.status(500).json({
      message: "Server Error",
    });
  }
};

async function getMonthlyExpenses(req, res) {

  try {

    const expenses = await Expense.find({
      user: req.user.id,
    });

    const monthlyData = {};

    expenses.forEach((expense) => {

      const month = new Date(
        expense.createdAt
      ).toLocaleString("default", {
        month: "short",
      });

      if (!monthlyData[month]) {

        monthlyData[month] = 0;
      }

      monthlyData[month] += Number(
        expense.amount
      );
    });

    const result = Object.keys(
      monthlyData
    ).map((month) => ({

      month,

      amount: monthlyData[month],

    }));

    return res.status(200).json(
      result
    );

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      message: err.message,
    });
  }
}



module.exports = {
    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
    getExpenseSummary,
    getMonthlyExpenses,
}


