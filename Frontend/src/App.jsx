import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrganizerLogin from './components/organizer/OrganizerLogin'
import AlumniLogin from './components/Alumni/AlumniLogin'
import Header from './components/Common/Header'
import Organizer from './Pages/Organizer';
// import Footer from './components/Common/Footer';
import Home from './Pages/Home';
import Alumni from './Pages/Alumni';
import About from './components/Common/About'
import './App.css';

function App() 
{
  return (
    <Router>
      <Header />
      <Routes>

        <Route path="/" element={<Home />} /> 
        <Route path="/About" element={<About/>} /> 
        <Route path="/organizer-login" element={<OrganizerLogin />} />
        <Route path="/alumni-login" element={<AlumniLogin />} />
        <Route path="/organizer/*" element={<Organizer />} />
        <Route path="/alumni/dashboard/*" element={<Alumni />} />   

      </Routes>    
     
    </Router> 
  );
}

export default App;
