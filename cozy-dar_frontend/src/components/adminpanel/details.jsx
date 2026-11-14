import "../../App.css";
import { Form_btn,InputField } from "../shared/inputfield";
import { useState, useEffect } from "react";
import dayjs from "dayjs"
import SuccessMessage from "../shared/sucessMsg"
import { IoIosArrowBack } from "react-icons/io";
import { TbAirConditioning, TbWifi, TbParking  } from 'react-icons/tb';
import { PiFan } from 'react-icons/pi';
import { IoTvOutline } from 'react-icons/io5';
import { MdOutlineElevator, MdBalcony  } from 'react-icons/md';
import { LuTreePine, LuWashingMachine  } from 'react-icons/lu';
import { FaSwimmingPool } from 'react-icons/fa';
import { GiHomeGarage } from 'react-icons/gi';
import { LiaCouchSolid } from "react-icons/lia";
import React from 'react';
import ReservationsCalendar from "../AddPropertyForm/reservationsCalendar";
import MyProperty from "../AddPropertyForm/myproperty";
import {EditUnit} from "../shared/propertyedit";
import AdminMap from "./adminMap";




const details={
    display:'flex',
    backgroundColor:'white',
    flexDirection:'column',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)',
    border:'1px solid rgba(0, 0, 0, 0.03)',
    padding:'10vh 4vw',
    borderRadius:'10px',
    gap:'20px',
    margin:'6vh 6vw',
}
const container={
    position:'fixed',
    left:'20vw',
    top:'7.5vh',
    overflowY:'auto',
    overflowX:'hidden',
    width:'-webkit-fill-available',
    height:'100%',
    backgroundColor:'white',
    zIndex:500,


}
const amenities_container={
    padding:'20px 0 0 30px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
}
const DetailRequests =({request,setProp_details,show,refetch})=>{
    const [meet_date,setMeet_date]=useState(null);
    const [dateError,setDateError]=useState('');

    const request_id=request.request_id;
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
      }, []);
    const handleSubmit = () => {
        console.log(meet_date)
        if(meet_date===null||meet_date<=dayjs().format('YYYY-MM-DD')){
            setDateError('Please select a valid meet date');
            return;
        }
        const Data = {
            request_id,
            meet_date,
            email:request.email

        };

        fetch('http://localhost:5000/admin/i_approval', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(Data)
        })
        .then(res =>{if(res.ok){ setProp_details(false);show(true);refetch()}})
        
        .catch(err => {
            console.error("Initial Approval error:", err);
        });
        };


    return(
        <section style={container}>
        <div className='details' style={details}>
            <div style={{cursor:'pointer',margin:'-7vh -3vw',position:'absolute',display:'flex',alignItems:'center',gap:'2px'}}onClick={()=>setProp_details(false)}><IoIosArrowBack style={{fontSize:'20px'}}/>Go Back</div>
            <div><div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Request ID: {request.request_id}</p><p>Date: {dayjs(request.created_at).format('DD/MM/YYYY HH:mm')}</p></div>
            <div style={{height:'0.5px',backgroundColor:'rgba(0, 0, 0, 0.43)',width:'100%',margin:'5px 0 10px 0'}}></div></div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Title: <br/><h4 style={{fontWeight:'600'}}>{request.property_title}</h4></p><p style={{textAlign:'right'}}>Address: <br/><h4 style={{fontWeight:'600'}}>{request.location}</h4></p></div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Type: <br/><h4 style={{fontWeight:'600'}}>{request.property_type}</h4></p><p style={{textAlign:'right'}}>Number of units: <br/><h4 style={{fontWeight:'600'}}>{request.unit_requests.length}</h4></p></div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Owner ID: <br/><h4 style={{fontWeight:'600'}}>{request.owner_id}</h4></p><p>Full name: <br/><h4 style={{fontWeight:'600'}}>{request.full_name}</h4></p><p style={{textAlign:'right'}}>Phone: <br/><h4 style={{fontWeight:'600'}}>{request.phone}</h4></p></div>
            {request.description!==''&&<p>Description: {request.description}</p>}
            {Array.isArray(request.unit_requests)&&request.unit_requests.map((unit,index)=>(
                <>
                <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',margin:'15px 5vw',alignSelf:'center'}}></div>
                {request.property_type==='Residence'&&<h3 style={{fontWeight:'500'}}>Unit {index+1}</h3>}
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>{request.property_type==='Residence'?<><p>Title: <br/><h4 style={{fontWeight:'600'}}>{unit.title}</h4></p></>:<></>}
                <p>Bedrooms: <br/><h4 style={{fontWeight:'600'}}>{unit.bedrooms}</h4></p>
                <p>Bathrooms: <br/><h4 style={{fontWeight:'600'}}>{unit.bathrooms}</h4></p>
                <p style={{textAlign:'right'}}>Price: <br/><h4 style={{fontWeight:'600'}}>{unit.price_per_night}DT/Night</h4></p></div>
                <div>
                    <p>Amenities: </p>
                    <div style={amenities_container}>
                    <p style={{display:'flex'}}><input type='checkbox' style={{}} id='0' checked={unit.amenities?.includes(0)} readOnly/>Furnished</p>
                    <p style={{display:'flex'}}><input type='checkbox' style={{}} id='1' checked={unit.amenities?.includes(1)} readOnly/>Air Conditioneur</p>
                    <p style={{display:'flex'}}><input type='checkbox' style={{}} id='2' checked={unit.amenities?.includes(2)} readOnly/>Fan</p>
                    <p style={{display:'flex'}}><input type='checkbox' style={{}} id='3' checked={unit.amenities?.includes(3)} readOnly/>Wifi</p>
                    <p style={{display:'flex'}}><input type='checkbox' style={{}} id='4' checked={unit.amenities?.includes(4)} readOnly/>TV</p>
                    <p style={{display:'flex'}}><input type='checkbox' style={{}} id='5' checked={unit.amenities?.includes(5)} readOnly/>Balcony</p>
                    <p style={{display:'flex'}}><input type='checkbox' style={{}} id='6' checked={unit.amenities?.includes(6)} readOnly/>Garden</p>
                    <p style={{display:'flex'}}><input type='checkbox' style={{}} id='7' checked={unit.amenities?.includes(7)} readOnly/>Elevator</p>
                    <p style={{display:'flex'}}><input type='checkbox' style={{}} id='8' checked={unit.amenities?.includes(8)} readOnly/>Pool</p>
                    <p style={{display:'flex'}}><input type='checkbox' style={{}} id='9' checked={unit.amenities?.includes(9)} readOnly/>Parking</p>
                    <p style={{display:'flex'}}><input type='checkbox' style={{}} id='10' checked={unit.amenities?.includes(10)} readOnly/>Garage</p>
                    <p style={{display:'flex'}}><input type='checkbox' style={{}} id='11' checked={unit.amenities?.includes(11)} readOnly/>Washing Machine</p>
                    </div>
                </div>
                </>
            ))}
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',margin:'15px 5vw',alignSelf:'center'}}></div>
            <div>
            <p style={{margin:'0 0 3px 3px'}}>Meet Date:</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px'}}>
            
            <InputField type='date' onChange={(e)=>setMeet_date(e.target.value)} error={dateError} min={dayjs().add(1,'day').format('YYYY-MM-DD')}/>
            <Form_btn text='Initial-Approve' onClick={handleSubmit} style={{height:'40px'}}/><Form_btn text='Reject' style={{height:'40px',backgroundColor:'rgb(223, 222, 222)',color:'black'}}/></div>
            </div>
        </div>
        </section>
    )
}

