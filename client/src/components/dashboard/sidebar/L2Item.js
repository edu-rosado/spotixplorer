import React, { useEffect, useState } from 'react'
import { useMenuselection } from '../../../context/MenuSelectionContext'
import { useShowSidebar } from '../../../context/ShowSidebarContext'

export default function MenuItem({
    cls,text,dataKey
}) {
    const [menuSelection, setMenuSelection] = useMenuselection()
    const [showSidebar, setShowSidebar] = useShowSidebar()

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
    
    const handleOnClick = () =>{
        setMenuSelection(dataKey)
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
