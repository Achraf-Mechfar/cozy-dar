const express = require('express');
const router = express.Router();
const { check_availability,available_from,add_reservation,get_reservations,my_reservations,reservations_history } = require('../controllers/reservation');

router.post('/check_availability',check_availability)
router.post('/available_from',available_from)
router.post('/add_reservation',add_reservation)
router.get('/get_reservations/:unit_id',get_reservations)
router.get('/my_reservations/:userId',my_reservations)
router.get('/reservations_history/:userId',reservations_history)

module.exports = router;