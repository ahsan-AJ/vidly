const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        set: toLower,
        required: true,
        minlength: 3,
        maxlength: 50
    }
})

function toLower(v) {
    return v.toLowerCase();
}

const Genre = mongoose.model('Genre', genreSchema);
exports.Genre = Genre;
exports.genreSchema = genreSchema;