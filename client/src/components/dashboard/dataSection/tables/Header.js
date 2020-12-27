import React, { useEffect, useState } from 'react'

export default function Header({
    text, colKey, colType, setTableRows,
    activeSortingHeader, setActiveSortingHeader
}) {

    const [orderInt, setOrderInt] = useState(1)
    const [downArrowDisplay, setDownArrowDisplay] = useState("none")
    const [upArrowDisplay, setUpArrowDisplay] = useState("none")

    const handleOnClick = () => {
        if (colType === "string"){
            setTableRows(prev => (
                [...prev].sort((a,b) => orderInt * a[colKey].localeCompare(b[colKey]))
            ))
        } else{
            setTableRows(prev => (
                [...prev].sort((a,b) => orderInt * (a[colKey] - b[colKey]))
            ))
        }
        setActiveSortingHeader(colKey)
        if (orderInt === 1){
            setUpArrowDisplay("block")
            setDownArrowDisplay("none")
        }
        else{
            setUpArrowDisplay("none")
            setDownArrowDisplay("block")
        }
        setOrderInt(-1 * orderInt)
    }

    useEffect(() => {
        if (activeSortingHeader !== colKey){
            setUpArrowDisplay("none")
            setDownArrowDisplay("none")
        }
    }, [activeSortingHeader])
    
    return (
        <th onClick={handleOnClick}>
            <div className="header-item">
                {text}
                <span
                    class="material-icons header-arrow-up"
                    style={{display: downArrowDisplay}}>
                    keyboard_arrow_down
                </span>
                <span
                    class="material-icons header-arrow-down"
                    style={{display: upArrowDisplay}}>
                    keyboard_arrow_up
                </span>
            </div>
        </th>
    )
}
