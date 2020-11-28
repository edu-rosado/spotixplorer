import React, { useEffect, useState } from 'react'
import { MENU_KEY_ARTISTS, MENU_KEY_PLAYLISTS, MENU_KEY_SONGS, useMenuselection } from '../../../../context/MenuSelectionContext'
import { usePlaylists } from '../../../../context/SpotifyDataContext'
import PlaylistRow from './PlaylistRow'

const PLAYLISTS_TITLE = "Explore: Playlists"
const ARTISTS_TITLE = "Explore: Artists"
const SONGS_TITLE = "Explore: Songs"

const PLAYLIST_HEADERS = ["Name", "Num. of songs",
 "Total duration (h:m:s)", "First addition", "Last addition"]

export default function BasicTable() {

  const [menuSelection, ] = useMenuselection()
  const [playlists, ] = usePlaylists()

  const [title, setTitle] = useState("")
  const [headers, setHeaders] = useState([])
  const [tbody, setTbody] = useState(null)

  useEffect(() => {
    switch(menuSelection){
      case MENU_KEY_PLAYLISTS:
        setTitle(PLAYLISTS_TITLE)
        setHeaders(PLAYLIST_HEADERS)
        setTbody(
          playlists.map((playlist, ind) => (
            <PlaylistRow
            playlist={playlist}
            // Inverted even - odd to compensate for starting to count from zero
            cls={ind % 2 === 1 ? "even" : "odd"}
            />
          ))
        )
        console.log(playlists)
        break
      case MENU_KEY_ARTISTS:
        setTitle(ARTISTS_TITLE)
        break
      case MENU_KEY_SONGS:
        setTitle(SONGS_TITLE)
        break
      default:
        console.log("ERROR: unknown menu value")
        break
    }
  }, [menuSelection])

  return (
    <>
      <div className="title">{title}</div>
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
    </>
  )
}
