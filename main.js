const express = require("express"),
    app = express(),
    router = express.Router(),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    layouts = require("express-ejs-layouts"),
    Product = require("./models/product");
//errorController = require("./controllers/errorController"),
//homeController = require("./controllers/homeController"),
//Product = require("./models/product");

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

app.set("port", process.env.PORT || 3020);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);

app.use(express.json());

//app.get("/", homeController.index);

Product.deleteMany({})
    .exec()
    .then(() => {
        console.log("All products have been removed from the database.");
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
    picture: "/images/catalog/pump.jpg",
    tag: "motor"
})

Product.create({
    name: "Motorreductor",
    picture: "/images/catalog/pump.jpg",
    tag: "motor_reducer"
})

app.get("/", function (req, res) {
    res.render("index");
})

/*************************************************************************/

app.get("/products", function (req, res) {
    Product.find({})
        .then(products => {
            res.render("../views/products", {
                products
            })
        })
        .catch(error => {
            console.log(`Error fetching products: ${error.message}`)
            res.redirect("/");
        });
})

app.get("/contact", function(req, res) {
    res.render("contact")
})

app.get("/products/add", function (req, res) {
    console.log("OSOJDAPSDfffffffffff")
    res.render("products/create")
})

app.get("/products/:tag", function (req, res) {
    let tag = req.params.tag;
    console.log(`TAG: ${tag}`)
    Product.find({ tag })
        .then(category => {
            res.render("../views/category", {
                category
            })
        })
        .catch(error => {
            console.log(`Error fetching products: ${error.message}`)
            res.redirect("/");
        });
})

// app.get("/products/product/:id", function (req, res, next) {
app.get("/products/product/:id", function (req, res, next) {
    let productId = req.params.id;
    Product.findById(productId)
        .then(product => {
            console.log(`This is it: ${productId}`)
            res.locals.product = product;
            next();
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
}, function (req, res) {
    res.render("products/show");
})

/*********************************************************************/

// app.get("/products/add", function (req, res) {
//     console.log("OSOJDAPSDfffffffffff")
//     res.render("products/create")
// })

function getParams(body) {

    return {

        name: body.name,
        picture: body.picture,
        tag: body.tag

    }

}

app.post("/products/create", function (req, res, next) {
    let params = getParams(req.body);
    console.log(params)
    Product.create(params)
        .then(course => {
            res.locals.redirect = "/products";
            res.locals.course = course;
            next();
        })
        .catch(error => {
            console.log(`Error saving course: ${error.message}`);
            next(error);
        });
}, function (req, res, next) {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
})

// app.delete("/products/:id/delete", function (req, res, next) {
//     let productId = req.params.id;
//     Product.findByIdAndRemove(productId)
//         .then(() => {
//             console.log(`Found it: ${productId}`)
//             res.locals.redirect = "/products";
//             next();
//         })
//         .catch(error => {
//             console.log("SHIT")
//             console.log(`Error deleting product by ID: ${error.message}`);
//             next();
//         });
// }, function (req, res, next) {
//     let redirectPath = res.locals.redirect;
//     if (redirectPath !== undefined) res.redirect(redirectPath);
//     else next();
// })

// app.get("/products/:id", function (req, res, next) {
//     let productId = req.params.id;
//     Product.findByIdAndDelete(productId)
//         .then((product) => {
//             console.log("YUJS")
//             console.log(product)
//             console.log(`Found it: ${productId}`)
//             res.locals.redirect = "/products";
//             next();
//         })
//         .catch(error => {
//             console.log("SHIT")
//             console.log(`Error deleting product by ID: ${error.message}`);
//             next();
//         });
// }, function (req, res, next) {
//     let redirectPath = res.locals.redirect;
//     if (redirectPath !== undefined) res.redirect(redirectPath);
//     else next();
// })

app.delete("/products/:id/delete", function (req, res, next) {
    let productId = req.params.id;
    Product.findByIdAndDelete(productId)
        .then(() => {
            // console.log("YUJS")
            // console.log(product)
            // console.log(`Found it: ${productId}`)
            res.locals.redirect = "/products";
            next();
        })
        .catch(error => {
            console.log("SHIT")
            console.log(`Error deleting product by ID: ${error.message}`);
            next();
        });
}, function (req, res, next) {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
})

/* EDIT */

app.get("/products/:id/edit", function (req, res, next) {
    let productId = req.params.id;
    Product.findById(productId)
        .then(product => {
            res.render("products/edit", {
                product
            });
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
})

app.put("/products/:id/update", function (req, res, next) {
    let productId = req.params.id,
        productParams = {
            name: req.body.name,
            picture: req.body.picture,
            tag: req.body.tag

        };
    Product.findByIdAndUpdate(productId, {
        $set: productParams
    })
        .then(product => {
            res.locals.redirect = `/products/product/${productId}`;
            res.locals.product = product;
            next();
        })
        .catch(error => {
            console.log(`Error updating product by ID: ${error.message}`);
            next(error);
        });
}, function (req, res, next) {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
})

// I'm going to use these . remove the comments.
// app.use(errorController.logErrors);
// app.use(errorController.respondNoResourceFound);
// app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});