import { Form_btn } from "../shared/inputfield";
import { FaRegHeart } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { LiaToiletSolid } from "react-icons/lia";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import React from 'react';

const Residence_units = ({ residence }) => {

    const container={
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)',
        border:'1px solid rgba(0, 0, 0, 0.03)',
        height:'fit-content',
        padding:'35px 30px',
        borderRadius:'10px',
        gap:'10px'
    }
    const icon={
        fontSize:'16px',
        marginRight:'10px',
    }

    const list_container={
        padding:'20px 0 0 30px',
        display:'flex',
        flexDirection:'column',
    }
    console.log(residence)

    return(
        <section style={container}>
            <h3 style={{fontWeight:'600'}}>Units</h3>
            <div style={list_container}>
                {residence.units.map((unit ) => (
                    <Link to={`/unit/${unit.unit_id}`}>
                    <div style={{height:'0.5px',backgroundColor:'rgba(0, 0, 0, 0.1)',margin:'15px 0',width:'100%'}}/>
                    <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                        <div style={{width:'150px',aspectRatio: 16 / 9}}><img src={unit.image_urls[0]} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'5px'}}/></div>
                        <div style={{padding:'10px',display:'flex',flexDirection:'column',gap:'10px',width:'100%'}}>
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                <h3>{unit.unit_title}</h3>
                                <p style={{fontWeight:'500',fontSize:'17px'}}>{unit.price_per_night} Dt /Night</p>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                <div style={{display:'flex',flexDirection:'row',gap:'20px'}}>
                                <p><IoBedOutline style={icon}/>S+{unit.rooms}</p>
                                <p><LiaToiletSolid style={icon}/>{unit.bathrooms} Bathroom</p>
                                </div>
                                <p>Available from DD/MM</p>
                            </div>
                            </div>
                        </div>
                        </Link>
                ))}
            </div>
        </section>
    )
}

export default Residence_units