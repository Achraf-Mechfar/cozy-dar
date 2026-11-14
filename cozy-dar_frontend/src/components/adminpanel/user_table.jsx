import { useState } from "react";

const details={
    cursor:'pointer',
    textDecorationLine:'underline',
}
const RegularUsers=({data})=>{
    const [user_details,setUser_details]=useState(false)
    const [user,setUser]=useState({})
    
    return(
        <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Reservations</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { data.length>0&&Array.isArray(data)?data.map(item => (
                <tr key={item.user_id}>
                    <td>{item.user_id}</td>
                    <td>{item.full_name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.nbr_reservations}</td>
                    <td style={details} onClick={{}}>Manage</td>
                </tr>)):<tr style={{ height:'40px'}}><td colSpan="6" style={{textAlign:'center'}}></td></tr>}
            </tbody>
        </table>
    </div>
)
}


const PropertyOwners=({data})=>{
    const [user_details,setUser_details]=useState(false)
    const [user,setUser]=useState({})
    
    return(
        <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Units</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { data.length>0&&Array.isArray(data)?data.map(item => (
                <tr key={item.user_id}>
                    <td>{item.user_id}</td>
                    <td>{item.full_name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.nbr_units}</td>
                    <td style={details} onClick={{}}>Manage</td>
                </tr>)):<tr style={{ height:'40px'}}><td colSpan="6" style={{textAlign:'center'}}></td></tr>}
            </tbody>
        </table>
    </div>
)
}

const Admins=({data})=>{
    const [user_details,setUser_details]=useState(false)
    const [user,setUser]=useState({})
    
    return(
        <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { data.length>0&&Array.isArray(data)?data.map(item => (
                <tr key={item.user_id}>
                    <td>{item.user_id}</td>
                    <td>{item.full_name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td style={details} onClick={{}}>Manage</td>
                </tr>)):<tr style={{ height:'40px'}}><td colSpan="6" style={{textAlign:'center'}}></td></tr>}
            </tbody>
        </table>
    </div>
)
}



export {RegularUsers,PropertyOwners,Admins}
