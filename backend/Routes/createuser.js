const express = require('express')
const router = express.Router()
const user = require('../models/users')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "Thisismyfooddeliverymernproject"

router.post("/createuser",[body('email').isEmail(),
    body('name').isLength({min:5}),
    body('password','incorrect password').isLength({ min: 5 })],
    async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);

    try {
        await user.create({
            name:req.body.name,
            location:req.body.location,
            email:req.body.email,
            // password:req.body.password
            password: securePass
        })
        res.json({success:true});
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})


router.post("/loginuser",[body('email').isEmail(),
    body('password','incorrect password').isLength({ min: 5 })],
    async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
    let email = req.body.email;
    try {
        let userData = await user.findOne({email});
        if(!userData){
            return res.status(400).json({ errors:"Invalid credentials"});
        }
        const passCompare = await bcrypt.compare(req.body.password, userData.password);
        if(!passCompare){
            return res.status(400).json({ errors:"Invalid credentials"});
        }


        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({success:true, authToken:authToken});
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})


module.exports=router;