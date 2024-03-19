//import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import LettreDetails from './Lettre/LettreDetails';
import GetLettres from "./Lettres/GetLettres.jsx";
import BasicNavbar from "./Navbar/BasicNavbar.jsx";
import ListeLotDeLettres from "./Lettres/ListeLotDeLettres.jsx";
import UpdateLettre from "./Lettre/UpdateLettre.jsx";


function App() {
    return (
        <Router>
            <BasicNavbar/>
            <Routes>
                <Route path="/" element={<GetLettres/>}/>
                <Route path="/lettre/:lettreId" element={<LettreDetails/>}/>
                <Route path="/lotdelettres" element={<ListeLotDeLettres/>}/>
                <Route path="/update-lettre/:lettreId" element={<UpdateLettre/>}/>
            </Routes>
        </Router>
    )
}

export default App
