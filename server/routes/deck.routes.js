const DeckController = require("../controllers/deck.controller")

module.exports = (app) => {
    app.post("/deck/create", DeckController.createDeck)
    // app.post("/card/create", DeckController.createCard)
    app.get("/decks", DeckController.getAllDecks)
    app.get("/deck/:id", DeckController.getDeck)
    app.get("/card/:id", DeckController.getFlashcard)
    app.put("/deck/:id/edit", DeckController.updateDeck)
    app.delete("/deck/:id/delete", DeckController.deleteDeck)
    app.put("/deck/:id/delete/:flashcardId", DeckController.deleteFlashcard)
    app.put("/deck/:id/add", DeckController.addFlashcard)
    app.get("/deck/:id/:flashcardId", DeckController.getFlashcard)
}