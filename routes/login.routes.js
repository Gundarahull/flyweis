const express=require('express')
const { login, verifyOtp } = require('../controllers/login.controller')
const router=express.Router()


router.post('/login',login)
router.post('/verifyOtp',verifyOtp)



// update profiel pic

// profit calculator

// add bank

// invest amount

// add e kyc

// add nominee

// terms and conditions

// know ur rm

//filter the bills

module.exports=router