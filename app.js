const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("dotenv/config")

app.use(express.json());

app.get('/', (req, res) => {
    res.send('inside the home')
})

const userRoute = require("./routes/auth")
app.use("/api/users", userRoute)

mongoose.connect(process.env.DB_CONNECTION, () => {
 console.log("connected successfuly")
})

app.listen(3000, () =>
  console.log('Listening the port 3000')
)