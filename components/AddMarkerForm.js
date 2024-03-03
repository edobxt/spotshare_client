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
import { useState } from "react"

import { addMarker } from "@/controllers/markers.controller"

export default function AddMarkerForm({ open, setOpen, latlng }) {

  const { fetchMarkersFromCollection, setSelectedCollection } = useGlobalContext()

  const [titleInput, setTitleInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [collectionInput, setCollectionInput] = useState('')

  const handleData = async () => {
    if (titleInput != "" && descriptionInput != "" && collectionInput != "") {
      await addMarker(titleInput, descriptionInput, collectionInput, 'Somewhere', latlng.lng, latlng.lat)
      
      setSelectedCollection(collectionInput)

      await new Promise(resolve => setTimeout(resolve, 1000));

      await fetchMarkersFromCollection(collectionInput)

      setOpen(false)

    }

  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Souhaitez vous ajouter un marqueur ? </DrawerTitle>
          <DrawerDescription>Lat : {latlng.lat} | Long : {latlng.lng}</DrawerDescription>
          <br />
          <Label>Titre : </Label>
          <Input onChange={e => setTitleInput(e.target.value)} />
          <br />
          <Label>Description :</Label>
          <Textarea onChange={e => setDescriptionInput(e.target.value)} />
          <br />

          <Label>Collection :</Label>
          <CollectionSelect setCollection={setCollectionInput} />
          <br />
        </DrawerHeader>

        <DrawerFooter style={{ display: "flex" }}>
          <Button onClick={handleData}>Ajouter</Button>
          <DrawerClose>
            <Button variant="outline" style={{ width: "100%" }}>Fermer</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

  )
}