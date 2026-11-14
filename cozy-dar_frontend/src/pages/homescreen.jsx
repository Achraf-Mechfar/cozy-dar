import Herosection from '../components/home/herosection';
import Fea_ov from '../components/home/features_ov';
import Exc_prop from '../components/home/exc_properties';
import Howitworks from '../components/home/howitworks';


const HomeScreen=()=>{
    return(
        <div style={{marginTop:'7.5vh',position:'relative'}}>
            <Herosection/>
            <Fea_ov/>
            <Exc_prop/>
            <Howitworks/>
            
        </div>
    )
}

export default HomeScreen;