
const mongoose = require('mongoose');

const customers= mongoose.Schema({
  
    id:String,
    first_name:String,
    last_name:String,
    city:String,
    comapny:String,
});
module.exports= mongoose.model("customers",customers);