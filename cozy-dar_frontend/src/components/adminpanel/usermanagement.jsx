import { useEffect, useState } from "react";
import { RegularUsers,PropertyOwners,Admins } from "./user_table";
import { InputField } from "../shared/inputfield";
const UserManagement=()=>{
    const [data, set_data] = useState([]);
    const [regular_users,set_regular_users]=useState([])
    const [house_owners,set_house_owners]=useState([])
    const [admins,set_admins]=useState([])
    const [regular_user_search,setRegularUserSearch]=useState('')
    const [house_owner_search,setHouseOwnerSearch]=useState('')
    const [admin_search,setAdminSearch]=useState('')
    const [loading,setLoading]=useState(true)
    const fetch_users=()=>{
        fetch(`http://localhost:5000/admin/regular_users?search=${regular_user_search}`,{
            method:'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res=>res.json())
        .then(data=>set_regular_users(data))
        .catch(err=>console.log(err))
    }
    const fetch_house_owners=()=>{
        fetch(`http://localhost:5000/admin/property_owners?search=${house_owner_search}`,{
            method:'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res=>res.json())
        .then(data=>set_house_owners(data))
        .catch(err=>console.log(err))
    }
    const fetch_admins=()=>{
        fetch(`http://localhost:5000/admin/admins?search=${admin_search}`,{
            method:'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res=>res.json())
        .then(data=>set_admins(data))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        fetch_users()
        fetch_house_owners()
        fetch_admins()

    },[regular_user_search,house_owner_search,admin_search])
    

    console.log(regular_users)
    console.log(house_owners)
    console.log(admins)
    const container={
        width:'100%',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)',
        border:'1px solid rgba(0, 0, 0, 0.03)',
        height:'fit-content',
        padding:'25px 35px',
        borderRadius:'10px',
        gap:'10px',
        margin:'6vh 0',
    }
    return(
        <section>
            <div style={{...container,display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
                    <p style={{fontWeight:'600',fontSize:'24px',marginLeft:'10px'}}>{regular_users.length+house_owners.length}</p>
                    <p style={{fontSize:'14px'}}>Registered Users</p>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
                    <p style={{fontWeight:'600',fontSize:'24px',marginLeft:'10px'}}>{regular_users.length}</p>
                    <p style={{fontSize:'14px'}}>Regular Users</p> 
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
                    <p style={{fontWeight:'600',fontSize:'24px',marginLeft:'10px'}}>{house_owners.length}</p>
                    <p style={{fontSize:'14px'}}>Property Owners</p> 
                </div>

            </div>
            <div style={container}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}><h4 style={{fontWeight:'600'}}>Regular Users</h4><InputField placeholder="Search" style={{width:'40%',scale:'0.9'}} onChange={(e)=>setRegularUserSearch(e.target.value)} value={regular_user_search}/></div>
                <RegularUsers data={regular_users}/>
            </div>
            <div style={container}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}><h4 style={{fontWeight:'600'}}>Property Owners</h4><InputField placeholder="Search" style={{width:'40%',scale:'0.9'}} onChange={(e)=>setHouseOwnerSearch(e.target.value)} value={house_owner_search}/></div>
                <PropertyOwners data={house_owners}/>
            </div>
            <div style={container}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}><h4 style={{fontWeight:'600'}}>Admins</h4><InputField placeholder="Search" style={{width:'40%',scale:'0.9'}} onChange={(e)=>setAdminSearch(e.target.value)} value={admin_search}/></div>
                <Admins data={admins}/>
            </div>

        </section>
    )
}
export default UserManagement