const DetailApproved=({request,setProp_details,show,refetch})=>{
    const [units, setUnits] = useState([...request.unit_requests]);
    const [images, setImages] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [lat,setLat]=useState(0);
    const [lng,setLng]=useState(0);
    const [distance,setDistance]=useState(null);
    const [show_error,setShow_error]=useState(false);
    const [msg,setMsg]=useState('');

    useEffect(()=>{
        fetch('http://localhost:5000/reference/cities')
        .then(res => res.json())
        .then(data => setCities(data))
        .catch(err => console.log(err))
    },[])
    console.log(cities)
    const clicked_city=(city)=>{
        setCity(city)
        console.log(city)
        fetch('http://localhost:5000/reference/districts/'+city)
        .then(res => res.json())
        .then(data => setDistricts(data))
        .catch(err => console.log(err))
    }

    const handleSubmit = async() => {
        console.log(units)
        console.log(units.length)
        if(city===''||district===''){
            setShow_error(true);
            setMsg(`Please select a city and district.`)
            return;
        }
        for(let i=0;i<units.length;i++){
            units[i].virtualTour=''
            if (!units[i].images || units[i].images.length === 0) {
                setShow_error(true);
                setMsg(`Unit ${i+1} has no images. Please add at least one image.`)
                return;
            }
        }

        const updatedUnits = [...units];
        for(let i = 0; i < units.length; i++){
            const formData = new FormData();
            for (let j = 0; j < units[i].images.length; j++) {
                formData.append('images', units[i].images[j]);
            }
            try {
                console.log('uploading images')
            const res=await fetch('http://localhost:5000/admin/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            })
            const data = await res.json();
            console.log(data)
            updatedUnits[i] = { ...updatedUnits[i], images: data.images };
            alert('Upload successful!');
            } catch (error) {   
            console.error('Upload failed:', error);
            alert('Upload failed');
          }
        }

        console.log('aaaaaa')
        const Data = {
            title:request.property_title,
            property_type: request.property_type,
            owner_id: request.owner_id,
            location:{city,district},
            lat,
            lng,
            distance,
            units:updatedUnits,
            request_id:request.request_id
        };
        console.log(Data)

        fetch('http://localhost:5000/add_house', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            
            },
            body: JSON.stringify(Data)
        })
        .then(res=>{
            setProp_details(false);
            show(true);
            refetch();
        })
        .catch(err => {
            console.error("Approval error:", err);
        });
        };

        const handleCheckboxChange = (id, idx) => {
            const amenities = units[idx].amenities || [];
        
            if (amenities.includes(id)) {
                units[idx].amenities = amenities.filter(item => item !== id);
            } else {
                units[idx].amenities = [...amenities, id];
            }
            setUnits([...units]);
        };
    return(
        <section style={container}>
            {show_error&&<SuccessMessage show={show_error} message={msg} setShow={setShow_error} error={true}/>}
        <div className='details' style={details}>
        <div style={{cursor:'pointer',margin:'-7vh -3vw',position:'absolute',display:'flex',alignItems:'center',gap:'2px'}}onClick={()=>setProp_details(false)}><IoIosArrowBack style={{fontSize:'20px'}}/>Go Back</div>
        <div><div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Request ID: {request.request_id}</p><p>Date: {dayjs(request.created_at).format('DD/MM/YYYY HH:mm')}</p></div>
            <div style={{height:'0.5px',backgroundColor:'rgba(0, 0, 0, 0.43)',width:'100%',margin:'5px 0 10px 0'}}></div></div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Title: <br/><h4 style={{fontWeight:'600'}}>{request.property_title}</h4></p><p style={{textAlign:'right'}}>Address: <br/><h4 style={{fontWeight:'600'}}>{request.location}</h4></p></div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Type: <br/><h4 style={{fontWeight:'600'}}>{request.property_type}</h4></p><p style={{textAlign:'right'}}>Number of units: <br/><h4 style={{fontWeight:'600'}}>{request.unit_requests.length}</h4></p></div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Owner ID: <br/><h4 style={{fontWeight:'600'}}>{request.owner_id}</h4></p><p>Full name: <br/><h4 style={{fontWeight:'600'}}>{request.full_name}</h4></p><p style={{textAlign:'right'}}>Phone: <br/><h4 style={{fontWeight:'600'}}>{request.phone}</h4></p></div>

        <div>
            <p style={{margin:'0 0 7px 2px'}}>Exact Location: </p><select value={city} onChange={(e)=>clicked_city(e.target.value)}>
                    <option value=''>Select City</option>
                    {cities.map((city) => (
                        <option value={city.city}>
                            {city.city}
                        </option>
                    ))}
                </select>
                <select style={{marginLeft:'10px'}} value={district} onChange={(e)=>setDistrict(e.target.value)}>
                    <option value="">Select District</option>
                    {districts.map((district) => (
                        <option value={district.district}>
                            {district.district}
                        </option>
                    ))}
                </select>
        </div>
        {request.description!==''&&<p>Description: {request.description}</p>}
        {Array.isArray(request.unit_requests)&&request.unit_requests.map((unit,idx)=>(
            <>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',margin:'15px 5vw',alignSelf:'center'}}></div>
            {request.property_type==='Residence'&&<h3 style={{fontWeight:'500'}}>Unit {idx+1}</h3>}
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>{request.property_type==='Residence'?<><p>Unit Title: <br/><InputField type="text" defaultValue={unit.title} onChange={(e)=>{setUnits(prev => {const newUnits = [...prev];newUnits[idx] = { ...newUnits[idx], title: e.target.value };return newUnits;});}} style={{width:'fit-content',scale:'0.9'}}/></p></>:<></>}
            <p>Bedrooms: <br/><InputField type="text" defaultValue={unit.bedrooms} onChange={(e)=>{setUnits(prev => {const newUnits = [...prev];newUnits[idx] = { ...newUnits[idx], bedrooms: e.target.value };return newUnits;});}} style={{width:'5vw',scale:'0.9'}}/></p>
            <p>Bathrooms: <br/><InputField type="text" defaultValue={unit.bathrooms} onChange={(e)=>{setUnits(prev => {const newUnits = [...prev];newUnits[idx] = { ...newUnits[idx], bathrooms: e.target.value };return newUnits;});}} style={{width:'5vw',scale:'0.9'}}/></p>
            <p style={{textAlign:'right'}}>Price: <br/><span style={{display:'flex',alignItems:'center'}}><InputField type="text" defaultValue={unit.price_per_night} onChange={(e)=>{setUnits(prev => {const newUnits = [...prev];newUnits[idx] = { ...newUnits[idx], price_per_night: e.target.value };return newUnits;});}} style={{width:'5vw',scale:'0.9'}}/>Dt</span></p></div>
            <div>
                <p>Amenities: </p>
                
                <div style={amenities_container}>
                <p style={{display:'flex',flexDirection:'row'}}><input type='checkbox' id='0' onChange={()=>{handleCheckboxChange(0,idx)}} checked={unit.amenities?.includes(0)} />Furnished</p>
                <p style={{display:'flex',flexDirection:'row'}}><input type='checkbox' id='1' onChange={()=>{handleCheckboxChange(1,idx)}} checked={unit.amenities?.includes(1)} />Air Conditioneur</p>
                <p style={{display:'flex',flexDirection:'row'}}><input type='checkbox' id='2' onChange={()=>{handleCheckboxChange(2,idx)}} checked={unit.amenities?.includes(2)} />Fan</p>
                <p style={{display:'flex',flexDirection:'row'}}><input type='checkbox' id='3' onChange={()=>{handleCheckboxChange(3,idx)}} checked={unit.amenities?.includes(3)} />Wifi</p>
                <p style={{display:'flex',flexDirection:'row'}}><input type='checkbox' id='4' onChange={()=>{handleCheckboxChange(4,idx)}} checked={unit.amenities?.includes(4)} />TV</p>
                <p style={{display:'flex',flexDirection:'row'}}><input type='checkbox' id='5' onChange={()=>{handleCheckboxChange(5,idx)}} checked={unit.amenities?.includes(5)} />Balcony</p>
                <p style={{display:'flex',flexDirection:'row'}}><input type='checkbox' id='6' onChange={()=>{handleCheckboxChange(6,idx)}} checked={unit.amenities?.includes(6)} />Garden</p>
                <p style={{display:'flex',flexDirection:'row'}}><input type='checkbox' id='7' onChange={()=>{handleCheckboxChange(7,idx)}} checked={unit.amenities?.includes(7)} />Elevator</p>
                <p style={{display:'flex',flexDirection:'row'}}><input type='checkbox' id='8' onChange={()=>{handleCheckboxChange(8,idx)}} checked={unit.amenities?.includes(8)} />Pool</p>
                <p style={{display:'flex',flexDirection:'row'}}><input type='checkbox' id='9' onChange={()=>{handleCheckboxChange(9,idx)}} checked={unit.amenities?.includes(9)} />Parking</p>
                <p style={{display:'flex',flexDirection:'row'}}><input type='checkbox' id='10' onChange={()=>{handleCheckboxChange(10,idx)}} checked={unit.amenities?.includes(10)} />Garage</p>
                <p style={{display:'flex',flexDirection:'row'}}><input type='checkbox' id='11' onChange={()=>{handleCheckboxChange(11,idx)}} checked={unit.amenities?.includes(11)} />Washing Machine</p>
                </div>
            </div>
            <div><input type='file' multiple onChange={(e)=>{setUnits(prev => {const newUnits = [...prev];newUnits[idx] = { ...newUnits[idx], images: Array.from(e.target.files) };return newUnits;});}}/></div>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',margin:'15px 5vw',alignSelf:'center'}}></div>
            <InputField type='text' placeholder='Virtual Tour iFrame' onChange={(e)=>{setUnits(prev => {const newUnits = [...prev];newUnits[idx] = { ...newUnits[idx], virtualTour: e.target.value };return newUnits;});}} value={units[idx].virtualTour}/>

            </>
        ))}
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',margin:'15px 5vw',alignSelf:'center'}}></div>
            <div style={{width:'100%',margin:'20px 0'}}>
                <AdminMap setLat={setLat} setLng={setLng} setDistance={setDistance}/>
            </div>  
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',margin:'15px 5vw',alignSelf:'center'}}></div>
            <Form_btn text='List Property' onClick={handleSubmit}/><Form_btn text='Delete'/>
        </div>
        </section>
    )
}

