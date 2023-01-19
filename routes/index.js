const express =require("express")
const router = express.Router()
const {ensureAuth, ensureGuest}= require('../middleware/auth');


//@desc     Login/Landing Page
//@route    GET/
router.get('/', ensureGuest, (req, res)=>{
    res.render('Login', {
        layout: 'login'
    })
})


//@desc     Login/Landing Page
//@route    GET/ dashboard
router.get('/dashboard', ensureGuest,(req, res)=>{
    res.render('Dashboard')
})




module.exports = router