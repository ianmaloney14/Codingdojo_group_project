const Deck = require("../models/deck.model")

module.exports.createDeck = (req, res) => {
    Deck.create(req.body)
        .then(deck => res.json(deck))
        .catch(err => res.status(400).json(err))
}

module.exports.getAllDecks = (req, res) => {
    Deck.find({})
    .then(decks => res.json(decks))
    .catch(err => res.json(err))
}

module.exports.getDeck = (req, res) => {
    Deck.findOne({_id: req.params.id})
        .then(deck => res.json(deck))
        .catch(err => res.json(err))
}

module.exports.updateDeck = (req, res) => {
    Deck.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedDeck => res.json(updatedDeck))
        .catch(err => res.json(err))
}

module.exports.updateCard = (req, res) => {
    console.log("req.body:_________", req.body)
    console.log("req.params:_________", req.params)
    Deck.findOneAndUpdate({_id: req.params.id}, { $set: { "flashcards.$[el].word" : req.body.word, "flashcards.$[el].meaning" : req.body.meaning } }, { arrayFilters: [{ "el._id": req.params.flashcardId}], new:true})
        .then(updatedCard => res.json(updatedCard))
        .catch(err => res.json(err))
}


module.exports.deleteDeck = (req, res) => {
    Deck.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}

module.exports.deleteFlashcard = (req, res) => {
    Deck.findOneAndUpdate({_id: req.params.id}, {$pull: {flashcards: {_id: req.params.flashcardId}}})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}

module.exports.addFlashcard = (req, res) => {
    Deck.findOneAndUpdate({_id: req.params.id}, {$push: {flashcards: {"word": req.body.flashcards.word, "meaning": req.body.flashcards.meaning}}})
        .then(addConfirmation => res.json(addConfirmation))
        .catch(err => res.json(err))
}

module.exports.getFlashcard = (req, res) => {
    Deck.find({_id: req.params.id}, {"flashcards": {$elemMatch: {"_id": req.params.flashcardId}}})
    // Deck.find({"flashcards" : req.params.flashcardId})
        .then(found => res.json(found))
        .catch(err => res.json(err))
}