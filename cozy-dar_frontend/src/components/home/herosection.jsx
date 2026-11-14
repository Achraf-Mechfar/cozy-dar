import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';


const Herosection=()=>{
    const hero={
        width:'100%',
        height:'66vh',
        background: '#846D9D',
        background: 'linear-gradient(90deg,rgba(132, 109, 157, 1) 0%, rgba(132, 109, 157, 1) 45%, rgba(9, 81, 163, 1) 100%)',
        paddingLeft:'10vw',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        paddingBottom:'15px',
    }

    const hero_bttn={
        color:'white',
        border:'1px solid #007BFF',
        borderRadius:'20px',
        padding: '1.25vh 1.7vw',
        marginRight:'1.7vw',
    }

    return(
        <section style={hero}>
            <img src={logo} style={{width:'500px',height:'500px',position:'absolute',right:'35px',opacity:'0.25'}}></img>
            <p style={{fontSize:'36px',color:'white',fontWeight:'bold'}}>A Home for Every Story</p>
            <p style={{fontSize:'30px',color:'white'}}>Rent Today or Buy for Tomorrow!</p>
            <div style={{marginTop:'6vh'}}><Link style={{...hero_bttn,backgroundColor: '#007BFF'}} to="/rent" >Rent a House</Link><Link style={hero_bttn} to="/buy">Buy a Property</Link></div>

        </section>
    )
}
export default Herosection;