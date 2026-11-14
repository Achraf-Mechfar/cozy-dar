
import { useEffect, useRef, useState } from "react";
import { getFavorites } from "../shared/fav_function";
import Prop_card from "./Prop_card";
const RentProperties=({properties,clicked_prop,setClicked_prop, fromMap,setFromMap})=>{
    console.log(properties)
    const propertyRefs = useRef({});
    const filter_element={
        cursor:'pointer',
        border:'1px solid rgb(186, 186, 186)',
        borderRadius:'5px',
        padding:'10px 10px',
        display:'flex',
        gap:'15px',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    }
    const container={
        padding:'0 1.5vw 10px 1.5vw',
        borderRight:'1px solid rgb(186, 186, 186)',
        height:'100%',
        overflowY:'auto',
        
    }

      const sortcontainer={
        cursor:'pointer',
        display:'flex',
        gap:'30px',
        flexDirection:'row',
        alignItems:'center',
        position:'relative',
    }
    useEffect(() => {
        if (fromMap && clicked_prop && propertyRefs.current[clicked_prop]) {
            propertyRefs.current[clicked_prop].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                
            });
            
            }
        }, [clicked_prop,fromMap]);
        const handleClick = (property) => {
            const url = property.property_type !== 'Residence' 
                ? `/unit/${property.units[0].unit_id}`
                : `/residence/${property.property_id}`;
            window.open(url, '_blank');
        };
    const n_properties=properties.length

    const [sort,setSort]=useState('price_low_to_high');
    const [showSort,setShowSort]=useState(false);
    const [sortedProperties,setSortedProperties]=useState([])
    useEffect(() => {
        const sorted = [...properties].sort((a, b) => {
            const getPrice = (property) => {
                if (property.property_type === 'Residence') {
                    return sort === 'price_low_to_high' ? property.min_price || 0 : property.max_price || 0;
                }
                return property.units[0].price_per_night || 0;
            };

            switch(sort) {
                case 'price_low_to_high':
                    return getPrice(a) - getPrice(b);
                case 'price_high_to_low':
                    return getPrice(b) - getPrice(a);
                default:
                    return 0;
            }
        });
        setSortedProperties(sorted);
    }, [sort, properties]);

    const [favorites,setFavorites]=useState([])
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favs = await getFavorites();
                if (favs && Array.isArray(favs)) {
                    setFavorites(favs);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };
        fetchFavorites();
    }, [favorites]);
    return(
        <section style={container}>
            <div style={{backgroundColor:'white',position:'sticky',top:'0',display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',borderBottom:'0.5px solid rgba(173, 173, 173, 0.29)',padding:'20px 20px',margin:'0 -20px',zIndex:'1'}}>
            <p style={{fontSize:'14px'}}>{n_properties} Properties Found</p>
            <div style={sortcontainer}>
                <p style={{fontSize:'14px'}} onClick={()=>{setShowSort(!showSort)}}>Sort By: <strong style={{fontSize:'14px'}}>{sort}</strong></p>
                        {showSort && (
                            <div className="dropdown" style={{width:'fit-content',right:'0',left:'auto'}}>
                                <p style={{padding:'10px 10px',fontSize:'14px'}} onClick={()=>{setSort('price_low_to_high');setShowSort(false)}}>Price ( Low to High )</p>
                                <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center'}}></div>
                                <p style={{padding:'10px 10px',fontSize:'14px'}} onClick={()=>{setSort('price_high_to_low');setShowSort(false)}}>Price ( High to Low )</p>
                            </div>
                        )}
            </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'15px',margin:'25px 0'}}>
            {sortedProperties && sortedProperties.length>0 ?
            (sortedProperties.map((property,index)=>(
                <div ref={el => propertyRefs.current[property.property_id] = el} onMouseEnter={() => {setClicked_prop(property.property_id);if(fromMap){setFromMap(false)}}}>
                <Prop_card property={property} onClick={()=>{handleClick(property)}} isSelected={clicked_prop === property.property_id} favorites={favorites} setFavorites={setFavorites}/>
                <div style={{height:'0.5px',backgroundColor:'rgba(173, 173, 173, 0.29)',width:'100%',alignSelf:'center',marginTop:'15px'}}></div>
                </div>
            )))
            :<p>No properties found</p>}
            </div>



        </section>
    )
}
export default RentProperties
