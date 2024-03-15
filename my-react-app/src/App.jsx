import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import LettreDetails from './Lettre/LettreDetails';
import GetLettres from "./Lettres/GetLettres.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GetLettres/>}/>
                <Route path="/lettre/:id" element={<LettreDetails/>}/>
            </Routes>
        </Router>

    )
}

export default App
