import type { Metadata } from "next";
import { LegalPage, LegalSection, legalLink } from "@/components/legal/LegalPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données",
  alternates: { canonical: `${SITE_URL}/politique-confidentialite` },
};

export default function PolitiqueConfidentialite() {
  return (
    <LegalPage title="Politique de confidentialité">
      <LegalSection title="Collecte des données personnelles">
        <p>Nous pouvons recueillir des informations personnelles telles que votre nom, votre adresse e-mail, etc. Ces informations sont collectées lorsque vous utilisez nos formulaires de contact ou nos services en ligne.</p>
      </LegalSection>

      <LegalSection title="Utilisation des données">
        <p>Les données collectées sont utilisées uniquement pour :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Vous fournir les services demandés.</li>
          <li>Répondre à vos demandes de contact.</li>
          <li>Améliorer l’expérience utilisateur de notre site.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Protection des données">
        <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre l’accès, la modification, la divulgation ou la destruction non autorisés.</p>
      </LegalSection>

      <LegalSection title="Partage des données">
        <p>Nous ne vendons, n’échangeons ni ne louons vos données personnelles à des tiers. Nous pouvons partager des informations avec des prestataires de services de confiance pour nous aider à exploiter notre site Web ou mener nos affaires, tant que ces parties acceptent de garder ces informations confidentielles.</p>
      </LegalSection>

      <LegalSection title="Vos droits (RGPD)">
        <p>Conformément à la réglementation européenne en vigueur (RGPD), vous disposez des droits suivants concernant vos données personnelles :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Droit d’accès et de rectification.</li>
          <li>Droit d’effacement de vos données.</li>
          <li>Droit de retirer votre consentement à tout moment.</li>
        </ul>
        <p>
          Pour exercer ces droits, veuillez nous contacter à l’adresse suivante :{" "}
          <a href="mailto:zarogdev@gmail.com" className={legalLink}>contact@zarogdev.fr</a>.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>Notre site utilise des cookies pour améliorer votre expérience. Un bandeau de consentement vous permet d’accepter ou de refuser ces cookies lors de votre première visite.</p>
      </LegalSection>
    </LegalPage>
  );
}
