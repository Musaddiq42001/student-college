// JavaScript source code
var express = require("express");
var cors = require('cors');
var app = express();
app.use(cors());
const port = 8080;

/*API
 POST   --> CREATE
 GET    --> READ
 PUT    --> UPDATE
 DELETE --> DELETE
 */
var order_module = require("./user.js");
const detail = order_module.order;

app.use(express.json());

app.listen(process.env.PORT || port, () => {
    console.log("listening 8080...");
});
app.route("/food")
    .get(async (req, res) => {
        let data = await detail.find();
        console.log(await detail);
        console.log(data);
        res.send(data);
    })
    .post(async (req, res) => {
        console.log(req.body);
        let s = new detail(req.body);
        let result = await s.save();
        res.send(result);

    })
    .put(async (req, res) => {
        console.log(req.body);
        let s = await detail.updateOne({ "orderId": req.body.orderId }, { "$set": { "cName": req.body.cName, "area": req.body.area , "city": req.body.city ,"pincode": req.body.pincode , "dishName": req.body.dishName , "deliverTime": req.body.deliverTime , "status": req.body.status ,"progress": req.body.progress , "contact": req.body.contact } })
        res.send(s);

    })
    .delete(async (req, res) => {

        let d = await detail.deleteOne({ "_id": req.body._id });
        res.send(d);
        console.log(d);

    })
app.get("/food/:id", async (req, res) => {
    console.log(req.params.OrderId);
    let data = await detail.find({ "_id": req.params.id });
    res.send(data[0]);
})
