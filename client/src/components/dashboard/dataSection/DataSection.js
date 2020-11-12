import React from 'react'
import { useMenuselection } from '../../../context/MenuSelectionContext'
import BasicMetrics from './metrics/BasicMetrics'
import BasicTable from './tables/BasicTable'

export default function DataSection() {

  const [menuSelection, ] = useMenuselection()
  return (
    <div className="data-section">
      {
        menuSelection.indexOf("_TABLE_") > -1 ? (
          <BasicTable />
        ) : (
          <BasicMetrics />
        )
      }
    </div>
  )
}
