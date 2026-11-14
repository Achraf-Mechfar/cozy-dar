import AddPropertyForm from '../components/AddPropertyForm/AddPropertyForm'
import MyRequests from '../components/AddPropertyForm/myrequests'
import MyProperties from '../components/AddPropertyForm/myproperties'
import Sidebar from '../components/AddPropertyForm/sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReservationsCalendar from '../components/AddPropertyForm/reservationsCalendar';
import Balance from '../components/AddPropertyForm/balance';

const RentRequest=()=>{
    const container={
        display:'flex',
        flexDirection:'row',
        paddingTop:'7.5vh',
    }
    return(
        <section style={container}>
            <div style={{width:'19.53vw',height:'92.5vh',position:'fixed'}}><Sidebar/></div>
            <div style={{padding:'6vh 6vw',width:'100%',marginLeft:'19.53vw'}}>
                <Routes>
                    <Route path="addRequest" element={<AddPropertyForm/>}/>
                    <Route path="myRequests" element={<MyRequests/>}/>
                    <Route path="myProperties" element={<MyProperties/>}/>
                    <Route path="balance" element={<Balance/>}/>
                </Routes>
            </div>
        </section>
    )
}
export default RentRequest