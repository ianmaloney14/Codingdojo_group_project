import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const EditForm = (props) => {
    const {id} = useParams()

    const { deck, setDeck } = props
    const [ flashcards, setFlashcards ] = useState([])
    const [ name, setName ] = useState('')
    const [errors, setErrors ] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:8000/deck/${id}`)
        .then((res)=>{
            console.log(res)
            setName(res.data.name)
            setFlashcards(res.data.flashcards)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    const updateHandler = (e) => {
        e.preventDefault()
        console.log(name + "is getting updated")
        axios.put(`http://localhost:8000/deck/${id}/edit`, {
            name,
            flashcards
        })
        .then((res)=>{
            navigate('/')
            setDeck({...deck, deck: res.data})
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }
    return (
        <div>
            <form className="col-6 mx-auto" onSubmit={updateHandler}>
                <p>
                    <label className='form-label'>Name: </label>
                    <input value={name} className='form-control' type='text' onChange={(e)=> setName(e.target.value)}/>
                    { errors.name ? <span className='text-danger'>{errors.name}</span> :null}
                </p>
                <div>
                    <label className='form-label'>Flashcards: </label>
                    {flashcards.map((flashcard, index) => {
                        return(
                            <div key={flashcard._id} className="flashcard">
                                <p>{flashcard.word}</p>
                                <p>{flashcard.meaning}</p>
                            </div>
                    )})}
                </div>
                <input type="submit" className='btn btn-success' value="Update deck"></input>
            </form>
        </div>
    )
}
export default EditForm