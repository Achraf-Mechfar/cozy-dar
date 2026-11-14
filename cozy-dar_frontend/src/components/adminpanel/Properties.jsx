import {InputField} from "../shared/inputfield";
import { useState, useEffect } from "react";
import { Properties_table } from "./prop_table";


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

const Properties=()=>{
    const [search,setSearch]=useState('')
    const [data, set_data] = useState([]);
    useEffect(()=>{
        console.log(search)
        fetch(`http://localhost:5000/admin/properties?search=${search}`,{
            method:'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res=>res.json())
        .then(data=>set_data(data))
    },[search])
    console.log(data)


    return(
        <section style={container}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}><h4 style={{fontWeight:'600'}}>Properties</h4><InputField placeholder="Search" style={{width:'40%',scale:'0.9'}} onChange={(e)=>setSearch(e.target.value)} value={search}/></div>
            <Properties_table prop={data}/>
        </section>
    )
}
export default Properties