import react,{ useState,useRef,useEffect} from 'react';
import { Link,useLocation } from "react-router-dom";
import {FaRegHeart} from "react-icons/fa";
import {IoIosArrowDown} from "react-icons/io";
import {Signup,User_login,Profile_window} from "./account";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AddPropertyForm } from '../AddPropertyForm/AddPropertyForm';


const Navbar = ({display_s, setDisplay_s, display_l, setDisplay_l, token, setToken,favorites,setFavorites}) => {
    const [fullname, setFullname] = useState(localStorage.getItem('fullname'));
    const [showSuccess,setShowSuccess]=useState(false)
    const navigate=useNavigate();
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path ? { color: 'rgb(10, 93, 187)',scale:'1.1',transition:'all 0.1s ease-in-out' } : {};
    };
    
    const [profile_menu, setProfile_menu] = useState(false);
    const toggleProfile_menu = () => {
        setProfile_menu(prev => !prev); // toggles between true/false
      };
    useEffect(() => {
        if(!localStorage.getItem('token')){
            setToken(null)
        }
        
    }, [navigate]);

    const [isOpen,setIsOpen]=useState(false);



    const dropdownRef = useRef();
    const toggleDropdown = () => {
        setIsOpen(prev => !prev); // toggles between true/false
      };
    
      const closeDropdown = () => {
        setIsOpen(false); // closes the dropdown
      };


    const nav_elements={
        padding:'0 6vw',
        borderBottom:'1px solid #E0E0E0',
        backgroundColor:'white',
        display:'flex',
        height:'7.5vh',
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between',
        position:'fixed',
        top:0,
        userSelect: 'none',


        }

    const nav_menu={
        marginRight:'2.5vw',
    }

    const signup={
        backgroundColor: '#007BFF',
        padding: '1.25vh 1.7vw',
        borderRadius:'20px',
        color:'white',
    }

    const prop_dropdown={
        cursor: 'pointer',
        
    }

    const prop_dropdown_items={
        display: 'flex',
        position: 'absolute',
        left:'-0.7vw',
        top:'4vh',
        flexDirection: 'column',
        border:'1px solid #E0E0E0',
        width:'105%',
        backgroundColor:'white',
    }
    const prop_dropdown_option={
        padding:'0.7vw 0 0.7vw 0.7vw',
        borderBottom:'1px solid #E0E0E0',
        cursor:'pointer',
    }
    const profile={
        display:'flex',
        alignItems:'center',
        borderRadius:'20px',
        border:'1px solid #000',
        cursor: 'pointer',
        padding:'4px ',
        paddingRight:'10px'
    }
    return (
        <div style={{position:'relative',zIndex:'1000'}}>
        <nav style={nav_elements}>
            <div style={{display:'flex',alignItems:'center',}}>
                <Link style={{fontSize:'25px',marginRight:'4.5vw',marginBottom:'0.6vh'}} to="/" >CozyDar</Link>
                <Link style={{...nav_menu,...isActive('/')}} to="/" >Home</Link>
                <Link style={{...nav_menu,...isActive('/rent')}} to="/rent">Rent</Link>
                <Link style={{...nav_menu,...isActive('/buy')}} to="/buy">Buy</Link>
                {((!localStorage.getItem('token')) ||jwtDecode(localStorage.getItem('token')).role==='visitor') && (<div style={{...nav_menu,...isActive('/rentrequest/addRequest'),cursor:'pointer'}} onClick={()=>{localStorage.getItem('token')?navigate('/rentrequest/addRequest'):setDisplay_s('flex')}}>List a property</div>)}
                {(localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).role==='owner') && (<div style={{...nav_menu,...isActive('/rentrequest/*'),cursor:'pointer'}} onClick={()=>{navigate('/rentrequest/myProperties')}}>Owner Dashboard</div>)}

            </div>
            <div style={{display:'flex',alignItems:'center',}}>
            <Link style={{marginRight:'1.7vw'}} to="/favorite"> <FaRegHeart style={{ color: 'black',fontSize:'20px',marginTop:'0.6vh'}} /></Link>
            {token?(<div tabIndex={0} onBlur={(e) => {if (!e.currentTarget.contains(e.relatedTarget)) {setProfile_menu(false);}}} style={{position:'relative'}} ><div style={profile} onClick={toggleProfile_menu} className='no-select'><CgProfile style={{color:'#000',fontSize:'22px',marginRight:'7px'}}/> {localStorage.getItem('fullname')}</div>{profile_menu &&<Profile_window setToken={setToken} token={token} profile_menu={profile_menu} setProfile_menu={setProfile_menu}/>}</div>):(
            <>
            <Link style={{marginRight:'1.7vw'}} onClick={()=>{setDisplay_l('flex')}}>Login</Link>
            <Link style={signup} onClick={()=>{setDisplay_s('flex')}}>Sign Up</Link>
            </>)}
            </div>
        </nav>
        </div>
  );
};
export default Navbar;