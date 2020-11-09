import React from 'react'
import { CLIENT_ID, SCOPES, REDIRECT_URI } from '../App';

export default function Landing() {

    const handleAuth = () => {
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
