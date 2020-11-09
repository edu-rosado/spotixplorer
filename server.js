const express = require("express")
const app = express()

if (process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

// Middleware
app.use(express.json())

// Import routes
const authRouter = require("./routes/auth")

// Use routes
app.use("/api/auth", authRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{console.log("Server listening on 5000")})
