import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { REDIRECT_URI, TOKEN_DATA_LOCAL_KEY } from '../../App'
import useLocalStorage from '../../hooks/useLocalStorage'
import { getExpirationTime } from '../../common'
import { usePlaylists } from '../../context/SpotifyDataContext'
import Sidebar from './sidebar/Sidebar'
import DataSection from './dataSection/DataSection'
import { useMediaQuery } from 'react-responsive'
import { useShowSidebar } from '../../context/ShowSidebarContext'

export default function Dashboard({location}) {

    const [tokenData, setTokenData] = useLocalStorage(
        TOKEN_DATA_LOCAL_KEY,null
    )
    const [refreshDone, setRefreshDone] = useState(false)
    const [mustRefreshSpotifyData, setMustRefreshSpotifyData] = useState(false)

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)"
    })
    const [showSidebar, setShowSidebar] = useShowSidebar()
    
    const [playlists, getPlaylists] = usePlaylists()

    // on mount: Get tokens and spotify data
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
                    const expiration_time = getExpirationTime(
                        res.data.expires_in
                    )
                    setTokenData({
                        ...res.data,
                        expiration_time,
                    })
                    if (playlists.length == 0){
                        // At mount, only get users data 
                        // if local storage is empty
                        setMustRefreshSpotifyData(true)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [])

    // Tokens have been refreshed, resume data fetching
    useEffect(() => {
        if (refreshDone){
            setRefreshDone(false)
            refreshSpotifyData()
        }
    }, [refreshDone])

    // Get spotify data when tokenData is ready
    useEffect(() => {
        if (mustRefreshSpotifyData
            && (tokenData !== null)){
            refreshSpotifyData()
        }
        }, [tokenData, mustRefreshSpotifyData])
    
    // Get spotify data
    const refreshSpotifyData = () => {
        setMustRefreshSpotifyData(false)
        if ((new Date()).getTime() >= tokenData.expiration_time){
            // Token expired
            const error = refreshTokenData()
            if (error !== null){
                console.log(error)
            }
            // If error return
            // If refreshing, return and refreshSpotifyData 
            // will be called again (with useEffect)
            return
        }
        console.log("Calling spotify API")
        getPlaylists(tokenData.access_token)
    } 

    const refreshTokenData = () => {
        if (tokenData.refresh_token === undefined){
            return {
                error: "Cannot refresh token, please login again"
            }
        }
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
                return null
            })
            .catch(error => {
                 return error.response.data
            })
    }
    
    return (
        <div className="app">
            {( !isMobile || showSidebar) ? (
                <Sidebar refreshSpotifyData/>
            ) : ""}
            <DataSection/>
        </div>
    )
}
