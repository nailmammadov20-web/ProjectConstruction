export type LegalSection = {
  heading: string;
  body: string[];
};

export function LegalContent({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <article className="section-padding pt-36">
      <div className="container-narrow">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-bold text-foreground">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph, index) => (
                  <p key={index} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
