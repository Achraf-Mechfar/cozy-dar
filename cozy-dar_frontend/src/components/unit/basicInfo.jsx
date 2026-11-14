import { Form_btn } from "../shared/inputfield";
import { FaHeart,FaRegHeart } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { LiaToiletSolid } from "react-icons/lia";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlineLocationOn } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';
import { DateRangeInput } from '../shared/calendar'
import { useState,useEffect } from "react";
import ConfirmReservation from './confirm_reservation'
import { setHours } from "date-fns";
import SuccessMsg from '../shared/sucessMsg'
import {handleFavorite,getFavorites} from '../shared/fav_function'

const BasicInfo=({unit_info,display_s, setDisplay_s, display_l, setDisplay_l, token, setToken})=>{
    const {unit,property,amenities}=unit_info
    const [selectedRange, setSelectedRange] = useState({
        startDate: setHours(new Date(),10,0,0,0),
        endDate: setHours(new Date(),10,0,0,0)
      });
    const [btn_bg,setBtn_bg]=useState('rgb(186, 186, 186)')
    const [confirmation,setConfirmation]=useState(false)
    const [showSuccess,setShowSuccess]=useState(false)
    const [msg,setMsg]=useState('')
    const [favorites,setFavorites]=useState([])
    const [liked,setLiked]=useState(false)

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                console.log('aaaa')
                const favs = await getFavorites();
                console.log(favs)
                console.log('bbbb')

                if (favs && Array.isArray(favs)) {
                    setFavorites(favs);
                    const isLiked = favs.some(fav => 
                        fav.target_id === unit.unit_id && 
                        fav.target_type === 'unit'
                    );
                    setLiked(isLiked);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [unit.unit_id]);


    const container={
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)',
        border:'1px solid rgba(0, 0, 0, 0.03)',
        height:'fit-content',
        padding:'40px 30px',
        borderRadius:'10px',
        display:'flex',
        flexDirection:'column',
        gap:'10px',
        position: 'sticky',
        top:'12.5vh',


    }

    const icon={
        fontSize:'16px',
        marginRight:'10px',
    }

    const info={
        display:'flex',
        alignItems:'center',
        gap:'5px'
    }
    const prop_info={
        display:'flex',
        flexDirection:'row',
        gap:'10px 35px',
        flexWrap:'wrap',
    }
    console.log(unit_info.unit)
    console.log(unit)
    console.log(property)

    const handleHeartClick = (e) => {
        const target = e.currentTarget || e.target;
        console.log(target)
        const NewLikeState=!liked
        handleFavorite(unit.unit_id,'unit',setLiked,setFavorites,favorites,liked);
        if (target && NewLikeState) {
            target.classList.add('heart-beat');
            setTimeout(() => {
                target.classList.remove('heart-beat');
            }, 500);
        }
    };
    const available_from=unit.available_from?'Available from '+dayjs(unit.available_from).format('DD MMMM YYYY'):'Available'
    return(
        <section style={container}>
            <SuccessMsg show={showSuccess} message={msg} setShow={setShowSuccess}/>
            {liked ? <FaHeart className='heart_liked' onClick={handleHeartClick}/> : <FaRegHeart className='heart' onClick={handleHeartClick}/>}
            <h2 style={{fontWeight:'500',marginBottom:'10px'}}>{unit.unit_title}</h2>
            <p><span style={{fontWeight:'500',fontSize:'17px'}}>{unit.price_per_night}Dt</span> /Night</p>
            <p>{available_from}</p>
            <div style={{height:'0.5px',backgroundColor:'rgba(0, 0, 0, 0.1)',margin:'10px 0',width:'100%'}}></div>
            <h4 style={{fontWeight:'600',marginBottom:'10px'}}>Property Info</h4>
            <div style={prop_info}><div style={info}><IoBedOutline style={icon}/>S+{unit.rooms}</div><div style={info}><LiaToiletSolid style={icon}/>{unit.bathrooms}Bath</div><div style={info}><GiPathDistance style={icon}/>{property.distance_from_beach}m to the Beach</div></div>
            <div style={info}><MdOutlineLocationOn style={icon}/>{property.city}, {property.district}</div>
            <div style={{height:'0.5px',backgroundColor:'rgba(0, 0, 0, 0.1)',margin:'10px 0',width:'100%'}}></div>
            <h4 style={{fontWeight:'600',marginBottom:'10px'}}>Check Availability & Reservation</h4>
            <DateRangeInput setBtn_bg={setBtn_bg} setSelectedRange={setSelectedRange} selectedRange={selectedRange} unit_id={unit.unit_id} setShowSuccess={setShowSuccess} setMsg={setMsg}/>
            <Form_btn text='Start Reservation' style={{width:'100%',borderRadius:'10px',backgroundColor:btn_bg}} onClick={()=>{if(btn_bg==='#007bff')setConfirmation(true)}}/>
            {confirmation && <ConfirmReservation unit_info={unit_info} selectedRange={selectedRange} display_s={display_s} setDisplay_s={setDisplay_s} display_l={display_l} setDisplay_l={setDisplay_l} token={token} setConfirmation={setConfirmation}/>
            }

        </section>
    )
}

export default BasicInfo;