import React, { useEffect, useState } from 'react'
import { useMenuselection } from '../../../context/MenuSelectionContext'

export default function MenuItem({
    cls,text,dataKey
}) {
    const [menuSelection, setMenuSelection] = useMenuselection()
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if (menuSelection === dataKey){
            if (!isActive){
                setIsActive(true)
            }
        } else if (isActive){
            setIsActive(false)
        }
    }, [menuSelection])
    
    return (
        <p
            className={cls + (isActive? " active" : "")}
            onClick={()=>(setMenuSelection(dataKey))}
        >
            {text}
        </p>
    )
}
