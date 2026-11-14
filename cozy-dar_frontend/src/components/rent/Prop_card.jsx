
import { useState,useEffect } from "react"
import dayjs from 'dayjs';
import { IoBedOutline } from "react-icons/io5";
import { LiaToiletSolid } from "react-icons/lia";
import { GiPathDistance } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import {handleFavorite} from '../shared/fav_function'

const Prop_card=({property, onClick, isSelected, favorites,setFavorites})=>{

    const [showUnits,setShowUnits]=useState(false)


    const icon={
        fontSize:'16px',
    }
    const prop_info={
        display:'flex',
        gap:'25px',
        flexDirection:'row',
        alignItems:'center',

    }
    const info={
        display:'flex',
        gap:'7px',
        flexDirection:'row',
        alignItems:'center',
        fontSize:'14px',
    }

    const img_container={
        display:'flex',
        gap:'10px',
        justifyContent:'center',
        alignItems:'center',
        width:'40%',
    }
    const img={
        width:isSelected?'230px':'180px',
        height:'auto',
        borderRadius:'5px',
        transition: 'all 0.3s ease-in-out',
        aspectRatio: '16/12',

    }
    const available_from=property.units[0].available_from?'Available from '+dayjs(property.units[0].available_from).format('DD MMMM YYYY'):'Available'
    const [liked,setLiked]=useState(favorites.find(fav=>fav.target_id===(property.property_type==='Residence'?property.property_id:property.units[0].unit_id)&&(fav.target_type===property.property_type==='Residence'?'residence':'unit')))

    console.log(property)
    console.log(favorites)
    const handleHeartClick = (e) => {
        e.stopPropagation();
        const target = e.currentTarget || e.target;
        const NewLikeState=!liked
        handleFavorite(property.property_type==='Residence'?property.property_id:property.units[0].unit_id,property.property_type==='Residence'?'residence':'unit',setLiked,setFavorites,favorites,liked);
        if (target && NewLikeState) {
            target.classList.add('heart-beat');
            setTimeout(() => {
                target.classList.remove('heart-beat');
            }, 500);
        }
    };


    return( 
        <section style={{
            cursor: 'pointer',
            padding: '15px 20px',
            borderRadius:'8px',
            boxShadow:isSelected?'0 0 10px 2px rgba(0,0,0,0.1)':'none',
            transition: 'all 0.2s ease',
            margin: isSelected ? '0 -10px' : '0',
            transform: isSelected ? 'scale(1.01)' : 'scale(1)',
            transition: 'all 0.3s ease-in-out',
        }} 
        onClick={onClick}>
            
            <div style={{display:'flex',flexDirection:'column',gap:'15px'}}>
                {property.property_type==='Residence'?<>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',flexDirection:'row',gap:'17px',alignItems:'center',width:'100%'}}>
                <div style={img_container}>
                    <img src={property.units[0].image_urls[0]} style={img}/>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'5px',width:'70%'}}>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center', marginBottom:'5px'}}><p style={{fontWeight:'500',fontSize:'18px'}}>{property.title}</p>{liked ? <FaHeart className='heart_liked' onClick={handleHeartClick}/>:<FaRegHeart className='heart' onClick={handleHeartClick}/>}</div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}><div style={prop_info}><div style={info}><IoBedOutline style={icon}/>{property.units.length} Units | {property.rooms.map(room=>'S+'+room).join(' | ')}</div><div style={info}></div></div><div style={{...info,fontSize:'16px',fontWeight:'500'}}>{property.min_price} - {property.max_price}</div></div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}><div style={prop_info}><div style={info}><GiPathDistance style={icon}/>{property.distance_from_beach}m to the Beach</div></div><div style={{...info,fontWeight:'500'}}>Dt /Night</div></div>
                <div style={{...prop_info, fontWeight:'500'}}><div style={info}>{property.city}, {property.district}</div></div>
                </div>
            </div>

        </div>
        
        </>:<>
            

            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',flexDirection:'row',gap:'17px',alignItems:'center',width:'100%'}}>
                    <div style={img_container}>
                        <img src={property.units[0].image_urls[0]} style={img}/>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'5px',width:'60%'}}>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center', marginBottom:'5px'}}><p style={{fontWeight:'500',fontSize:'18px'}}>{property.title}</p>{liked ? <FaHeart className='heart_liked' onClick={handleHeartClick}/>:<FaRegHeart className='heart' onClick={handleHeartClick}/>}</div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}><div style={prop_info}><div style={info}><IoBedOutline style={icon}/>S+{property.units[0].rooms}</div><div style={info}><LiaToiletSolid style={icon}/>{property.units[0].bathrooms}Bath</div></div><div style={{...info,fontSize:'16px',fontWeight:'500'}}>{property.units[0].price_per_night}Dt /Night</div></div>
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}><div style={prop_info}><div style={info}><GiPathDistance style={icon}/>{property.distance_from_beach}m to the Beach</div></div><div style={{...info,fontWeight:'500'}}>{available_from}</div></div>
                        <div style={{...prop_info, fontWeight:'500'}}><div style={info}>{property.city}, {property.district}</div></div>
                    </div>
                </div>

            </div>
</>}
            </div>
        </section>
    )
}

export default Prop_card
