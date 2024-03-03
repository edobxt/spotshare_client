import { spotshare_api_url } from "@/config/api";

export const updateCollection = async (name, color, marker_id) => {

    // Préparation de la requête
    const requestOptions = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            color: color,
        })
    };

    fetch(`${spotshare_api_url}/collections/${marker_id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Une erreur est survenue');
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la création du marqueur', error);
        })

}