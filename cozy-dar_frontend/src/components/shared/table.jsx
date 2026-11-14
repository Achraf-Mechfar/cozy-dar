import dayjs from "dayjs";
import { useState } from "react";
import { DetailEdit } from "../adminpanel/details";
import { differenceInCalendarDays } from "date-fns";

const details={
    cursor:'pointer',
    textDecorationLine:'underline',
}
const My_Requests=({prop})=>{
    const [prop_details,setProp_details]=useState(false)
    const [request,setRequest]=useState([])

    const show_details=(item)=>{
        setRequest(item)
        setProp_details(true)
        console.log(request)
    }

    console.log(prop)
    return(
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Submitted Date</th>
                        <th>Status</th>
                        <th>Meeting Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(prop)?prop.map(item => (
                    <tr key={item.request_id}>
                        <td>{item.request_id}</td>
                        <td>{item.property_title}</td>
                        <td>{item.property_type}</td>
                        <td>{dayjs(item.created_at).format('DD/MM/YYYY')}</td>
                        <td>{item.status}</td>
                        <td>{item.status==='pending'?'-':dayjs(item.meeting_date).format('DD/MM/YYYY')}</td>
                        <td style={details} onClick={()=>show_details(item)}>Edit</td>
                    </tr>)):<tr style={{ height:'40px'}}><td colSpan="7" style={{textAlign:'center'}}>No data</td></tr>}
                </tbody>
            </table>
            {prop_details && <DetailEdit request={request}/>}
        </div>
    )
}

const My_Reservations=({data})=>{

    const show_details=(item)=>{
        console.log(item)
    }

    console.log(data)

    return(
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Property Title</th>
                        <th>Check In</th>
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
                        <td>{item.unit_title}</td>
                        <td>{dayjs(item.check_in).format('DD/MM/YYYY HH:mm')}</td>
                        <td>{dayjs(item.check_out).format('DD/MM/YYYY')}</td>
                        <td>{differenceInCalendarDays(dayjs(item.check_out).toDate(),dayjs(item.check_in).toDate())}</td>
                        <td>{item.price} Dt</td>
                        <td>{item.status}</td>
                        <td>{item.payment_status}</td>
                        <td>{item.paid_amount} Dt</td>
                        <td style={details} onClick={()=>show_details(item)}>Manage</td>
                    </tr>)):<tr style={{ height:'40px'}}><td colSpan="10" style={{textAlign:'center'}}>No data</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

const Reservations_History=({data})=>{

    const show_details=(item)=>{
        console.log(item)
    }

    console.log(data)

    return(
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Property Title</th>
                        <th>Check In</th>
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
                        <td>{item.unit_title}</td>
                        <td>{dayjs(item.check_in).format('DD/MM/YYYY HH:mm')}</td>
                        <td>{dayjs(item.check_out).format('DD/MM/YYYY')}</td>
                        <td>{differenceInCalendarDays(dayjs(item.check_out).toDate(),dayjs(item.check_in).toDate())}</td>
                        <td>{item.price} Dt</td>
                        <td>{item.status}</td>
                        <td>{item.payment_status}</td>
                        <td>{item.paid_amount} Dt</td>
                        <td style={details} onClick={()=>show_details(item)}>Manage</td>
                    </tr>)):<tr style={{ height:'40px'}}><td colSpan="10" style={{textAlign:'center'}}>No data</td></tr>}
                </tbody>
            </table>
        </div>
    )
}
export {My_Requests,My_Reservations,Reservations_History}