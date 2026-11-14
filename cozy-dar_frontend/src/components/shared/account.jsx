import { Link,useNavigate } from 'react-router-dom'
import {InputField,Form_btn,GoogleAuthButton} from './inputfield'
import { useState } from 'react'
import { RxCross2, RxCursorArrow, RxTextAlignLeft } from "react-icons/rx";
import { jwtDecode } from 'jwt-decode';
const form_container={
    top:'0',
    right:'0',
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0, 0, 0, 0.3)',
    zIndex:'1000',
    position:'fixed',
    justifyContent:'center',
    paddingTop:'5vh',
    alignItems:'center'
    
}

const form_={
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    backgroundColor:'white',
    height:'fit-content',
    width:'27vw',
    borderRadius:'5px',
    padding:'1.2vw 1.5vw 4vh 1.5vw',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
}

const cross={
    fontSize:'20px',
    marginLeft:'auto',
    cursor:'pointer',
    
}

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const phoneRegex = /^\d{8}$/;

const Signup = ({display_s,setDisplay_s,setDisplay_l,setShowSuccess}) =>{
    const switch_sign=()=>{
        setDisplay_l("flex")
        setDisplay_s("none")
    }
    const [message,setMessage]=useState('');
    const [fullname,setFullname]=useState('');
    const [fullnameError,setFullnameError]=useState('');
    const [fullnameBlurred, setFullnameBlurred] = useState(false);
    const invalidChars = /[^a-zA-Z\s]/;
    
    const [password,setPassword]=useState('');
    const [passwordError,setPasswordError]=useState('');
    const [passwordBlurred, setPasswordBlurred] = useState(false);

    const [email,setEmail]=useState('');
    const [emailError,setEmailError]=useState('');
    const [emailBlurred, setEmailBlurred] = useState(false);

    const [confirmPassword,setConfirmPassword]=useState('');
    const [confirmPasswordError,setConfirmPasswordError]=useState('');
    const [confirmPasswordBlurred, setConfirmPasswordBlurred] = useState(false);

    const handleSubmit = () => {
      const validfullname=handleFullname(fullname)
      const validemail=handleEmail(email)
      const validpassword=handlePassword(password)
      const validconfirmpassword=handleConfirmPassword(confirmPassword)
      if(!validfullname && !validemail && !validpassword && !validconfirmpassword){
        const userData = {
            fullname,
            email,
            password,
        };
        console.log(userData)
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res => {if(res.ok){
          console.log("Signup successful")
            setShowSuccess(true);
            console.log("Signup successful1")
            switch_sign();
            }
            else{
                setMessage('Email already exists')
            }
            
        })
        
        .catch(err => {
            console.error("Signup error:", err);
        });
      }
    };

        const handleEmailBlur = (e) => {
            setEmailBlurred(true);
            if (!emailRegex.test(e)) {
              setEmailError('Please enter a valid email address.');
            } else {
              setEmailError('');
            }
          };

        const handleEmail = (e) => {
            if (e==='' || (emailBlurred && !emailRegex.test(e))) {
                setEmailError('Please enter a valid email address.');
                return true
              } else {
                setEmailError('');
              }
          };



          const handlePasswordBlur = (e) => {
            setPasswordBlurred(true);
            if (e.length < 8) {
              setPasswordError('Password should be at least 8 characters.');
            } else {
              setPasswordError('');
            }
          };
          const handlePassword = (e) => {
            if (e==='' || (passwordBlurred && e.length < 8 )) {
                setPasswordError('Password should be at least 8 characters.');
                return true
              } else {
                setPasswordError('');
              }
          };

          const handleFullnameBlur = (e) => {
            setFullnameBlurred(true);
            const fname=e.trim().toLowerCase();
            if (fname.length < 3 || fname.length > 50 || !fname.includes(' ') || invalidChars.test(fname)) {
              setFullnameError('Full name should contain letters and spaces.');
            } else {
              setFullnameError('');
            }
          };
          const handleFullname = (e) => {
            const fname=e.trim();
            if (e==='' || (fullnameBlurred && fname.length < 3 || fname.length > 50 || !fname.includes(' ') || invalidChars.test(fname))) {
                setFullnameError('Full name should contain letters and spaces.');
                return true
              } else {
                setFullnameError('');
              }
          };

          const handleConfirmPasswordBlur = (e) => {
            setConfirmPasswordBlurred(true);
            if (e !== password) {
              setConfirmPasswordError('Passwords do not match.');
            } else {
              setConfirmPasswordError('');
            }
          };
          const handleConfirmPassword = (e) => {
            if (confirmPasswordBlurred && e !== password) {
                setConfirmPasswordError('Passwords do not match.');
                return true
              } else {
                setConfirmPasswordError('');
              }
          };
    return(
        <div style={{...form_container,display:display_s}}>
            <div style={form_}>
                <RxCross2 style={cross} onClick={()=>{setDisplay_s("none")}}/> 
                <h3 style={{marginBottom:'7px',fontWeight:'500'}}>Welcome to CozyDar</h3>
                <h6>Step into a world where renting, buying</h6>
                <h6 style={{marginBottom:'25px'}}>and selling is simple</h6>
                <p style={{color:'red',fontSize:'14px',marginBottom:'10px'}}>{message}</p>
                <InputField style={{marginBottom:'12px'}} placeholder={'Full Name'} onChange={(e)=>(handleFullname(e.target.value),setFullname(e.target.value.toLowerCase()))} onBlur={(e)=>handleFullnameBlur(e.target.value)} error={fullnameError} value={fullname}/>
                <InputField style={{marginBottom:'12px'}} type={'email'} placeholder={'Email'} onChange={(e)=>(handleEmail(e.target.value),setEmail(e.target.value))} onBlur={(e)=>handleEmailBlur(e.target.value)} error={emailError} value={email}/>
                <InputField style={{marginBottom:'12px'}} type={'password'} placeholder={'Password'} onChange={(e)=>(handlePassword(e.target.value),setPassword(e.target.value))} onBlur={(e)=>handlePasswordBlur(e.target.value)} error={passwordError} value={password}/>
                <InputField style={{marginBottom:'12px'}} type={'password'} placeholder={'Confirm Password'} onChange={(e)=>(handleConfirmPassword(e.target.value),setConfirmPassword(e.target.value))} onBlur={(e)=>handleConfirmPasswordBlur(e.target.value)} error={confirmPasswordError} value={confirmPassword}/>
                <Form_btn text='Sign up' onClick={handleSubmit}/>
                <p style={{fontSize:'14px',margin:'15px auto 0 3%'}}>Already have an account ? <Link style={{fontSize:'14px',textDecoration:'underline'}} onClick={switch_sign}>Login</Link></p>
                <div style={{display:'flex',alignItems:'center',width:'95%',color:'#6C6C6C'}}>
                    <div style={{height:'0.5px',flex:'1',backgroundColor:'#a1a1a1'}}></div>
                    <span style={{margin:'12px'}}>or</span>
                    <div style={{height:'0.5px',flex:'1',backgroundColor:'#a1a1a1'}}></div>
                </div>
                <GoogleAuthButton/>
            </div>
        </div>
    )
}

