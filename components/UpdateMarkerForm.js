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

export default function UpdateMarkerForm({ open, setOpen }) {

    const {selectedMarker} = useGlobalContext();

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Informations du marqueur </DrawerTitle>
                    <DrawerDescription>Coordonnées</DrawerDescription>
                    <br />
                    <Label>Titre : </Label>
                    <Input value={selectedMarker.name} />
                    <br />
                    <Label>Description :</Label>
                    <Textarea value={selectedMarker.description} />

                    <br />
                </DrawerHeader>

                <DrawerFooter style={{ display: "flex" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                        <Button style={{ flexGrow: "1" }}>Enregistrer</Button>
                        <Button variant="destructive" style={{ flexGrow: "1" }}>Supprimer</Button>
                    </div>
                    
                    <br />
                    <DrawerClose>
                        <Button variant="outline" style={{ width: "100%" }}>Fermer</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}