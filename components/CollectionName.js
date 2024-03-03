"use client"

import { useGlobalContext } from "@/config/GlobalContext"
import { useEffect, useState } from "react"
import { spotshare_api_url } from "@/config/api"
import { ChevronDown } from 'lucide-react';
import { HexColorPicker } from "react-colorful";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateCollection } from "@/controllers/collections.controller";

import { ButtonLoading } from "./ButtonLoading";

export default function CollectionName() {

    const { selectedCollection, user, fetchUserCollections } = useGlobalContext()
    const [collection, setCollection] = useState({})
    const [open, setOpen] = useState(false)
    const [collectionName, setCollectionName] = useState('')
    const [collectionColor, setCollectionColor] = useState('')
    const [isSystemCollection, setIsSystemCollection] = useState(false)

    const [isUpdating, setIsUpdating] = useState(false)

    const fetchCollectionData = async (collection_id) => {
        try {
            const response = await fetch(`${spotshare_api_url}/collections/${collection_id}`);

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            setCollection(data.data);
        } catch (error) {
            console.error("Erreur lors du chargement des informations de la collection:", error);
        }
    }

    const handleUpdatedData = async () => {
        if (collectionName !== "") {
            setIsUpdating(true);
            await updateCollection(collectionName, collectionColor, collection.id);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await fetchUserCollections(user.user.id);
            await fetchCollectionData(selectedCollection);
            setOpen(false);
            setIsUpdating(false);
        }
    };


    useEffect(() => {
        fetchCollectionData(selectedCollection)
        setCollectionName(collection.name)
        setCollectionColor(collection.color)

        setIsSystemCollection([1, 2].includes(collection.id))

    }, [collection.color, collection.id, collection.name, selectedCollection])

    return (
        <div id="collection_name">

            {
                isSystemCollection
                    ? (
                        <div className="collection_name_container">
                            <div style={{ backgroundColor: collection.color, width: "10px", height: "10px", borderRadius: "50%" }}></div>
                            <p>{collection.name}</p>
                        </div>
                    )
                    : (
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger>
                                <div className="collection_name_container custom_collection">
                                    <div style={{ backgroundColor: collection.color, width: "10px", height: "10px", borderRadius: "50%" }}></div>
                                    <p>{collection.name}</p>
                                    <ChevronDown />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Label>Nom :</Label>
                                <Input value={collectionName} onChange={e => setCollectionName(e.target.value)} />

                                <br />

                                <Label>Couleur :</Label>
                                <HexColorPicker color={collectionColor} onChange={setCollectionColor} style={{ width: "100%" }} />

                                <br />
                                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                    {isUpdating ? (
                                        <ButtonLoading value="Enregistrement..." style={{ flexGrow: "1" }} />
                                    ) : (
                                        <Button onClick={handleUpdatedData} style={{ flexGrow: "1" }}>Enregistrer</Button>
                                    )}
                                </div>
                                <br />
                                <Button onClick={() => setOpen(false)} variant="outline" style={{ width: "100%" }}>Fermer</Button>
                            </PopoverContent>
                        </Popover>
                    )
            }


        </div>
    )
}