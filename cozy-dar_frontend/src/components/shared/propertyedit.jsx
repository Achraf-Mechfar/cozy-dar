import { useState, useEffect } from 'react';
import { Form_btn,InputField } from '../shared/inputfield';
import { TbAirConditioning, TbWifi, TbParking  } from 'react-icons/tb';
import { PiFan } from 'react-icons/pi';

const EditUnit = ({ unit, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      unit_title: unit.unit_title || '',
      bedrooms: unit.bedrooms || 1,
      bathrooms: unit.bathrooms || 1,
      price_per_night: unit.price_per_night || 0,
      description: unit.description || '',
      amenities: unit.amenities || [],
      city: unit.city || '',
      district: unit.district || ''
    });
  
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [images, setImages] = useState(unit.images || []);
    const [newImages, setNewImages] = useState([]);
  
    // Fetch cities on component mount
    useEffect(() => {
      const fetchCities = async () => {
        try {
          const response = await fetch('/api/cities');
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };
      fetchCities();
    }, []);
  
    // Fetch districts when city changes
    useEffect(() => {
      const fetchDistricts = async () => {
        if (formData.city) {
          try {
            const response = await fetch(`/api/districts?city=${formData.city}`);
            const data = await response.json();
            setDistricts(data);
          } catch (error) {
            console.error('Error fetching districts:', error);
          }
        }
      };
      fetchDistricts();
    }, [formData.city]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleAmenityChange = (amenityId) => {
      setFormData(prev => {
        const newAmenities = prev.amenities.includes(amenityId)
          ? prev.amenities.filter(id => id !== amenityId)
          : [...prev.amenities, amenityId];
        return { ...prev, amenities: newAmenities };
      });
    };
  
    const handleImageChange = (e) => {
      setNewImages(Array.from(e.target.files));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formDataToSend = new FormData();
        
        // Append all form fields
        Object.entries(formData).forEach(([key, value]) => {
          if (key === 'amenities') {
            formDataToSend.append(key, JSON.stringify(value));
          } else {
            formDataToSend.append(key, value);
          }
        });
  
        // Append new images
        newImages.forEach((image, index) => {
          formDataToSend.append('images', image);
        });
  
        const response = await fetch(`/api/units/${unit.unit_id}`, {
          method: 'PUT',
          body: formDataToSend,
        });
  
        if (response.ok) {
          onSave(await response.json());
        } else {
          throw new Error('Failed to update unit');
        }
      } catch (error) {
        console.error('Error updating unit:', error);
      }
    };
  
    const amenitiesList = [
      { id: 0, name: 'Furnished' },
      { id: 1, name: 'Air Conditioner' },
      { id: 2, name: 'Fan' },
      { id: 3, name: 'Wifi' },
      { id: 4, name: 'TV' },
      { id: 5, name: 'Balcony' },
      { id: 6, name: 'Garden' },
      { id: 7, name: 'Elevator' },
      { id: 8, name: 'Pool' },
      { id: 9, name: 'Parking' },
      { id: 10, name: 'Garage' },
      { id: 11, name: 'Washing Machine' }
    ];
  
    return (
      <div style={container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Edit Unit #{unit.unit_id}</h2>
            <button onClick={onCancel} style={{ padding: '5px 10px' }}>Cancel</button>
          </div>
  
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label>Unit Title</label>
              <input
                type="text"
                name="unit_title"
                value={formData.unit_title}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
  
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label>Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  min="1"
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  min="1"
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>Price per Night (DT)</label>
                <input
                  type="number"
                  name="price_per_night"
                  value={formData.price_per_night}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>
            </div>
  
            <div style={{ marginBottom: '20px' }}>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={{ width: '100%', minHeight: '100px', padding: '8px' }}
              />
            </div>
  
            <div style={{ marginBottom: '20px' }}>
              <label>Location</label>
              <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                <select
                  value={formData.city}
                  name="city"
                  onChange={handleInputChange}
                  style={{ flex: 1, padding: '8px' }}
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.district}
                  name="district"
                  onChange={handleInputChange}
                  style={{ flex: 1, padding: '8px' }}
                  disabled={!formData.city}
                >
                  <option value="">Select District</option>
                  {districts.map(district => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
  
            <div style={{ marginBottom: '20px' }}>
              <label>Amenities</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
                {amenitiesList.map(amenity => (
                  <div key={amenity.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      id={`amenity-${amenity.id}`}
                      checked={formData.amenities.includes(amenity.id)}
                      onChange={() => handleAmenityChange(amenity.id)}
                      style={{ marginRight: '8px' }}
                    />
                    <label htmlFor={`amenity-${amenity.id}`}>{amenity.name}</label>
                  </div>
                ))}
              </div>
            </div>
  
            <div style={{ marginBottom: '20px' }}>
              <label>Images</label>
              <div style={{ marginTop: '10px' }}>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                  {images.map((image, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img
                        src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                        alt={`Unit ${index + 1}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = [...images];
                          newImages.splice(index, 1);
                          setImages(newImages);
                        }}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          background: 'red',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={onCancel}
                style={{
                  padding: '10px 20px',
                  background: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Save Changes
              </button>
            </div>
          </form>
      </div>
    );
  };
  
  const container={
    width:'67vw',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)',
    border:'1px solid rgba(0, 0, 0, 0.03)',
    height:'fit-content',
    padding:'6vh 6vw',
    borderRadius:'10px',
    gap:'10px',
    margin:'6vh 6vw',

}
  
  export { EditUnit };