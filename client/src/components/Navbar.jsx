// import { useEffect, useState } from 'react'
// import axios from 'axios'
import {  NavLink } from 'react-router-dom'
const Navbar = () => {
    // code here
    return (
        <>
        <header>
            <nav>
                <ul className='nav-list'>
                    <li className='nav-list-items'><NavLink to="/">View Decks</NavLink></li>
                    <li className='nav-list-items'><NavLink to="/deckForm">Add Deck</NavLink></li>
                    <li className='nav-list-items'><NavLink to="/cardForm">Add Card</NavLink></li>
                </ul>
            </nav>
        </header>
        </>
    )
}
export default Navbar