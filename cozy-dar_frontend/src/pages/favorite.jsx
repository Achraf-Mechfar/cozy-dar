import Property_list from "../components/shared/property_list";
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
const Favorite=()=>{

    const [properties, setProperties] = useState([]); 
    useEffect(() => {
        const userId=jwtDecode(localStorage.getItem('token')).userId
      fetch('http://localhost:5000/favorites/'+userId)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setProperties(data);
        })
        .catch(err => console.error('Error fetching properties:', err));
    }, []);

    const container={
        height:'100%',
        padding:'35px 30px',
        gap:'10px',
        margin:'30px 0',

    }

    return(
        <section>
            <h2 style={{fontWeight:'600',marginTop:'7.5vh',padding:'6vh 6vw 0 6vw'}}>Favorite Properties</h2>
                <div style={container}>
                    <Property_list properties={properties}/>
                </div>
        </section>
    )
}

export default Favorite;