type PageHeroProps = {
  eyebrow: string;
  title: string;
  outline: string;
  description: string;
  index: string;
};

export function PageHero({ eyebrow, title, outline, description, index }: PageHeroProps) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="page-hero__grid" aria-hidden="true" />
      <div className="page-hero__orb" aria-hidden="true" />
      <div className="shell page-hero__content">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="page-title">{title} <span>{outline}</span></h1>
          <p>{description}</p>
        </div>
        <div className="page-hero__index" aria-hidden="true"><span>0{index}</span><i /><em>DJ_SKY_STYLE</em></div>
      </div>
    </section>
  );
}
