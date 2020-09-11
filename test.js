const express = require("express"),
    app = express(),
    router = express.Router(),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    layouts = require("express-ejs-layouts"),
    Product = require("./models/product");

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://localhost:27017/tecnimotores",
    { useNewUrlParser: true }
);

mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

Product.create({
    name: "Bomba",
    picture: "/images/catalog/pump.jpg",
    tag: "pump"
})

Product.create({
    name: "Bomba 2",
    picture: "/images/catalog/test.jpg",
    tag: "pump"
})

Product.create({
    name: "Bomba",
    picture: "https://www.hergoros.com/wp-content/uploads/2016/02/motor_electrico_siemens_1LE.jpg",
    tag: "motor"
})

Product.create({
    name: "Motorreductor",
    picture: "https://static.weg.net/medias/images/h84/hc0/MKT_WMO_CN_IMAGE_3PHASE_W21COOLINGTOWER_RAL5009_63A200_B3D_1200Wx1200H.jpg",
    tag: "motor_reducer"
})