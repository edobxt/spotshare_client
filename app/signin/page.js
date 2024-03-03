'use client'

import { jomhuria, jomolhari } from "@/config/fonts";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";

import { spotshare_api_url } from "@/config/api";

import Loading from "@/components/Loading";

import { useRouter } from "next/navigation"; // Importation de useRouter

export default function Signin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)

    const [isLoading, setIsLoading] = useState(true); // État pour le chargement

    const router = useRouter(); // Utilisation de useRouter

    useEffect(() => {
        // Assurez-vous que le composant est monté avant d'exécuter la logique de redirection
        if (typeof window !== "undefined") {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                router.push('/map');
            } else {
                setIsLoading(false); // Arrête l'affichage du chargement si userInfo n'est pas trouvé
            }
        }
    }, [router]);

    if (isLoading) {
        // Affichage du composant de chargement tant que isLoading est true
        return <Loading />;
    }

    const handleData = () => {
        setErrorEmail(false); // Réinitialiser les erreurs

        if (!email || !password) {
            // Gérer le cas où un ou plusieurs champs sont vides
            console.error('Tous les champs doivent être remplis.');
            setErrorEmail(true); // Vous pouvez choisir de définir un état différent pour cette erreur si nécessaire
            return;
        }

        // Préparation de la requête
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mail: email,
                password: password
            })
        };

        fetch(`${spotshare_api_url}/users/login`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Une erreur est survenue');
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('userInfo', JSON.stringify(data))
                window.location.href = '/map';
            })
            .catch((error) => {
                console.error('Erreur lors de la connexion de l’utilisateur:', error);
                setErrorEmail(true);
            })
    }

    return (
        <div id="signin" className="page">
            <div className="home__circle top"></div>

            <div>
                <h1 className={jomhuria.className + " signin__main-title main-title"}>SpotShare</h1>
                <p className={jomolhari.className + " signin__sub-title sub-title"}>
                    Nous sommes heureux de vous revoir.
                </p>
            </div>

            {errorEmail && <p className="error-message">Une erreur est survenue avec l&apos;email ou le mot de passe.</p>}

            <div className={jomolhari.className + " form-row"}>
                <div className="form-group">
                    <Label>Adresse email :</Label>
                    <Input type="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <Label>Mot de passe :</Label>
                    <Input type="password" onChange={e => setPassword(e.target.value)} />
                </div>
            </div>

            <div className={jomolhari.className + " form-buttons"}>
                <Link href={"/signup"} className="form-button"><Button style={{ backgroundColor: "#000" }}>Je n&apos;ai pas de compte</Button></Link>
                <Button variant="outline" className="form-button" onClick={handleData}>Me connecter</Button>
            </div>
        </div>
    )
}