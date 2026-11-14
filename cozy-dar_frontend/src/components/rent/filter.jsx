import React, { useEffect, useState, useRef } from 'react';
import { InputField } from '../shared/inputfield';
import { IoIosArrowDown } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { RiFilter3Fill } from "react-icons/ri";
import MoreFilters from './morefilters';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { RentCalendar } from '../shared/calendar';

const dropdown={
  display: 'flex',
  position: 'absolute',
  left:'0',
  top:'calc(100% + 10px)',
  flexDirection: 'column',
  border:'1px solid rgb(186, 186, 186)',
  width:'fit-content',
  backgroundColor:'white',
  padding:'10px 10px',
  borderRadius:'7px',
  gap:'10px',
}

const element={
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  width:'100%',
  justifyContent:'space-between',
}
const FiltersBar = ({filters, setFilters, setClicked_prop}) => {
    const container={
      gap:'1%',
        display:'flex',
        flexDirection:'row',

        alignItems:'center',
        padding:'10px 3vw',
        backgroundColor:'white',
        borderBottom:'1px solid #E0E0E0',
        width:'100%',
        zIndex:'2',
        position:'relative',
    }
    
    const [search,setSearch]=useState('')
    const [showPrice, setShowPrice] = useState(false);
    const [showRooms, setShowRooms] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showType, setShowType] = useState(false);
    const [priceRange, setPriceRange] = useState([60, 500]);
    const [rangeTest,setRangeTest]=useState(false);
    const [rooms,setRooms]=useState(-1);
    const [type, setType]=useState("Property Type")
    const [selectedRange, setSelectedRange] = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    });
    const [seafront,setSeafront]=useState(false)

    const f_default=()=>{
      setPriceRange([60, 500]);
      setRangeTest(false);
      setRooms(-1);
      setType("Property Type")
      setSelectedRange({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      });
      setSeafront(false)
      setSearch('')
    }

  
  const handleSeafront = () => {
    if(!seafront){
      setFilters({...filters,distance_range:[0,0]})
      setSeafront(true)
    }else{
      setFilters({...filters,distance_range:[0,1000]})
      setSeafront(false)
    }
};

const handlePrice = (event, newValue) => {
  setPriceRange(newValue);
  setRangeTest(true);
  setFilters({...filters,price_range:newValue})
};

