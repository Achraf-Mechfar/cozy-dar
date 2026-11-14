import React, { useRef } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';


const InputField = ({ type = "text", placeholder, value, onChange, onBlur, error,style,min,defaultValue}) => {
    const [active,setActive]=useState(false);
    const inputRef=useRef();
    const isFloating = (active || value);

    const inputfield={
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${active ? "#000" : "#a1a1a1"}`,
        borderRadius: '5px',
        fontSize:'14px',
        height:'inherit',
        position:'relative',
        
    }
    const container={
        display:'flex',
        flexDirection:'column',
        width:'95%',
        transition:'all 0.2s ease-in-out',
        ...style,
    }
    const labelStyle = {
      position: "absolute",
      left: 15,
      top: isFloating ? 0 : "50%",
      fontSize: isFloating ? 11 : 14,
      color: isFloating ? "#000" : "#a1a1a1",
      background: "#fff",
      padding: "0 3px",
      transform: isFloating ? "translateY(-50%)" : "translateY(-50%)",
      transition: "all 0.2s",
      pointerEvents: "none",
      zIndex: 2,
    };
  return (
    <div style={container}>
      <div style={inputfield}>
        <label style={labelStyle}>{placeholder}</label>
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          defaultValue={defaultValue}
          onBlur={e => {
            if (onBlur) onBlur(e);
            setActive(false);
          }}
          style={{border: 'none',outline: 'none',width:'100%',padding: '10px 15px',borderRadius:'5px'}}
          onFocus={()=>{setActive(true)}}
        />
      </div>
      <p style={{color:'red',margin:'5px 0 0 5px',fontSize:'12px'}}>{error}</p>
    </div>
  );
};

const Form_btn=({text,onClick,style})=>{
    const btn_style={      
      ...style,
    }
    return(
        <button style={btn_style} className='form_btn' onClick={onClick}>
            {text}
        </button>
    )
}


const GoogleAuthButton = ({ onSuccess, onError }) => {
  return (
    <div style={{ width: '95%'}}>
    <GoogleLogin
      onSuccess={credentialResponse => {console.log(credentialResponse);}}
      onError={() => {console.log('Login Failed');}}
      render={renderProps => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          style={{
            width: '100%',
            height: '45px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="google"
            style={{ height: '20px' }}
          />
          Sign in with Google
        </button>
      )}
    />
    </div>
  );
};

export { InputField,Form_btn,GoogleAuthButton}