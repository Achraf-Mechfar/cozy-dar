import { useState } from "react";
import { InputField, Form_btn } from "../shared/inputfield";
import { jwtDecode } from "jwt-decode";
import {handleText,handleNumber,handlePhone} from './inputValidation'
import { useNavigate } from "react-router-dom";

function AddPropertyForm() {
  const navigate = useNavigate();
  const container={
      display:'flex',
      flexDirection:'column',
      gap:'10px',
      width:'100%',
      padding:'25px 35px',
      width:'100%',


  }

  const type_container={
    display:'flex',
    flexDirection:'row',
    gap:'10px',
    margin:'5px 0',
  }


  const amenities_container={
    padding:'20px 0 0 30px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
}

const step_container={
    display:'flex',
    flexDirection:'column',
    gap:'10px',
}

  const [propertyType, setPropertyType] = useState('House');
  const [propertyTypeError,setPropertyTypeError]=useState('');
  const [location, setLocation] = useState('');
  const [locationError,setLocationError]=useState('');
  const [property_title, setProperty_title] = useState('');
  const [propertyTitleError,setPropertyTitleError]=useState('');
  const [unitsNumber, setUnitsNumber] = useState('');
  const [unitsNumberError,setUnitsNumberError]=useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bedroomsError,setBedroomsError]=useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [bathroomsError,setBathroomsError]=useState('');
  const [title, setTitle] = useState('');
  const [titleError,setTitleError]=useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError,setPhoneError]=useState('');
  const [price, setPrice] = useState('');
  const [priceError,setPriceError]=useState('');
  const [units,setUnits]=useState([]);
  const [currentUnit,setCurrentUnit]=useState(1);

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const handleCheckboxChange = (id) => {
      if (selectedAmenities.includes(id)) {
        setSelectedAmenities(selectedAmenities.filter(item => item !== id));
      } else {
        setSelectedAmenities([...selectedAmenities, id]);
      }
    };
  const nextUnit=(e)=>{
    e.preventDefault();
    const unitdata={
      bedrooms,
      bathrooms,
      price,
      title,
      amenities: selectedAmenities,
    };
    setUnits([...units, unitdata]);
    setTitle('');

    setCurrentUnit(currentUnit + 1);
  };
  const [step, setStep] = useState(0);

  const handleSubmit = (e) => {
    if(jwtDecode(localStorage.getItem('token')).phone===null && handlePhone(phone)){
      setPhoneError('Invalid Phone Number');
      e.preventDefault();
      return;
    }else{
    e.preventDefault();
    console.log(units)

    const requestData = {
      user_id:jwtDecode(localStorage.getItem('token')).userId,
      propertyType,
      location,
      property_title,
      description,
      phone,
      units,
    };

    fetch('http://localhost:5000/add_request', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
  })
  .then(res => {
    if(res.ok){
      navigate('/rentrequest/myRequests',{state:{showSuccess:true}})}})
  
  .catch(err => {
      console.error("Posting Request error:", err);
  });

    console.log(requestData);
  
  }};

  const handleNext = (e) => {
    e.preventDefault();
    let valid = true;
  
    if (handleText(location)) {
      setLocationError('Location must be at least 5 characters long');
      valid = false;
    } else {
      setLocationError('');
    }
  
    if (handleText(property_title)) {
      setPropertyTitleError('Title must be at least 5 characters long');
      valid = false;
    } else {
      setPropertyTitleError('');
    }
  
    if (propertyType ==='') {
      setPropertyTypeError('Please select a property type');
      valid = false;
    }else{
      if (propertyType === 'Residence') {
        if (handleNumber(unitsNumber,2)) {
          setUnitsNumberError('Number of units must be at least 2');
          valid = false;
        } else {
          setUnitsNumberError('');
        }
      }
    }
  
    if (valid) {
      setStep(step + 1);
    }
  };

  const validUnit=(e)=>{
    let valid=true;
    if (propertyType==='Residence' && handleText(title)) {
      setTitleError('Title must be at least 5 characters long');
      valid = false;
    } else {
      setTitleError('');
    }
    if (handleNumber(bedrooms,0)) {
      setBedroomsError('Invalid Number of bedrooms');
      valid = false;
    } else {
      setBedroomsError('');
    }
    if (handleNumber(bathrooms,1)) {
      setBathroomsError('Invalid Number of bathrooms');
      valid = false;
    } else {
      setBathroomsError('');
    }
    if (handleNumber(price,1)) {
      setPriceError('Invalid Price');
      valid = false;
    } else {
      setPriceError('');
    }
    if (valid) {
      nextUnit(e);
      if(currentUnit===unitsNumber || propertyType!=='Residence'){
        setStep(step + 1);
      }
    }
  }

  return (
    <form style={container}>
      {step === 0 && (
        <div style={step_container}>
          <h2>Add Your Property</h2>
          <p style={{margin:'5px 0'}}>Share your place and start earning today!</p>
          <div>
            <h4>Property Type</h4>
            <div style={type_container}>
              <div className={propertyType === 'Residence' ? 'type_item type_active' : 'type_item'} onClick={() =>(setPropertyType('Residence'),setPropertyTypeError(''))}>Residence</div>
              <div className={propertyType === 'House' ? 'type_item type_active' : 'type_item'} onClick={() =>(setPropertyType('House'),setPropertyTypeError(''))}>House</div>
              <div className={propertyType === 'Villa' ? 'type_item type_active' : 'type_item'} onClick={() =>(setPropertyType('Villa'),setPropertyTypeError(''))}>Villa</div>
            </div>
            {propertyTypeError && <p style={{color:'red',margin:'5px 0 0 5px',fontSize:'12px'}}>{propertyTypeError}</p>}
          </div>
          <div>
            <InputField style={{width:'50%'}} placeholder={'Adress'} onChange={(e)=>(setLocation(e.target.value),handleText(e.target.value)?setLocationError('Location must be at least 5 characters long'):setLocationError(''))} error={locationError} value={location}/>
          </div>
          <div>
            <InputField style={{width:'50%'}} placeholder={'Title'} onChange={(e)=>(setProperty_title(e.target.value),handleText(e.target.value)?setPropertyTitleError('Title must be at least 5 characters long'):setPropertyTitleError(''))} error={propertyTitleError} value={property_title}/>
          </div>
          {propertyType==='Residence' && (
          <div>
            <InputField style={{width:'50%'}} placeholder={'Number of Units'} onChange={(e)=>setUnitsNumber(Number(e.target.value),handleNumber(e.target.value,2)?setUnitsNumberError('Number of units must be at least 2'):setUnitsNumberError(''))} error={unitsNumberError} value={unitsNumber}/>
          </div>
          )}
          <div>
            <Form_btn style={{width:'50%'}} text="Next" onClick={(e)=>{handleNext(e);}} />
          </div>
        </div>
      )}
      {step === 1 && (
        <div style={step_container}>
          {propertyType==='Residence' && (<>
          <h3>Unit {currentUnit}</h3>
          <div>
            <InputField  placeholder={'title'} value={title} onChange={(e)=>(setTitle(e.target.value),handleText(e.target.value)?setTitleError('Unit Title must be at least 5 characters long'):setTitleError(''))} error={titleError}/>
          </div>
          </>)}
          <div>
            <InputField placeholder={'Number of Bedrooms'} onChange={(e)=>(setBedrooms(e.target.value),handleNumber(e.target.value,0)?setBedroomsError('Invalid Number of bedrooms'):setBedroomsError(''))} error={bedroomsError} value={bedrooms}/>
          </div>
          <div>
            <InputField placeholder={'Number of Bathrooms'} onChange={(e)=>(setBathrooms(e.target.value),handleNumber(e.target.value,1)?setBathroomsError('Invalid Number of bathrooms'):setBathroomsError(''))} error={bathroomsError} value={bathrooms}/>
          </div>
          <div>
            <h5 style={{fontWeight:'600'}}>Amenities</h5>
            <div style={amenities_container}>
              <p>Furnished<input type='checkbox' style={{}} onChange={(e)=>{handleCheckboxChange(e.target.id)}} id='0'/></p>
              <p>Air Conditioneur<input type='checkbox' style={{}} onChange={(e)=>{handleCheckboxChange(e.target.id)}} id='1'/></p>
              <p>Fan<input type='checkbox' style={{}} onChange={(e)=>{handleCheckboxChange(e.target.id)}} id='2'/></p>
              <p>Wifi<input type='checkbox' style={{}} onChange={(e)=>{handleCheckboxChange(e.target.id)}} id='3'/></p>
              <p>TV<input type='checkbox' style={{}} onChange={(e)=>{handleCheckboxChange(e.target.id)}} id='4'/></p>
              <p>Balcony<input type='checkbox' style={{}} onChange={(e)=>{handleCheckboxChange(e.target.id)}} id='5'/></p>
              <p>Garden<input type='checkbox' style={{}} onChange={(e)=>{handleCheckboxChange(e.target.id)}} id='6'/></p>
              <p>Elevator<input type='checkbox' style={{}} onChange={(e)=>{handleCheckboxChange(e.target.id)}} id='7'/></p>
              <p>Pool<input type='checkbox' style={{}} onChange={(e)=>{handleCheckboxChange(e.target.id)}} id='8'/></p>
              <p>Parking<input type='checkbox' style={{}} onChange={(e)=>{handleCheckboxChange(e.target.id)}} id='9'/></p>
              <p>Garage<input type='checkbox' style={{}} onChange={(e)=>{handleCheckboxChange(e.target.id)}} id='10'/></p>
              <p>Washing Machine<input type='checkbox' style={{}} onChange={(e)=>{handleCheckboxChange(e.target.id)}} id='11'/></p>
            </div>
          </div>
          <div>
            <InputField placeholder={'Price Per Night'} onChange={(e)=>(setPrice(e.target.value),handleNumber(e.target.value,1)?setPriceError('Invalid Price'):setPriceError(''))} error={priceError} value={price}/>
          </div>
          <Form_btn text="Next" onClick={(e) => { e.preventDefault(); validUnit(e); }} />
      </div>
      )}
      {step === 2 && (
        <div style={step_container}>
          <div>
            <InputField style={{width:'50%'}} placeholder={'Description ( Optional )'} onChange={(e)=>setDescription(e.target.value)} value={description}/>
          </div>

          {jwtDecode(localStorage.getItem('token')).phone===null && (
            <div>
              <InputField style={{width:'50%'}} placeholder={'+216 00 000 000'} onChange={(e)=>(setPhone(e.target.value),handlePhone(e.target.value)?setPhoneError('Invalid Phone Number'):setPhoneError(''))} error={phoneError} value={phone}/>
            </div>
          )}
          <div>
            <Form_btn style={{width:'50%'}} text="Send Request" onClick={(e)=>{handleSubmit(e)}}/>
          </div>
        </div>
      )}
    </form>
  );
}

export default AddPropertyForm;
