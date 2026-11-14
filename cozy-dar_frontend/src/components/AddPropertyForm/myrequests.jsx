import {useLocation,useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import {My_Requests} from "../shared/table";
import { jwtDecode } from "jwt-decode";
import SuccessMessage from "../shared/sucessMsg";

const MyRequests=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const [showSuccess,setShowSuccess]=useState(false)
    const [requests, setRequests] = useState([]); 
    useEffect(() => {
        fetch(`http://localhost:5000/myrequests/${jwtDecode(localStorage.getItem('token')).userId}`)
            .then(res => res.json())
            .then(data => {
              setRequests(data);
            })
            .catch(err => console.error('Error fetching properties:', err));
        }, []);

    useEffect(() => {
        if (location.state && location.state.showSuccess) {
            setShowSuccess(true);
            navigate(location.pathname, { replace: true });
            }
          }, [location.state]);

    const container={
        width:'100%',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)',
        border:'1px solid rgba(0, 0, 0, 0.03)',
        height:'fit-content',
        padding:'25px 35px',
        borderRadius:'10px',
        gap:'10px',


    }

    return(
        <section style={container}>
            <div>
            <h4 style={{fontWeight:'600',marginBottom:'20px'}}>My Rent Requests</h4>
            </div>
            <div>
                <My_Requests prop={requests}/>
            </div>
            <SuccessMessage show={showSuccess} message="Request Added Successfully" setShow={setShowSuccess} style={{left:'58%'}}/>

        </section>
    )
}
export default MyRequests