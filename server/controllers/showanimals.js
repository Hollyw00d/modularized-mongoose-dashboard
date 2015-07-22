// Require mongoose
var mongoose = require("mongoose");

// Load a model by name
// which isn't configured but will be called "Animal"
var Animal = mongoose.model("Animal");

// Create a controller object to use for export
var showanimalsController = {};

// Call the "show" method for the controller object
showanimalsController.show = function(req, res) {

    Animal.find({}).exec(function (err, animals) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../client/views/index", {animals: animals});
        }
    });
}

module.exports = showanimalsController;