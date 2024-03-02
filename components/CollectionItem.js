import { useGlobalContext } from "@/config/GlobalContext"

export default function CollectionItem({ collection }) {

    const { publicCollections, collections, selectedCollection, setSelectedCollection, fetchMarkersFromCollection } = useGlobalContext()

    const selectCollection = (collection_id) => {
        if (selectedCollection !== collection_id) {
            setSelectedCollection(collection_id);
            fetchMarkersFromCollection(collection_id);
        }
    }


    return (
        <div className="sidebar__collections_item" onClick={() => selectCollection(collection.id)} >
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: collection.color }}></div>
            <p>{collection.name}</p>
        </div>
    )
}