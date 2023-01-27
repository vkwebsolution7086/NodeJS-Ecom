import express from "express";
import connectDB from "../config/dbconnection";
import user from "./routes/user";
import product from "./routes/product";
import cart from "./routes/cart";
import order from "./routes/order";
import flash from "express-flash";
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();

//db connection
connectDB();

app.set('view-engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
      secret: process.env.PASS_SECRET,
      resave: true,
      saveUninitialized: true
    })
  );
app.use(flash());
// app.use('/api/users', user);
// app.use('/api/products', product);
// app.use('/api/cart', cart);
// app.use('/api/order', order);
app.use('/', user);
app.use('/api/products', product);
app.use('/api/cart', cart);
app.use('/api/order', order);

//start the server
const server = app.listen(process.env.PORT || 4000, () =>
    console.log(`server started on the port ${process.env.PORT || 4000}`)
);