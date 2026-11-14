import React, { useState, useRef,useEffect } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import { fr } from 'date-fns/locale';
import {IoIosArrowBack} from "react-icons/io";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Form_btn, InputField } from "./inputfield";
import SuccessMsg from "./sucessMsg";
import dayjs from "dayjs";

const container={
  display:'flex',
  alignItems:'center',
  justifyContent:'space-between',
  border:'1px solid rgb(186, 186, 186)',
  padding:'10px 15px',
  borderRadius:'10px',
  height:'100%',
  cursor:'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover':{
    borderColor:'rgb(114, 114, 114)',
  }
}
const calendar={
    display:'flex',
    top:'0',
    right:'0',
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0, 0, 0, 0.15)',
    zIndex:'2000',
    position:'fixed',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'5vh',
}
const add_days={
    padding:'7px 15px',
    cursor:'pointer',
    borderRadius:'5px',
    border:'2px solid rgb(213, 213, 213)',
    transition: 'border-color 0.3s ease',
}
const DateRangeInput=({setBtn_bg, selectedRange, setSelectedRange,unit_id,setShowSuccess,setMsg}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedFlex,setSelectedFlex] = useState('Exact Date');
  const flexOptions = ['Exact Date', '± 1Day', '± 2Days', '± 3Days', '± 7Days'];
  const [showError,setShowError] = useState(false)
  const [error_msg,setError_msg]=useState('')
  const [isHovered,setIsHovered]=useState(false)
  const [reservations,setReservations]=useState([])
  const range = [
    {
      startDate: selectedRange.startDate,
      endDate: selectedRange.endDate,
      key: "selection"
    }
  ];
  useEffect(()=>{
    setTime(getMinCheckInTime())
  },[selectedRange])
  useEffect(()=>{
      fetch(`http://localhost:5000/reservations/get_reservations/${unit_id}`)
      .then(res=>res.json())
      .then(data=>setReservations(data))
      .catch(err=>console.error(err))
  },[])
  console.log(reservations)

