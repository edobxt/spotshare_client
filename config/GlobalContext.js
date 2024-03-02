import { CreateContext, createContext, useContext } from "react"

export const MyGlobalContext = createContext({
    publicCollections: [],
    setPublicCollections: () => {},
    user: null,
    setUser: () => {},
    collections: [],
    setCollections: () => {},
    fetchUserCollections: () => {},
    selectedCollection: 1,
    selectedMarker: {},
    setSelectedMarker: () => {}
})

export const useGlobalContext = () => useContext(MyGlobalContext)