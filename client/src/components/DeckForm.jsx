import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const DeckForm = (props) => {
    const [name, setName ] = useState("")
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/deck/create", { name })
        .then((response) => {
            console.log(response);
            navigate("/");
        })
        .catch((err) => {
            console.log(err.response.data.err.errors);
            setErrors(err.response.data.err.errors);
        });
    }
    return (
        <>
        <form onSubmit={ submitHandler }>
            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={ (e) => setName(e.target.value) } />
                {errors.name ? <p>{errors.name.message}</p> : null}
            </div>
            <div>
                <input type="submit" value="Submit" />
            </div>
        </form>
        </>
    )
}
export default DeckForm