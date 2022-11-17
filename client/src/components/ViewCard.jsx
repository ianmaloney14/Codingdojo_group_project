import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
const ViewCard = (props) => {
    const {id, flashcardId} = useParams()
    const navigate = useNavigate()
    const [flashcard, setFlashcard] = useState({});
    const [show, setShow] = useState(false);
    const [flashcards, setFlashcards] = useState([]);

    const flipCard = () => {
        if(show == false) {
            setShow(true)
        } else{
            setShow(false);
        }
    }
    const changeCard = () =>{
        const len = flashcards.length
        let flashcardIdCopy = flashcardId
        let nextCard = flashcards[Math.floor(Math.random() * len)]
        flashcardIdCopy = nextCard._id
        console.log(nextCard.word + "is the next card")
        const uniqueCards = []
        uniqueCards.push(flashcardIdCopy)
        const unique = uniqueCards.filter(element => {
                const isDuplicate = uniqueCards.includes(element._id);
                if (!isDuplicate) {
                    uniqueCards.push(element._id)
                    return true
                }
                return false
            });
        console.log(uniqueCards)
        for(let i=0; i<uniqueCards.length; i++) {
            if(flashcardIdCopy==uniqueCards[i]._id){
                nextCard = flashcards[Math.floor(Math.random() * len)]
            } else{
                console.log(nextCard.word + nextCard.meaning)
                break
            }
        }
        // if (flashcardIdCopy === nextCard._id) {
        //     nextCard = flashcards[Math.floor(Math.random() * len)];
        //     flashcardIdCopy = nextCard._id
            // changeCard()
            // if (flashcardId === nextCard._id){
            //     flashcard.pop([0])
            //     //nextCard = flashcards[Math.floor(Math.random() * len)];
            // } else {
            //     break;
            // }
            console.log(nextCard._id);
            console.log(flashcardIdCopy);
            axios.get(`http://localhost:8000/deck/${id}/${flashcardIdCopy}`)         
            .then((res)=>{
                setFlashcard(res.data[0].flashcards[0])
            }).catch((err)=>{
                console.log(err)
            })
        }
    useEffect(() => {
        axios.get(`http://localhost:8000/deck/${id}`)
        .then((res)=>{
            setFlashcards(res.data.flashcards); 
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])
        

    useEffect(() => {
        axios.get(`http://localhost:8000/deck/${id}/${flashcardId}`)
        .then((res)=>{
            setFlashcard(res.data[0].flashcards[0]);
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])
    return (
        <div className="p-3 mb-2 bg-dark text-white" style={{height:"100vh", width:"100%"}}>
            <h1>{flashcard.word}</h1>
            {
                show &&
                    <div>
                        <h1>{flashcard.meaning}</h1>
                    </div>
            }
            <button onClick={flipCard}>Flip</button>
            <div>
                <button onClick={changeCard}>
                    Next Card
                    </button>
            </div>
        </div>

        
    )
}
export default ViewCard