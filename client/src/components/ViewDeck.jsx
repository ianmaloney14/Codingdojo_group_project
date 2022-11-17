import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
const ViewDeck = (props) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [deck, setDeck]= useState({})
    const [flashcards, setFlashcards] = useState([]);

    const deleteHandler = (deckId) => {
        axios.delete(`http://localhost:8000/deck/${deckId}/delete`)
            .then(res => navigate("/"))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        axios.get (`http://localhost:8000/deck/${id}`)
        .then((res)=>{
            setDeck(res.data);
            setFlashcards(res.data.flashcards);
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])
    return (
        <div>
            <h1>{deck.name}</h1>
            <button className='btn btn-danger' onClick={(e)=>deleteHandler(deck._id)}>Delete Deck</button>
            {
                flashcards.map((flashcard, index)=>{
                    return(
                        <div key={index} className=" container flashcard">
                            <div><p>{flashcard.word}</p></div>
                            <div><p>{flashcard.meaning}</p></div>
                            <div className='view-edit-card'>
                                <NavLink to={`/deck/${deck._id}/${flashcard._id}`}>View Card </NavLink>| 
                                <NavLink to={`/edit/${deck._id}/${flashcard._id}`}> Edit Card</NavLink>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ViewDeck