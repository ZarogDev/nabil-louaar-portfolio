import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection, legalLink } from "@/components/legal/LegalPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales d’utilisation",
  description: "Conditions générales d’utilisation du site de Nabil Louaar.",
  alternates: { canonical: `${SITE_URL}/cgu` },
};

export default function CGU() {
  return (
    <LegalPage title="Conditions générales d’utilisation">
      <p className="text-[15px] leading-[1.7] text-[var(--color-ink)]/80 mb-10">
        En vigueur au 12 octobre 2026. L’utilisation du site vaut acceptation des présentes conditions.
      </p>

      <LegalSection title="Objet">
        <p>
          Ce site présente le travail de Nabil Louaar (filmographie, extraits, actualités) et permet de s’inscrire à
          sa lettre saisonnière. Il est gratuit, sans création de compte public et sans vente en ligne.
        </p>
      </LegalSection>

      <LegalSection title="Accès au site">
        <p>
          Le site est accessible gratuitement à toute personne disposant d’un accès à Internet. L’éditeur s’efforce
          d’en assurer la disponibilité, sans obligation de résultat ; l’accès peut être interrompu pour maintenance
          ou en cas de force majeure.
        </p>
      </LegalSection>

      <LegalSection title="Lettre saisonnière">
        <p>
          L’inscription est libre et gratuite ; vous vous engagez à fournir une adresse e-mail dont vous êtes
          titulaire. La désinscription est possible à tout moment. Le traitement de votre adresse est décrit dans la{" "}
          <Link href="/politique-confidentialite" className={legalLink}>politique de confidentialité</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          Les œuvres et contenus présentés sont protégés par le droit d’auteur. Ils sont mis à disposition pour une
          consultation privée uniquement ; toute autre utilisation (reproduction, diffusion, extraction) requiert
          l’autorisation écrite de Nabil Louaar ou des ayants droit concernés.
        </p>
      </LegalSection>

      <LegalSection title="Comportement de l’utilisateur">
        <p>
          Vous vous engagez à ne pas perturber le fonctionnement du site (inscriptions automatisées, tentatives
          d’intrusion, collecte automatisée de contenus).
        </p>
      </LegalSection>

      <LegalSection title="Liens externes">
        <p>
          Les liens vers des sites tiers (plateformes vidéo, presse, réseaux) sont fournis à titre d’information ;
          l’éditeur n’est pas responsable de leurs contenus ni de leurs pratiques en matière de données.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          Les informations publiées le sont de bonne foi et peuvent évoluer. L’éditeur ne saurait être tenu
          responsable d’une indisponibilité temporaire du site ni d’un dommage résultant d’un usage non conforme.
        </p>
      </LegalSection>

      <LegalSection title="Modification">
        <p>
          Les présentes conditions peuvent être modifiées pour suivre l’évolution du site ; la version applicable est
          celle en ligne au moment de votre visite.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>
          Les présentes conditions sont soumises au droit français. En cas de litige, une solution amiable sera
          recherchée avant toute action ; à défaut, les juridictions françaises compétentes seront saisies. Contact :{" "}
          <a href="mailto:presse@louaar.fr" className={legalLink}>presse@louaar.fr</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
