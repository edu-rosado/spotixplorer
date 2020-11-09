import React, { useEffect, useState } from 'react'
import { STORAGE_KEY } from '../App'

export default function useLocalStorage(
    itemKey, defaultValue
) {
    const key = `${STORAGE_KEY}-${itemKey}`

    const [item, setItem] = useState(() => {
        
        const localStr = localStorage.getItem(key)
        if (localStr === null){
            // localStorage.setItem(key, JSON.stringify(defaultValue))
            return defaultValue
        } else{
            try{
                return JSON.parse(localStr)
            } catch{
                return localStr
            }
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(item))
    }, [item])
    
    return [item, setItem]
}
