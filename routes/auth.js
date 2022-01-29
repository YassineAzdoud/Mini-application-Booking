const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const {registerValidation,loginValidation} = require("../validation");
const res = require("express/lib/response");
const JWT = require("jsonwebtoken")

router.get("/", (req, res) => {
    res.send("inside the home")
});


router.post("/register", async (req, res) => {
    
    const {error} = registerValidation(req.data);
    if (error) return res.status(400).send(error.details[0].message);

    const checkdata = await User.findOne({email : req.body.email,})
    if (checkdata) return res.status(400).send("Email already exists")

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
 
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    });
 
    try {
        const savedUser = await user.save();
        res.status(200).send({user: savedUser})
    } catch (err){
        res.status(400).send({
            status: "Failed",
            msg: err
        })
    }
});


router.post("/login", async (req, res) =>{
    const {error} = loginValidation(req.data);
    if (error) return res.status(400).send(error.details[0].message);

    const user1 = await User.findOne({email : req.body.email,})
    if (!user1) return res.status(400).send("Email already exists")

    const validPass = await bcrypt.compare(req.body.password, user1.password);
    if (!validPass) return res.status(400).send("Password valid")
})

module.exports = router;