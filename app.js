const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:false});

const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const app = express();

require('./config/passport')(passport);


const db = require('./config/keys').MongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  var order_module = require("./views/user.js");

  const detail = order_module.order;

app.use(expressLayouts);

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"/views")));
app.use(express.json());



app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );


  app.use(passport.initialize());
app.use(passport.session());



  app.use(flash());

  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


 

  app.get("/food",urlencodedParser,async (req, res) => {

      let data = await detail.find();
      console.log(await detail);
      console.log(data);
      res.send(data);
  })
  app.post("/add",urlencodedParser ,async (req, res) => {
      console.log(req.body);
      let s = new detail(req.body);
      let result = await s.save();
      res.send(result);

  })
  app.put("/edit",urlencodedParser ,async (req, res) => {
      console.log(req.body);
      let s = await detail.updateOne({ "UserId": req.body.UserId }, { "$set": { "FirstName": req.body.FirstName, "LastName": req.body.LastName , "Phone_no": req.body.Phone_no ,"EmailId": req.body.EmailId , "Department": req.body.Department , "studentcode": req.body.studentcode , "Year": req.body.Year ,"FeesStatus": req.body.FeesStatus , "ResultStatus": req.body.ResultStatus } })
      res.send(s);

  })
  .delete(urlencodedParser ,async (req, res) => {

      let d = await detail.deleteOne({ "_id": req.body._id });
      res.send(d);
      console.log(d);

  })
app.get("/food/:id",urlencodedParser, async (req, res) => {
  console.log(req.params.UserId);
  let data = await detail.find({ "_id": req.params.id });
  res.send(data[0]);
})



app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;





app.listen(PORT, console.log(`Server started  on port  ${PORT}`));
