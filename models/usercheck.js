const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        reuired:true
    },
    password:{
        type:String,
        reuired:true
    }

})

const user = new mongoose.model('user', userSchema);

module.exports = user;