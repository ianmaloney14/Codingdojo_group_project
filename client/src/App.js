import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar';
import DeckList from "./components/DeckList"
import DeckForm from "./components/DeckForm"
import ViewDeck from './components/ViewDeck';
import CardForm from './components/CardForm';
import ViewCard from './components/ViewCard';
import EditForm from './components/EditForm';
import './App.css';

function App() {
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
          <Route path="/card/:id" element={<ViewCard />} />
          <Route path="/edit/:id" element={<EditForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
