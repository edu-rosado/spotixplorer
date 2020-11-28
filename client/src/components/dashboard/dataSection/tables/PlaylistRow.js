import React from 'react'

export default function PlaylistRow({playlist, cls}) {

  const totalSeconds = playlist.tracks
    .reduce((totalSecs,track) => (
      totalSecs + track.duration_ms / 1000
  ),0)
  const hours = Math.floor(totalSeconds / 3600)
  let minutes = Math.floor(totalSeconds % 3600 / 60)
  minutes = minutes < 10 ? `0${minutes}` : minutes.toString()
  const seconds = Math.round(totalSeconds) % 60

  let firstAdd = playlist.tracks[0].added_at
  let lastAdd = playlist.tracks[0].added_at
  playlist.tracks.forEach(track => {
    if (track.added_at < firstAdd) (firstAdd = track.added_at)
    else if (track.added_at > lastAdd) (lastAdd = track.added_at)
  })
  firstAdd = `${firstAdd.slice(8,10)}-${firstAdd.slice(5,7)}-${firstAdd.slice(0,4)}`
  lastAdd = `${lastAdd.slice(8,10)}-${lastAdd.slice(5,7)}-${lastAdd.slice(0,4)}`

  return (
    <tr className={cls}>
      <td >{playlist.name}</td>
      <td className="center">{playlist.tracks.length}</td>
      <td className="center">{`${hours}:${minutes}:${seconds}`}</td>
      <td className="center">{firstAdd}</td>
      <td className="center">{lastAdd}</td>
    </tr>
  )
}
