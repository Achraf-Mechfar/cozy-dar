import dayjs from "dayjs";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { ReservationDetails } from "./details";

const details={
    cursor:'pointer',
    textDecorationLine:'underline',
}
const Reservations=({data,msg,refetch})=>{
    const [res_details,setRes_details]=useState(false)
    const [reservation,setReservation]=useState({})

    const show_details=(item)=>{
        setReservation(item)
        setRes_details(true)
    }

    console.log(data)

    return(
        <div>
            {res_details&&<ReservationDetails reservation={reservation} setRes_details={setRes_details} refetch={refetch}/>}
            <table className='table'>
                <thead>
                    <tr>
                        <th>Res. ID</th>
                        <th>User Name</th>
                        <th>Property Title</th>
                        <th>Check In</th>
                        <th>Nights</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Payment Status</th>
                        <th>Paid Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { data.length>0&&Array.isArray(data)?data.map(item => (
                    <tr key={item.reservation_id}>
                        <td>{item.reservation_id}</td>
                        <td>{item.full_name}</td>
                        <td>{item.unit_title}</td>
                        <td>{dayjs(item.check_in).format('DD/MM/YYYY HH:mm')}</td>
                        <td>{differenceInCalendarDays(dayjs(item.check_out).toDate(),dayjs(item.check_in).toDate())}</td>
                        <td>{item.price} Dt</td>
                        <td>{item.status}</td>
                        <td>{item.payment_status}</td>
                        <td>{item.paid_amount} Dt</td>
                        <td style={details} onClick={()=>show_details(item)}>Manage</td>
                    </tr>)):<tr style={{ height:'40px'}}><td colSpan="10" style={{textAlign:'center'}}>{msg?msg:'No data'}</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

const Reservations_ongoing=({data,msg,refetch})=>{
    const [res_details,setRes_details]=useState(false)
    const [reservation,setReservation]=useState({})

    const show_details=(item)=>{
        setReservation(item)
        setRes_details(true)
    }

    console.log(data)

    return(
        <div>
            {res_details&&<ReservationDetails reservation={reservation} setRes_details={setRes_details} refetch={refetch}/>}
            <table className='table'>
                <thead>
                    <tr>
                        <th>Res. ID</th>
                        <th>User Name</th>
                        <th>Property Title</th>
                        <th>Check Out</th>
                        <th>Nights</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Payment Status</th>
                        <th>Paid Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { data.length>0&&Array.isArray(data)?data.map(item => (
                    <tr key={item.reservation_id}>
                        <td>{item.reservation_id}</td>
                        <td>{item.full_name}</td>
                        <td>{item.unit_title}</td>
                        <td>{dayjs(item.check_out).format('DD/MM/YYYY HH:mm')}</td>
                        <td>{differenceInCalendarDays(dayjs(item.check_out).toDate(),dayjs(item.check_in).toDate())}</td>
                        <td>{item.price} Dt</td>
                        <td>{item.status}</td>
                        <td>{item.payment_status}</td>
                        <td>{item.paid_amount} Dt</td>
                        <td style={details} onClick={()=>show_details(item)}>Manage</td>
                    </tr>)):<tr style={{ height:'40px'}}><td colSpan="10" style={{textAlign:'center'}}>{msg?msg:'No data'}</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

export { Reservations_ongoing, Reservations }
