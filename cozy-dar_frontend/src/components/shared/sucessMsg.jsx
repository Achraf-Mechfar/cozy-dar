import React, { useEffect } from 'react';

const SuccessMessage = ({ show, message = "Request Added Successfully",setShow , style,error=false}) => {
  useEffect(() => {
    if (show) {
      console.log("show:",show)
      const timer = setTimeout(() => setShow(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [show]);
  console.log("show:",show)
  if (!show) return null;
  console.log("error:",error)
  return (
    <div style={{
      position: 'fixed',
      top: '10vh',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '10px 25px',
      color: 'white',
      borderRadius: '5px',
      zIndex: 1001,
      ...style,
      backgroundColor: error?'#ff00009e':'#0dbb0d9e',
    }}>
      {message}
    </div>
  );
};

export default SuccessMessage;