import React from 'react'
import { MENU_KEY_ARTISTS, MENU_KEY_LAST_50, MENU_KEY_METRICS_ANALYZE, MENU_KEY_METRICS_CREATE, MENU_KEY_PLAYLISTS, MENU_KEY_SONGS, MENU_KEY_TOP_SONGS } from '../../../context/MenuSelectionContext'
import MenuItem from './MenuItem'

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
          <li className="l1">
            <MenuItem
                cls="item-l1"
                text="Explore"
                dataKey={MENU_KEY_PLAYLISTS}
            />
            <ul className="menu-l2">
              <li className="l2">
                <MenuItem
                  cls="item-l2"
                  text="Playlists"
                  dataKey={MENU_KEY_PLAYLISTS}
                />
              </li>
              <li className="l2">
                <MenuItem
                  cls="item-l2"
                  text="Artists"
                  dataKey={MENU_KEY_ARTISTS}
                />
              </li>
              <li className="l2">
                <MenuItem
                  cls="item-l2"
                  text="Songs"
                  dataKey={MENU_KEY_SONGS}
                />
              </li>
            </ul>
          </li>
          <li className="l1">
            <MenuItem
                  cls="item-l1 has-action"
                  text="Top tracks"
                  dataKey={MENU_KEY_TOP_SONGS}
            />
          </li>
          <li className="l1">
            <MenuItem
                cls="item-l1 has-action"
                text="Last 50"
                dataKey={MENU_KEY_LAST_50}
            />
          </li>
          <li className="l1">
            <MenuItem
                cls="item-l1"
                text="Musical metrics"
                dataKey={MENU_KEY_METRICS_ANALYZE}
            />
            <ul className="menu-l2">
              <li className="l2">
                  <MenuItem
                    cls="item-l2"
                    text="Analize"
                    dataKey={MENU_KEY_METRICS_ANALYZE}
                  />
                </li>
                <li className="l2">
                  <MenuItem
                    cls="item-l2"
                    text="Create"
                    dataKey={MENU_KEY_METRICS_CREATE}
                  />
                </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
