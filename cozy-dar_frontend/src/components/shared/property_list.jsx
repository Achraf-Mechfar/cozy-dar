import testimg from './test.jpg'
import { Link } from "react-router-dom";
import { useEffect, useState,useRef } from 'react';
import {FaRegHeart} from "react-icons/fa";
import '../home/exc_properties.css';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

const Property_list=({properties})=>{
    const scroll_btn={
      height:'46vh',
      display:'flex',
      alignItems:'center',
      position:'absolute',
      backgroundColor: 'white',
      width:'36px',
      borderRadius:'2px',
      justifyContent:'center',
      zIndex:'2'
    }


    const listRef = useRef(null);

    const scroll = (scrollOffset) => {
        listRef.current.scrollLeft += scrollOffset;
    };


    const prop_info={
        padding:'15px',
        display:'flex',
        flexDirection:'column',
        position:'relative',

    }
    console.log(properties)
    return(
        <div>
        <div style={{...scroll_btn,left:'0',boxShadow: '25px -10px 11px rgb(255, 255, 255)',}} onClick={() => scroll(-window.innerWidth+250)}><IoIosArrowBack style={{fontSize:'25px',margin:'0 0 35px 5px'}}/></div>
        <div style={{...scroll_btn,right:'0',boxShadow: '-25px -14px 11px rgb(255, 255, 255)',}} onClick={() => scroll(window.innerWidth-250)}><IoIosArrowForward style={{fontSize:'25px',margin:'0 5px 35px 0'}}/></div>
        <ul className="scroll-hidden list_container" ref={listRef}>
            {properties.map(item => (
                <>
                {item.property_type!=='Residence'?(
                <Link to={`/unit/${item.units[0].unit_id}`}><li key={item.property_id} >
                    <div className="prop_card_container">
                        <img src={testimg} style={{height:'58%',width:'100%',borderRadius:'5px 5px 0 0'}}></img>
                        <div style={prop_info}>
                            <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}><div style={{fontWeight:'500'}}>{item.units[0].price_per_night} Dt/Night</div><Link style={{position:'absolute',display:'flex',right:'0',marginRight:'15px'}} to="/favorites"> <FaRegHeart style={{ color: 'black',fontSize:'22px'}} /></Link></div>
                            <div style={{fontSize:'14px',margin:'20px 0 5px 0'}}>S+{item.units[0].rooms} | {item.units[0].bathrooms}Bath | {item.units[0].distance_from_beach}m to the Beach</div>
                            <div style={{fontSize:'14px'}}>{item.city}, {item.district}</div>
                        </div>
                    </div>
                </li>
                </Link>):(
                  <Link to={`/residence/${item.property_id}`}><li key={item.property_id} >
                    <div className="prop_card_container">
                        <img src={testimg} style={{height:'58%',width:'100%',borderRadius:'5px 5px 0 0'}}></img>
                        <div style={prop_info}>
                            <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}><div style={{fontWeight:'500'}}>{item.min_price}-{item.max_price} Dt/Night</div><Link style={{position:'absolute',display:'flex',right:'0',marginRight:'15px'}} to="/favorites"> <FaRegHeart style={{ color: 'black',fontSize:'22px'}} /></Link></div>
                            <div style={{fontSize:'14px',margin:'20px 0 5px 0'}}>{item.rooms.map(room=>(<>S+{room} | </>))}{item.distance_from_beach}m to the Beach</div>
                            <div style={{fontSize:'14px'}}>{item.city},{item.district}</div>
                        </div>
                    </div>
                </li>
                </Link>
                )}
                </>
        ))}
        </ul>
        
    
    </div>);
}
export default Property_list;