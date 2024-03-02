import { BookmarkPlus } from 'lucide-react';
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { spotshare_api_url } from "@/config/api";

import { HexColorPicker } from "react-colorful";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useState } from "react";
import { useGlobalContext } from '@/config/GlobalContext';

export default function AddCollectionForm() {
    
    const {user, fetchUserCollections} = useGlobalContext()

    const [collectionName, setCollectionName] = useState("");
    const [color, setColor] = useState("#aabbcc");
    const [open, setOpen] = useState(false)

    const handleData = () => {
        console.log(collectionName, color);

        // Préparation de la requête
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: collectionName,
                color: color,
                user_id: user.user.id,
                visibility: '0'
            })
        };

        fetch(`${spotshare_api_url}/collections`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Une erreur est survenue');
                }
                return response.json();
            })
            .then((data) => {
                setOpen(false)
                console.log(data.id)
                fetchUserCollections(user.user.id)
            })
            .catch((error) => {
                console.error('Erreur lors de la création de la collection', error);
            })
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="sidebar__collections_button"><BookmarkPlus /> Créer une collection</Button>
            </PopoverTrigger>
            <PopoverContent>
                <Label>Nom :</Label>
                <Input onChange={e => setCollectionName(e.target.value)} />

                <br />

                <Label>Couleur :</Label>
                <HexColorPicker color={color} onChange={setColor} style={{ width: "100%" }} />

                <br />
                <Button style={{ width: "100%" }} onClick={handleData}>Créer la collection</Button>
            </PopoverContent>
        </Popover>
    )
}