import { useGlobalContext } from "@/config/GlobalContext"
import { jomolhari } from "@/config/fonts"
import CollectionItem from "./CollectionItem"

export default function CollectionContainer() {

    const { publicCollections, collections } = useGlobalContext()

    return (
        <div id="sidebar__collections_container" className={jomolhari.className}>
            {publicCollections.map((collection, index) => (
                <CollectionItem key={index} collection={collection}  />
            ))}

            {collections.map((collection, index) => (
                <CollectionItem key={index} collection={collection} />
            ))}
        </div>
    )
}