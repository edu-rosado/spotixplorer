import Axios from 'axios'
import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const LOCAL_KEY_PLAYLIST_SET = "playlist-set"

const PlaylistContext = React.createContext()

export const usePlaylists = () => {
    return useContext(PlaylistContext)
}

export const SpotifyDataProvider = ({children}) => {

    //////////////// PLAYLISTS ////////////////////

    const [playlists, setPlaylists] = useLocalStorage(
        LOCAL_KEY_PLAYLIST_SET, []
    )

    // Exposed method to get playlists from Spotify API
    const getPlaylists = async (access_token) => {
        const config = {headers: {
            "Authorization": `Bearer ${access_token}`
        }}
        getPlaylistsFromApi(config, 0)

    }

    // Auxiliar method with offset parameter
    // Use recursion to move the ofset and get all the playlists
    const getPlaylistsFromApi = (config, offset) => {
        setPlaylists([])
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
                    setPlaylists(prev => [
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

    // get tracks from the spotify api. href is the 
    // tracks link found in the playlist object.
    // it uses recursion to move the offest and get all 
    // the tracks
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

    //////////////// RETURN ////////////////////
    
    return (
        <PlaylistContext.Provider value={[playlists, getPlaylists]}>
            {children}
        </PlaylistContext.Provider>
    )
}
