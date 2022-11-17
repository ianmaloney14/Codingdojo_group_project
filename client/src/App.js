import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useState } from 'react';
import Navbar from './components/Navbar';
import DeckList from "./components/DeckList"
import DeckForm from "./components/DeckForm"
import ViewDeck from './components/ViewDeck';
import CardForm from './components/CardForm';
import ViewCard from './components/ViewCard';
import EditForm from './components/EditForm';
import EditCard from './components/EditCard';
import './App.css';

function App() {
  const [ deck, setDeck ] = useState({})
  const [ flashcard, setFlashcard ] = useState({})
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
        {/* <Route path="/" exact element={<Navbar/>} /> */}
          <Route path="/" exact element={<DeckList/>} />
          <Route path="/deckForm" element={<DeckForm />} />
          <Route path="/cardForm" element={<CardForm />} />
          <Route path="/deck/:id" element={<ViewDeck />} />
          <Route path="/deck/:id/:flashcardId" element={<ViewCard />} />
          <Route path="/edit/:id" element={<EditForm deck={deck} setDeck={setDeck} />} />
          <Route path="/edit/:id/:flashcardId" element={<EditCard deck={deck} flashcard={flashcard} setDeck={setDeck} setFlashcard={setFlashcard} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
