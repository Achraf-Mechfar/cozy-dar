import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { UnitEarnings } from './earnings';



export default function ReservationsCalendar({unit_id,style}) {

  const [events,setEvents]=useState([])
  const colors=['#007bff','#54aeff','#80aeff']
    useEffect(()=>{
        fetch(`http://localhost:5000/reservations/get_reservations/${unit_id}`)
        .then(res=>res.json())
        .then(data=>setEvents(data))
        .catch(err=>console.error(err))
    },[])
    console.log(events)
    const container={
      position:'fixed',
      padding:'6vh 5vw',
      margin:'0 1vw',
      top:'7.5vh',
      left:'19.53vw',
      overflowY:'auto',
      overflowX:'hidden',
      width:'-webkit-fill-available',
      height:'100%',
      backgroundColor:'white',
      ...style
    }
  return (
    <section style={container}>
    <div style={{height:'70vh', fontSize:'14px'}}>
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      height="100%"
      events={events.map((event,index)=>({
        title: dayjs(event.check_in).format('DD MMMM') + ' - ' + dayjs(event.check_out).format('DD MMMM') +' - '+ dayjs(event.check_in).format('HH:mm') +' - '+ dayjs(event.check_out).diff(dayjs(event.check_in), 'day') + ' Nights',
        start: dayjs(event.check_in).format('YYYY-MM-DD'),
        end: dayjs(event.check_out).add(1,'day').format('YYYY-MM-DD'),
        color: colors[index%colors.length]
      }))}
       /* { title: '21-05  28-05  10:00', start: '2025-05-15', end: '2025-05-17' ,color:'#80aeff'},
        { title: '21-05  28-05  10:00', start: '2025-05-16', end: '2025-05-21' },
        { title: '21-05  28-05  10:00', start: '2025-05-20', end: '2025-05-29' ,color:'#54aeff'},
        { title: '28-05  30-05  10:00', start: '2025-05-28', end: '2025-06-23' ,color:'#80aeff'},*/
    />
    </div>
    <div>
      <h3>Earnings</h3>
      <UnitEarnings unit_id={unit_id}/>
    </div>
    </section>
  );
}

