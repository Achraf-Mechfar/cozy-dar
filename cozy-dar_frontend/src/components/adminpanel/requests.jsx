import dayjs from "dayjs"
import CircularPB from "../shared/circularProgressbar"
import { useState, useEffect } from "react";
import {Pending,Initial_approved} from "./prop_table"

const Requests=({dailyAnalytics})=>{
    const [pending, setPending] = useState([]);
    const [initial_approved, setInitial_approved] = useState([]);

    const fetchPending = () => {
        fetch('http://localhost:5000/admin/prop_requests?status=pending', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                setPending(data);
            })
            .catch(err => console.error('Error fetching properties:', err));
    };
    const fetchInitial_approved = () => {
        fetch('http://localhost:5000/admin/prop_requests?status=initial_approved',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res => res.json())
        .then(data => {
          setInitial_approved(data);
        })
        .catch(err => console.error('Error fetching properties:', err));
    };
    
    const refetch=()=>{
        fetchPending();
        fetchInitial_approved();
    }
    useEffect(() => {
        refetch();
    }, []);

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
                <div style={{display:'flex',flexDirection:'column',width:'50%'}}>
                    <h4 style={{fontWeight:'500', alignSelf:'center',textAlign:'center'}}>Today <br/><span style={{fontSize:'12px'}}>( {dayjs(new Date()).format('DD/MM/YYYY')} )</span></h4>
                    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',margin:'15px 0'}}>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
                            <p style={{fontWeight:'600',fontSize:'26px'}}>{dailyAnalytics.today_meetings}</p>
                            <p style={{fontSize:'14px'}}>Meetings</p>
                        </div>
                    </div>
                </div>
                <div style={{width:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.4)'}}></div>

                <div style={{display:'flex',flexDirection:'column',width:'50%'}}>
                    <h4 style={{fontWeight:'500', alignSelf:'center',textAlign:'center'}}>Tomorrow <br/><span style={{fontSize:'12px'}}>( {dayjs(new Date()).add(1,'day').format('DD/MM/YYYY')} )</span></h4>
                    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',margin:'15px 0'}}>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
                            <p style={{fontWeight:'600',fontSize:'26px'}}>{dailyAnalytics.tomorrow_meetings}</p>
                            <p style={{fontSize:'14px'}}>Meetings</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={container}>
                <div>
                    <h4 style={{fontWeight:'600',marginBottom:'20px'}}>New Property Requests</h4>
                </div>
                <div>
                    <Pending prop={pending} refetch={refetch}/>
                </div>
            </div>
            <div style={container}>
                <div>
                    <h4 style={{fontWeight:'600',marginBottom:'20px'}}>Pending Full Approval</h4>
                </div>
                <div>
                    <Initial_approved prop={initial_approved} refetch={refetch}/>
                </div>
            </div>
        </section>
    )
}
export default Requests
