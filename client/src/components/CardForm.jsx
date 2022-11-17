import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const CardForm = (props) => {
    const [ deck, setDeck ] = useState("");
    const [ flashcards, setFlashcards] = useState([]);
    const [ errors, setErrors] = useState({});
    const [ decks, setDecks] = useState([]);
    // const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/decks")
            .then(res => setDecks(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(deck.flashcards)
        // const newCard = card.flashcards + e.target.value
        // console.log(deck.flashcards)
        // axios.put(`http://localhost:8000/deck/${deck}/edit`, { 
            // flashcards:newCard
        // })
        // .then((res) => {
            // setFlashcards(deck.flashcards)
            // setDeck(res.data)
            // console.log(res)
            // console.log("flashcards should be updated now")
        console.log(deck);
    axios
    .put(`http://localhost:8000/deck/${deck}/add`, { flashcards })
    .then((response) => {
        console.log(response);
        navigate("/");
    })
    .catch((err) => {
        console.log(err.response.data.err.errors);
        setErrors(err.response.data.err.errors);
    });
    };

    return (
        <div className="p-3 bg-dark text-white container col-4 d-flex align-items-center justify-content-center"  style={{height:"100vh", width:"100%"}}>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label className='form-label'><h2 className="mt-3">Deck: </h2></label>
                    <select value={deck} className='form-control' onChange={(e) => setDeck(e.target.value)}>
                        <option value="" ></option>
                        {decks.map((deck, index)=> {
                            return(
                                <option key={index} value={deck._id}>{deck.name}</option>
                            )
                        })}
                    </select>
                <label htmlFor="name"><h5 className="fw-bold mt-3">word:</h5></label>
                <input
                    type="text"
                    className="form-control mt-1"
                    onChange={(e) => setFlashcards({...flashcards, [e.target.name] : e.target.value})}
                    name="word"
                    value={ flashcards.word }
                />
                {errors.word ? <span>{errors.flashcards.word.message}</span> : null}
            </div>
            <div className="form-group">
                <label htmlFor="name"><h5 className="fw-bold mt-3">meaning:</h5></label>
                <input
                    type="text"
                    className="form-control mt-1"
                    onChange={(e) => setFlashcards({...flashcards, [e.target.name] : e.target.value})}
                    name="meaning"
                    value={ flashcards.meaning }
                />
                {errors.meaning ? <span>{errors.flashcards.meaning.message}</span> : null}
            </div>
        <button className="btn btn-primary fw-bold mt-3" type="submit"> Add Card</button>
        </form>
        </div>
    );
};

export default CardForm
