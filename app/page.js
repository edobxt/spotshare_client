import { jomhuria, jomolhari } from "./config/fonts";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main id="home">
      <h1 className={jomhuria.className + " home__main-title"}>SpotShare</h1>

      <p className={jomolhari.className + " home__sub-title"}>
        Vos endroits secrets deviennet des souvenirs partagés.
      </p>

      <Button className={jomolhari.className + " home__button"} variant="secondary">Démarrer l&apos;expérience</Button>

    </main>
  );
}
