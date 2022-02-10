const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/projects", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log("connection success");
}).catch((e)=>{
    console.log(`no connection`);
})