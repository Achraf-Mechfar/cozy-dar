import { useState } from "react"
import { DetailRequests,DetailApproved,DetailEdit,PropertyDetails,Units} from "./details"
import dayjs from "dayjs"
import SuccessMessage from "../shared/sucessMsg"

const details={
    cursor:'pointer',
    textDecorationLine:'underline',
}


const Pending=({prop,refetch})=>{
    const [prop_details,setProp_details]=useState(false)
    const [request,setRequest]=useState([])
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const show_details=(item)=>{
        setRequest(item)
        setProp_details(true)
    }

    console.log(prop)
    return(
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Owner</th>
                        <th>Phone</th>
                        <th>Submitted Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(prop)?prop.map(item => (
                    <tr key={item.request_id}>
                        <td>{item.request_id}</td>
                        <td>{item.property_title}</td>
                        <td>{item.location}</td>
                        <td>{item.property_type}</td>
                        <td>{item.full_name}</td>
                        <td>{item.phone}</td>
                        <td>{dayjs(item.created_at).format('DD/MM/YYYY')}</td>
                        <td style={details} onClick={()=>show_details(item)}>Details</td>
                    </tr>)):<tr style={{ height:'40px'}}><td colSpan="8" style={{textAlign:'center'}}>No data</td></tr>}
                </tbody>
            </table>
            {prop_details && <DetailRequests request={request} setProp_details={setProp_details} show={setShowSuccessMessage} refetch={refetch}/>}

            <SuccessMessage show={showSuccessMessage} message="Request Initially approved" setShow={setShowSuccessMessage} />
        </div>
    )
}

const Initial_approved=({prop,refetch})=>{
    const [prop_details,setProp_details]=useState(false)
    const [request,setRequest]=useState([])
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    

    const show_details=(item)=>{
        setRequest(item)
        setProp_details(true)
    }

    console.log(prop)
    return(
        <div>
            {prop_details && <DetailApproved request={request} setProp_details={setProp_details} show={setShowSuccessMessage} refetch={refetch}/>}
            <SuccessMessage show={showSuccessMessage} message="Request Approved Successfully" setShow={setShowSuccessMessage} />
            <table className='table'>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Owner</th>
                        <th>Phone</th>
                        <th>Submitted Date</th>
                        <th>Meeting Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(prop)?prop.map(item => (
                    <tr key={item.request_id}>
                        <td>{item.request_id}</td>
                        <td>{item.property_title}</td>
                        <td>{item.location}</td>
                        <td>{item.property_type}</td>
                        <td>{item.full_name}</td>
                        <td>{item.phone}</td>
                        <td>{dayjs(item.created_at).format('DD/MM/YYYY')}</td>
                        <td>{dayjs(item.meeting_date).format('DD/MM/YYYY')}</td>
                        <td style={details} onClick={()=>show_details(item)}>Details</td>
                    </tr>)):<tr style={{ height:'40px'}}><td colSpan="9" style={{textAlign:'center'}}>No data</td></tr>}
                </tbody>
            </table>
            
        </div>
    )
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
            {prop_details && <DetailEdit request={request}/>}
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
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
        </div>
    )
}

const Properties_table=({prop,refetch})=>{
    const [prop_details,setProp_details]=useState(false)
    const [property,setProperty]=useState([])
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const show_details=(item)=>{
        setProperty(item)
        setProp_details(true)
    }

    console.log(prop)
    return(
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Owner</th>
                        <th>Phone</th>
                        <th>Submitted Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(prop)?prop.map(item => (
                    <tr key={item.property_id}>
                        <td>{item.property_id}</td>
                        <td>{item.title}</td>
                        <td>{item.city}, {item.district}</td>
                        <td>{item.property_type} {item.property_type==='Residence'?<span style={{fontSize:'12px'}}>of {item.units.length} units</span>:<></>}</td>
                        <td>{item.full_name}</td>
                        <td>{item.phone}</td>
                        <td>{dayjs(item.added_at).format('DD/MM/YYYY')}</td>
                        <td style={details} onClick={()=>show_details(item)}>Details</td>
                    </tr>)):<tr style={{ height:'40px'}}><td colSpan="8" style={{textAlign:'center'}}>No data</td></tr>}
                </tbody>
            </table>
            {prop_details &&(property.property_type==='Residence'?<Units property={property} setProp_details={setProp_details} show={setShowSuccessMessage} refetch={refetch}/>:
            <PropertyDetails property={property} setProp_details={setProp_details} show={setShowSuccessMessage} refetch={refetch}/>)}
            <SuccessMessage show={showSuccessMessage} message="Request Approved Successfully" setShow={setShowSuccessMessage} />
        </div>
    )
}

export {Pending,Initial_approved,My_Requests,Properties_table};