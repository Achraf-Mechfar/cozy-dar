import { TbAirConditioning, TbWifi, TbParking  } from 'react-icons/tb';
import { PiFan } from 'react-icons/pi';
import { IoTvOutline } from 'react-icons/io5';
import { MdOutlineElevator, MdBalcony  } from 'react-icons/md';
import { LuTreePine, LuWashingMachine  } from 'react-icons/lu';
import { FaSwimmingPool } from 'react-icons/fa';
import { GiHomeGarage } from 'react-icons/gi';
import { LiaCouchSolid } from "react-icons/lia";

import React from 'react';

const Amenities = ({ amenities }) => {

    const container={
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)',
        border:'1px solid rgba(0, 0, 0, 0.03)',
        height:'fit-content',
        padding:'35px 30px',
        borderRadius:'10px',
        gap:'10px'
    }

    const list_container={
        padding:'20px 0 0 30px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
    }

    const item={
        display:'flex',
        alignItems:'center',
        fontSize:'16px',
        gap:'10px'
    }
    const amenityIconMap = {
        0: LiaCouchSolid,
        1: TbAirConditioning,
        2: PiFan,
        3: TbWifi,
        4: IoTvOutline,
        5: MdBalcony,
        6: LuTreePine,
        7: MdOutlineElevator,
        8: FaSwimmingPool,
        9: TbParking,
        10: GiHomeGarage,
        11: LuWashingMachine,
      };
    const icon={}
    return(
        <section style={container}>
            <h4 style={{fontWeight:'600'}}>Amenities</h4>
            <div style={list_container}>
                {amenities.map((amenity ) => (
                    <div style={item}>{React.createElement(amenityIconMap[amenity.amenity_id])}{amenity.title}</div>
                ))}
            </div>
        </section>
    )
}

export default Amenities