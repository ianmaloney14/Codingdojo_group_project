import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'


const DeckList = (props) => {
    const {id, flashcardId} = useParams()
    const [ decks, setDecks ] = useState([]);
    const navigate = useNavigate();
    // const [randomCard, setRandomCard] = useState([])
    const [ flashcard, setFlashcard] = useState({})
    const [ flashcards, setFlashcards] = useState([])
    // const chooseCard = () => {
    //     axios.get(`http://localhost:8000/deck/${id}`)
    //     .then((res)=>{
    //             setDecks(res.data)
    //             setFlashcards(res.data.flashcards)
    //             const len = flashcards.length
    //             let nextCard = flashcards[Math.floor(Math.random() * len)]
                
    //         setRandomCard(nextCard)
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // })}
    useEffect(() => {
        axios.get("http://localhost:8000/decks")
            .then(res => setDecks(res.data))
            .catch(err => console.log(err))
    }, [])
    
    return (
        <div className="p-3 bg-dark text-white" style={{height:"100vh", width:"100%"}}>
            <h1>Deck List</h1>
            <div className="col col-6">
                {
                    decks.map((deck, index)=> {
                        return(
                            <div className='col col-6 mt-3 mx-auto px-2 view-edit-card' key={index}>
                                {/* icon for the deck */}
                                <Link to={`/deck/${deck._id}`}>{deck.name}</Link>
                                <div>
                                    {/* <select> */}
                                        <a><Link to={`/edit/${deck._id}`}>Edit Deck</Link></a>
                                        {/* <a> <Link to={`/deck/${deck._id}`}>View Deck</Link></a> */}
                                        {/* <option>
                                            <Link to={`/deck/${deck._id}/delete`}>Delete Deck</Link>
                                        </option> */}
                                    {/* </select> */}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default DeckList