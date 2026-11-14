import { IoChevronForwardCircle,IoChevronBackCircle } from "react-icons/io5";
import { useState, useEffect } from "react";

const Gallery=(image_urls)=>{
    const [currentImg, setCurrentImg] = useState(0);
    const [option,setOption]=useState('Gallery');
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
        color:'rgba(0, 0, 0, 0.8)',
    }
    const options_container={
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top:'20px',
        left:'50%',
        transform:'translateX(-50%)',
        zIndex:'1',
        borderRadius:'5px',
        color:'white',
        fontSize:'12px !important',
    }
    const options={
        padding:'10px 20px',
        cursor:'pointer',
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
    <section style={{position:'relative'}}>
        <div style={options_container}>
            <div style={{...options,borderRadius:'5px 0 0 5px',backgroundColor:option==='Gallery'?'rgb(0, 0, 0, 0.9)':'rgb(0, 0, 0, 0.5)'}} onClick={()=>setOption('Gallery')}>
                <p>Gallery</p>
            </div>
            
            <div style={{...options,borderRadius:'0 5px 5px 0',backgroundColor:option==='Virtual tour'?'rgb(0, 0, 0, 0.9)':'rgb(0, 0, 0, 0.5)'}} onClick={()=>setOption('Virtual tour')}>
                <p>Virtual tour</p>
            </div>
        </div>
        <div style={img_container}>
            {option==='Gallery'?
            <>
            <IoChevronBackCircle style={{...change_img,left:'3%'}} onClick={()=>{currentImg>0?setCurrentImg(currentImg-1):setCurrentImg(image_urls.images.length-1)}}/>
            <img src={image_urls.images[currentImg]} style={img}/>
            <IoChevronForwardCircle style={{...change_img,right:'3%'}} onClick={()=>{currentImg<image_urls.images.length-1?setCurrentImg(currentImg+1):setCurrentImg(0)}}/>
            </>
            :
            <>
<iframe width="853" height="480" src="https://my.matterport.com/show/?m=iksyDn1PZs9" frameborder="0" allowfullscreen allow="autoplay; fullscreen; web-share; xr-spatial-tracking;"></iframe>            </>
            }
        </div>
    </section>
    )
}
export default Gallery;