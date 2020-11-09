const router = require("express").Router()
const Axios = require("axios")
const qs = require("qs")

router.post('/', function(req, res) {
    // TODO: req body sanity checks
    let body = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
    }
    if (req.body.action === "send_code"){
        body["grant_type"] = "authorization_code"
        body["code"] = req.body.code
        body["redirect_uri"] = decodeURIComponent(req.body.redirect_uri)
    } else if (req.body.action === "refresh_token"){
        body["grant_type"] = "refresh_token"
        body["refresh_token"] = req.body.refresh_token
    } else{
        return res.status(400).json({error: "Incorrect action"})
    }
    body = qs.stringify(body)
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    return Axios.post(
        "https://accounts.spotify.com/api/token",
        body, config)
        .then(spotifyRes => {
            return res.json(spotifyRes.data)
        })
        .catch(error => {
            console.log(error.response.data)
            return res.status(400).json({error:"Request error"})
        })
})
     

module.exports = router
