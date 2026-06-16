const faqs = [
  {
    question: "Où trouver les romans de Nabil Louaar ?",
    answer:
      "Ses romans sont disponibles en librairie et en ligne. Les titres publiés chez P.O.L. et Actes du Sud sont distribués dans toutes les librairies francophones. « Les Saisons renversées » est en 7ᵉ tirage.",
  },
  {
    question: "Comment contacter Nabil Louaar pour la presse ?",
    answer:
      "Pour les demandes presse, écrire à presse@louaar.fr. Pour les demandes liées aux droits, à la traduction ou aux festivals, contacter l'agence Mercier & Loup à l'adresse c.mercier@m-l.fr.",
  },
  {
    question: "Où voir les films de Nabil Louaar ?",
    answer:
      "Ses courts métrages sont disponibles sur la plateforme Arte et dans les festivals internationaux. Certains films ont été sélectionnés au Festival de Cannes et au Locarno International Film Festival. Consultez la section Vidéo du site pour le catalogue complet.",
  },
  {
    question: "Enseigne-t-il l'écriture scénaristique ?",
    answer:
      "Oui, Nabil Louaar enseigne occasionnellement l'écriture scénaristique à La Fémis (École nationale supérieure des métiers de l'image et du son), à Paris.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="bg-[var(--color-paper)] border-t border-[var(--color-rule)]
                 px-[clamp(28px,6vw,120px)] py-[clamp(80px,9vw,130px)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1640px] mx-auto">
        <div className="mb-[clamp(40px,5vw,70px)]">
          <span className="block font-mono text-[11px] tracking-[.18em] uppercase text-[var(--color-soft)] mb-5">
            Questions fréquentes
          </span>
          <h2 className="font-serif font-normal text-[clamp(36px,4vw,64px)] leading-[1.05] tracking-[-0.01em]">
            Pour en <em className="italic font-light text-[#3a3a35]">savoir plus</em>
          </h2>
        </div>

        <dl className="max-w-[900px] divide-y divide-[var(--color-rule)]">
          {faqs.map(({ question, answer }) => (
            <div key={question} className="py-[clamp(24px,3vw,38px)]">
              <dt className="font-serif text-[clamp(18px,1.6vw,24px)] text-[var(--color-ink)] mb-3 leading-[1.3]">
                {question}
              </dt>
              <dd className="font-serif text-[17px] leading-[1.6] text-[#3a3a35] max-w-[72ch]">
                {answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
