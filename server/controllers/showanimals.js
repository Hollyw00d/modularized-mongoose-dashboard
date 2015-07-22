// Require mongoose
var mongoose = require("mongoose");

// Load models by name
var Animal = mongoose.model("Animal");
var AddAnimal = mongoose.model("AddAnimal");
var UpdateAnimal = mongoose.model("UpdateAnimal");

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
};

// Go to form to add a new animal to
// the MongoDB "animals" collection
showanimalsController.newanimalform = function(req, res) {
    res.render("../client/views/new");
};

// Add a new animal into the MongoDB
// the MongoDB "animals" collection
showanimalsController.addanimal = function(req, res) {
    // Create a new "animal" object
    // to save
    var animal = new Animal(req.body);

    // Save a single animal into MongoDB
    animal.save(function(err) {
        // Show form data posted
        //console.log("POST DATA", req.body);

        if(err) {
            console.log("Animal not added to 'animals' collection.")
        }
        else {
            console.log("Successfully updated an animal.");
            res.redirect("/");
        }
    });
};

// Show a single animal
showanimalsController.showSingleAnimal = function(req, res) {

    // Show one "animal" document based
    // on said document's "_id"
    Animal.findOne({_id: req.params.id}, function(err, animal) {

        res.render("../client/views/animal", {animal: animal});
    });

};

// Update single animal document
showanimalsController.updateSingleAnimal = function(req, res) {

    Animal.findOne({_id: req.params.id}, function(err, animal) {

        console.log("Edit an animal");

        res.render("../client/views/editanimal", {animal: animal});
    });
};

showanimalsController.executeUpdateAnimal = function(req, res) {
    // Create a new "animal" object
    // to update a single animal
    var animal = new Animal(req.body);

    // Operate to update a single animal
    animal.update({_id: req.params.id}, {name: req.body.name}, function(err, animal) {
        console.log("Animal updated", animal);
        res.redirect("/");
    });

};




module.exports = showanimalsController;