const DetailEdit=({request})=>{
    const [units, setUnits] = useState([...request.unit_requests]);
    const [images, setImages] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');

    useEffect(()=>{
        fetch('http://localhost:5000/reference/cities')
        .then(res => res.json())
        .then(data => setCities(data))
        .catch(err => console.log(err))
    },[])
    console.log(cities)
    const clicked_city=(city)=>{
        setCity(city)
        console.log(city)
        fetch('http://localhost:5000/reference/districts/'+city)
        .then(res => res.json())
        .then(data => setDistricts(data))
        .catch(err => console.log(err))
    }

    const handleSubmit = async() => {
        console.log(units)
        const updatedUnits = [...units];
        for(let i = 0; i < units.length; i++){
            const formData = new FormData();
            for (let j = 0; j < units[i].images.length; j++) {
                formData.append('images', units[i].images[j]);
            }
            try {
            const res=await fetch('http://localhost:5000/admin/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            })
            const data = await res.json();
            
            updatedUnits[i] = { ...updatedUnits[i], images: data.images };
            console.log(updatedUnits[i])
            alert('Upload successful!');
            } catch (error) {   
            console.error('Upload failed:', error);
            alert('Upload failed');
          }
        }


        const Data = {
            title:request.property_title,
            property_type: request.property_type,
            owner_id: request.owner_id,
            location:{city,district},
            units:updatedUnits
        };
        console.log(Data)

        fetch('http://localhost:5000/add_house', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            
            },
            body: JSON.stringify(Data)
        })
        .then(res => console.log(res))
        
        .catch(err => {
            console.error("Approval error:", err);
        });
        };

        const handleCheckboxChange = (id, idx) => {
            const amenities = units[idx].amenities || [];
        
            if (amenities.includes(id)) {
                units[idx].amenities = amenities.filter(item => item !== id);
            } else {
                units[idx].amenities = [...amenities, id];
            }
            setUnits([...units]);
        };
    return(
        <section className='details' style={details}>
        <p>Request ID: {request.request_id}</p><p>Date: {dayjs(request.created_at).format('DD/MM/YYYY HH:mm')}</p>
        <p>Title: {request.property_title}</p>
        <p>type: {request.property_type}</p>
        <p>Location: {request.location}</p>
        <p>Owner ID: {request.owner_id}</p><p>Full name: {request.full_name}</p><p>Phone: {request.phone}</p>
        <p>Description: {request.description}</p>
        {Array.isArray(request.unit_requests)&&request.unit_requests.map((unit,idx)=>(
            <>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',margin:'15px 5vw',alignSelf:'center'}}></div>
            {request.property_type==='Residence'?<><p>Unit Title: <input type='text' defaultValue={unit.title}/></p></>:<></>}
            <p>Bedrooms: <input type='text' defaultValue={unit.bedrooms} onChange={(e)=>{setUnits(prev => {const newUnits = [...prev];newUnits[idx] = { ...newUnits[idx], price_per_night: e.target.value };return newUnits;});}}/></p>
            <p>Bathrooms: <input type='text' defaultValue={unit.bathrooms} onChange={(e)=>{setUnits(prev => {const newUnits = [...prev];newUnits[idx] = { ...newUnits[idx], price_per_night: e.target.value };return newUnits;});}}/></p>
            <p>Price: <input type='text' defaultValue={unit.price_per_night} onChange={(e)=>{setUnits(prev => {const newUnits = [...prev];newUnits[idx] = { ...newUnits[idx], price_per_night: e.target.value };return newUnits;});}}/></p>
            <div>
                <p>Amenities: </p>
                
                <div style={amenities_container}>
                <p>Furnished<input type='checkbox' style={{}} id='0' onChange={()=>{handleCheckboxChange(0,idx)}} checked={unit.amenities?.includes(0)} /></p>
                <p>Air Conditioneur<input type='checkbox' style={{}} id='1' onChange={()=>{handleCheckboxChange(1,idx)}} checked={unit.amenities?.includes(1)} /></p>
                <p>Fan<input type='checkbox' style={{}} id='2' onChange={()=>{handleCheckboxChange(2,idx)}} checked={unit.amenities?.includes(2)} /></p>
                <p>Wifi<input type='checkbox' style={{}} id='3' onChange={()=>{handleCheckboxChange(3,idx)}} checked={unit.amenities?.includes(3)} /></p>
                <p>TV<input type='checkbox' style={{}} id='4' onChange={()=>{handleCheckboxChange(4,idx)}} checked={unit.amenities?.includes(4)} /></p>
                <p>Balcony<input type='checkbox' style={{}} id='5' onChange={()=>{handleCheckboxChange(5,idx)}} checked={unit.amenities?.includes(5)} /></p>
                <p>Garden<input type='checkbox' style={{}} id='6' onChange={()=>{handleCheckboxChange(6,idx)}} checked={unit.amenities?.includes(6)} /></p>
                <p>Elevator<input type='checkbox' style={{}} id='7' onChange={()=>{handleCheckboxChange(7,idx)}} checked={unit.amenities?.includes(7)} /></p>
                <p>Pool<input type='checkbox' style={{}} id='8' onChange={()=>{handleCheckboxChange(8,idx)}} checked={unit.amenities?.includes(8)} /></p>
                <p>Parking<input type='checkbox' style={{}} id='9' onChange={()=>{handleCheckboxChange(9,idx)}} checked={unit.amenities?.includes(9)} /></p>
                <p>Garage<input type='checkbox' style={{}} id='10' onChange={()=>{handleCheckboxChange(10,idx)}} checked={unit.amenities?.includes(10)} /></p>
                <p>Washing Machine<input type='checkbox' style={{}} id='11' onChange={()=>{handleCheckboxChange(11,idx)}} checked={unit.amenities?.includes(11)} /></p>
                </div>
            </div>
            </>
        ))}
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',margin:'15px 5vw',alignSelf:'center'}}></div>
            <Form_btn text='Confirm changes' onClick={handleSubmit}/><Form_btn text='Delete'/>
        </section>
    )
}


