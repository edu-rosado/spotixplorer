import React, { useEffect, useState } from 'react'
import { useMenuselection } from '../../../context/MenuSelectionContext'
import { useShowSidebar } from '../../../context/ShowSidebarContext'

export default function MenuItem({
    cls,text,dataKeyList
}) {
    const [menuSelection, setMenuSelection] = useMenuselection()
    const [isActive, setIsActive] = useState(false)
    const [showSidebar, setShowSidebar] = useShowSidebar()

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

    const handleOnClick = () =>{
        setMenuSelection(dataKeyList[0])
        if (showSidebar) setShowSidebar(false)
    }
    
    return (
        <p
            className={cls + (isActive? " active" : "")}
            onClick={handleOnClick}
        >
            {text}
        </p>
    )
}
