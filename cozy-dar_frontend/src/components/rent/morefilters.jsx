
import { RiFilter3Fill } from "react-icons/ri";
import { InputField } from "../shared/inputfield";
import { useState, useEffect } from "react";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { Box, Slider } from "@mui/material";
const MoreFilters=({setShowMore, filters, setFilters, seafront, setSeafront,setR,setPrice,setT,f_default})=>{
    const filter_container={
        top:'0',
        right:'0',
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0, 0, 0, 0.3)',
        zIndex:'1000',
        position:'fixed',
        justifyContent:'center',
        paddingTop:'5vh',
        alignItems:'center',
        display:'flex',

        
    }
    const container={
        display:'absolute',
        height:'max-content',
        width:'35%',
        flexDirection:'column',
        gap:'20px',
        padding:'20px 20px',
        backgroundColor:'white',
        borderRadius:'7px',
        border:'1px solid rgb(186, 186, 186)',
    }

    const type_item={
        border:'1px solid #a1a1a1',
        padding:'10px 15px',
        cursor:'pointer',
        borderRadius:'5px',
      }
    const [rooms,setRooms]=useState(filters.rooms?filters.rooms:0)
    const [type, setType]=useState(filters.type?filters.type:'')
    const [bathrooms,setBathrooms]=useState(filters.bathrooms?filters.bathrooms:0)
    const [priceRange, setPriceRange] = useState(filters.price_range?[filters.price_range[0],filters.price_range[1]]:[0,600]);
    const handlePrice = (event, newValue) => {
        setPriceRange(newValue);
    };

    const [s_front,setS_front]=useState(seafront)
    const [distanceRange, setDistanceRange] = useState(filters.distance_range?[filters.distance_range[0],filters.distance_range[1]]:[0,1000]);
    const handleDistance = (event, newValue) => {
        setDistanceRange(newValue);
        if(s_front){
            setS_front(false)
        }
    };
    const handleSeafront=()=>{
        if(!s_front){
          setDistanceRange([0,0])
          setS_front(true)
        }else{
          setDistanceRange([0,1000])
          setS_front(false)
        }
    };

    const [amenities, setAmenities]=useState([])
    const handleCheckboxChange = (id) => {    
        if (amenities.includes(id)) {
            setAmenities(amenities.filter(item => item !== id));
        } else {
            setAmenities([...amenities, id]);
        }
        
    };

    const handleApply = () => {
        const updatedFilters = { ...filters };

        updatedFilters.price_range = priceRange;
        setPrice(priceRange)

        if (rooms !== 0) {
            updatedFilters.rooms = rooms;
            setR(rooms)
        }
        if (bathrooms !== 0) {
            updatedFilters.bathrooms = bathrooms;
        }
        if (type) {
            updatedFilters.type = type;
            setT(type)
        }

        updatedFilters.distance_range = distanceRange;
        setSeafront(s_front)
        
        if (amenities.length > 0) {
            updatedFilters.amenities = amenities;
        }
        
        setFilters(updatedFilters);
        setShowMore(false);
    };

    const handleReset = () => {
        setPriceRange([0, 600]);
        setPrice([0, 600]);
        setRooms(0);
        setR(0);
        setType('');
        setT('');
        setBathrooms(0);
        setDistanceRange([0, 1000]);
        setSeafront(false);
        setS_front(false)
        setAmenities([]);
        setFilters({})
        f_default()
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
    };
    
    return(
        <div style={filter_container}>
            <div style={container}>
                <div style={{display:'flex',alignItems:'center',justifyItems:'center',justifyContent:'space-between'}}><div style={{display:'flex',alignItems:'center',justifyItems:'center',fontSize:'17px'}}><RiFilter3Fill style={{fontSize:'20px',marginRight:'5px',color:'black'}}/>Filters</div><div style={{cursor:'pointer'}} onClick={()=>setShowMore(false)}>Close</div></div>
                <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center',margin:'20px 0 0 0'}}></div>
                <div style={{display:'flex',flexDirection:'column',gap:'50px',alignItems:'center',padding:'0 20px',maxHeight:'65vh',overflowY:'auto'}}>
                    <div style={{display:'flex',flexDirection:'column',gap:'20px',width:'100%',alignItems:'center'}}>
                    <div style={{fontSize:'18px',fontWeight:'600',marginTop:'30px'}}>Price</div>
                    <Box width={'60%'} margin="auto" padding="0 5px">
                        <Slider
                            value={priceRange}
                            onChange={handlePrice}
                            valueLabelDisplay="auto"
                            min={0}
                            max={600}
                            step={20}
                            />
                            <div style={{justifySelf:'center'}}>
                            Range: {priceRange[0]} - {priceRange[1]} Dt
                        </div>
                    </Box>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'20px',width:'100%',alignItems:'center'}}>
                    <div style={{fontSize:'18px',fontWeight:'600'}}>Bedrooms</div>
                    <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                        <div style={{display:'flex',flexDirection:'row',gap:'20px',justifyItems:'center'}}>
                        <CiCircleMinus onClick={()=>{setRooms(rooms-1)}} style={{cursor:'pointer',fontSize:'20px'}}/>{rooms!==0?rooms:'All'}<CiCirclePlus onClick={()=>{setRooms(rooms+1)}} style={{cursor:'pointer',fontSize:'20px'}}/>
                        </div>
                    </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'20px',width:'100%',alignItems:'center'}}>
                    <div style={{fontSize:'18px',fontWeight:'600'}}>Bathrooms</div>
                    <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                        <div style={{display:'flex',flexDirection:'row',gap:'20px',justifyItems:'center'}}>
                            <CiCircleMinus onClick={()=>{setBathrooms(bathrooms-1)}} style={{cursor:'pointer',fontSize:'20px'}}/>{bathrooms!==0?bathrooms:'All'}<CiCirclePlus onClick={()=>{setBathrooms(bathrooms+1)}} style={{cursor:'pointer',fontSize:'20px'}}/>
                        </div>
                    </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'20px',width:'100%',alignItems:'center'}}>
                    <div style={{fontSize:'18px',fontWeight:'600'}}>Property Type</div>
                    <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                        <div style={{display:'flex',flexDirection:'row',gap:'20px',justifyItems:'center'}}>
                            <div style={type_item} onClick={(e)=>{setType('')}}>All</div>
                            <div style={type_item} onClick={(e)=>{setType('House')}}>House</div>
                            <div style={type_item} onClick={(e)=>{setType('Villa')}}>Villa</div>
                            <div style={type_item} onClick={(e)=>{setType('Residence')}}>Residence</div>
                        </div>
                    </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'20px',width:'100%',alignItems:'center'}}>
                    <div style={{fontSize:'18px',fontWeight:'600'}}>Distance from Beach</div>
                    <div style={{display:'flex',flexDirection:'row',gap:'5px'}}>
                        <input type="checkbox" checked={s_front} onClick={handleSeafront}/>
                        <span>Seafront</span>
                    </div>
                    <Box width={'60%'} margin="auto" padding="0 5px">
                        <Slider
                            value={distanceRange}
                            onChange={handleDistance}
                            valueLabelDisplay="auto"
                            min={0}
                            max={1000}
                            step={20}
                            />
                            <div style={{justifySelf:'center'}}>
                            Distance: {distanceRange[0]} - {distanceRange[1]} m
                        </div>
                    </Box>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:'20px',width:'100%',alignItems:'center'}}>
                    <div style={{fontSize:'18px',fontWeight:'600'}}>Amenities</div>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',justifyContent:'space-around',gap:'10px 50px',marginBottom:'20px'}}>
                        <div style={{display:'flex',flexDirection:'row',gap:'5px'}}><input type='checkbox' style={{}} onChange={()=>{handleCheckboxChange('1')}}/>Air Conditioning</div>
                        <div style={{display:'flex',flexDirection:'row',gap:'5px'}}><input type='checkbox' style={{}} onChange={()=>{handleCheckboxChange('2')}}/>Wifi</div>
                        <div style={{display:'flex',flexDirection:'row',gap:'5px'}}><input type='checkbox' style={{}} onChange={()=>{handleCheckboxChange('3')}}/>Parking</div>
                        <div style={{display:'flex',flexDirection:'row',gap:'5px'}}><input type='checkbox' style={{}} onChange={()=>{handleCheckboxChange('4')}}/>TV</div>
                        <div style={{display:'flex',flexDirection:'row',gap:'5px'}}><input type='checkbox' style={{}} onChange={()=>{handleCheckboxChange('5')}}/>Elevator</div>
                        <div style={{display:'flex',flexDirection:'row',gap:'5px'}}><input type='checkbox' style={{}} onChange={()=>{handleCheckboxChange('6')}}/>Balcony</div>
                        <div style={{display:'flex',flexDirection:'row',gap:'5px'}}><input type='checkbox' style={{}} onChange={()=>{handleCheckboxChange('7')}}/>Tree</div>
                        <div style={{display:'flex',flexDirection:'row',gap:'5px'}}><input type='checkbox' style={{}} onChange={()=>{handleCheckboxChange('8')}}/>Washing Machine</div>
                        <div style={{display:'flex',flexDirection:'row',gap:'5px'}}><input type='checkbox' style={{}} onChange={()=>{handleCheckboxChange('9')}}/>Swimming Pool</div>
                        <div style={{display:'flex',flexDirection:'row',gap:'5px'}}><input type='checkbox' style={{}} onChange={()=>{handleCheckboxChange('10')}}/>Garage</div>
                    </div>
                    </div>


                </div>
                <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center',margin:'0 0 20px 0'}}></div>
                <div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{cursor:'pointer',color:'#007bff'}} onClick={handleReset}>Reset</div><div style={{cursor:'pointer',backgroundColor:'#007bff',color:'white',padding:'10px 20px',borderRadius:'5px'}} onClick={handleApply}>Apply</div></div>
                </div>
            </div>
        </div>
    )
}
export default MoreFilters