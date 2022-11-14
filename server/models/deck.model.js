const mongoose = require("mongoose")

const DeckSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    flashcards: [{
        word: { type: String, required: [true, "Word is required"] },
        meaning: { type: String, required: [true, "Meaning is required"] }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Deck", DeckSchema)