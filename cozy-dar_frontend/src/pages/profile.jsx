import { InputField, Form_btn } from "../components/shared/inputfield"
import { useEffect,useState } from "react"
import { jwtDecode } from "jwt-decode"
const Profile=()=>{
    const [profile,setProfile]=useState({})
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        const fetchProfile=async()=>{
            const response=await fetch('http://localhost:5000/profile/'+jwtDecode(localStorage.getItem('token')).userId)
            const data=await response.json()
            setProfile(data)
        }
        fetchProfile()
    },[])
    useEffect(()=>{
        setLoading(false)
        console.log(profile)
    },[profile])

    const [fullnameError,setFullnameError]=useState('')
    const invalidChars = /[^a-zA-Z\s]/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^\d{8}$/;
    const [emailError,setEmailError]=useState('')
    const [phoneError,setPhoneError]=useState('')
    const setFullName=(e)=>{
        let fname=e;
        if (fname.length < 3 || fname.length > 50 || !fname.includes(' ') || invalidChars.test(fname)) {
            setFullnameError('Full name should contain letters and spaces.');
          } else {
            setFullnameError('');
          }
          setProfile({...profile,full_name:e})
    }

    const setEmail=(e)=>{
        let email=e;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format.');
          } else {
            setEmailError('');
          }
          setProfile({...profile,email:e})
    }
    const setPhone=(e)=>{
        let phone=e;
        if (!phoneRegex.test(phone)) {
            setPhoneError('Invalid phone number format.');
          } else {
            setPhoneError('');
          }
          setProfile({...profile,phone:e})
    }
    const handleSave=()=>{
        console.log(profile)
        const update_profile=async()=>{
            const response=await fetch('http://localhost:5000/update_profile',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(profile)
            })
            const data=await response.text()
            if(data==='profile updated'){
                alert('Profile updated successfully')
            }else{
                alert(data)
            }
        }
        update_profile()
    }
    return(
        <section style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%',flexDirection:'column',gap:'20px',position:'absolute'}}>
            {loading ? <p>Loading...</p> : (<>
            <h2>Profile</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'20px',width:'25%'}}>
                <InputField label="Full Name" placeholder="Full Name" defaultValue={profile.full_name} value={profile.full_name} onChange={(e)=>setFullName(e.target.value)} error={fullnameError}/>
                <InputField label="Email" placeholder="Email" defaultValue={profile.email} value={profile.email} onChange={(e)=>setEmail(e.target.value)} error={emailError}/>
                <InputField label="Phone" placeholder="Phone" defaultValue={profile.phone} value={profile.phone} onChange={(e)=>setPhone(e.target.value)} error={phoneError}/>
                <Form_btn text="Save Changes" onClick={handleSave}/>

            </div>
            </>)}
        </section>
    )
}
export default Profile