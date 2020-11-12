import React from 'react'
import { useMenuselection } from '../../../../context/MenuSelectionContext'

export default function BasicMetrics() {

    const [menuSelection, setMenuSelection] = useMenuselection()

    return (
        <>
            {menuSelection}
        </>
    )
}
