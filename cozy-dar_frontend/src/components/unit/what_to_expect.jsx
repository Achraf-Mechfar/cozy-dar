


const What_to_expect=()=>{
    const container={
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.08)',
        border:'1px solid rgba(0, 0, 0, 0.03)',
        height:'fit-content',
        padding:'35px 30px',
        borderRadius:'10px',
        gap:'10px'

    }
    return(
        <section style={container}>
            <h4 style={{fontWeight:'600'}}>What to Expect</h4>
            <div style={{padding:'20px 30px 0 30px'}}><p>Tucked away in a peaceful neighborhood, this home offers the perfect retreat for those seeking relaxation and quiet. Surrounded by nature and just far enough from the city buzz, it’s ideal for morning coffee on the balcony, evening walks, and unwinding with loved ones. If you're looking to disconnect and recharge, this stay was made for you.</p></div>
        </section>
    )
}
export default What_to_expect;