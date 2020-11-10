import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { PLAYLIST_SET_LOCAL_KEY, REDIRECT_URI, TOKEN_DATA_LOCAL_KEY } from '../App'
import useLocalStorage from '../hooks/useLocalStorage'
import { getExpirationTime } from '../common'

export default function Dashboard({location}) {

    const [tokenData, setTokenData] = useLocalStorage(
        TOKEN_DATA_LOCAL_KEY,null
    )
    const [playlistSet, setPlaylistSet] = useLocalStorage(PLAYLIST_SET_LOCAL_KEY,[])

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
        const config = {headers: {
            "Authorization": `Bearer ${tokenData.access_token}`
        }}
        getPlaylistsFromApi(config, 0)

    }

    const getPlaylistsFromApi = (config, offset) => {
        setPlaylistSet([])
        console.log(config)
        Axios.get(
            `https://api.spotify.com/v1/me/playlists?limit=50&offset=${offset}`,
            config
            )
            .then(res => {
                Promise.all(
                    res.data.items
                        .map( async playlist => {
                            const tracks = await getTracks(
                                playlist.tracks.href,
                                config,
                                0
                            )
                            return {
                                name: playlist.name,
                                images: playlist.images,
                                tracks,
                            }
                        })
                ).then(formattedPlaylist => {
                    setPlaylistSet(prev => [
                        ...prev, 
                        ...formattedPlaylist,
                    ])
                })
                const newOffset = offset + 50
                if (newOffset < res.total){
                    getPlaylistsFromApi(config, newOffset)
                }
                
            })
            .catch(error => {
                console.log(error)
                console.log(error.response.data)
            })
    }

    const getTracks = (href,config, offset) =>{
        return Axios.get(
            `${href}?offset=${offset}`,
            config
        )
            .then( async res => {
                const tracks = res.data.items
                    .map(track => ({
                    added_at: track.added_at,
                    album: track.track.album.name,
                    release_date: track.track.album.release_date,
                    artists: track.track.artists
                        .map(artist => artist.name),
                    duration_ms: track.track.duration_ms,
                    name: track.track.name,
                    href: track.track.href
                }))
                const newOffset = offset + 100
                if (newOffset < res.data.total){
                    return [
                        ...tracks,
                        ... await getTracks(href, config, newOffset)
                    ]
                } else{
                    return tracks
                }
            })
            .catch(error => {
                console.log(error)
                console.log(error.response.data)
                return error
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
