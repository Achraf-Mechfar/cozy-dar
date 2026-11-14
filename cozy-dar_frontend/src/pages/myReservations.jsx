import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { My_Reservations,Reservations_History } from "../components/shared/table";
import SuccessMessage from "../components/shared/sucessMsg";
import { useLocation, useNavigate } from "react-router-dom";
const MyReservations=()=>{

    const [reservations, setReservations] = useState([]);
    const [reservationsHistory, setReservationsHistory] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [msg, setMsg] = useState('');
    const page_container={
        marginTop:'7.5vh',
        padding:'6vh 6vw',
    }
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
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state?.showSuccess) {
            setShowSuccess(true);
            setMsg(location.state.message);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, location.pathname]);
    useEffect(() => {
        fetch(`http://localhost:5000/reservations/my_reservations/${jwtDecode(localStorage.getItem('token')).userId}`)
            .then(res => res.json())
            .then(data => {
              setReservations(data);
              console.log(data)
            })
            .catch(err => console.error('Error fetching data:', err));
        }, []);

        useEffect(() => {
            fetch(`http://localhost:5000/reservations/reservations_history/${jwtDecode(localStorage.getItem('token')).userId}`)
                .then(res => res.json())
                .then(data => {
                  setReservationsHistory(data);
                  console.log(data)
                })
                .catch(err => console.error('Error fetching data:', err));
            }, []);

    return(
        <section style={page_container}>
            <h2 style={{fontWeight:'600'}}>My Reservations</h2>
            <div style={container}>
                <h4 style={{fontWeight:'600',marginBottom:'20px'}}>Upcoming Reservations</h4>
                <div>
                    <My_Reservations data={reservations}/>
                </div>
            </div>
            <div style={container}>
                <h4 style={{fontWeight:'600',marginBottom:'20px'}}>Reservations History</h4>
                <div>
                    <Reservations_History data={reservationsHistory}/>
                </div>
            </div>
            <SuccessMessage show={showSuccess} message={msg} setShow={setShowSuccess} style={{top:'10vh'}}/>
        </section>
    )
}
export default MyReservations