import React from 'react'

export default function Sidebar({refreshSpotifyData}) {
  return (
    <div className="sidebar">
      <div className="sidebar-color-layer">
        <h1>SpotiXplorer</h1>
        <div className="account-section">
          <h2>USERNAME</h2>
          <img src="https://imgs.smoothradio.com/images/191589?crop=16_9&width=660&relax=1&signature=Rz93ikqcAz7BcX6SKiEC94zJnqo=" alt="Spotify user account"/>
          <div className="buttons">
            <button
              onClick={refreshSpotifyData}
              className="sync-btn"
            >Sync data with Spotify
            </button>
            <button
              className="logout-btn"
            >Logout</button>
          </div>
        </div>
        <ul className="main-menu">
          <li className="item-l1">
            <h2>Explore</h2>
            <ul className="menu-l2">
              <li className="item-l2">Playlists</li>
              <li className="item-l2">Artists</li>
              <li className="item-l2">Songs</li>
            </ul>
          </li>
          <li className="item-l1">
            <h2 className="has-action">Top tracks</h2>
          </li>
          <li className="item-l1">
          <h2 className="has-action">Last 50</h2>
          </li>
          <li className="item-l1">
            <h2>Musical metrics</h2>
            <ul className="menu-l2">
              <li className="item-l2">Analize</li>
              <li className="item-l2">Create</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
