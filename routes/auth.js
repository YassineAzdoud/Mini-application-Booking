const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi")

router.get("/", (req, res) => {
    res.send("inside the home")
});


router.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email,
        password: Joi.string().min(6).required(),
    })

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    });
// res.send('zzee')
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


module.exports = router;