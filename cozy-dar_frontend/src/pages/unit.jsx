import BasicInfo from '../components/unit/basicInfo';
import Gallery from '../components/unit/gallery';
import Amenities from '../components/unit/amenities';
import Similar_prop from '../components/unit/similar_prop';
import What_to_expect from '../components/unit/what_to_expect';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useLocation,useNavigate } from "react-router-dom";
import SuccessMsg from '../components/shared/sucessMsg';
import PropertyMap from '../components/unit/map';

const Unit=({display_s, setDisplay_s, display_l, setDisplay_l, token, setToken,setFavorites,favorites})=>{
    const { unit_id } = useParams();
    const [unit, setUnit] = useState([]); 
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const [message,setMessage]=useState('');
    const [bgcolor,setBgcolor]=useState('');
    const [showSuccess,setShowSuccess]=useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state && location.state.showSuccess) {
            setShowSuccess(true);
            setMessage(location.state.message);
            setBgcolor(location.state.color);
            navigate(location.pathname, { replace: true });
            }
          }, [location.state]);

    useEffect(() => {
        const fetch_unit=async ()=>{
            try{
                const result = await fetch(`http://localhost:5000/unit/${unit_id}`)
                if (!result.ok) {
                    throw new Error('Failed to fetch amenities');
                  }
                  const data = await result.json();
                  setUnit(data);
            } catch (err) {
                  console.log(err.message);
            } finally {
                  setLoading(false);
            }
            
        }
        fetch_unit()
    }, []);
    if (loading) {
        return <div>Loading...</div>;
      }
    console.log(unit)
    console.log(unit.unit.image_urls)
    console.log(unit.amenities)
    return(
        <div style={{position:'relative'}}>
            <div style={{display:'flex',flexDirection:'row',gap:'30px',margin:'12.5vh 6vw 0 6vw'}}>
                <div style={{width:'60vw',display:'flex',flexDirection:'column',gap:'30px'}}>
                    <Gallery images={unit.unit.image_urls}/>
                    <Amenities amenities={unit.amenities}/>
                    <What_to_expect/>
                    <PropertyMap property={unit.property}/>
                </div>
                <div style={{flex:'1',width:'100%'}}><BasicInfo unit_info={unit} display_s={display_s} setDisplay_s={setDisplay_s} display_l={display_l} setDisplay_l={setDisplay_l} token={token} setToken={setToken} setFavorites={setFavorites} favorites={favorites}/></div>
            </div>
            <div><Similar_prop/></div>
            {showSuccess && (
                <SuccessMsg show={showSuccess} message={message} setShow={setShowSuccess} style={{backgroundColor:bgcolor}}/>
              )}
        </div>

    )
}

export default Unit;