import React, { useEffect, useState } from 'react'
import { MENU_KEY_ARTISTS, MENU_KEY_PLAYLISTS, MENU_KEY_SONGS, useMenuselection } from '../../../../context/MenuSelectionContext'
import { useShowSidebar } from '../../../../context/ShowSidebarContext'
import { usePlaylists } from '../../../../context/SpotifyDataContext'
import Header from './Header'
import PlaylistRow from './PlaylistRow'

const PLAYLISTS_TITLE = "Explore: Playlists"
const ARTISTS_TITLE = "Explore: Artists"
const SONGS_TITLE = "Explore: Songs"

const PLAYLIST_HEADERS = ["Name", "Num. of songs",
 "Total duration (h:m:s)", "First addition", "Last addition"]
 const PLAYLIST_COL_INFO = [
   {key:"name",type:"string"},
   {key:"length",type:"int"},
   {key:"totalSeconds",type:"int"},
   {key:"firstAddStamp",type:"string"},
   {key:"lastAddStamp",type:"string"},
 ]

export default function BasicTable() {

  const [menuSelection, ] = useMenuselection()
  const [playlists, ] = usePlaylists()
  const [showSidebar, setShowSidebar] = useShowSidebar()

  const [headers, setHeaders] = useState([])
  const [activeSortingHeader, setActiveSortingHeader] = useState("")

  const [title, setTitle] = useState("")
  const [tbody, setTbody] = useState(null)
  const [tableRows, setTableRows] = useState([])

  const playlistToObj = (playlist) => {

    const totalSeconds = playlist.tracks
      .reduce((totalSecs,track) => (
        totalSecs + track.duration_ms / 1000
    ),0)
    const hours = Math.floor(totalSeconds / 3600)
    let minutes = Math.floor(totalSeconds % 3600 / 60)
    minutes = minutes < 10 ? `0${minutes}` : minutes.toString()
    const seconds = Math.round(totalSeconds) % 60

    let firstAddStamp = playlist.tracks[0].added_at
    let lastAddStamp = playlist.tracks[0].added_at
    playlist.tracks.forEach(track => {
      if (track.added_at < firstAddStamp) (firstAddStamp = track.added_at)
      else if (track.added_at > lastAddStamp) (lastAddStamp = track.added_at)
    })
    const firstAdd = `${firstAddStamp.slice(8,10)}-${firstAddStamp.slice(5,7)}-${firstAddStamp.slice(0,4)}`
    const lastAdd = `${lastAddStamp.slice(8,10)}-${lastAddStamp.slice(5,7)}-${lastAddStamp.slice(0,4)}`

    return {
      name: playlist.name,
      length: playlist.tracks.length,
      totalSeconds, hours, minutes, seconds,
      firstAdd, lastAdd,firstAddStamp, lastAddStamp,
    }
  }
  
  useEffect(() => {
    switch(menuSelection){
      case MENU_KEY_PLAYLISTS:
        setTitle(PLAYLISTS_TITLE)
        setHeaders(PLAYLIST_HEADERS)
        setTableRows(playlists.map(playlistToObj))
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
      <div className="title">
        <h2>{title}</h2>
        <span 
          class="material-icons burger-menu"
          onClick={()=>{setShowSidebar(prev=>!prev)}}>
          {showSidebar? "keyboard_return":"menu"}
        </span>
      </div>
      <table>
        <div className={"table-top-layer" + (
          showSidebar? " obscure":""
        )}>
          <thead>
            <tr>
              {headers.map((header,ind) => (
                <Header 
                  text={header}
                  colKey={PLAYLIST_COL_INFO[ind].key}
                  colType={PLAYLIST_COL_INFO[ind].type}
                  activeSortingHeader={activeSortingHeader}
                  setActiveSortingHeader={setActiveSortingHeader}
                  setTableRows={setTableRows}/>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.length == 0 ? "" :
            tableRows.map((data, ind) => (
              <PlaylistRow 
                data={data}
                cls={ind % 2 == 0 ? "even":"odd"}/>
            ))}
          </tbody>
        </div>
      </table>
    </>
  )
}
