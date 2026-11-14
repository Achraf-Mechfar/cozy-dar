import { googleMapsLoader } from "../shared/googleMapsLoader";
import { useEffect, useRef, useState } from "react";
const container={
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)',
    border:'1px solid rgba(0, 0, 0, 0.03)',
    height:'500px',
    padding:'5px 5px',
    borderRadius:'10px',
    gap:'10px'
}

const PropertyMap=({property})=>{
    console.log(property)
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markers = useRef([]);
    
    const [test,setTest]=useState(false)
    useEffect(() => {
      setTest(!test)
    },[property])

    const createMarkers = () => {
        if (!mapInstance.current || !window.google?.maps?.marker) return;
        
        markers.current = [];
        
          const marker = new window.google.maps.marker.AdvancedMarkerElement({
            position: { lat: parseFloat(property.lat), lng: parseFloat(property.lng) },
            map: mapInstance.current,
            title: property.property_name,
          });
          
          markers.current.push(marker);
      };
  useEffect(() => {
    googleMapsLoader.load().then(() => {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: parseFloat(property.lat), lng: parseFloat(property.lng) },
        zoom: 17.8,
        mapId: '5df098c8c3f14a0f1b482565',
        mapTypeControl: false,
      });

      createMarkers();
    });
  }, [property]);

    
    return(
        <section style={container}>
            <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius:'10px' }} />

        </section>
    )
}

export default PropertyMap