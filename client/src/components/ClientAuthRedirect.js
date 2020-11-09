import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { REDIRECT_URI } from '../App'

export default function ClientAuthRedirect({location}) {

    const [tokenData, setTokenData] = useState(null)

    useEffect(() => {
        const qParams = Object.assign({},
            ...location.search
            .slice(1)
            .split("&") 
            .map(paramStr => {
                const [key, val] = paramStr.split("=")
                return {[key]: val}
            })
        )
        if (qParams.error){
            console.log(qParams.error)
        } else{
            console.log("go")
            Axios.post("/api/auth/code", {
                code: qParams.code,
                redirect_uri: encodeURIComponent(REDIRECT_URI)})
                .then(res => {
                    const expirationDate = new Date()
                    expirationDate.setSeconds(
                        expirationDate.getSeconds() + res.data.expires_in
                    )
                    setTokenData({
                        ...res.data,
                        expirationDate,
                    })
                })
                .catch(error => {
                    console.log(error.response.status)
                    console.log(error.response.data)
                })
        }
    }, [])

    const handleGetPlaylists = () => {
        if (tokenData === null){
            console.log("ERROR: no token")
            return
        } else if ((new Date()) >= tokenData.expirationDate){
            // TODO: Ask for a token refresh
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${tokenData.access_token}`
            }
        }
        console.log(config)
        Axios.get(
            "https://api.spotify.com/v1/me/playlists",
            config
            )
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error.response.status)
                console.log(error.response.data)
            })

    }
    
    return (
        <div>
            <button 
                onClick={handleGetPlaylists}
            >Get Playlists</button>
        </div>
    )
}
