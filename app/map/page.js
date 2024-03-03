"use client"

import map_marker from "@/public/map_marker.png";
import { jomhuria, jomolhari } from "@/config/fonts";
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet"
import { useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import AddMarkerForm from "@/components/AddMarkerForm";
import SideBar from "@/components/SideBar";
import UpdateMarkerForm from "@/components/UpdateMarkerForm";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

import { spotshare_api_url } from "@/config/api";
import { MyGlobalContext } from "@/config/GlobalContext";
import CollectionName from "@/components/CollectionName";


const LocationFinderDummy = ({ setOpen, setLatLng }) => {
    const map = useMapEvents({
        click(e) {
            //console.log(e.latlng);
            setLatLng(e.latlng);
            setOpen(true);
        },
    });
    return null;
};

export default function Map() {

    const [open, setOpen] = useState(false);
    const [infosOpen, setInfosOpen] = useState(false);
    const [latlng, setLatLng] = useState({})
    const [user, setUser] = useState(null)

    const [collections, setCollections] = useState([]);
    const [publicCollections, setPublicCollections] = useState([])

    const [selectedCollection, setSelectedCollection] = useState(1)
    const [selectedCollectionData, setSelectedCollectionData] = useState({})

    const [markers, setMarkers] = useState([])

    const [selectedMarker, setSelectedMarker] = useState({})

    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Fonction asynchrone pour charger les collections publiques
    const fetchPublicCollections = async () => {
        try {
            const response = await fetch(`${spotshare_api_url}/users/0/collections`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const data = await response.json();
            setPublicCollections(data.data); // Mise à jour de l'état avec les collections publiques
        } catch (error) {
            console.error("Erreur lors du chargement des collections publiques:", error);
        }
    };

    // Fonction asynchrone pour charger les collections de l'utilisateur
    const fetchUserCollections = async (userId) => {
        try {
            const response = await fetch(`${spotshare_api_url}/users/${userId}/collections`);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const data = await response.json();
            setCollections(data.data); // Mise à jour de l'état avec les collections de l'utilisateur
        } catch (error) {
            console.error("Erreur lors du chargement des collections de l'utilisateur:", error);
        }
    };

    const fetchMarkersFromCollection = async (collection_id) => {

        try {
            const response = await fetch(`${spotshare_api_url}/collections/${collection_id}/markers`);

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            setMarkers(data.data);
        } catch (error) {
            console.error("Erreur lors du chargement des marqueurs:", error);
        }
    }

    useEffect(() => {
        // Récupération et mise à jour des informations de l'utilisateur depuis localStorage
        const userInfoString = localStorage.getItem('userInfo');

        if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            setUser(userInfo); // Mise à jour de l'état avec les informations de l'utilisateur

            // Chargement des collections de l'utilisateur si l'ID est disponible
            if (userInfo.user && userInfo.user.id) {
                fetchUserCollections(userInfo.user.id).then(() => setIsLoading(false));
            } else {
                setIsLoading(false); // Si pas d'ID utilisateur, on arrête le chargement ici
            }
        } else {
            setIsLoading(false); // Si pas d'informations utilisateur, on arrête le chargement ici
            router.push("/signin")
        }

        // Chargement des collections publiques indépendamment des informations utilisateur
        fetchPublicCollections();
        fetchMarkersFromCollection(selectedCollection);
    }, [selectedCollection, router]);

    if (isLoading) {
        return <Loading />;
    }

    const position = [16.256656, -61.547448]; // Latitude et longitude de l'emplacement initial de la carte

    const bddIcon = L.icon({
        //iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/1428px-Google_Maps_icon_%282020%29.svg.png',
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25613.png',
        iconSize: [25, 30],
        iconAnchor: [2.5, 5],
        popupAnchor: [0, -3],
    });

    return (
        <div id="map">
            <MyGlobalContext.Provider value={{
                publicCollections, setPublicCollections,
                user, setUser,
                collections, setCollections,
                fetchUserCollections, fetchMarkersFromCollection,
                selectedCollection, setSelectedCollection,
                selectedMarker, setSelectedMarker
            }}>

                <SideBar />

                <AddMarkerForm open={open} setOpen={setOpen} latlng={latlng} style={{ zIndex: "1000" }} />
                <UpdateMarkerForm open={infosOpen} setOpen={setInfosOpen} style={{ zIndex: "1000" }} />

                <div className="map_container">

                    <CollectionName />

                    <MapContainer center={position} zoom={11} zoomControl={false} style={{ height: '100%', width: '100%', zIndex: "1" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        />
                        <ZoomControl position="bottomleft" />
                        <LocationFinderDummy setOpen={setOpen} setLatLng={setLatLng} />

                        {
                            markers.map((marker, index) => (
                                <Marker
                                    key={index}
                                    position={[marker.latitude, marker.longitude]} icon={bddIcon}
                                    eventHandlers={{
                                        click: (e) => {
                                            setInfosOpen(true)
                                            setSelectedMarker(marker)
                                        },
                                    }}>
                                </Marker>
                            ))
                        }
                    </MapContainer>
                </div>
            </MyGlobalContext.Provider>
        </div>
    )
}