import type { Metadata } from "next";
import { LegalPage, LegalSection, legalLink } from "@/components/legal/LegalPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site",
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
};

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales">
      <LegalSection title="Éditeur du site">
        <p>
          Le présent site est édité par l’agence web <strong>ZarogDev</strong>.
          <br />
          Email : <a href="mailto:zarogdev@gmail.com" className={legalLink}>contact@zarogdev.fr</a> — Site web :{" "}
          <a href="https://zarogdev.fr" className={legalLink}>zarogdev.fr</a>
        </p>
      </LegalSection>

      <LegalSection title="Directeur de la publication">
        <p>ZarogDev.</p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
      </LegalSection>

      <LegalSection title="Conception & développement">
        <p>
          ZarogDev — Agence digitale — design &amp; développement signés ZarogDev.{" "}
          <a href="mailto:zarogdev@gmail.com" className={legalLink}>contact@zarogdev.fr</a>
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          La structure générale du site, ainsi que les textes, graphiques, images, sons et vidéos la composant, sont la
          propriété de l’éditeur ou de ses partenaires. Toute représentation, reproduction ou exploitation partielle ou
          totale des contenus du site, par quelque procédé que ce soit, sans l’autorisation préalable et écrite de
          l’éditeur et/ou de ses partenaires est strictement interdite et serait susceptible de constituer une
          contrefaçon au sens des articles L 335-2 et suivants du Code de la propriété intellectuelle.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
