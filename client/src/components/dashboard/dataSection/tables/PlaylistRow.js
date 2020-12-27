import React from 'react'

export default function PlaylistRow({data, cls}) {



  return (
    <tr className={cls}>
      <td >{data.name}</td>
      <td className="center">{data.length}</td>
      <td className="center">
      {`${data.hours}:${data.minutes}:${data.seconds}`}
      </td>
      <td className="center">{data.firstAdd}</td>
      <td className="center">{data.lastAdd}</td>
    </tr>
  )
}
