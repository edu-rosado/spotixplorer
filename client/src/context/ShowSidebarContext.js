import React, { useContext, useState } from "react"


const ShowSidebarContext = React.createContext()

export const useShowSidebar = () =>{
    return useContext(ShowSidebarContext)
}

export const ShowSidebarProvider = ({children}) =>{
    const [showSidebar, setShowSidebar] = useState(false)
    return (
    <ShowSidebarContext.Provider
        value={[showSidebar, setShowSidebar]}>
        {children}
    </ShowSidebarContext.Provider>)
}
