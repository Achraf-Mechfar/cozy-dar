import { Link } from "react-router-dom";
import { BsHouseAdd,BsHouses } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar=()=>{

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

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

    const items={
        padding:'20px',
        display:'flex',
        alignItems:'center',
        transition:'background-color 0.2s ease',
    }

    const icon={
        fontSize:'20px',
        marginRight:'10px',
        color:'#007bff',
    }
    return(
        <section style={container}>
            <h3 style={{padding:'30px 0 15px 20px',fontWeight:'600'}}>{jwtDecode(localStorage.getItem('token')).role==='owner' ? 'Owner Dashboard' : 'Setup'}</h3>
            <Link className={`side_element ${isActive("/rentrequest/addRequest")? 'active' : ''}`} to="/rentrequest/addRequest"><BsHouseAdd style={icon}/>Add Property</Link>
            <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
            <Link className={`side_element ${isActive("/rentrequest/myRequests")? 'active' : ''}`} to="/rentrequest/myRequests"><HiOutlineClipboardDocumentList style={{...icon,fontSize:'22px'}}/>My Requests</Link>
            {jwtDecode(localStorage.getItem('token')).role==='owner' && (
                <>
                    <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
                    <Link className={`side_element ${isActive("/rentrequest/myProperties")? 'active' : ''}`} to="/rentrequest/myProperties"><BsHouses style={icon}/>My Properties</Link>
                    <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
                    <Link className={`side_element ${isActive("/rentrequest/balance")? 'active' : ''}`} to="/rentrequest/balance"><BsHouses style={icon}/>Balance & Payouts</Link>
                </>
            )}
        </section>
    )
}
export default Sidebar;