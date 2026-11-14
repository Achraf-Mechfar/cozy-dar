
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import { jwtDecode } from 'jwt-decode';
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

const Balance=()=>{
    const user_id=jwtDecode(localStorage.getItem('token')).userId;

    const [totalIncome,setTotalIncome]=useState(0);
    const [totalExpenses,setTotalExpenses]=useState(0);
    const [balance,setBalance]=useState(null);
    const [payouts,setPayouts]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        fetchTotalIncome();
        fetchTotalExpenses(); 
        fetchBalance();
        fetchPayouts();
    },[])
    useEffect(()=>{
        setLoading(false);
    },[payouts])

    const fetchTotalIncome=async()=>{
        const response=await fetch(`/total_income/${user_id}`);
        const data=await response.json();
        setTotalIncome(data.total_income);
    }

    const fetchTotalExpenses=async()=>{
        const response=await fetch(`/total_expenses/${user_id}`);
        const data=await response.json();
        setTotalExpenses(data.total_expenses);
    }

    const fetchBalance=async()=>{
        const response=await fetch(`/balance/${user_id}`);
        const data=await response.json();
        setBalance(data[0]);
    }
    const fetchPayouts=async()=>{
        const response=await fetch(`/payouts/${user_id}`);
        const data=await response.json();
        setPayouts(data);
    }


    return(
        <section>
            {loading || !balance ? (
                <div style={{...container, padding: '20px 30px'}}>
                    <p>Loading...</p>
                </div>
            ) : (
                <div style={{...container, padding: '20px 30px'}}>
                <table style={{width: '40%', borderCollapse: 'collapse'}}>
                    <thead>
                        <tr>
                            <th colSpan="2" style={{paddingBottom: '15px', textAlign: 'center', borderBottom: '1px solid rgba(173, 173, 173, 0.2)'}}>
                                <p style={{fontWeight: '500', margin: '0 0 5px 0'}}>Balance</p>
                                <p style={{fontSize: '1.2em', margin: 0, fontWeight: 'bold'}}>{balance.current_balance} DT</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Income:</td>
                            <td style={{textAlign: 'right', padding: '15px 0 5px 0', fontWeight: '500'}}>{totalIncome} DT</td>
                        </tr>
                        <tr>
                            <td>Total Expenses:</td>
                            <td style={{textAlign: 'right', padding: '15px 0 5px 0', fontWeight: '500'}}>{totalExpenses} DT</td>
                        </tr>
                        <tr>
                            <td>Net Income:</td>
                            <td style={{textAlign: 'right', padding: '5px 0 15px 0', fontWeight: '500'}}>{totalIncome - totalExpenses} DT</td>
                        </tr>
                        <tr>
                            <td>Previous Payouts:</td>
                            <td style={{textAlign: 'right', padding: '5px 0 15px 0', fontWeight: '500'}}>{balance.total_payouts} DT</td>
                        </tr>
                    </tbody>
                </table>
                <div style={{marginTop: '80px'}}>
                    <h3 style={{margin: '0 0 15px 0', fontSize: '1.1em', fontWeight: '500'}}>Payouts History</h3>
                    <table style={{width: '40%', borderCollapse: 'collapse', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden'}}>
                        <thead>
                            <tr style={{backgroundColor: '#f8f9fa'}}>
                                <th style={{padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Date</th>
                                <th style={{padding: '12px 15px', textAlign: 'right', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Amount</th>
                                <th style={{padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payouts.map((payout)=>(
                                <tr style={{borderBottom: '1px solid rgba(0, 0, 0, 0.05)'}}>
                                <td style={{padding: '12px 15px'}}>{dayjs(payout.payout_date).format('YYYY-MM-DD')}</td>
                                <td style={{padding: '12px 15px', textAlign: 'right', fontWeight: '500', color: '#28a745'}}>{payout.amount} DT</td>
                                <td style={{padding: '12px 15px'}}>
                                    <span style={{
                                        backgroundColor: '#e8f5e9',
                                        color: '#2e7d32',
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '0.8em',
                                        fontWeight: '500'
                                    }}>{payout.status}</span>
                                </td>
                            </tr>
                            ))}

                            <tr>
                                <td style={{padding: '12px 15px'}}></td>
                                <td style={{padding: '12px 15px', textAlign: 'right', fontWeight: '500'}}>Total Payouts:</td>
                                <td style={{padding: '12px 15px', textAlign: 'right', fontWeight: 'bold', color: '#28a745'}} colSpan="2">{balance.total_payouts} DT</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
            )}
        </section>
    )
}
export default Balance