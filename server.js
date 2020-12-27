const path = require('path');
const express = require("express")
const app = express()

if (process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

// Middleware
app.use(express.json())

const publicPath = path.join(__dirname, 'client', 'build');
app.use(express.static(publicPath));

// Import routes
const authRouter = require("./routes/auth")

// Use routes
app.use("/api/auth", authRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{console.log("Server listening on 5000")})

