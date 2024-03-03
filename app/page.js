'use client'

import { jomhuria, jomolhari } from "@/config/fonts";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { spotshare_api_url } from "@/config/api";

export default function Home() {
  const router = useRouter(); // Utiliser useRouter pour la redirection
  const [loading, setLoading] = useState(false); // Gérer l'état de chargement

  useEffect(() => {
    // Vérifier si userInfo existe dans localStorage au chargement du composant
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      router.push('/map'); // Rediriger vers /map si userInfo existe
    }
  }, [router]);

  const handleButtonClick = async () => {
    const response = await fetch(`${spotshare_api_url}/markers`);
    const markers = await response.json();

    if (markers.length > 0) {
      // S'il existe des marqueurs, rediriger vers /signin
      router.push('/signin');
    } else {
      // S'il n'existe pas de marqueurs, faire une requête à /init
      await fetch(`${spotshare_api_url}/init`);
      setLoading(true); // Afficher le message de chargement

      setTimeout(() => {
        setLoading(false); // Fin du chargement après 3 secondes
        router.push('/signup'); // Rediriger vers /signup
      }, 3000); // Attendre 3 secondes
    }
  };

  return (
    <main id="home">
      <h1 className={jomhuria.className + " home__main-title"}>SpotShare</h1>

      {
        loading ? (
          <>
            <p className={jomolhari.className + " home__sub-title"}>
              Chargement des collections et des marqueurs...
            </p>
          </>)
          : (
            <>
              <p className={jomolhari.className + " home__sub-title"}>
                Vos endroits secrets deviennent des souvenirs partagés.
              </p>
              <Button className={jomolhari.className + " home__button"} variant="secondary" onClick={handleButtonClick}>Démarrer l&apos;expérience</Button>
            </>
          )
      }

      <div className="home__circle bottom"></div>

    </main>
  );
}
