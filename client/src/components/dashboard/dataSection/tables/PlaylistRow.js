import React from 'react'

export default function PlaylistRow({playlist}) {

  const totalSeconds = playlist.tracks
    .reduce((totalSecs,track) => (
      totalSecs + track.duration_ms / 1000
  ),0)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor(totalSeconds % 3600 / 60)
  const seconds = Math.round(totalSeconds) % 60

  let firstAdd = playlist.tracks[0].added_at
  let lastAdd = playlist.tracks[0].added_at
  playlist.tracks.forEach(track => {
    if (track.added_at < firstAdd) (firstAdd = track.added_at)
    else if (track.added_at > lastAdd) (lastAdd = track.added_at)
  })

  return (
    <tr>
      <td>{playlist.name}</td>
      <td>{playlist.tracks.length}</td>
      <td>{`${hours}h : ${minutes}m : ${seconds}s`}</td>
      <td>{firstAdd}</td>
      <td>{lastAdd}</td>
    </tr>
  )
}
