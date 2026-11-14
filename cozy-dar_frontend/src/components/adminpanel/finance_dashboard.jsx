import dayjs from "dayjs"
import CircularPB from "../shared/circularProgressbar"
import { useState,useEffect } from "react"
const FinanceDashboard=({dailyAnalytics})=>{
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
    const [data,setdata]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        fetch('http://localhost:5000/admin/platform_finance',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(res=>res.json())
        .then(data=>{console.log(data);setdata(data)})
    },[])
    useEffect(()=>{
        setLoading(false)
        console.log(data)
    },[data])
    return(
        <section>
            <div style={{...container,display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
                    <p style={{fontWeight:'600',fontSize:'24px',marginLeft:'10px'}}>{data.total_income} Dt</p>
                    <p style={{fontSize:'14px'}}>Total Income</p>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
                    <p style={{fontWeight:'600',fontSize:'24px',marginLeft:'10px'}}>{dailyAnalytics.units_number}</p>
                    <p style={{fontSize:'14px'}}>Number of Units</p> 
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'5px'}}>
                    <p style={{fontWeight:'600',fontSize:'24px',marginLeft:'10px'}}>{dailyAnalytics.total_res}</p>
                    <p style={{fontSize:'14px'}}>Number of Reservations</p> 
                </div>

            </div>
            {loading ? (
                <div style={{...container, padding: '20px 30px'}}>
                    <p>Loading...</p>
                </div>
            ) : (
                <div style={{...container, padding: '20px 30px'}}>
                <table style={{width: '50%', borderCollapse: 'collapse'}}>
                    <thead>
                        <tr>
                            <th colSpan="2" style={{paddingBottom: '15px', textAlign: 'center', borderBottom: '1px solid rgba(173, 173, 173, 0.2)'}}>
                                <p style={{fontWeight: '500', margin: '0 0 5px 0'}}>Website Balance <span style={{fontSize:'12px'}}>(Held Money)</span></p>
                                <p style={{fontSize: '1.2em', margin: 0, fontWeight: 'bold'}}>{data.platform_balance} DT</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Income:</td>
                            <td style={{textAlign: 'right', padding: '15px 0 5px 0', fontWeight: '500'}}>{data.total_income} DT</td>
                        </tr>
                        <tr>
                            <td>Total Expenses <span style={{fontSize:'12px'}}>(includes owner's share)</span>:</td>
                            <td style={{textAlign: 'right', padding: '15px 0 5px 0', fontWeight: '500'}}>{data.total_expenses} DT</td>
                        </tr>
                        <tr>
                            <td>Released Payouts:</td>
                            <td style={{textAlign: 'right', padding: '5px 0 15px 0', fontWeight: '500'}}>{data.total_released_expenses} DT</td>
                        </tr>
                        <tr>
                            <td>Unreleased Payouts:</td>
                            <td style={{textAlign: 'right', padding: '5px 0 15px 0', fontWeight: '500'}}>{data.total_unreleased_expenses} DT</td>
                        </tr>
                        <tr>
                            <td>Net Profit:</td>
                            <td style={{textAlign: 'right', padding: '5px 0 15px 0', fontWeight: '500'}}>{data.net_profit} DT</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            )}
        </section>
    )
}
export default FinanceDashboard