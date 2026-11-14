import { useEffect, useRef, useState } from 'react';
import { googleMapsLoader } from '../shared/googleMapsLoader';
import Info from './info';
import ReactDOM from 'react-dom/client';

const Map = ({ properties , clicked_prop, setClicked_prop, setFromMap}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);
  const infoWindow = useRef(null);
  
  const [test,setTest]=useState(false)
  useEffect(() => {
    setTest(!test)
  },[properties])

  const createMarkers = () => {
    if (!mapInstance.current || !window.google?.maps?.marker) return;

    const { AdvancedMarkerElement } = window.google.maps.marker;

    markers.current.forEach(marker => marker.map = null);
    markers.current = [];

    properties.forEach(property => {
      const price = property.property_type === 'Residence'
        ? `${property.min_price} - ${property.max_price} Dt`
        : `${property.units[0]?.price_per_night ?? 'N/A'} Dt`;

      const markerDiv = document.createElement('div');
      markerDiv.innerHTML = `
        <div style="
          background: white;
          padding: 2px 5px;
          border: 2px solid #007BFF;
          border-radius: 10px;
          font-weight: normal;
          color: #007BFF;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          font-size: 12px;
        ">${price}</div>
      `;

      const marker = new AdvancedMarkerElement({
        map: mapInstance.current,
        position: {
          lat: parseFloat(property.lat),
          lng: parseFloat(property.lng),
        },
        content: markerDiv,
      });

      markerDiv.addEventListener('click', () => {
        setFromMap(true)
        const infoDiv = document.createElement('div');
        const root = ReactDOM.createRoot(infoDiv);
        setClicked_prop(property.property_id)
        root.render(<Info property={property} />);
        infoDiv.style.width = 'max-content';
        
        infoWindow.current.setContent(infoDiv);
        infoWindow.current.setPosition({
          lat: parseFloat(property.lat) + 0.0001,
          lng: parseFloat(property.lng),
        });
        infoWindow.current.open(mapInstance.current);
        mapInstance.current.setZoom(18);
      });

      markers.current.push(marker);
    });
  };
  useEffect(() => {
    googleMapsLoader.load().then(() => {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 35.3998, lng: 11.0422 },
        zoom: 14,
        mapId: '5df098c8c3f14a0f1b482565',
        mapTypeControl: false,
      });

      infoWindow.current = new window.google.maps.InfoWindow();
      createMarkers();
    });
  }, []);

  useEffect(() => {
    createMarkers();
  }, [test]);

  useEffect(() => {
    if (!mapInstance.current || !clicked_prop) {
        if (infoWindow.current) {
            infoWindow.current.close();
        }
        return;
    }

    const property = properties.find(p => p.property_id === clicked_prop);
    if (!property) return;

    const infoDiv = document.createElement('div');
    const root = ReactDOM.createRoot(infoDiv);
    root.render(<Info property={property} />);
    infoDiv.style.width = 'max-content';

    infoWindow.current.setContent(infoDiv);
    infoWindow.current.setPosition({
        lat: parseFloat(property.lat) + 0.0001,
        lng: parseFloat(property.lng),
    });
    infoWindow.current.open(mapInstance.current);
    mapInstance.current.setZoom(18);


}, [clicked_prop, properties]); 

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