const User_login = ({display_l,setDisplay_s,setDisplay_l,token,setToken,setFavorites}) =>{
    const [log_info,setLog_info]=useState('');
    const [password,setPassword]=useState('');
    const [userBlurred,setUserBlurred]=useState(false);
    const [userError,setUserError]=useState('');
    const [passwordError,setPasswordError]=useState('');
    const [message,setMessage]=useState('');
    const switch_sign=()=>{
        setDisplay_l("none")
        setDisplay_s("flex")
    }
    const handleSubmit = async() => {
      const validuser=handleUser(log_info)
      const validpassword=handlePassword(password)
      if(!validuser && !validpassword){
        const userData = {
            log_info,
            password,
        };

        const res= await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('fullname', data.fullname);
          localStorage.setItem('role', data.token.user_role);
          localStorage.setItem('user_id', data.token.userId);
          setToken(localStorage.getItem('token'));
          setDisplay_l("none")
          console.log(`Welcome, ${data.fullname}!`);
          const userId=jwtDecode(localStorage.getItem('token')).userId;
          console.log(userId)
          fetch('http://localhost:5000/favorites_ids/'+userId)
              .then(res => res.json())
              .then(data => {
                    setFavorites(data);
                  })
              .catch(err => console.error('Error fetching properties:', err));
        } else {
            setMessage(data.message);
        }

      }};

      const handleUserBlur = (e) => {
        setUserBlurred(true);
        if (!emailRegex.test(e)&&!phoneRegex.test(e)) {
          setUserError('Please enter a valid email or phone number.');
        } else {
          setUserError('');
        }
      };

    const handleUser = (e) => {
        if (e==='' || (userBlurred && !emailRegex.test(e)&&!phoneRegex.test(e))) {
            setUserError('Please enter a valid email or phone number.');
            return true
          } else {
            setUserError('');
          }
      };

      const handlePassword = (e) => {
        if (e ==='') {
            setPasswordError('Password is required.');
            return true
          } else {
            setPasswordError('');
          }
      };
    return(
        <div style={{...form_container,display:display_l}}>
            <div style={form_}>
                <RxCross2 style={cross} onClick={()=>{setDisplay_l("none")}}/> 
                <h3 style={{marginBottom:'7px',fontWeight:'500'}}>Welcome Back !</h3>
                <h6>Step into a world where renting, buying</h6>
                <h6 style={{marginBottom:'15px'}}>and selling is simple</h6>
                <p style={{color:'red',fontSize:'14px',marginBottom:'10px'}}>{message}</p>
                <InputField style={{marginBottom:'12px'}} placeholder={'Email or Phone Number'} onChange={(e)=>(handleUser(e.target.value.trim()),setLog_info(e.target.value.trim()))} onBlur={(e)=>handleUserBlur(e.target.value)} error={userError} value={log_info}/>
                <InputField style={{marginBottom:'12px'}}type={'password'} placeholder={'Password'} onChange={(e)=>(handlePassword(e.target.value),setPassword(e.target.value))} error={passwordError} value={password}/>
                <Form_btn text='Login' onClick={handleSubmit}/>
                <p style={{fontSize:'14px',margin:'15px auto 0 3%'}}>You don't have an account ? <Link style={{fontSize:'14px',textDecoration:'underline'}} onClick={switch_sign}>sign up</Link></p>
                <div style={{display:'flex',alignItems:'center',width:'95%',color:'#6C6C6C'}}>
                    <div style={{height:'0.5px',flex:'1',backgroundColor:'#a1a1a1'}}></div>
                    <span style={{margin:'12px'}}>or</span>
                    <div style={{height:'0.5px',flex:'1',backgroundColor:'#a1a1a1'}}></div>
                </div>
                <GoogleAuthButton/>
            </div>
        </div>
    )
}

