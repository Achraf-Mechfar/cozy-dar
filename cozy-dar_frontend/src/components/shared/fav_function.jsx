import { jwtDecode } from 'jwt-decode';

const handleFavorite=(id,type,setLiked,setFavorites,favorites,liked)=>{
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login to add to favorites.");
      return;
    }

    console.log(jwtDecode(token).userId)
    if (!liked) {
        fetch('/add_favorite',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                user_id:jwtDecode(token).userId,
                target_id:id,
                target_type:type
            })
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            setLiked(true)
            setFavorites([...favorites,{target_id:id,target_type:type}])
        })
        .catch(error=>{
            console.error(error)
        })
    }else{
        fetch('/remove_favorite',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                user_id:jwtDecode(token).userId,
                target_id:id,
                target_type:type
            })
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            setLiked(false)
            setFavorites(favorites.filter(fav=>fav.target_id!==id))
        })
        .catch(error=>{
            console.error(error)
        })
    }
}

const getFavorites=async()=>{
    const userId=jwtDecode(localStorage.getItem('token')).userId;
    const favorites=await fetch('http://localhost:5000/favorites_ids/'+userId)
    .then(res => res.json())
    .catch(err => console.error('Error fetching properties:', err));
    return favorites;
}
export {handleFavorite,getFavorites}

