import { jomhuria, jomolhari } from "@/config/fonts.js";
import { Button } from "./ui/button";
import { User, ArrowLeftToLine, Menu } from 'lucide-react';

import AddCollectionForm from "./AddCollectionForm";
import { useEffect, useState } from "react";

import { spotshare_api_url } from "@/config/api";
import { useGlobalContext } from "@/config/GlobalContext";
import CollectionContainer from "./CollectionContainer";

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);

    useEffect(() => {
        // Cette fonction met à jour la taille de l'état
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        // Mettre à jour la taille au premier chargement
        updateSize();

        // Ajouter l'écouteur d'événement pour les changements de taille de la fenêtre
        window.addEventListener('resize', updateSize);

        // Nettoyer l'écouteur d'événement lors du démontage du composant
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
}

export default function SideBar() {

    const {user} = useGlobalContext()

    const [publicCollections, setPublicCollections] = useState([])
    const [width, height] = useWindowSize();

    const [isShowing, setIsShowing] = useState(false)

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

        if (width > 400) {
            setIsShowing(true);
        } else {
            setIsShowing(false);
        }

        fetchCollections();
    }, [width]);
    
    const signOut = () => {
        localStorage.removeItem('userInfo');
        window.location.href = "/signin";
    }

    return (
        isShowing ? (
        <div id='sidebar'>
            
            <div className="sidebar__arrow" onClick={() => setIsShowing(false)}>
                <ArrowLeftToLine />
            </div>
            
            <h1 className={jomhuria.className + " sidebar__main-title"}>SpotShare</h1>

            <p className={jomolhari.className + " sidebar__username"}>
                <User />
                {user.user.full_name}
            </p>

            <h3 className={jomolhari.className + " sidebar__collections_title"}>Mes collections</h3>

            <AddCollectionForm />

            <CollectionContainer />

            <div id="sidebar__account_buttons">
                <Button className={jomolhari.className + " sidebar__account_signout"} variant="outline" onClick={signOut}>Se déconnecter</Button>
            </div>

        </div>
        )
        :
        (
            <div id="hamburger" onClick={() => setIsShowing(true)}>
                <Menu />
            </div>
        )
    )
}