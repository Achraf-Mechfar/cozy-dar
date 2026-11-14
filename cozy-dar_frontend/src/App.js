import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/navbar.jsx';
import HomeScreen from './pages/homescreen.jsx';
import Unit from './pages/unit.jsx';
import Residence from './pages/residence.jsx';
import Adminpanel from './pages/adminpanel.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import RentRequest from './pages/rentrequest.jsx';
import Rent from './pages/rent.jsx';
import { useState } from 'react';
import { Signup, User_login } from './components/shared/account';
import SuccessMessage from './components/shared/sucessMsg';
import MyReservations from './pages/myReservations';
import Favorite from './pages/favorite';
import AddPropertyForm from './components/AddPropertyForm/AddPropertyForm';
import Profile from './pages/profile';
function App() {
  const [display_s,setDisplay_s]=useState('none')
  const [display_l,setDisplay_l]=useState('none')
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showSuccess,setShowSuccess]=useState(false)
  const [favorites, setFavorites] = useState([]); 
  return (
    <GoogleOAuthProvider clientId="579770666613-ih0nqbcp03hieibuqna9s7joc5anj373.apps.googleusercontent.com">
      <Router>
        <Navbar display_s={display_s} setDisplay_s={setDisplay_s} display_l={display_l} setDisplay_l={setDisplay_l} token={token} setToken={setToken} favorites={favorites} setFavorites={setFavorites}/>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/unit/:unit_id" element={<Unit display_s={display_s} setDisplay_s={setDisplay_s} display_l={display_l} setDisplay_l={setDisplay_l} token={token} setToken={setToken} setFavorites={setFavorites} favorites={favorites}/>}/>
          <Route path="/residence/:property_id" element={<Residence favorites={favorites} setFavorites={setFavorites}/>}/>
          <Route path="/adminpanel/*" element={<Adminpanel/>} />
          <Route path="/rentrequest/*" element={<RentRequest/>} />
          <Route path="/rent" element={<Rent favorites={favorites} setFavorites={setFavorites}/>} />
          <Route path="/myReservations" element={<MyReservations/>} />
          <Route path="/favorite" element={<Favorite/>}/>
          <Route path="/addfirstRequest" element={<AddPropertyForm/>}/>
          <Route path="/profile" element={<Profile setToken={setToken}/>}/>
        </Routes>
        {display_s!=='none' && <Signup display_s={display_s} setDisplay_s={setDisplay_s} setDisplay_l={setDisplay_l} setShowSuccess={setShowSuccess}/>}
        {display_l!=='none' && <User_login display_l={display_l} setToken={setToken} setDisplay_s={setDisplay_s} setDisplay_l={setDisplay_l} setFavorites={setFavorites}/>}
        <SuccessMessage show={showSuccess} message="Registration Successful. Please log in to continue" setShow={setShowSuccess} />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
