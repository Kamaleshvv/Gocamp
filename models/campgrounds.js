var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    price: String,
    createdAt: {type: Date, default: Date.now},
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
}); 

module.exports = mongoose.model("Campground", campgroundSchema);