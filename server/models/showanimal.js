// Require mongoose
var mongoose = require("mongoose");

// Create new schema for inserting an animal into the DB
var AnimalSchema = new mongoose.Schema({
    name: String,
    updated_at: {type: Date, default: Date.now}
});

// connect my collection and model schema
mongoose.model("Animal", AnimalSchema);