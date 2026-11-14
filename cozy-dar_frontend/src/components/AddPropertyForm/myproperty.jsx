import dayjs from "dayjs";
import { Form_btn } from "../shared/inputfield";
import { IoBedOutline } from "react-icons/io5";
import { LiaToiletSolid } from "react-icons/lia";
import { GiPathDistance } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { useState } from "react";
import ReservationsCalendar from "./reservationsCalendar";
import { IoIosArrowDown } from "react-icons/io";
import {EditUnit} from "../shared/propertyedit";


const MyProperty=({property,showU})=>{
    const [showReservations,setShowReservations]=useState(false)
    const [showUnits,setShowUnits]=useState(showU)
    const [unit,setUnit]=useState(null)
    const [showEdit,setShowEdit]=useState(false)
    const [res_unit_id,setRes_unit_id]=useState(null)
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
    const container={
        width:'100%',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)',
        border:'1px solid rgba(0, 0, 0, 0.03)',
        height:'fit-content',
        padding:'25px 35px',
        borderRadius:'10px',
        gap:'10px',
        margin:'20px 0',
    }
    const img_container={
        display:'flex',
        gap:'10px',
        justifyContent:'center',
        alignItems:'center',
    }
    const img={
        width:'180px',
        height:'auto',
        borderRadius:'5px',
    }
    console.log(property)
    const available_from=property.units[0].available_from?'Available from '+dayjs(property.units[0].available_from).format('DD MMMM YYYY'):'Available'
    const showRes=(unit_id)=>{
        setRes_unit_id(unit_id)
        setShowReservations(true)
    }
    const editUnit=(unit)=>{
        setUnit(unit)
        setShowEdit(true)
    }
    return( 
        <section>
            
            <div style={container}>
                {property.property_type==='Residence'?<>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',flexDirection:'row',gap:'17px',alignItems:'center'}}>
                <div style={img_container}>
                    <img src={property.units[0].image_urls[0]} style={img}/>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
                    <p style={{fontWeight:'500',fontSize:'18px', marginBottom:'5px'}}>{property.title}</p>
                    <div style={prop_info}><div style={info}><IoBedOutline style={icon}/>{property.units.length} Units</div><div style={info}><GiPathDistance style={icon}/>{property.distance_from_beach}m to the Beach</div></div>
                    <div style={prop_info}><div style={info}>{property.city}, {property.district}</div></div>
                </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                <Form_btn text='Earnings' style={{width:'250px',height:'44px',fontSize:'17px'}} onClick={showRes}/>
                <Form_btn text='Edit Residence' style={{width:'250px',height:'40px',backgroundColor:'white',color:'#007bff',border:'1px solid #007bff'}} onClick={{}}/>
            </div>
        </div>
        <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center',margin:'25px 0'}}></div>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontSize:'14px',justifyContent:'space-around'}}>
        <div style={{...info,display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <p style={{fontWeight:'600',fontSize:'22px',marginLeft:'10px'}}>0</p>
                    <p>Completed Reservations</p>
                </div>
                <div style={{...info,display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <p style={{fontWeight:'600',fontSize:'22px',marginLeft:'10px'}}>0</p>
                    <p>Total Rented Nights</p>
                </div>
                <div style={{...info,display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <p style={{fontWeight:'600',fontSize:'22px',marginLeft:'10px'}}>150Dt</p>
                    <p>Total Income</p>
                </div>
        </div>

        {showUnits && property.units.map((unit,index)=>(
                <div key={index}>
                    <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center',margin:'25px 0'}}></div>
                    <p style={{fontWeight:'500',fontSize:'18px', margin:'15px'}}>Unit {index+1}</p>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',flexDirection:'row',gap:'17px',alignItems:'center'}}>
                    <div style={img_container}>
                        <img src={property.units[index].image_urls[0]} style={img}/>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
                        <p style={{fontWeight:'500',fontSize:'18px', marginBottom:'5px'}}>{property.units[index].unit_title}</p>
                        <div style={prop_info}><div style={info}><IoBedOutline style={icon}/>S+{property.units[index].rooms}</div><div style={info}><LiaToiletSolid style={icon}/>{property.units[index].bathrooms}Bath</div></div>
                        <div style={prop_info}><div style={info}>{property.units[index].price_per_night}Dt /Night</div><div style={info}>{available_from}</div></div>
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                    <Form_btn text='Reservations & Earnings' style={{width:'250px',height:'44px',fontSize:'17px'}} onClick={()=>showRes(property.units[index].unit_id)}/>
                    <Form_btn text='Edit Unit' style={{width:'250px',height:'40px',backgroundColor:'white',color:'#007bff',border:'1px solid #007bff'}} onClick={()=>editUnit(property.units[index])}/>
                </div>
            </div>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center',margin:'25px 0'}}></div>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontSize:'14px',justifyContent:'space-around'}}>
                <div style={info}>
                    <IoCalendarOutline style={icon}/>
                    Completed Reservations: 0
                </div>
                <div style={info}>
                <IoMoonOutline style={icon}/>
                    Rented Nights: 0
                </div>
                <div style={info}>
                    <IoWalletOutline style={icon}/>
                    Total Income: 150Dt
                </div>
            </div>
            </div>
        ))}
        <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center',margin:'25px 0'}}></div>
       <div style={{display:'flex',justifyContent:'center',margin:'-2vh 0'}} onClick={()=>setShowUnits(!showUnits)}><IoIosArrowDown style={icon}/></div>
        </>:<>
            

            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',flexDirection:'row',gap:'17px',alignItems:'center'}}>
                    <div style={img_container}>
                        <img src={property.units[0].image_urls[0]} style={img}/>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
                        <p style={{fontWeight:'500',fontSize:'18px', marginBottom:'5px'}}>{property.title}</p>
                        <div style={prop_info}><div style={info}><IoBedOutline style={icon}/>S+{property.units[0].rooms}</div><div style={info}><LiaToiletSolid style={icon}/>{property.units[0].bathrooms}Bath</div><div style={info}><GiPathDistance style={icon}/>{property.distance_from_beach}m to the Beach</div></div>
                        <div style={prop_info}><div style={info}>{property.city}, {property.district}</div><div style={info}>{property.units[0].price_per_night}Dt /Night</div><div style={info}>{available_from}</div></div>
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                    <Form_btn text='Reservations & Earnings' style={{width:'250px',height:'44px',fontSize:'17px'}} onClick={()=>showRes(property.units[0].unit_id)}/>
                    <Form_btn text='Edit Unit' style={{width:'250px',height:'40px',backgroundColor:'white',color:'#007bff',border:'1px solid #007bff'}} onClick={()=>editUnit(property.units[0])}/>
                </div>
            </div>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center',margin:'25px 0'}}></div>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontSize:'14px',justifyContent:'space-around'}}>
            <div style={{...info,display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <p style={{fontWeight:'600',fontSize:'22px',marginLeft:'10px'}}>0</p>
                    <p>Completed Reservations</p>
                </div>
                <div style={{...info,display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <p style={{fontWeight:'600',fontSize:'22px',marginLeft:'10px'}}>0</p>
                    <p>Total Rented Nights</p>
                </div>
                <div style={{...info,display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <p style={{fontWeight:'600',fontSize:'22px',marginLeft:'10px'}}>150Dt</p>
                    <p>Total Income</p>
                </div>
            </div></>}

            </div>
            {showEdit && <EditUnit unit={unit} onSave={()=>setUnit(null)} onCancel={()=>setUnit(null)}/>}
            {showReservations && <ReservationsCalendar unit_id={res_unit_id}/>}
        </section>
    )
}
export default MyProperty