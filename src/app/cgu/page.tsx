import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales d’utilisation",
  description: "Conditions générales d’utilisation (CGU)",
  alternates: { canonical: `${SITE_URL}/cgu` },
};

export default function CGU() {
  return (
    <LegalPage title="Conditions générales d’utilisation">
      <LegalSection title="Objet">
        <p>Les présentes Conditions Générales d’Utilisation ont pour objet de définir les modalités de mise à disposition des services du site et les conditions d’utilisation par l’utilisateur.</p>
      </LegalSection>

      <LegalSection title="Accès au site">
        <p>L’éditeur s’efforce de permettre l’accès au site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d’un événement hors de son contrôle, et sous réserve des éventuelles pannes et interventions de maintenance nécessaires au bon fonctionnement du site et des services.</p>
      </LegalSection>

      <LegalSection title="Responsabilité de l’utilisateur">
        <p>L’utilisateur est seul responsable de l’utilisation qu’il fait des informations et services disponibles sur le site. Il s’engage à n’effectuer aucune action pouvant nuire au bon fonctionnement du site.</p>
      </LegalSection>

      <LegalSection title="Modification des CGU">
        <p>L’éditeur se réserve le droit de modifier, à tout moment et sans préavis, les présentes conditions d’utilisation afin de les adapter aux évolutions du site et/ou de son exploitation.</p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>Tant le présent site que les modalités et conditions de son utilisation sont régis par le droit français, quel que soit le lieu d’utilisation. En cas de contestation éventuelle, et après l’échec de toute tentative de recherche d’une solution amiable, les tribunaux français seront seuls compétents pour connaître de ce litige.</p>
      </LegalSection>
    </LegalPage>
  );
}
