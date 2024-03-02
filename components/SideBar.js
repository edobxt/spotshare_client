import { jomhuria, jomolhari } from "@/config/fonts.js";
import { Button } from "./ui/button";
import { User } from 'lucide-react';

import AddCollectionForm from "./AddCollectionForm";
import { useEffect, useState } from "react";

import { spotshare_api_url } from "@/config/api";
import { useGlobalContext } from "@/config/GlobalContext";
import CollectionContainer from "./CollectionContainer";

export default function SideBar() {

    const {user} = useGlobalContext()

    const [publicCollections, setPublicCollections] = useState([])

    useEffect(() => {
        // Définissez l'URL de base de votre API si nécessaire
        const fetchCollections = async () => {
            try {
                const response = await fetch(`${spotshare_api_url}/users/0/collections`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                setPublicCollections(data.data);
            } catch (error) {
                console.error("Erreur lors du chargement des collections publiques:", error);
            }
        };

        fetchCollections();
    }, []);
    
    const signOut = () => {
        localStorage.removeItem('userInfo');
        window.location.href = "/signin";
    }

    return (
        <div id='sidebar'>
            <h1 className={jomhuria.className + " sidebar__main-title"}>SpotShare</h1>

            <p className={jomolhari.className + " sidebar__username"}>
                <User />
                {user.user.full_name}
            </p>

            <h3 className={jomolhari.className + " sidebar__collections_title"}>Mes collections</h3>

            <AddCollectionForm />

            <CollectionContainer />

            <div id="sidebar__account_buttons">
                <Button className={jomolhari.className + " sidebar__account_details"}>Mon compte</Button>
                <Button className={jomolhari.className + " sidebar__account_signout"} variant="outline" onClick={signOut}>Se déconnecter</Button>
            </div>

        </div>
    )
}