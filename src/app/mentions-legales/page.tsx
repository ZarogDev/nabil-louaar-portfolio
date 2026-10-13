import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection, legalLink } from "@/components/legal/LegalPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site de Nabil Louaar (LCEN, art. 1-1).",
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
};

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales">
      <LegalSection title="Éditeur du site">
        <p>
          Le présent site est le portfolio personnel de <strong>Nabil Louaar</strong>, qui en est l’éditeur.
        </p>
        <p>
          Statut : [À COMPLÉTER : artiste-auteur / entreprise individuelle / particulier non professionnel]
          <br />
          SIREN / SIRET : [À COMPLÉTER, si activité professionnelle déclarée]
          <br />
          Adresse : [À COMPLÉTER]
          <br />
          Téléphone : [À COMPLÉTER]
          <br />
          E-mail : <a href="mailto:presse@louaar.fr" className={legalLink}>presse@louaar.fr</a>
        </p>
        <p className="text-[13px]">
          Si l’éditeur agit à titre non professionnel, il peut, conformément à l’article 1-1 II de la LCEN, ne tenir à
          la disposition du public que le nom de l’hébergeur, ses coordonnées personnelles ayant alors été communiquées
          à celui-ci.
        </p>
        <p className="text-[13px]">
          Informations publiées en application de l’article 1-1 de la loi n° 2004-575 du 21 juin 2004 pour la confiance
          dans l’économie numérique (LCEN). Site : <a href={SITE_URL} className={legalLink}>{SITE_URL.replace("https://", "")}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Directeur de la publication">
        <p>Nabil Louaar.</p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          <br />
          Contact : <a href="https://vercel.com/help" className={legalLink} rel="noopener noreferrer" target="_blank">https://vercel.com/help</a>
        </p>
      </LegalSection>

      <LegalSection title="Conception & développement">
        <p>
          ZarogDev — Agence digitale — design &amp; développement signés ZarogDev. Saabri EL HALOUI, entrepreneur
          individuel (EI), 25 rue de Warens, 73000 Chambéry, France. Téléphone : 06 52 26 82 75 — e-mail :{" "}
          <a href="mailto:zarogdev@gmail.com" className={legalLink}>contact@zarogdev.fr</a> — site :{" "}
          <a href="https://zarogdev.fr" className={legalLink} target="_blank" rel="noopener noreferrer">zarogdev.fr</a>.
        </p>
        <p className="text-[13px]">
          ZarogDev intervient comme prestataire technique et n’est pas l’éditeur du site ni responsable de ses contenus.
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          Les œuvres, textes, photographies, extraits vidéo et éléments graphiques présentés sur ce site sont la
          propriété de Nabil Louaar ou de leurs ayants droit respectifs (producteurs, coauteurs, photographes). Toute
          reproduction, représentation ou exploitation, totale ou partielle, sans autorisation écrite préalable est
          interdite et constitue une contrefaçon sanctionnée par les articles L. 335-2 et suivants du Code de la
          propriété intellectuelle.
        </p>
      </LegalSection>

      <LegalSection title="Signalement d’un contenu">
        <p>
          Tout contenu que vous estimez illicite peut être signalé à{" "}
          <a href="mailto:presse@louaar.fr" className={legalLink}>presse@louaar.fr</a> en précisant l’adresse de la
          page concernée, la nature du contenu et les motifs du signalement.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Voir la <Link href="/politique-confidentialite" className={legalLink}>politique de confidentialité</Link> et
          la section <Link href="/politique-confidentialite#cookies" className={legalLink}>cookies</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
