import virtual_tour from '../assets/360deg.svg';
import rent_deal from '../assets/rent_deal.svg';
import secure from '../assets/secure.svg';
import { GiDolphin } from "react-icons/gi";
import { FaSailboat } from "react-icons/fa6";


const Fea_ov=()=>{
    const features_cnt={
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:'9vh 6vw',
        boxShadow: '10px 0 7px 12px rgb(255, 255, 255)',
        position:'relative',
    }

    const features={
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        fontSize:'14px',

    }
    const icons={
        width:'8.7vw',
        marginTop:'1vh',
        marginBottom:'2.5vh',
    }

    return(
        <section style={features_cnt}>
            <GiDolphin className='icon'/>
            <FaSailboat className='icon1'/>
            <div style={features}>
                <img src={virtual_tour} style={icons} />
                <h3 style={{marginBottom:'7px'}}>Explore with a Virtual Tour</h3>
                <h6>properties from the comfort of your home </h6>
                <h6>with immersive virtual tours.</h6>
            </div>
            <div style={features}>
                <img src={rent_deal} style={{...icons,filter: 'drop-shadow(0 0 1px #007bff)',marginTop:'0'}} />
                <h3 style={{marginBottom:'7px'}}>Find, Book, Relax</h3>
                <h6>Browse listings, choose your stay</h6>
                <h6>and book in just a few clicks.</h6>
            </div>
            <div style={features}>
                <img src={secure} style={icons} />
                <h3 style={{marginBottom:'7px'}}>Properties You Can Trust</h3>
                <h6>All properties listed on our platform are verified</h6>
                <h6>to ensure safety, reliability, and quality.</h6>
            </div>
        </section>
    );
}
export default Fea_ov;