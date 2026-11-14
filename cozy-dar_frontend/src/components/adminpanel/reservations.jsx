import { Reservations_ongoing, Reservations } from "./res_table";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { InputField } from "../shared/inputfield";
import CircularPB from "../shared/circularProgressbar";
import dayjs from "dayjs"

const UpcomingReservations=({dailyAnalytics})=>{
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
    const [data, set_data] = useState([]);
    const [search,setSearch]=useState('')

    const fetchUpcomingReservations=()=>{
        fetch(`http://localhost:5000/admin/upcoming_reservations?search=${search}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res=>res.json())
        .then(data=>set_data(data))
    }
    useEffect(()=>{
        console.log(search)
        fetchUpcomingReservations()
    },[search])

    useEffect(()=>{
        console.log(search)

        fetch(`http://localhost:5000/admin/upcoming_reservations?search=${search}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res=>res.json())
        .then(data=>set_data(data))
    },[search])

    const [ongoing, set_ongoing] = useState([]);
    const [ongoingSearch,setOngoingSearch]=useState('')
    useEffect(()=>{    
        fetch(`http://localhost:5000/admin/ongoing_reservations?search=${ongoingSearch}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res=>res.json())
        .then(data=>set_ongoing(data))
    },[ongoingSearch])

    const [history, set_History] = useState([]);
    const [historySearch,setHistorySearch]=useState('')
    useEffect(()=>{
        if(historySearch.length<2){
            return;
        }
        fetch(`http://localhost:5000/admin/reservations_history?search=${historySearch}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res=>res.json())
        .then(data=>set_History(data))
    },[historySearch])
    const refetch=()=>{
        fetchUpcomingReservations()
        setOngoingSearch('')
        setHistorySearch('')
    }
    console.log(dailyAnalytics.today_check_ins)

    return(
        <section>
            <div style={{...container,display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <div style={{display:'flex',flexDirection:'column',width:'50%'}}>
                    <h4 style={{fontWeight:'500', alignSelf:'center',textAlign:'center'}}>Today <br/><span style={{fontSize:'12px'}}>( {dayjs(new Date()).format('DD/MM/YYYY')} )</span></h4>
                    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',margin:'15px 0'}}>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
                            <p style={{fontWeight:'600',fontSize:'26px',marginLeft:'10px'}}>{dailyAnalytics.today_check_ins} <span style={{fontSize:'12px',fontWeight:'normal'}}>{dailyAnalytics.today_check_ins_left} Left</span></p>
                            <p style={{fontSize:'14px'}}>Check-Ins</p>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
                            <p style={{fontWeight:'600',fontSize:'26px',marginLeft:'10px'}}>{dailyAnalytics.today_check_outs} <span style={{fontSize:'12px',fontWeight:'normal'}}>{dailyAnalytics.today_check_outs_left} Left</span></p>
                            <p style={{fontSize:'14px'}}>Check-Outs</p>
                        </div>
                        <div style={{}}>
                            <CircularPB targetValue={parseFloat((dailyAnalytics.today_res_nbr/dailyAnalytics.units_number)*100).toFixed(1)} text={'Occupancy'}/>
                        </div>
                    </div>
                </div>
                <div style={{width:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.4)'}}></div>

                <div style={{display:'flex',flexDirection:'column',width:'50%'}}>
                    <h4 style={{fontWeight:'500', alignSelf:'center',textAlign:'center'}}>Tomorrow <br/><span style={{fontSize:'12px'}}>( {dayjs(new Date()).add(1,'day').format('DD/MM/YYYY')} )</span></h4>
                    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',margin:'15px 0'}}>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
                            <p style={{fontWeight:'600',fontSize:'26px'}}>{dailyAnalytics.tomorrow_check_ins}</p>
                            <p style={{fontSize:'14px'}}>Check-Ins</p>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
                            <p style={{fontWeight:'600',fontSize:'26px'}}>{dailyAnalytics.tomorrow_check_outs}</p>
                            <p style={{fontSize:'14px'}}>Check-Outs</p>
                        </div>
                        <div style={{}}>
                            <CircularPB targetValue={parseFloat((dailyAnalytics.tomorrow_res_nbr/dailyAnalytics.units_number)*100).toFixed(1)} text={'Occupancy'}/>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{...container,marginTop:'6vh'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}><h4 style={{fontWeight:'600'}}>Upcoming Reservations</h4><InputField placeholder="Search" style={{width:'40%',scale:'0.9'}} onChange={(e)=>setSearch(e.target.value)} value={search}/></div>
            <div>
                <Reservations data={data} refetch={refetch}/>
            </div>
            </div>
            <div style={{...container,marginTop:'6vh'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}><h4 style={{fontWeight:'600'}}>Ongoing Reservations</h4><InputField placeholder="Search" style={{width:'40%',scale:'0.9'}} onChange={(e)=>setOngoingSearch(e.target.value)} value={ongoingSearch}/></div>
            <div>
                <Reservations_ongoing data={ongoing} refetch={refetch}/>
            </div>
            </div>
            <div style={{...container,marginTop:'6vh'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}><h4 style={{fontWeight:'600'}}>Past Reservations</h4><InputField placeholder="Search" style={{width:'40%',scale:'0.9'}} onChange={(e)=>setHistorySearch(e.target.value)} value={historySearch}/></div>
            <div>
                <Reservations data={history} msg={historySearch.length<2?'Search for reservations':null} refetch={refetch}/>
            </div>

            </div>
    </section>
    )
}
export {UpcomingReservations}