React.useEffect(() => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowPicker(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
const handleRangeChange = (item) => {
  setSelectedRange({
    startDate: item.selection.startDate,
    endDate: item.selection.endDate
  });
};

const getDatesInRange = (start, end) => {
  const dates = [];
  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  return dates;
};

const disabledDates = reservations.flatMap(r =>
  getDatesInRange(new Date(r.check_in), new Date(r.check_out))
);

const getMinCheckInTime = () => {
  const selectedDate = format(range[0].startDate, 'yyyy-MM-dd');
  const sameDayReservation = reservations.find(reservation => {
    const checkoutDate = new Date(reservation.check_out);
    return format(checkoutDate, 'yyyy-MM-dd') === selectedDate;
  });

  if (!sameDayReservation) return '08:00';

  const checkoutDate = new Date(sameDayReservation.check_out);
  checkoutDate.setHours(checkoutDate.getHours() + 1); 
  
  return `${String(checkoutDate.getHours()).padStart(2, '0')}:${String(checkoutDate.getMinutes()).padStart(2, '0')}`;
};
const [time, setTime] = useState(getMinCheckInTime());


  const ref = useRef();
  const apply=()=>{
    const [hours,minutes]=time.split(':')
    range[0].startDate.setHours(hours)
    range[0].startDate.setMinutes(minutes)
    range[0].endDate.setHours(hours)
    range[0].endDate.setMinutes(minutes)
    console.log(dayjs(range[0].startDate).format('HH:mm'))
    console.log(dayjs(range[0].startDate).format('MM/DD/yyyy'))
    console.log(new dayjs().format('HH:mm'))
    console.log(new dayjs().format('MM/DD/yyyy'))

    if(dayjs(range[0].startDate).format('MM/DD/yyyy') === dayjs(range[0].endDate).format('MM/DD/yyyy')){
      setError_msg('Reservation must be for at least one night')
      setShowError(true)
      return
    }else if((dayjs(range[0].startDate).format('MM/DD/yyyy') === new dayjs().format('MM/DD/yyyy')&&dayjs(range[0].startDate).format('HH:mm') < new dayjs().format('HH:mm'))|| dayjs(range[0].startDate).format('HH:mm') < getMinCheckInTime()){
      setError_msg(`check-in time must be ${getMinCheckInTime()} or after`)
      setShowError(true)
      return
    }
    setShowPicker(false)
    setBtn_bg('#007bff')
    setMsg('Reservation date selected')
    setShowSuccess(true)
  }


    
  return (
    <div ref={ref}>
      <SuccessMsg show={showError} message={error_msg} setShow={setShowError} error={true}/>
      <div style={{...container,border:isHovered ? '1px solid rgb(114, 114, 114)' : '1px solid rgb(186, 186, 186)'}} onClick={() => setShowPicker(!showPicker)} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
        {`${format(range[0].startDate, "dd/MM/yyyy")} – ${format(
          range[0].endDate,
          "dd/MM/yyyy"
        )}`}
        <FiCalendar style={{fontSize:'20px'}} />
        

      </div>
      {showPicker && (
        <div style={calendar}>

            <div style={{padding:'30px 40px',borderRadius:'10px',backgroundColor:'white',display:'flex',flexDirection:'column',transform: 'scale(0.8)',height:'fit-content'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:'4px',fontSize:'20px'}}><FiCalendar style={{fontSize:'26px', marginBottom:'2px'}}/>Date</div>
                <div style={{cursor:'pointer',fontSize:'20px'}}onClick={()=>setShowPicker(false)}>Close</div>
              </div>
              <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center',margin:'20px 0'}}></div>
                
                <DateRange
                    editableDateInputs={true}
                    onChange={handleRangeChange}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={2}
                    direction="horizontal"
                    showDateDisplay={false}
                    locale={fr}
                    disabledDates={disabledDates}
                    minDate={new Date()}
                />
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'5px'}}>
                  <p>Check-In Time:</p><InputField type="time" value={time} onChange={(e)=>setTime(e.target.value)} style={{width:'17%',scale:'0.9'}}/>
                </div>
                
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center',margin:'20px 0'}}></div>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',flexDirection:'row',gap:'15px'}}>

                </div>
                <div>
                  <button style={{...add_days,backgroundColor:'#007bff',color:'white',width:'100%',padding:'10px 30px',fontSize:'18px'}} onClick={apply}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


const RentCalendar=({selectedRange, setSelectedRange, filters, setFilters}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedFlex,setSelectedFlex] = useState('Exact Date');
  const flexOptions = ['Exact Date', '± 1Day', '± 2Days', '± 3Days', '± 7Days'];
  const [time, setTime] = useState('11:00');
  const [isHovered,setIsHovered]=useState(false)

  const range = [
    {
      startDate: selectedRange.startDate,
      endDate: selectedRange.endDate,
      key: "selection"
    }
  ];
  const ref = useRef();

  const apply=()=>{
    const [hours,minutes]=time.split(':')
    range[0].startDate.setHours(hours)
    range[0].startDate.setMinutes(minutes)
    range[0].endDate.setHours(hours)
    range[0].endDate.setMinutes(minutes)
    setFilters({...filters,check_in:format(range[0].startDate, "yyyy-MM-dd HH:mm"),check_out:format(range[0].endDate, "yyyy-MM-dd HH:mm")})
    setShowPicker(false)
  }

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleRangeChange = (item) => {
    setSelectedRange({
      startDate: item.selection.startDate,
      endDate: item.selection.endDate
    });
  };

  return (
    <div ref={ref}>
      <div style={{...container,padding:'7px 10px',borderRadius:'7px',gap:'10px',width:'100%',border:isHovered ? '1px solid rgb(114, 114, 114)' : '1px solid rgb(186, 186, 186)'}} onClick={() => setShowPicker(!showPicker)} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
        <div>
        {`${format(range[0].startDate, "MM/dd")} – ${format(
          range[0].endDate,
          "MM/dd"
        )}`}
        </div>
        <FiCalendar style={{fontSize:'18px'}} />
        

      </div>
      {showPicker && (
        <div style={calendar}>

            <div style={{padding:'30px 40px',borderRadius:'10px',backgroundColor:'white',display:'flex',flexDirection:'column',transform: 'scale(0.8)',height:'fit-content'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:'4px',fontSize:'20px'}}><FiCalendar style={{fontSize:'26px', marginBottom:'2px'}}/>Date</div>
                <div style={{cursor:'pointer',fontSize:'20px'}}onClick={()=>setShowPicker(false)}>Close</div>
              </div>
              <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center',margin:'20px 0'}}></div>

                
                <DateRange
                    editableDateInputs={true}
                    onChange={handleRangeChange}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={2}
                    direction="horizontal"
                    showDateDisplay={false}
                    locale={fr}
                    minDate={new Date()}
                />
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'5px'}}>
                  <p>Check-In Time:</p><InputField type="time" value={time} onChange={(e)=>setTime(e.target.value)} style={{width:'17%',scale:'0.9'}}/>
                </div>
                
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center',margin:'20px 0'}}></div>
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',flexDirection:'row',gap:'15px'}}>
                  {flexOptions.map(option => (
                    <div
                      key={option}
                      style={{
                        ...add_days,
                        border: selectedFlex === option ? '2px solid rgb(36, 36, 36)' : add_days.border
                      }}
                      onClick={()=>setSelectedFlex(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div>
                  <button style={{...add_days,backgroundColor:'#007bff',color:'white',width:'100%',padding:'10px 35px',fontSize:'18px'}} onClick={apply}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export {DateRangeInput,RentCalendar}