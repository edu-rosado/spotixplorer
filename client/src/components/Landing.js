import React from 'react'
import { CLIENT_ID, SCOPES, REDIRECT_URI, TOKEN_DATA_LOCAL_KEY } from '../App';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Landing() {

    const [tokenData, setTokenData] = useLocalStorage(
        TOKEN_DATA_LOCAL_KEY, null
    )

    const handleAuth = () => {
        setTokenData(null) // reset auth data
        const url = ('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        `&client_id=${CLIENT_ID}` +
        `&scope=${encodeURIComponent(SCOPES)}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`)
        window.location = url;
    }

    return (
        <div>
            <button onClick={handleAuth}>Authenticate</button>
        </div>
    )
}
