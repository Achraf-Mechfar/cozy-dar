import { PiNumberCircleOneFill,PiNumberCircleTwoFill,PiNumberCircleThreeFill,PiNumberCircleFourFill } from "react-icons/pi";

const Howitworks=()=>{

    const container={
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:'30px 0 25px 0'
    }

    const step={
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'50%'
    }
    const c_number={
        fontSize:'60px',
        color:'#007bff',
        marginBottom:'15px',
    }

    return(
    <section style={{margin:'0 6vw', height:'200px'}}>
        <h2 style={{paddingRight:'7px',textAlign:'center'}}>How It Works ?</h2>
        <div style={{display:'flex',flexDirection:'column'}}>
            <div style={container}>
                <div style={step}>
                    <PiNumberCircleOneFill style={c_number}/>
                    <p>Use advanced filters to find the perfect property.</p>
                    <p>Sort by location, price,amenities, and more to match your needs.</p>
                </div>
                <div style={step}>
                    <PiNumberCircleTwoFill style={c_number}/>
                    <p>Take a closer look with virtual tours.</p>
                    <p>Get all the details you need before making your choice.</p>
                </div>
            </div>
            <div style={container}>
                <div style={step}>
                    <PiNumberCircleThreeFill style={c_number}/>
                    <p>Secure your rental in just a few clicks.</p>
                    <p>Our platform ensures a smooth and simple process.</p>
                </div>
                <div style={step}>
                    <PiNumberCircleFourFill style={c_number}/>
                    <p>Enjoy your new home with complete peace of mind.</p>
                    <p>Whether renting or buying, your perfect space is waiting for you.</p>
                </div>
            </div>
        </div>


    </section>)
}
export default Howitworks;