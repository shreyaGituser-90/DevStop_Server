const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = 8000;


app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(() => {
   app.listen(PORT,()=>{
      console.log(`server is listening at port ${PORT} `);
   })
})
.catch((err) => {
    console.log("Error Occurred");
});