const Profile_window=({token,setToken,profile_menu,setProfile_menu})=>{
    const container={
        display: 'flex',
        position: 'absolute',
        width:'max-content',
        top:'6vh',
        flexDirection: 'column',
        border:'1px solid #E0E0E0',
        backgroundColor:'white',
        borderRadius:'5px',

    }
    const items={
        padding:'12px 25px',
        cursor:'pointer',
    }
    const navigate=useNavigate()

    const logout=()=>{
        
        const path = window.location.pathname;
        localStorage.removeItem('token');
        localStorage.removeItem('fullname');
        localStorage.removeItem('role');
        localStorage.removeItem('user_id');
        setProfile_menu(false)
        setToken(null)
        if(path.startsWith('/adminpanel')||path.startsWith('/rentrequest')||path.startsWith('/myReservations')){
            navigate('/');
        }
    }
    console.log(localStorage.getItem('role'))
    return(
        <div style={container} className={`profile_window ${profile_menu ? 'show' : ''}`}>
          
            {jwtDecode(localStorage.getItem('token')).role==='admin' && (<><Link to="/adminpanel/reservations"><div style={items} onClick={()=>{setProfile_menu(false)}}>Admin Panel</div></Link><div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'80%',alignSelf:'center'}}></div></> )}
            {jwtDecode(localStorage.getItem('token')).role!=='visitor' && (<><Link to="/rentrequest/myProperties"><div style={items} onClick={()=>{setProfile_menu(false)}}>Owner Dashboard</div></Link><div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'80%',alignSelf:'center'}}></div></> )}
            <Link to="/myReservations"><div style={items} onClick={()=>{setProfile_menu(false)}}>My Reservations</div></Link>

            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'80%',alignSelf:'center'}}></div>
            <Link to="/profile"><div style={items} onClick={()=>{setProfile_menu(false)}}>Profile</div></Link>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'80%',alignSelf:'center'}}></div>
            <div style={items} onClick={logout}>Log Out</div>
        </div>
    )
}
export {Signup,User_login,Profile_window}