const ReservationDetails=({reservation,setRes_details,refetch})=>{
    const [status,set_status]=useState(reservation.status);
    const [payment_status,set_payment_status]=useState(reservation.payment_status);
    const [paid_amount, setPaid_amount] = useState(reservation.paid_amount);
    const [showp_status, setShowp_status] = useState(false);
    const [showPaidAmount, setShowPaidAmount] = useState(false);
useEffect(()=>{
    update_status(reservation.status)
    update_payment_status(reservation.payment_status)
},[])
    const update_status=(status)=>{
        set_status(status);
        if(status==='confirmed'){
            setShowp_status(true)
        }
        else if(status==='pending'){
            setShowp_status(false)
            setShowPaidAmount(false)
            setPaid_amount(0)
            set_payment_status('unpaid')
        }
        else{
            setShowp_status(false)
            setShowPaidAmount(false)
        }
    }
    const update_payment_status=(payment_status)=>{
        set_payment_status(payment_status);
        if(payment_status!=='unpaid'){
            setShowPaidAmount(true)
            if(payment_status==='paid'){
                setPaid_amount(reservation.total_amount)
            }
            else if(payment_status==='partially_paid'){
                setPaid_amount(reservation.paid_amount)
            }
        }
        else {
            setShowPaidAmount(false)
            setPaid_amount(0)
        }
    }
    const update_reservation=()=>{
        const data={reservation_id:reservation.reservation_id,status,payment_status,paid_amount}
        fetch('http://localhost:5000/admin/update_reservation',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body:JSON.stringify(data)
        })
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
        setRes_details(false);
        refetch()
    }
    const check_in=()=>{
        fetch(`http://localhost:5000/admin/check_in/${reservation.reservation_id}`,{    
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const check_out=()=>{
        fetch(`http://localhost:5000/admin/check_out/${reservation.reservation_id}`,{    
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const list_container={
        padding:'20px 0 0 30px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
    }

    const item={
        display:'flex',
        alignItems:'center',
        fontSize:'16px',
        gap:'10px'
    }
        const amenityIconMap = {
            0: LiaCouchSolid,
            1: TbAirConditioning,
            2: PiFan,
            3: TbWifi,
            4: IoTvOutline,
            5: MdBalcony,
            6: LuTreePine,
            7: MdOutlineElevator,
            8: FaSwimmingPool,
            9: TbParking,
            10: GiHomeGarage,
            11: LuWashingMachine,
          };
    return(
        <section style={container}>
            <div className='details' style={details}>
                <div style={{cursor:'pointer',margin:'-7vh -3vw',position:'absolute',display:'flex',alignItems:'center',gap:'2px'}}onClick={()=>setRes_details(false)}><IoIosArrowBack style={{fontSize:'20px'}}/>Go Back</div>
                <div><div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Reservation ID: {reservation.reservation_id}</p><p>Date: {dayjs(reservation.created_at).format('DD/MM/YYYY HH:mm')}</p></div>
                <div style={{height:'0.5px',backgroundColor:'rgba(0, 0, 0, 0.43)',width:'100%',margin:'5px 0 10px 0'}}></div></div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Unit: <br/><h4 style={{fontWeight:'600'}}>{reservation.unit_title}</h4></p><p style={{textAlign:'right'}}>Location: <br/><h4 style={{fontWeight:'600'}}>{reservation.city}, {reservation.district}</h4></p></div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Owner ID: <br/><h4 style={{fontWeight:'600'}}>{reservation.owner_id}</h4></p><p style={{textAlign:'right'}}>Owner Name: <br/><h4 style={{fontWeight:'600'}}>{reservation.owner_name}</h4></p></div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>User ID: <br/><h4 style={{fontWeight:'600'}}>{reservation.user_id}</h4></p><p>Full name: <br/><h4 style={{fontWeight:'600'}}>{reservation.full_name}</h4></p><p style={{textAlign:'right'}}>Phone: <br/><h4 style={{fontWeight:'600'}}>{reservation.phone}</h4></p></div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Check In: <br/><h4 style={{fontWeight:'600'}}>{dayjs(reservation.check_in).format('DD/MM/YYYY HH:mm')}</h4></p><p>Nights: <br/><h4 style={{fontWeight:'600'}}>{reservation.nights}</h4></p><p style={{textAlign:'right'}}>Check Out: <br/><h4 style={{fontWeight:'600'}}>{dayjs(reservation.check_out).format('DD/MM/YYYY HH:mm')}</h4></p></div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Status: <br/><h4 style={{fontWeight:'600'}}>{reservation.status}</h4></p><p style={{textAlign:'right'}}>Payment Status: <br/><h4 style={{fontWeight:'600'}}>{reservation.payment_status}</h4></p></div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><p>Total Price: <br/><h4 style={{fontWeight:'600'}}>{reservation.price}</h4></p><p>Paid Amount: <br/><h4 style={{fontWeight:'600'}}>{reservation.paid_amount}</h4></p><p style={{textAlign:'right'}}>Remaining Amount: <br/><h4 style={{fontWeight:'600'}}>{reservation.remaining_amount}</h4></p></div>
                <>
                <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',margin:'15px 5vw',alignSelf:'center'}}></div>
                <h4>Unit Info</h4>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>{reservation.property_type==='Residence'?<><p>Residence Title: <br/><h4 style={{fontWeight:'600'}}>{reservation.title}</h4></p></>:<></>}
                <p>Bedrooms: <br/><h4 style={{fontWeight:'600'}}>{reservation.rooms}</h4></p>
                <p>Bathrooms: <br/><h4 style={{fontWeight:'600'}}>{reservation.bathrooms}</h4></p>
                <p style={{textAlign:'right'}}>Price: <br/><h4 style={{fontWeight:'600'}}>{reservation.price_per_night}DT/Night</h4></p></div>
                <div>
                    <p>Amenities: </p>
                        <div style={list_container}>
                            {reservation.amenities.map((amenity ) => (
                                <div style={item}>{React.createElement(amenityIconMap[amenity.amenity_id])}{amenity.title}</div>
                            ))}
                        </div>
                </div>
                </>
                <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',margin:'15px 5vw',alignSelf:'center'}}></div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'2vw',width:'70%'}}>
                    <div>
                        <p style={{fontSize:'14px',margin:'0 0 7px 2px'}}>Update Status:</p>
                    <select value={status} onChange={(e)=>update_status(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="initial_confirmed">initial_confirmed</option>
                        <option value="confirmed">confirmed</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                    </div>
                    {showp_status&&<div>
                        <p style={{fontSize:'14px',margin:'0 0 7px 2px'}}>Update Payment Status:</p>
                        <select value={payment_status} onChange={(e)=>update_payment_status(e.target.value)}>
                        <option value="unpaid">unpaid</option>
                        <option value="advance paid">Advance paid</option>
                        <option value="paid">Full paid</option>
                    </select>
                    </div>}
                        {showPaidAmount && <div><p style={{fontSize:'14px',margin:'0 0 7px 2px'}}>Paid Amount:</p><InputField type="text" defaultValue={paid_amount} onChange={(e)=>setPaid_amount(e.target.value)} /></div>}
                </div>
                <div style={{width:'22%'}}>
                    <Form_btn text='Confirm Changes' style={{width:'100%',marginTop:'20px'}} onClick={update_reservation}/>
                </div>
                </div>
                {dayjs(reservation.check_in)<=dayjs()&&(<><div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',margin:'15px 5vw',alignSelf:'center'}}></div><div style={{display:'flex',justifyContent:'right',gap:'15px'}}>
            <Form_btn text='Check In' style={{width:'22%',marginTop:'20px'}} onClick={check_in}/></div></>)}
            {dayjs(reservation.check_out)<=dayjs()&&(<><div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',margin:'15px 5vw',alignSelf:'center'}}></div><div style={{display:'flex',justifyContent:'right',gap:'15px'}}>
            <Form_btn text='Check Out' style={{width:'22%',marginTop:'20px'}} onClick={check_out}/></div></>)}
            </div>

        </section>
    )
}


const PropertyDetails=({property})=>{
    const [show_details,setShow_details]=useState(1)

    const btn={
        padding:'10px 20px',
        borderRadius:'10px',
        cursor:'pointer',
        border:'1px solid #007bff',
        color:'#007bff',
        fontSize:'14px',
        fontWeight:'600',
    }

    return(
        <section style={{...container,paddingTop:'4vh'}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center',gap:'15px'}}><div style={btn} onClick={()=>setShow_details(1)}>Edit Property info</div><div style={btn} onClick={()=>setShow_details(2)}>Reservations & Earning</div></div>
            {show_details===1&&<EditUnit unit={property.units[0]} onSave={()=>setShow_details(2)} onCancel={()=>setShow_details(1)}/>}
            <div style={{width:'100%'}}>{show_details===2&&<ReservationsCalendar unit_id={property.units[0].unit_id} style={{left:'0',marginTop:'6vh',position:'absolute'}}/>}</div>
        </section>
    )
}

const Units=({property})=>{

    console.log(property)
    return(
        <section style={{...container,padding:'6vh 6vw'}}>
            <MyProperty property={property} showU={true}/>
        </section>
    )
}
export{DetailRequests,DetailApproved,DetailEdit,ReservationDetails,PropertyDetails,Units}