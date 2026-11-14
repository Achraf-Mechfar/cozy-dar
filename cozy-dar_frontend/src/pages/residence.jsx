import BasicInfo from '../components/residence/basicInfo';
import Gallery from '../components/residence/gallery';
import Residence_units from '../components/residence/residence_units';
import Similar_prop from '../components/unit/similar_prop';
import What_to_expect from '../components/unit/what_to_expect';
import PropertyMap from '../components/unit/map';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';


const Residence=({favorites,setFavorites})=>{
    const { property_id } = useParams();
    const [residence, setResidence] = useState([]); 
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetch_residence=async ()=>{
            try{
                const result = await fetch(`http://localhost:5000/residence/${property_id}`)
                if (!result.ok) {
                    throw new Error('Failed to fetch data');
                  }
                  const data = await result.json();
                  setResidence(data);
            } catch (err) {
                  console.log(err.message);
            } finally {
                  setLoading(false);
            }
            
        }
        fetch_residence()
    }, []);
    if (loading) {
        return <div>Loading...</div>;
      }
    console.log(residence)
    return(
        <div style={{position:'relative'}}>
            <div style={{display:'flex',flexDirection:'row',gap:'30px',margin:'12.5vh 6vw 0 6vw'}}>
                <div style={{width:'60vw',display:'flex',flexDirection:'column',gap:'30px'}}>
                    <Gallery images={residence}/>
                    <Residence_units residence={residence}/>
                    <PropertyMap property={residence}/>
                </div>
                <div style={{flex:'1',width:'100%'}}><BasicInfo residence={residence} favorites={favorites} setFavorites={setFavorites}/></div>
            </div>
            <div><Similar_prop/></div>
        </div>

    )
}

export default Residence;