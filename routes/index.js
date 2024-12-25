const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('admin_products');
})

router.get('/map/:orderid',function (req, res) {
    res.render("map",{orderid:req.params.orderid});
})

// if(typeof process.env.NODE_ENV !== "undefined" && process.env.NODE_ENV === 'DEVELOPMENT') {
// console.log('in development mode');
// }


module.exports = router