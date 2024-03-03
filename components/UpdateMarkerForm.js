import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Input } from "./ui/input"

import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useGlobalContext } from "@/config/GlobalContext"
import { ButtonLoading } from "./ButtonLoading"

import { deleteMarker, updateMarker } from "@/controllers/markers.controller"
import { useState, useEffect } from "react"

export default function UpdateMarkerForm({ open, setOpen }) {
    const { selectedMarker, fetchMarkersFromCollection, selectedCollection } = useGlobalContext();
    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [isDeleting, setIsDeleting] = useState(false); // État pour le suivi de la suppression
    const [isUpdating, setIsUpdating] = useState(false); // État pour le suivi de la mise à jour

    useEffect(() => {
        setTitleInput(selectedMarker?.name || "");
        setDescriptionInput(selectedMarker?.description || "");
    }, [selectedMarker]);

    const handleDeleteData = async () => {
        setIsDeleting(true);
        await deleteMarker(selectedMarker.id);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await fetchMarkersFromCollection(selectedCollection);
        setOpen(false);
        setIsDeleting(false);
    };

    const handleUpdatedData = async () => {
        if (titleInput !== "" && descriptionInput !== "") {
            setIsUpdating(true);
            await updateMarker(titleInput, descriptionInput, selectedMarker.id);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await fetchMarkersFromCollection(selectedCollection);
            setOpen(false);
            setIsUpdating(false);
        }
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Informations du marqueur</DrawerTitle>
                    <DrawerDescription>Coordonnées</DrawerDescription>
                    <br />
                    <Label>Titre:</Label>
                    <Input value={titleInput} onChange={e => setTitleInput(e.target.value)} />
                    <br />
                    <Label>Description:</Label>
                    <Textarea value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)} />
                    <br />
                </DrawerHeader>

                <DrawerFooter style={{ display: "flex" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                        {isUpdating ? (
                            <ButtonLoading value="Enregistrement..."  style={{ flexGrow: "1" }} />
                        ) : (
                            <Button onClick={handleUpdatedData} style={{ flexGrow: "1" }}>Enregistrer</Button>
                        )}
                        {isDeleting ? (
                            <ButtonLoading value="Suppression..."  style={{ flexGrow: "1" }} />
                        ) : (
                            <Button onClick={handleDeleteData} variant="destructive" style={{ flexGrow: "1" }}>Supprimer</Button>
                        )}
                    </div>
                    <br />
                    <DrawerClose>
                        <Button variant="outline" style={{ width: "100%" }}>Fermer</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}