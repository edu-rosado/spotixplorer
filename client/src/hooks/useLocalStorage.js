import React, { useEffect, useState } from 'react'
import { LOCAL_PREFIX } from '../App'

export default function useLocalStorage(
    itemKey, defaultValue
) {
    const key = `${LOCAL_PREFIX}-${itemKey}`

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
