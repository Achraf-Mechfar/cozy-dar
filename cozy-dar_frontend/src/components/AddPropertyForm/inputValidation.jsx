
const handleText = (e) => {
    const text=e.trim();
    if (text.length < 5 || text.length > 50) {
        return true
      } else {
        return false
      }
  };

const handleNumber = (e,min) => {
    if (isNaN(e) || Number(e) < min) {
        return true
      } else {
        return false
      }
  };

const handlePhone = (e) => {
    const phone=e.trim();
    if (phone.length !== 8) {
        return true
      } else {
        return false
      }
  };
  export {handleText,handleNumber,handlePhone}
