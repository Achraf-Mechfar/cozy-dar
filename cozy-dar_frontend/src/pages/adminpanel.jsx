import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';
import Sidebar from "../components/adminpanel/sidebar.jsx";
import Requests from "../components/adminpanel/requests.jsx";
import { UpcomingReservations } from "../components/adminpanel/reservations";
import FinanceDashboard from "../components/adminpanel/finance_dashboard";
import Properties from "../components/adminpanel/Properties";
import UserManagement from "../components/adminpanel/usermanagement";
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const Adminpanel=()=>{
    const container={
        display:'flex',
        flexDirection:'row',
        marginTop:'7.5vh'
    }
    const [token,setToken]=useState(localStorage.getItem('token'));
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();
    const [dailyAnalytics, setDailyAnalytics] = useState([]);
    const [loadingAnalytics, setLoadingAnalytics] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/daily_analytics', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch analytics');
                }
                
                const data = await response.json();
                setDailyAnalytics(data);
            } catch (err) {
                console.error('Error fetching analytics:', err);
                setError(err.message);
            } finally {
                setLoadingAnalytics(false);
            }
        };
    
        fetchAnalytics();
    }, []);
        useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            navigate('/');
            return;
        }

        try {
            if (jwtDecode(token).role !== 'admin' ) {
                navigate('/');
            }
            else if(jwtDecode(token).role === 'admin' && dailyAnalytics){
                setLoading(false);
                console.log('loading false');
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            navigate('/');
        }
    }, [navigate]);
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'token' && !e.newValue) {
                navigate('/');
            }
        };
    
        window.addEventListener('storage', handleStorageChange);
    
        const handleFocus = () => {
            if (!localStorage.getItem('token')) {
                navigate('/');
            }
        };
    
        window.addEventListener('focus', handleFocus);
    
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('focus', handleFocus);
        };
    }, [navigate]);

    if (loading || loadingAnalytics) {
        return <div>Loading...</div>; 
    }
    console.log(dailyAnalytics[0]);

    return(
        <section style={container}>
            <div style={{width:'19.53vw',height:'92.5vh',position:'fixed'}}><Sidebar/></div>
            <div style={{padding:'0vh 6vw',width:'100%',marginLeft:'19.53vw'}}>
                <Routes>
                    <Route path="reservations" element={<div><UpcomingReservations dailyAnalytics={dailyAnalytics[0]}/></div>}/>
                    <Route path="propertyrequests" element={<div><Requests dailyAnalytics={dailyAnalytics[0]}/></div>}/>
                    <Route path="properties" element={<div><Properties /></div>}/>
                    <Route path="users" element={<div><UserManagement /></div>}/>
                    <Route path="finance" element={<div><FinanceDashboard dailyAnalytics={dailyAnalytics[0]}/></div>}/>

                </Routes>
            </div>
        </section>
    )
}
export default Adminpanel;