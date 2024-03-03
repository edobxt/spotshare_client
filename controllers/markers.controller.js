import { spotshare_api_url } from "@/config/api";

export const addMarker = async (name, description, collection_id, location, longitude, latitude) => {

    // Préparation de la requête
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            description: description,
            collection_id: collection_id,
            location: location,
            longitude: `${longitude}`,
            latitude: `${latitude}`
        })
    };

    fetch(`${spotshare_api_url}/markers`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Une erreur est survenue');
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la création du marqueur', error);
        })

}

export const deleteMarker = async (marker_id) => {
    // Préparation de la requête
    const requestOptions = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    };

    fetch(`${spotshare_api_url}/markers/${marker_id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Une erreur est survenue');
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la suppression du marqueur', error);
        })
}

export const updateMarker = async (name, description, marker_id) => {

    // Préparation de la requête
    const requestOptions = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            description: description,
        })
    };

    fetch(`${spotshare_api_url}/markers/${marker_id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Une erreur est survenue');
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la création du marqueur', error);
        })

}