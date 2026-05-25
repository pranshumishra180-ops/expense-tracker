const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {

    title:{
        type:String,
        required:[true,"Title is required"]
    },

    amount:{
        type:Number,
        required:[true,"Amount is required"]
    },
    category:{
        type:String,
        required:[true,"Category is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
},
    {
        timestamps:true
    }
)

    const expenseModel = mongoose.model("Expense",expenseSchema)



module.exports = expenseModel;

//✅ Expense title
// ✅ Amount
// ✅ Category
// ✅ Kis user ka expense hai
// ✅ Date
// ✅ Created time

// example of expense data
// {
//   "title":"Pizza",
//   "amount":500,
//   "category":"Food"
// }