const express = require('express');
const router = express.Router();
const { Prop_Request,initial_approval,upcoming_reservations, reservations_history,update_reservation,Regular_Users,Property_Owners,Admins,platform_finance ,get_daily_analytics,check_in,check_out,ongoing_reservations} = require('../controllers/adminController');
const {get_properties} = require('../controllers/propertyController');
const verifyAdmin = require('../middlewares/verifyadmin');
const upload = require('../middlewares/upload');
const path = require('path');

router.use(verifyAdmin)
router.get('/prop_requests',Prop_Request)
router.get('/properties',get_properties)
router.post('/i_approval',initial_approval)
router.get('/upcoming_reservations',upcoming_reservations)
router.get('/reservations_history',reservations_history)
router.post('/update_reservation',update_reservation)
router.get('/admins',Admins)
router.get('/regular_users',Regular_Users)
router.get('/property_owners',Property_Owners)
router.get('/platform_finance',platform_finance)
router.get('/daily_analytics',get_daily_analytics)
router.post('/check_in/:reservation_id',check_in)
router.post('/check_out/:reservation_id',check_out)
router.get('/ongoing_reservations',ongoing_reservations)
router.post('/upload', upload.array('images', 10), (req, res) => {
    const filePaths = req.files.map(f => path.join('uploads', f.filename));
    res.json({
      message: 'Files uploaded successfully',
      images: filePaths
    });
  });

module.exports = router;