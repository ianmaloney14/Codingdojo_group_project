import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const DeckList = (props) => {
    const [ decks, setDecks ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/decks")
            .then(res => setDecks(res.data))
            .catch(err => console.log(err))
    }, [])
    
    return (
        <div>
            <h1>Deck List</h1>
            <div>
                {
                    decks.map((deck, index)=> {
                        return(
                            <div className='col col-6 mt-3 px-2' key={index}>
                                {/* icon for the deck */}
                                <Link to={`/deck/${deck._id}`}>{deck.name}</Link>
                                <div>
                                    {/* <select> */}
                                        <a><Link to={`/edit/${deck._id}`}>Edit Deck</Link></a> |
                                        <a> <Link to={`/deck/${deck._id}`}>View Deck</Link></a>
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