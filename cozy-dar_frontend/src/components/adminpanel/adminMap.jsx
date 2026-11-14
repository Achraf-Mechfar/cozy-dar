import { useEffect, useRef, useState } from 'react';
import { googleMapsLoader } from '../shared/googleMapsLoader';


const Map = ({setLat,setLng,setDistance}) => {
    const mapRef = useRef(null);
    const [mapInstance, setMapInstance] = useState(null);
    let house_instance;
    let beach_instance;

  useEffect(() => {
    googleMapsLoader.load().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 35.3998, lng: 11.0422 },
        zoom: 14,
        mapId: '5df098c8c3f14a0f90daf0de',
        styles: [
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      setMapInstance(map);

      const { AdvancedMarkerElement } = window.google.maps.marker;

      map.addListener('click', (e) => {
        console.log('aaa')
        console.log(e.latLng.lat(),e.latLng.lng())

        const lat0=e.latLng.lat();
        const lng0=e.latLng.lng();
        console.log(lat0,lng0)



        const markerDiv = document.createElement('div');
        markerDiv.innerHTML = `
          <div style="
            background: white;
            width: 25px;
            height: 25px;
            border: 5px solid #007BFF;
            border-radius: 100%;
            font-weight: bold;
            color: #007BFF;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            H
          </div>
        `;
        

        const markerDiv2 = document.createElement('div');
        markerDiv2.innerHTML = `
          <div style="
            background: white;
            width: 25px;
            height: 25px;
            border: 5px solid rgb(255, 0, 0);
            border-radius: 100%;
            font-weight: bold;
            color:rgb(255, 0, 0);
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            B
          </div>
        `;

        const houseMarker=()=>new AdvancedMarkerElement({
          map,
          position:{lat:lat0,lng:lng0},
          content: markerDiv,
        });
        const beachMarker=()=>new AdvancedMarkerElement({
          map,
          position:{lat:lat0,lng:lng0},
          content: markerDiv2,
        });
        if(!house_instance && !beach_instance){
            house_instance=houseMarker()
            setLat(lat0);
            setLng(lng0);
        } else if(house_instance && beach_instance){
            house_instance.setMap(null);
            beach_instance.setMap(null);
            house_instance=null;
            beach_instance=null;
        }else if (house_instance && !beach_instance){
            beach_instance=beachMarker()
            const houseLatLng = new window.google.maps.LatLng(house_instance.position);
            const beachLatLng = new window.google.maps.LatLng(beach_instance.position);
            const dist = window.google.maps.geometry.spherical.computeDistanceBetween(houseLatLng, beachLatLng);
  
            setDistance(Math.round(dist));
            console.log(Math.round(dist));
        }

        console.log(house_instance,beach_instance)
        
        

      });
    });
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default Map;
