import Prop_list from '../shared/property_list';
import { useEffect, useState } from 'react';

const Exc_properties=()=>{
    const [properties, setProperties] = useState([]); 
    useEffect(() => {
      fetch('http://localhost:5000/get_properties_card')
        .then(res => res.json())
        .then(data => {
          setProperties(data);
        })
        .catch(err => console.error('Error fetching properties:', err));
    }, []);

    return(
        <section style={{ position: 'relative' }}>
            <h2 style={{padding:'20px 25px 0 0',textAlign:'center'}}>Exclusive Properties</h2>
            <Prop_list properties={properties}/>
        </section>
    );
}

export default Exc_properties;