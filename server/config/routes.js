// Show export to "animalsController" controller
var showanimals = require("../controllers/showanimals.js");

// Pass routes from this file to server.js
module.exports = function(app) {

    // Home page
    app.get("/", function(req, res) {
        showanimals.show(req, res);
    });

    app.get("/mongooses/new", function(req, res){
        res.render("new");
    });

    app.get("/mongooses/:id", function(req, res) {
        Animal.findOne({_id: req.params.id}, function(err, animal) {

            res.render("animal", {animal: animal});
        });
    });

    app.get("/mongooses/:id/edit", function(req, res) {
        Animal.findOne({_id: req.params.id}, function(err, animal) {

            console.log("Edit an animal");

            res.render("editanimal", {animal: animal});
        });
    });

// Route to add an animal to DB
    app.post("/mongooses", function(req, res) {
        // Show form data posted
        console.log("POST DATA", req.body);

        // Create a new animal with the
        // corresponding "name" form field
        // from req.body
        var animal = new Animal({
            name: req.body.name
        });

        // Save a single animal into MongoDB
        animal.save(function(err) {
            if(err) {
                console.log("Animal not saved in MongoDB 'animals' database.")
            }
            else {
                console.log("Successfully updated an animal.");
                res.redirect("/");
            }
        });

    });

// Route to update a single
// animal document
    app.post("/mongooses/:id", function(req, res) {
        // Create a new animal with the
        // corresponding "name" form field
        // from req.body
        var animal = new Animal({
            name: req.body.name
        });

        // Update a single animal document
        // and redirect to the home page
        Animal.update({_id: req.params.id}, {name: req.body.name}, function(err, animal) {
            res.redirect("/");
        });

    });

// Route to delete a single
// animal document
    app.get("/mongooses/:id/destroy", function(req, res) {

        // Delete a single animal document
        // and redirect to the home page
        Animal.remove({_id: req.params.id}, function(err, animal) {
            console.log("Animal deleted!");
            res.redirect("/");
        });

    });


}