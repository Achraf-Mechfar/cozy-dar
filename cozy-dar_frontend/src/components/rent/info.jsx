import { Link } from "react-router-dom";
import testimg from '../shared/test.jpg'
import { IoBedOutline } from "react-icons/io5";
import { LiaToiletSolid } from "react-icons/lia";
import { GiPathDistance } from "react-icons/gi";
import dayjs from 'dayjs';

const Info=({property})=>{
    const prop_card_container={
        cursor:'pointer',
        margin:'0 10px 5px 5px',
    }
    const prop_info={
        padding:'15px',
        display:'flex',
        flexDirection:'row',
        position:'relative',
    }
    const icon={
        fontSize:'16px',
        marginRight:'10px',
    }
    const info={
        display:'flex',
        alignItems:'center',
        gap:'0px',
        fontSize:'14px',
    }
    const handleClick = (e) => {
        e.preventDefault();
        const url = property.property_type !== 'Residence' 
            ? `/unit/${property.units[0].unit_id}`
            : `/residence/${property.property_id}`;
        window.open(url, '_blank');
    };

    const available_from=property.units[0].available?'Available from '+dayjs(property.units[0].available_from).format('DD MMMM YYYY'):'Available'
    
    return(
        <div onClick={handleClick}>

                {property.property_type!=='Residence'?(
                <div style={prop_card_container}>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <img src={testimg} style={{width:'200px',borderRadius:'10px'}}></img>
                        <div style={{display:'flex',flexDirection:'column',padding:'15px'}}>
                            <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}><div style={{fontWeight:'500',fontSize:'17px'}}>{property.units[0].price_per_night} Dt/Night</div></div>
                            <div style={{marginBottom:'5px',fontWeight:'400'}}>{property.units[0].available?'Available from '+dayjs(property.units[0].available_from).format('DD MMMM YYYY'):'Available'}</div>
                            <div style={{display:'flex',flexDirection:'row',gap:'20pxpx'}}><div style={info}><IoBedOutline style={icon}/>S+{property.units[0].rooms}</div><div style={info}><LiaToiletSolid style={icon}/>{property.units[0].bathrooms}Bath</div></div>
                            <div style={{display:'flex',flexDirection:'row'}}><div style={info}><GiPathDistance style={icon}/>{property.distance_from_beach}m to the Beach</div></div>
                            <div style={{fontSize:'14px',fontWeight:'400',marginTop:'5px'}}>{property.city}, {property.district}</div>
                        </div>
                    </div>
                </div>
                ):(
                  <div style={prop_card_container}>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <img src={testimg} style={{width:'200px',borderRadius:'10px'}}></img>
                        <div style={{display:'flex',flexDirection:'column',padding:'15px'}}>
                            <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}><div style={{fontWeight:'500',fontSize:'17px',marginBottom:'10px'}}>{property.min_price}-{property.max_price} Dt/Night</div></div>
                            <div style={{display:'flex',flexDirection:'row',gap:'20pxpx'}}><div style={info}><IoBedOutline style={icon}/>{property.rooms.map(room=>(<>S+{room}  </>))}</div></div>
                            <div style={{display:'flex',flexDirection:'row'}}><div style={info}><GiPathDistance style={icon}/>{property.distance_from_beach}m to the Beach</div></div>
                            <div style={{fontSize:'14px',fontWeight:'400',marginTop:'5px'}}>{property.city}, {property.district}</div>

                        </div>
                    </div>
                </div>
                )}
        </div>
    )
}
export default Info