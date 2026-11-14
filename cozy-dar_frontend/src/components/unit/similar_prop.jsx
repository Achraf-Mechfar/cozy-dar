import Property_list from "../shared/property_list";
import { useEffect, useState } from 'react';

const Similar_prop=()=>{

    const [properties, setProperties] = useState([]); 
    useEffect(() => {
      fetch('http://localhost:5000/get_properties_card')
        .then(res => res.json())
        .then(data => {
          setProperties(data);
        })
        .catch(err => console.error('Error fetching properties:', err));
    }, []);

    const container={
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)',
        border:'1px solid rgba(0, 0, 0, 0.03)',
        height:'100%',
        padding:'35px 30px',
        gap:'10px',
        margin:'30px 0',

    }
    return(
        <section style={container}>
            <h4 style={{fontWeight:'600',marginLeft:'6vw'}}>Similar Properties</h4>
            <Property_list properties={properties}/>
        </section>
    )
}

export default Similar_prop;