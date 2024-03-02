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

export default function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
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

    // Gestion de la soumission des données
    const handleData = () => {
        setErrorEmail(false); // Réinitialiser les erreurs
        setErrorPassword(false);

        if (!name || !email || !password || !confirmPassword) {
            // Gérer le cas où un ou plusieurs champs sont vides
            console.error('Tous les champs doivent être remplis.');
            setErrorEmail(true); // Vous pouvez choisir de définir un état différent pour cette erreur si nécessaire
            return;
        }

        if (password !== confirmPassword) {
            console.error('Les mots de passe ne correspondent pas.');
            setErrorPassword(true);
            return;
        }

        // Préparation de la requête
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full_name: name,
                mail: email,
                password: password
            })
        };

        // Envoi de la requête
        fetch(`${spotshare_api_url}/users/signup`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Une erreur est survenue');
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('userInfo', JSON.stringify(data));
                window.location.href = '/map';
            })
            .catch(error => {
                console.error('Erreur lors de la création de l’utilisateur:', error);
                setErrorEmail(true);
            });
    };

    return (
        <div id="signup" className="page">
            <div>
                <h1 className={jomhuria.className + " signup__main-title main-title"}>SpotShare</h1>
                <p className={jomolhari.className + " signup__sub-title sub-title"}>
                    Bienvenue dans votre lieu de partage.
                </p>
            </div>

            {errorEmail && <p className="error-message">Une erreur est survenue avec l&apos;email.</p>}
            {errorPassword && <p className="error-message">Les mots de passe ne correspondent pas.</p>}

            <div className={jomolhari.className + " form-row"}>
                <div className="form-group">
                    <Label>Nom complet :</Label>
                    <Input onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <Label>Adresse email :</Label>
                    <Input type="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <Label>Mot de passe :</Label>
                    <Input type="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <Label>Confirmation du mot de passe :</Label>
                    <Input type="password" onChange={e => setConfirmPassword(e.target.value)} />
                </div>
            </div>

            <div className={jomolhari.className + " form-buttons"}>
                <Link href={"/signin"} className="form-button"><Button style={{ backgroundColor: "#000" }}>J&apos;ai déjà un compte</Button></Link>
                <Button variant="outline" className="form-button" onClick={handleData}>M&apos;inscrire</Button>
            </div>
        </div>
    )
}