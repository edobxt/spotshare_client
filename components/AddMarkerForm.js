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
import CollectionSelect from "./CollectionSelect"
import { useGlobalContext } from "@/config/GlobalContext"

export default function AddMarkerForm({open, setOpen, latlng}) {

  const {collections} = useGlobalContext()

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Souhaitez vous ajouter un marqueur ? </DrawerTitle>
          <DrawerDescription>Lat : {latlng.lat} | Long : {latlng.lng}</DrawerDescription>
          <br />
          <Label>Titre : </Label>
          <Input />
          <br />
          <Label>Description :</Label>
          <Textarea />
          <br />

          <Label>Collection :</Label>
          <CollectionSelect collections={collections} />
          <br />
        </DrawerHeader>

        <DrawerFooter style={{display: "flex"}}>
          <Button>Ajouter</Button>
          <DrawerClose>
            <Button variant="outline" style={{width: "100%"}}>Fermer</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

  )
}