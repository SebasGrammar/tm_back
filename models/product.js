const mongoose = require("mongoose"),
    { Schema } = mongoose,
    productSchema = new Schema({
        name: String,
        picture: String,
        tag: String 
    });


module.exports = mongoose.model("Product", productSchema);