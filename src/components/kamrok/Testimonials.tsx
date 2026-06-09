// Real 5-star client reviews (Trustpilot). Names, dates and wording are the
// clients' own — lightly trimmed for length, never changed in meaning.
type Review = { name: string; org?: string; quote: string; date: string };

const REVIEWS: Review[] = [
  {
    name: "Seamus Grimes",
    quote:
      "Cormac has done an unbelievable job on our website. One month in and sales plus traffic have increased dramatically already. Extremely knowledgeable and very easy to deal with — I'd recommend him 100%.",
    date: "Oct 2024",
  },
  {
    name: "Richard",
    org: "On Yer Bike Carlingford",
    quote:
      "A new look & feel, more efficient integrations and better SEO — a well-conceived and efficiently executed project that met, indeed exceeded, my expectations.",
    date: "Jan 2022",
  },
  {
    name: "Niall",
    quote:
      "18 months in and we're still highly impressed at the quality of the work. No request is too big or too small. We'd recommend tapping into their brilliance.",
    date: "Oct 2024",
  },
  {
    name: "Hugh Murphy",
    org: "Carnivore Meats",
    quote:
      "Cormac was brilliant to deal with from day one. A fantastic website built in a short period — it's since helped us grow our business sales.",
    date: "May 2023",
  },
  {
    name: "Kevin Woods",
    quote:
      "We've used them before and we're back again for more — that speaks for itself. We were comfortable recommending them to two other companies.",
    date: "Feb 2023",
  },
  {
    name: "Michael Sweeney",
    quote:
      "Great to deal with from first enquiry to final hand-over. A great eye for detail, very responsive, and able to advise on best practices. Highly recommend.",
    date: "Oct 2024",
  },
  {
    name: "Anton Loughran",
    quote: "Top class service — couldn't recommend enough. Will be using again in the future.",
    date: "Oct 2024",
  },
  {
    name: "Primrose Lane Bakery",
    quote:
      "Excellent service. Very helpful and prompt with any changes, friendly to work with, and everything explained clearly.",
    date: "Jan 2022",
  },
];

export default function Testimonials() {
  return (
    <section className="kk-reviews">
      <h2 className="kk-sub">What clients say</h2>
      <p className="kk-reviews__rating">
        <span className="kk-review__stars" aria-hidden>★★★★★</span> Rated 5.0 — real reviews from real clients
      </p>
      <div className="kk-reviews__grid">
        {REVIEWS.map((r) => (
          <figure className="kk-review" key={r.name + r.date}>
            <span className="kk-review__stars" aria-label="Rated 5 out of 5 stars">★★★★★</span>
            <blockquote>{r.quote}</blockquote>
            <figcaption>
              <span className="kk-review__name">{r.name}</span>
              {r.org && <span className="kk-review__org">{r.org}</span>}
              <span className="kk-review__date">{r.date}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
