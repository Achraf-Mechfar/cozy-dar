import { IoChevronForwardCircle,IoChevronBackCircle } from "react-icons/io5";
import { useState, useEffect } from "react";

const Gallery=(image_urls)=>{
    const [currentImg, setCurrentImg] = useState(0);
    const img_container={
        width:'100%',
        borderRadius:'10px',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        border:'1px solid rgba(0, 0, 0, 0.1)',
        position:'relative',
        userSelect: 'none',
    }

    const img={
        width:'100%',
        height:'100%',
        borderRadius:'10px',
        objectFit:'cover',

    }
    const change_img={
        position:'absolute',
        top:'50%',
        fontSize:'40px',
        cursor:'pointer',
        color:'rgba(0, 0, 0, 0.4)',
    }
    useEffect(() => {
        if (image_urls.images && image_urls.images.length > 1) {
            const nextIndex = (currentImg + 1) % image_urls.images.length;
            const preloadImg = new window.Image();
            preloadImg.src = image_urls.images[nextIndex];
        }
    }, [currentImg]);
    console.log(image_urls.images[0])
    return(
    <section>
        <div style={img_container}>
        <IoChevronBackCircle style={{...change_img,left:'3%'}} onClick={()=>{currentImg>0?setCurrentImg(currentImg-1):setCurrentImg(image_urls.images.length-1)}}/>
        <img src={image_urls.images[currentImg]} style={img}/>
        <IoChevronForwardCircle style={{...change_img,right:'3%'}} onClick={()=>{currentImg<image_urls.images.length-1?setCurrentImg(currentImg+1):setCurrentImg(0)}}/>
    </div>
    </section>
    )
}
export default Gallery;