import { Link } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { BsHouseAdd, BsHouses } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";

import { useLocation } from "react-router-dom";





const Sidebar=()=>{
    const container={
        left:'0',
        width:'19.53vw',
        height:'92.5vh',
        borderRight:'1px solid rgba(0, 0, 0, 0.03)',
        top:'7.5vh',
        display:'flex',
        flexDirection:'column',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)',
    }

    const icon={
        fontSize:'20px',
        marginRight:'10px',
        color:'#007bff',
    }
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return(
        <section style={container}>
            <h3 style={{padding:'30px 0 15px 20px',fontWeight:'600'}}>Admin Panel</h3>
            <Link className={`side_element ${isActive("/adminpanel/reservations")? 'active' : ''}`} to="/adminpanel/reservations"><IoCalendarOutline style={icon}/>Reservations</Link>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
            <Link className={`side_element ${isActive("/adminpanel/propertyrequests")? 'active' : ''}`} to="/adminpanel/propertyrequests"><BsHouseAdd style={icon}/>Property Requests</Link>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
            <Link className={`side_element ${isActive("/adminpanel/properties")? 'active' : ''}`} to="/adminpanel/properties"><BsHouses style={icon}/>Properties</Link>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
            <Link className={`side_element ${isActive("/adminpanel/users")? 'active' : ''}`} to="/adminpanel/users"><FiUsers style={icon}/>User Management</Link>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
            <Link className={`side_element ${isActive("/adminpanel/finance")? 'active' : ''}`} to="/adminpanel/finance"><IoWalletOutline style={icon}/>Finance Dashboard</Link>
        </section>
    )
}
export default Sidebar;