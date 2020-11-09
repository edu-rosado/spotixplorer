const router = require("express").Router()
const Axios = require("axios")
const qs = require("qs")

router.post('/code', function(req, res) {
    // TODO: req body sanity checks
    const body = qs.stringify({
        grant_type: "authorization_code",
        code: req.body.code,
        redirect_uri: decodeURIComponent(req.body.redirect_uri),
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
    })
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    Axios.post(
        "https://accounts.spotify.com/api/token",
        body, config)
        .then(spotifyRes => {res.json(spotifyRes.data)})
        .catch(error => console.log(error.response.data))
})
    

module.exports = router
