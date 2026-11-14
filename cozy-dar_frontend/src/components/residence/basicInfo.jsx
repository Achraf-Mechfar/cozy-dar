import { Form_btn } from "../shared/inputfield";
import { FaRegHeart } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { LiaToiletSolid } from "react-icons/lia";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbBuildingCommunity } from "react-icons/tb";
import { jwtDecode } from "jwt-decode";
import {handleFavorite,getFavorites} from '../shared/fav_function'
import { useState,useEffect } from "react";
import { FaHeart } from "react-icons/fa";


const BasicInfo=({residence})=>{

    const units_number=residence.units.length;
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
    const [liked,setLiked]=useState(false)
    const [favorites,setFavorites]=useState([])

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
                        fav.target_id === residence.property_id && 
                        fav.target_type === 'residence'
                    );
                    setLiked(isLiked);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [residence.property_id]);

    const handleHeartClick = (e) => {
        const target = e.currentTarget || e.target;
        console.log(target)
        const NewLikeState=!liked
        handleFavorite(residence.property_id,'residence',setLiked,setFavorites,favorites,liked);
        if (target && NewLikeState) {
            target.classList.add('heart-beat');
            setTimeout(() => {
                target.classList.remove('heart-beat');
            }, 500)
        }
    };

    return(
        <section style={container}>
            {liked ? <FaHeart className='heart_liked' onClick={handleHeartClick}/> : <FaRegHeart className='heart' onClick={handleHeartClick}/>}
            <h2 style={{fontWeight:'500',marginBottom:'10px'}}>{residence.title}</h2>
            <p><span style={{fontWeight:'500',fontSize:'17px'}}>{residence.min_price}-{residence.max_price} Dt</span> /Night</p>
            <div style={{height:'0.5px',backgroundColor:'rgba(0, 0, 0, 0.1)',margin:'10px 0',width:'100%'}}></div>
            <h4 style={{fontWeight:'600',marginBottom:'10px'}}>Property Info</h4>
            <div style={prop_info}><div style={info}><GiPathDistance style={icon}/>{residence.distance_from_beach}m to the Beach</div><div style={info}><TbBuildingCommunity style={icon}/>{units_number} Units</div></div>
            <div style={info}><MdOutlineLocationOn style={icon}/>{residence.city}, {residence.district}</div>
            <div style={{height:'0.5px',backgroundColor:'rgba(0, 0, 0, 0.1)',margin:'10px 0',width:'100%'}}></div>
            <h4 style={{fontWeight:'600',marginBottom:'10px'}}>Check Availability & Reservation</h4>
            <div>aaa</div>
            <Form_btn text='Check Availability' style={{width:'100%',borderRadius:'10px'}}/>

        </section>
    )
}

export default BasicInfo;