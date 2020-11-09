import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import qs from 'qs'
import { REDIRECT_URI } from '../App'
import useLocalStorage from '../hooks/useLocalStorage'
import { getExpirationTime } from '../common'

export default function ClientAuthRedirect({location}) {

    const [tokenData, setTokenData] = useLocalStorage("token-data",null)
    const [refreshDone, setRefreshDone] = useState(false)

    // Get access and refresh tokens
    useEffect(() => {
        if (tokenData !== null){
            return // We already have it
        }
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
            Axios.post("/api/auth/", {
                action: "send_code",
                code: qParams.code,
                redirect_uri: encodeURIComponent(REDIRECT_URI)})
                .then(res => {
                    setTokenData({
                        ...res.data,
                        expiration_time: getExpirationTime(
                            res.data.expires_in
                        ),
                    })
                })
                .catch(error => {
                    console.log(error.response.status)
                    console.log(error.response.data)
                })
        }
    }, [])

    useEffect(() => {
        if (refreshDone){
            setRefreshDone(false)
            handleGetPlaylists()
        }
    }, [refreshDone])

    const handleGetPlaylists = async () => {
        if (tokenData === null){
            console.log("ERROR: no token")
            return
        } else if ((new Date()).getTime() >= tokenData.expiration_time){
            if (tokenData.refresh_token === undefined){
                console.log("ERROR: Cannot refresh anymore, login again")
                // TODO: implement UI to re-login
                return
            } else{
                handleRefresh()
            }
            return
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${tokenData.access_token}`
            }
        }
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

    const handleRefresh = () => {
        return Axios.post("/api/auth/", {
            action: "refresh_token",
            refresh_token: tokenData.refresh_token,
            })
            .then(res => {
                setTokenData({
                    ...res.data,
                    expiration_time: getExpirationTime(
                        res.data.expires_in
                    ),
                })
                // Try to get the playlists again
                setRefreshDone(true)
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
