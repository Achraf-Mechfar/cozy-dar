import { format, differenceInCalendarDays } from "date-fns";
import { InputField } from "../shared/inputfield";
import { Form_btn } from "../shared/inputfield";
import { FaRegCalendarCheck  } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { useState,useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


const ConfirmReservation=({unit_info,selectedRange,display_s, setDisplay_s, display_l, setDisplay_l,token,setToken,setConfirmation})=>{
    const container={
        display:'flex',
        flexDirection:'row',
        gap:'10px',
        position:'fixed',
        top:'0',
        right:'0',
        width:'100%',
        height:'100%',
        backgroundColor:'white',
        zIndex:'2000',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5vh',
        padding:'0 12%',
    }
    const img_container={
        display:'flex',
        gap:'10px',
        justifyContent:'center',
        alignItems:'center',
    }
    const img={
        width:'140px',
        height:'auto',
        borderRadius:'5px',
    }

    const nights = differenceInCalendarDays(selectedRange.endDate, selectedRange.startDate);
    const total_price = unit_info.unit.price_per_night * nights;
    const [fullname,setFullname]=useState(localStorage.getItem('fullname'));
    const [fullnameBlurred, setFullnameBlurred] = useState(false);
    const [fullnameError, setFullnameError] = useState('');
    const invalidChars = /[0-9]/;
    const [phone,setPhone]=useState(jwtDecode(localStorage.getItem('token')).phone?jwtDecode(localStorage.getItem('token')).phone:'');
    const [phoneBlurred, setPhoneBlurred] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [message,setMessage]=useState('');
    const [messageBlurred, setMessageBlurred] = useState(false);
    const [messageError, setMessageError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
          setDisplay_s('flex');
        }
      }, [token, setDisplay_s]);

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

      const handlePhoneBlur = (e) => {
        setPhoneBlurred(true);
        if (e.trim().length !== 8 || isNaN(e.trim())) {
          setPhoneError('Please enter a valid phone number.');
        } else {
          setPhoneError('');
        }
      };

    const handlePhone = (e) => {
        if (e==='' || (phoneBlurred && (e.trim().length !== 8 || isNaN(e.trim())))) {
            setPhoneError('Please enter a valid phone number.');
            return true
          } else {
            setPhoneError('');
          }
      };
      console.log(jwtDecode(localStorage.getItem('token')).userId)
      const handleSubmit = () => {
        const validfullname=handleFullname(fullname)
        const validphone=handlePhone(phone)
        if(!validfullname && !validphone){
          const ReservationData = {
            user_id:jwtDecode(localStorage.getItem('token')).userId,
            phone,
            message,
            unit_id:unit_info.unit.unit_id,
            check_in:selectedRange.startDate,
            check_out:selectedRange.endDate,
            total_price:total_price,
          };
          console.log(selectedRange.startDate)
          console.log(selectedRange.endDate)
          console.log(ReservationData)
          fetch('http://localhost:5000/reservations/add_reservation', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(ReservationData)
          })
          .then(async response =>{
            const data = await response.json();
              if(response.status===201){
                console.log(data.message)
                setConfirmation(false)
                navigate(`/myReservations`,{state:{showSuccess:true,message:data.message,color:'#0dbb0d9e'}})
              }
              else{
                setConfirmation(false)
                navigate(`/unit/${unit_info.unit.unit_id}`,{state:{showSuccess:true,message:data.message,color:'#ff00009e'}})
              }
          })
          .catch((error) => {
              console.error('Error:', error);
          });
        }
      };
    return(
        <div style={container}>
            <section style={{width:'60%',display:'flex',gap:'10px',flexDirection:'column'}}>
                <h2 style={{fontWeight:'500'}}>Confirm Reservation</h2>
                <div style={{display:'flex',gap:'13px',flexDirection:'column',padding:'20px'}}>
                    <InputField placeholder='Full Name' style={{width:'65%'}} onChange={(e)=>(handleFullname(e.target.value),setFullname(e.target.value.trim().toLowerCase()))} onBlur={(e)=>handleFullnameBlur(e.target.value)} error={fullnameError} value={fullname}/>
                    <InputField placeholder='Phone' style={{width:'65%'}} onChange={(e)=>(handlePhone(e.target.value),setPhone(e.target.value))} onBlur={(e)=>handlePhoneBlur(e.target.value)} error={phoneError} value={phone}/>
                    <InputField placeholder='Message (Optional)' style={{width:'65%'}} onChange={(e)=>setMessage(e.target.value)} error={messageError} value={message}/>
                    <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'65%',margin:'10px 0'}}></div>
                    <h4 style={{fontWeight:'500',margin:'0 0 10px -10px'}}>How Reservation Works</h4>
                    <div style={{display:'flex',gap:'10px',flexDirection:'row',alignItems:'center'}}><FaRegCalendarCheck style={{color:'#007bff',fontSize:'17px'}}/><p>Pick your dates</p></div>
                    <div style={{display:'flex',gap:'10px',flexDirection:'row',alignItems:'center'}}><FaRegUser  style={{color:'#007bff',fontSize:'17px'}}/><p>Provide your info</p></div>
                    <div style={{display:'flex',gap:'10px',flexDirection:'row',alignItems:'center'}}><FiPhone  style={{color:'#007bff',fontSize:'17px'}}/><p>We'll contact you to finalize <br/>details and payment process</p></div>
                    <p style={{fontSize:'11px',margin:'10px 0'}}>You can confirm your reservation by paying a 10% advance via bank transfer.<br/>
                    The rest will be paid on arrival at the property.</p>
                    <Form_btn text='Confirm Reservation' style={{width:'65%',backgroundColor:'#007bff'}} onClick={handleSubmit}/>
                </div>
            </section>
            <section style={{width:'35%',display:'flex',gap:'20px',border:'1px solid rgba(173, 173, 173, 0.29)',borderRadius:'10px',padding:'20px',flexDirection:'column',boxShadow:'0px 0px 20px rgba(0, 0, 0, 0.06)'}}>
                    <div style={{display:'flex',gap:'10px',flexDirection:'row',alignItems:'center'}}>
                        <img src={unit_info.unit.image_urls[0]} style={img}/>
                        <div style={{display:'flex',gap:'5px',flexDirection:'column'}}>
                            <p style={{fontWeight:'500',fontSize:'17px'}}>{unit_info.unit.unit_title}</p>
                            <p style={{fontSize:'14px'}}>{unit_info.property.city}, {unit_info.property.district}</p>
                            <p style={{fontSize:'14px'}}>{unit_info.unit.price_per_night}Dt /Night</p>
                        </div>
                    </div>
                    <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
                    <div style={{display:'flex',gap:'10px',flexDirection:'column'}}>
                        <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}><p>Check-in</p><p>{format(selectedRange.startDate, "dd MMM yyyy")}</p></div>
                        <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}><p>Check-out</p><p>{format(selectedRange.endDate, "dd MMM yyyy")}</p></div>
                        <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}><p>Nights</p><p>{nights}</p></div>
                    </div>
                    <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
                    <div>
                        <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}><h3 style={{fontWeight:'600'}}>Total Price</h3><div style={{display:'flex',gap:'5px',flexDirection:'column',alignItems:'flex-end'}}><p style={{fontSize:'12px'}}>{nights} x {unit_info.unit.price_per_night}Dt =</p><h3>{total_price}Dt</h3></div></div>
                    </div>
                    <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
                    <div style={{display:'flex',gap:'7px',flexDirection:'column',textAlign:'right'}}>
                        <p style={{fontSize:'12px'}}>10% Advance amount: {total_price * 0.1}Dt</p>
                        <p style={{fontSize:'12px'}}>Pay the rest by {format(selectedRange.startDate, "dd MMM yyyy")}: {total_price * 0.9}Dt</p>
                    </div>

            </section>
        </div>
    )
}
export default ConfirmReservation