// JavaScript source code
var mongoose = require("mongoose");

conn_str = "mongodb+srv://anas123:635241@cluster0.61pud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//connection to MongoDb
mongoose.connect(conn_str, { useNewUrlParser: true, useUnifinedTopology: true })

const orderSchema = new mongoose.Schema({
    "UserId": String,
    "FirstName": String,
    "LastName": String,
    "Phone_no": String,
    "EmailId": String,
    "Department": String,
    "studentcode": String,
    "Year": String,
    "FeesStatus": String,
    "ResultStatus": String

});

const orderModel = new mongoose.model("studentadmins", orderSchema);

exports.order = orderModel;

