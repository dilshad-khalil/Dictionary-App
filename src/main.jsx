import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import Nav from './Components/Nav'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Nav />
        <Routes>
            <Route path='/' element={ <App/> } />
        </Routes>
    </Router>
)