const handleType=(e)=>{
  setType(e)
  if(e==='Property Type'){
    const {type, ...newFilters}=filters
    setFilters({...newFilters})
  }else{
    setFilters({...filters,type:e})
  }
  setShowType(false)
}
const handleRooms=()=>{
  if (rooms!==-1){
    
    if(rooms-1!==-1){
      setFilters({...filters,rooms:rooms-1})
    }else{
      const {rooms, ...newFilters}=filters
      setFilters({...newFilters})
    }
  }
  setRooms(rooms-1);
}
const priceDropdownRef = useRef(null);
const priceTriggerRef = useRef(null);
const roomsDropdownRef = useRef(null);
const roomsTriggerRef = useRef(null);
const typeDropdownRef = useRef(null);
const typeTriggerRef = useRef(null);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (showPrice && priceDropdownRef.current && priceTriggerRef.current && !priceDropdownRef.current.contains(event.target) && !priceTriggerRef.current.contains(event.target)) {
      setShowPrice(false);
    }
    if (showRooms && roomsDropdownRef.current && roomsTriggerRef.current && !roomsDropdownRef.current.contains(event.target) && !roomsTriggerRef.current.contains(event.target)) {
      setShowRooms(false);
    }
    if (showType && typeDropdownRef.current && typeTriggerRef.current && !typeDropdownRef.current.contains(event.target) && !typeTriggerRef.current.contains(event.target)) {
      setShowType(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [showPrice, showRooms, showType]);

  return (
    <div style={container} onClick={()=>setClicked_prop(null)}>
      <input type="text" placeholder="Search..." style={{width:'25%'}} className="filter_element" onClick={()=>setClicked_prop(null)} onChange={(e)=>{setSearch(e.target.value);setFilters({...filters,search:e.target.value})}}/>
      <div style={{width:'11%'}} className="filter_element">
        <div style={element} onClick={()=>setShowPrice(!showPrice)} ref={priceTriggerRef}>
        <span>{rangeTest ? priceRange[0] + " - " + priceRange[1] + " Dt" : "Price Range"}</span>
        <IoIosArrowDown style={{verticalAlign: 'bottom',color:'rgb(129, 129, 129)', textAlign:'right'}}/>
        </div>
        
        {showPrice && (
        <div style={dropdown} ref={priceDropdownRef}>
          <Box width={200} margin="auto" padding="0 5px">
            <Slider
              value={priceRange}
              onChange={handlePrice}
              valueLabelDisplay="auto"
              min={0}
              max={600}
              step={20}
            />
            <div>
              Range: {priceRange[0]} - {priceRange[1]} Dt
            </div>
          </Box>
        </div>
      )}
      </div>

      <div style={{width:'9%'}} className="filter_element">
        <div style={element} onClick={()=>setShowRooms(!showRooms)} ref={roomsTriggerRef}>
        <span>{rooms>-1 ? 'Rooms: ' + rooms : "Rooms"}</span>
        <IoIosArrowDown style={{verticalAlign: 'bottom',color:'rgb(129, 129, 129)'}}/>
        </div>
        {showRooms && (
          <div style={dropdown} ref={roomsDropdownRef}>
            <div style={{display:'flex',gap:'10px',alignItems:'center',justifyContent:'space-between'}}>
              <p>BedRooms: </p><CiCircleMinus onClick={()=>{handleRooms()}} style={{cursor:'pointer',fontSize:'20px'}}/>{rooms===-1?'All':rooms}<CiCirclePlus onClick={()=>{setRooms(rooms+1);setFilters({...filters,rooms:rooms+1})}} style={{cursor:'pointer',fontSize:'20px'}}/>
            </div>
          </div>
        )}
      </div>
      <div className="filter_element" style={{width:'11%'}}>
        <div style={element} onClick={()=>setShowType(!showType)} ref={typeTriggerRef}>
        <span>{type} </span>
        <IoIosArrowDown style={{verticalAlign: 'bottom',color:'rgb(129, 129, 129)'}}/>
        </div>
        {showType && (
          <div className='dropdown' ref={typeDropdownRef}>
            <p style={{padding:'10px 10px'}} onClick={()=>handleType('Property Type')}>All</p>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
            <p style={{padding:'10px 10px'}} onClick={()=>handleType('House')}>House</p>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
            <p style={{padding:'10px 10px'}} onClick={()=>handleType('Villa')}>Villa</p>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
            <p style={{padding:'10px 10px'}} onClick={()=>handleType('Residence')}>Residence</p>
          </div>
        )}
      </div>
      <div style={{width:'12%'}}>
        <RentCalendar setSelectedRange={setSelectedRange} selectedRange={selectedRange} setFilters={setFilters} filters={filters}/>
      </div>
      <div className="filter_element" style={{gap:'0'}}>
        <input type="checkbox" checked={seafront} onChange={handleSeafront}/>
        <span>Seafront</span>
      </div>

      {/* More Filters */}
      <div>
        <div className="filter_element" style={{cursor:'pointer',gap:'10px'}} onClick={() => setShowMore(!showMore)}>
          <RiFilter3Fill style={{color:'black',fontSize:'20px'}}/>
          More Filters
        </div>
        {showMore && (
          <MoreFilters setShowMore={setShowMore} filters={filters} setFilters={setFilters} seafront={seafront} setSeafront={setSeafront} setR={setRooms} setPrice={setPriceRange} setT={setType} f_default={f_default}/>
        )}
      </div>
    </div>
  );
};

export default FiltersBar;
