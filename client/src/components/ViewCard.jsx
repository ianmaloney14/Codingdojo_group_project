import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
const ViewCard = (props) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [deck, setDeck]= useState({})
    const [flashcard, setFlashcard] = useState('');

    useEffect(() => {
        axios.get (`http://localhost:8000/deck/${id}`)
        .then((res)=>{
            setDeck(res.data);
            setFlashcard(res.data.flashcards);
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])
    return (
        <div>
            <h1>{flashcard.word}</h1>
        </div>
    )
}
export default ViewCard