import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const EditCard = (props) => {
    const { id, flashcardId } = useParams()
    const [ word, setWord ] = useState('')
    const [ meaning, setMeaning ] = useState('')
    const [ errors, setErrors ] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:8000/deck/${id}/${flashcardId}`)
        .then((res)=>{
            console.log(res)
            setWord(res.data[0].flashcards[0].word)
            setMeaning(res.data[0].flashcards[0].meaning)
            // setFlashcard(res.data.flashcards)
            // console.log(setFlashcard)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    const updateHandler = (e) => {
        e.preventDefault()
        // console.log("id of updated deck=========", flashcardId)
        axios.put(`http://localhost:8000/edit/${id}/${flashcardId}`, {
            word,
            meaning
        })
        .then((res)=>{
            setWord(res.word)
            setMeaning(res.meaning)
            navigate('/')
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }
    const deleteHandler = (e) => {
        axios.put(`http://localhost:8000/deck/${id}/delete/${flashcardId}`)
        .then((res)=>{
            console.log('Deleted from deck')
            navigate('/')
        }).catch((err)=>{
            console.log(err)
            console.log(err.response)
        })
    }
    return (
        <div>
            <form className="col-6 mx-auto" onSubmit={updateHandler}>
                <p>
                    <label className='form-label'>Word: </label>
                    <input value={word} className='form-control' type='text' onChange={(e)=> setWord(e.target.value)}/>
                    { errors.word ? <span className='text-danger'>{errors.word.message}</span> :null}
                </p>
                <p>
                    <label className='form-label'>Meaning: </label>
                    <input value={meaning} placeholder={meaning} className='form-control' type='text' onChange={(e)=> setMeaning(e.target.value)}/>
                    { errors.meaning ? <span className='text-danger'>{errors.meaning.message}</span> :null}
                </p>
                <input type="submit" className='btn btn-success' value="Update Card"></input>
            </form>
            <div>
                <button onClick={(e)=>deleteHandler(flashcardId)} className="btn btn-danger">Delete Flashcard</button>
            </div>
        </div>
    )
}
export default EditCard