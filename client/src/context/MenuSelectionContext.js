import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const LOCAL_KEY_MENU_SELECTION = "LOCAL_KEY_MENU_SELECTION"

export const MENU_KEY_PLAYLISTS = "MENU_KEY_PLAYLISTS"
export const MENU_KEY_ARTISTS = "MENU_KEY_ARTISTS"
export const MENU_KEY_SONGS = "MENU_KEY_SONGS"
export const MENU_KEY_TOP_SONGS = "MENU_KEY_TOP_SONGS"
export const MENU_KEY_LAST_50 = "MENU_KEY_LAST_50"
export const MENU_KEY_METRICS_ANALYZE = "MENU_KEY_METRICS_ANALYZE"
export const MENU_KEY_METRICS_CREATE = "MENU_KEY_METRICS_CREATE"

const MenuSelectionContext = React.createContext()

export const useMenuselection = () => {
    return useContext(MenuSelectionContext)
}

export const MenuSelectionProvider = ({children}) => {
    const [menuSelection, setMenuSelection] = useLocalStorage(
        LOCAL_KEY_MENU_SELECTION, MENU_KEY_PLAYLISTS
    )

    return (
        <MenuSelectionContext.Provider 
        value={[menuSelection, setMenuSelection]}>
            {children}
        </MenuSelectionContext.Provider>
    )
}
