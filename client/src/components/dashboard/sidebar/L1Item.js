import React, { useEffect, useState } from 'react'
import { useMenuselection } from '../../../context/MenuSelectionContext'

export default function MenuItem({
    cls,text,dataKeyList
}) {
    const [menuSelection, setMenuSelection] = useMenuselection()
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if (dataKeyList.find(
            key => key === menuSelection
        ) !== undefined){
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
            onClick={()=>(setMenuSelection(dataKeyList[0]))}
        >
            {text}
        </p>
    )
}
