import MyProperty from "./myproperty";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const MyProperties=()=>{

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:5000/myproperties/${jwtDecode(localStorage.getItem('token')).userId}`);
              const data = await response.json();
              setProperties(data);
          } catch (err) {
              console.error('Error fetching units:', err);
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, []);
  console.log(jwtDecode(localStorage.getItem('token')).userId)
  console.log(properties)
    return(
        <section>
            <h2>My Properties</h2>
            {properties?<>
            {properties.length>0 && properties.map((property,index)=>(
                <MyProperty property={property} showU={false} key={index}/>
            ))}
            </>
             :
             <p>No property found at this index</p>}
        </section>
    )
}
export default MyProperties