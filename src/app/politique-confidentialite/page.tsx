import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection, legalLink } from "@/components/legal/LegalPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Données personnelles traitées sur le site de Nabil Louaar, cookies et droits RGPD.",
  alternates: { canonical: `${SITE_URL}/politique-confidentialite` },
};

export default function PolitiqueConfidentialite() {
  return (
    <LegalPage title="Politique de confidentialité">
      <p className="text-[15px] leading-[1.7] text-[var(--color-ink)]/80 mb-10">
        Dernière mise à jour : 12 octobre 2026. Cette page vous informe, conformément à l’article 13 du règlement
        (UE) 2016/679 (RGPD), sur les données personnelles traitées lorsque vous consultez ce site.
      </p>

      <LegalSection title="Responsable du traitement">
        <p>
          Nabil Louaar, éditeur du site (voir les <Link href="/mentions-legales" className={legalLink}>mentions légales</Link>).
          Contact pour toute question relative à vos données :{" "}
          <a href="mailto:presse@louaar.fr" className={legalLink}>presse@louaar.fr</a>.
        </p>
      </LegalSection>

      <LegalSection title="1. Lettre saisonnière (newsletter)">
        <p>
          <strong>Données :</strong> votre adresse e-mail et la date d’inscription.
          <br />
          <strong>Finalité :</strong> vous envoyer la lettre saisonnière (nouvelles, projections à venir).
          <br />
          <strong>Base légale :</strong> votre consentement (art. 6.1.a RGPD), exprimé en saisissant votre adresse et
          en cliquant sur « S’abonner ». Vous pouvez le retirer à tout moment.
          <br />
          <strong>Durée :</strong> jusqu’à votre désinscription, et au plus 3 ans après le dernier contact de votre
          part ; l’adresse est alors supprimée.
          <br />
          <strong>Désinscription :</strong> sur simple e-mail à{" "}
          <a href="mailto:presse@louaar.fr" className={legalLink}>presse@louaar.fr</a>.
        </p>
      </LegalSection>

      <LegalSection title="2. Protection contre les abus">
        <p>
          Pour empêcher les inscriptions automatisées, l’adresse IP de l’appareil est utilisée de façon temporaire
          (5 inscriptions au plus par période de 15 minutes). Base légale : intérêt légitime à sécuriser le site
          (art. 6.1.f RGPD). Durée : 15 minutes, puis effacement automatique.
        </p>
      </LegalSection>

      <LegalSection title="3. Journaux techniques et espace d’administration">
        <p>
          L’hébergeur enregistre des journaux techniques (adresse IP, date, page demandée, navigateur) nécessaires au
          fonctionnement et à la sécurité du service, pour une durée courte fixée par lui. L’espace d’administration,
          réservé à l’éditeur, utilise un cookie de session sécurisé valable 8 heures.
        </p>
      </LegalSection>

      <LegalSection title="Destinataires et sous-traitants">
        <ul className="list-disc pl-6 space-y-1">
          <li>Vercel Inc. (États-Unis) : hébergement du site.</li>
          <li>Neon Inc. : base de données des inscrits à la newsletter (région d’hébergement : [À COMPLÉTER]).</li>
          <li>Upstash Inc. : limitation du nombre de requêtes (adresse IP, 15 minutes).</li>
        </ul>
        <p>
          Vos données ne sont ni vendues, ni louées, ni utilisées à des fins publicitaires. Seuls Nabil Louaar et son
          prestataire technique (ZarogDev, pour la maintenance) peuvent y accéder.
        </p>
      </LegalSection>

      <LegalSection title="Transferts hors de l’Union européenne">
        <p>
          Certains prestataires sont établis aux États-Unis. Les transferts sont encadrés par le cadre de protection
          des données UE–États-Unis (Data Privacy Framework, décision d’adéquation du 10 juillet 2023) lorsque le
          prestataire y est certifié, ou à défaut par les clauses contractuelles types de la Commission européenne.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de
          portabilité, ainsi que du droit de retirer votre consentement à tout moment et de définir des directives
          relatives au sort de vos données après votre décès. Pour les exercer, écrivez à{" "}
          <a href="mailto:presse@louaar.fr" className={legalLink}>presse@louaar.fr</a> ; une réponse vous sera
          apportée dans un délai d’un mois.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL, 3 place de Fontenoy, TSA 80715, 75334
          Paris Cedex 07 —{" "}
          <a href="https://www.cnil.fr" className={legalLink} rel="noopener noreferrer" target="_blank">www.cnil.fr</a>.
        </p>
      </LegalSection>

      <div id="cookies" className="scroll-mt-24">
        <LegalSection title="Cookies et traceurs">
          <p>
            Ce site n’utilise <strong>aucun cookie de mesure d’audience, publicitaire ou de réseau social</strong>.
            Les polices sont servies depuis le site lui-même, sans appel à un service tiers.
          </p>
          <p>
            Seuls des traceurs strictement nécessaires sont utilisés, dispensés de consentement (article 82 de la loi
            Informatique et Libertés) : le cookie de session de l’espace d’administration (8 heures), réservé à
            l’éditeur. C’est pourquoi aucun bandeau de consentement n’est affiché. Si un service soumis à
            consentement était ajouté, il ne serait activé qu’après votre accord, avec un refus aussi simple que
            l’acceptation.
          </p>
        </LegalSection>
      </div>

      <LegalSection title="Sécurité">
        <p>
          Le site est servi exclusivement en HTTPS, avec une politique de sécurité du contenu stricte ; l’accès à
          l’administration est protégé par mot de passe et limité en nombre de tentatives.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
