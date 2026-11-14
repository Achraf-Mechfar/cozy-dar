
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';

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

const UnitEarnings=({unit_id})=>{

    const [income,setIncome]=useState([]);
    
    const [expenses,setExpenses]=useState([]);
    
    const [totalIncome,setTotalIncome]=useState(0);
    const [totalExpenses,setTotalExpenses]=useState(0);
    
    useEffect(()=>{
        fetchIncome(unit_id);
        fetchExpenses(unit_id); 
    },[])

    const fetchIncome=async(unit_id)=>{
        const response=await fetch(`/income/${unit_id}`);
        const data=await response.json();
        setIncome(data);
        setTotalIncome(data.reduce((acc, item) => acc + parseFloat(item.amount), 0));
    }

    const fetchExpenses=async(unit_id)=>{
        const response=await fetch(`/expenses/${unit_id}`);
        const data=await response.json();
        setExpenses(data);
        setTotalExpenses(data.reduce((acc, item) => acc + parseFloat(item.amount), 0));
    }

    console.log(income);
    console.log(expenses);
    return(
        <section>
            <div style={{...container, padding: '20px 30px'}}>
                <table style={{width: '40%', borderCollapse: 'collapse'}}>

                    <tbody>
                        <tr>
                            <td>Income:</td>
                            <td style={{textAlign: 'right', padding: '15px 0 5px 0', fontWeight: '500'}}>{totalIncome} DT</td>
                        </tr>
                        <tr>
                            <td>Expenses:</td>
                            <td style={{textAlign: 'right', padding: '15px 0 5px 0', fontWeight: '500'}}>{totalExpenses} DT</td>
                        </tr>
                        <tr>
                            <td>Net Income:</td>
                            <td style={{textAlign: 'right', padding: '5px 0 15px 0', fontWeight: '500'}}>{totalIncome - totalExpenses} DT</td>
                        </tr>

                    </tbody>
                </table>
                <div style={{marginTop: '80px'}}>
                    <h3 style={{margin: '0 0 15px 0', fontSize: '1.1em', fontWeight: '500'}}>Income Transactions</h3>
                    <table style={{width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden'}}>
                        <thead>
                            <tr style={{backgroundColor: '#f8f9fa'}}>
                                <th style={{padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Date</th>
                                <th style={{padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>res. id</th>
                                <th style={{padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Check-in</th>
                                <th style={{padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Check-out</th>
                                <th style={{padding: '12px 15px', textAlign: 'right', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Nights</th>
                                <th style={{padding: '12px 15px', textAlign: 'right', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Payment Stage</th>
                                <th style={{padding: '12px 15px', textAlign: 'right', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            {income.map((item,index)=>(
                                <tr style={{borderBottom: '1px solid rgba(0, 0, 0, 0.05)'}}>
                                <td style={{padding: '12px 15px'}}>{dayjs(item.date).format('DD/MM/YYYY')}</td>
                                <td style={{padding: '12px 15px'}}>{item.reservation_id}</td>
                                <td style={{padding: '12px 15px'}}>{dayjs(item.check_in).format('DD/MM/YYYY')}</td>
                                <td style={{padding: '12px 15px'}}>{dayjs(item.check_out).format('DD/MM/YYYY')}</td>
                                <td style={{padding: '12px 15px', textAlign: 'right'}}>{dayjs(item.check_out).diff(dayjs(item.check_in), 'day')}</td>
                                <td style={{padding: '12px 15px', textAlign: 'right'}}>{item.payment_stage}</td>
                                <td style={{padding: '12px 15px', textAlign: 'right', fontWeight: '500'}}>{item.amount} DT</td>
                            </tr>
                            ))}
                            <tr>
                                <td style={{padding: '12px 15px'}}></td>
                                <td style={{padding: '12px 15px'}}></td>
                                <td style={{padding: '12px 15px'}}></td>
                                <td style={{padding: '12px 15px'}}></td>
                                <td style={{padding: '12px 15px'}}></td>
                                <td style={{padding: '12px 15px', textAlign: 'right', fontWeight: '500'}}>Total:</td>
                                <td style={{padding: '12px 15px', textAlign: 'right', fontWeight: 'bold'}}>{totalIncome} DT</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{marginTop: '80px'}}>
                    <h3 style={{margin: '0 0 15px 0', fontSize: '1.1em', fontWeight: '500'}}>Expenses</h3>
                    <table style={{width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden'}}>
                        <thead>
                            <tr style={{backgroundColor: '#f8f9fa'}}>
                                <th style={{padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Date</th>
                                <th style={{padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Type</th>
                                <th style={{padding: '12px 15px', textAlign: 'right', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Amount</th>
                                <th style={{padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>res. id</th>
                                <th style={{padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((item,index)=>(
                                <tr style={{borderBottom: '1px solid rgba(0, 0, 0, 0.05)'}}>
                                <td style={{padding: '12px 15px'}}>{dayjs(item.date).format('DD/MM/YYYY')}</td>
                                <td style={{padding: '12px 15px'}}>{item.exp_type}</td>
                                <td style={{padding: '12px 15px', textAlign: 'right', color: '#dc3545'}}>- {item.amount} DT</td>
                                <td style={{padding: '12px 15px'}}>{item.reservation_id}</td>
                                <td style={{padding: '12px 15px', color: '#6c757d'}}>{item.note}</td>
                            </tr>
                            ))}
                            <tr>
                                <td style={{padding: '12px 15px'}} colSpan="2"></td>
                                <td style={{padding: '12px 15px', textAlign: 'right', fontWeight: '500'}}>Total Expenses:</td>
                                <td style={{padding: '12px 15px', textAlign: 'right', fontWeight: 'bold', color: '#dc3545'}} colSpan="2">-{totalExpenses} DT</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
export {UnitEarnings}