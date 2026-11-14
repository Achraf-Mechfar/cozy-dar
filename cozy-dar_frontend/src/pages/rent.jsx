import FiltersBar from '../components/rent/filter'
import RentProperties from '../components/rent/rentProperties'
import Map from '../components/rent/map'
import { useEffect, useState } from 'react'
const RentRequest=({favorites,setFavorites})=>{
    const container={
        paddingTop:'7.5vh',
        overflow:'hidden',
    }
    const [properties, setProperties] = useState([]);
    const [filters,setFilters]=useState({})


    useEffect(() => {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (Array.isArray(value)) {
                    queryParams.append(key, value.join(','));
                } else {
                    queryParams.append(key, value);
                }
            }
        });
        fetch(`http://localhost:5000/get_properties_card?${queryParams.toString()}`)
            .then(res => res.json())
            .then(data => {
            setProperties(data);
            })
            .catch(err => console.error('Error fetching properties:', err));
        }, [filters]);
    const [clicked_prop,setClicked_prop]=useState(null)
    const [fromMap,setFromMap]=useState(false)


    return(
        <section style={container}>
            <FiltersBar filters={filters} setFilters={setFilters} setClicked_prop={setClicked_prop}/>
            <div style={{display:'flex',flexDirection:'row',height:'84.5vh'}}>
                <div style={{width:'43%'}}><RentProperties properties={properties} clicked_prop={clicked_prop} setClicked_prop={setClicked_prop} fromMap={fromMap} setFromMap={setFromMap} favorites={favorites} setFavorites={setFavorites}/></div>
                <div style={{width:'57%'}}><Map properties={properties} clicked_prop={clicked_prop} setClicked_prop={setClicked_prop} setFromMap={setFromMap} fromMap={fromMap}/></div> 
            </div>
        </section>
    )
}
export default RentRequest