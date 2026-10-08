import { useState } from "react";

const screens = [
  { id: "website", label: "The website", title: "A proper home for your food.", description: "Your brand, food photography and menu categories, with a clear route to the next order.", width: 1219, height: 894 },
  { id: "customer-menu", label: "Digital menu", title: "Make choosing the good stuff easy.", description: "Browse dishes by category, see prices and allergen information, then customise a favourite.", width: 1356, height: 887 },
  { id: "pizza-builder", label: "Pizza builder", title: "Their pizza. Their way.", description: "Whole or half-and-half, with choices for size, crust and toppings, plus a running order summary.", width: 1266, height: 890 },
  { id: "combo-deals", label: "Combo deals", title: "Turn dinner into a deal.", description: "Give pizza nights, family feasts and burger orders their own ready-to-choose bundles.", width: 1244, height: 725 },
  { id: "combo-builder", label: "Customise a combo", title: "One deal. All their favourites.", description: "Customers choose the dishes and sides in their bundle, with allergen preferences close to hand.", width: 1328, height: 887 },
  { id: "kitchen-dashboard", label: "Kitchen dashboard", title: "From the first ping to the doorstep.", description: "See new, preparing and ready orders together, with collection or delivery details and individual driver links.", width: 1495, height: 902 },
  { id: "menu-management", label: "Menu management", title: "Keep your menu in your hands.", description: "An owner workspace for your dishes, photography, descriptions and pricing.", width: 1488, height: 903 },
  { id: "pizza-controls", label: "Pizza controls", title: "Build the choices behind every pizza.", description: "Manage sizes, crusts, sauces, toppings and their prices from the owner workspace.", width: 1476, height: 900 },
  { id: "contact-inbox", label: "Contact inbox", title: "Keep customer enquiries close.", description: "A dedicated owner inbox for messages from your website, with message details and read status.", width: 1498, height: 906 },
];

export default function TakeawayShowcase() {
  const [selected, setSelected] = useState(0);
  const screen = screens[selected] ?? screens[0]!;
  return <section className="takeaway-showcase" aria-labelledby="showcase-title">
    <div className="takeaway-showcase-heading"><div><span className="takeaway-kicker">TAKE A LOOK INSIDE</span><h2 id="showcase-title">One hub.<br />Both sides of the counter.</h2></div><p>From choosing dinner to running the kitchen. Explore the customer experience and the owner workspace.</p></div>
    <div className="takeaway-screen-picker" role="group" aria-label="Choose a Takeaway Hub screenshot">{screens.map((item, index) => <button key={item.id} type="button" aria-pressed={index === selected} aria-controls="takeaway-screen" onClick={() => setSelected(index)}>{item.label}</button>)}</div>
    <figure id="takeaway-screen">
      <div className="takeaway-screen-image"><img src={`/templates/takeaway-hub/${screen.id}.webp`} alt={`${screen.label} — Takeaway Hub sample design`} width={screen.width} height={screen.height} loading="lazy" /></div>
      <figcaption aria-live="polite"><div><span>{String(selected + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}</span><h3>{screen.title}</h3><p>{screen.description}</p></div><small>Template design previews with fictional sample content. Owner controls shown in read-only preview mode.</small></figcaption>
    </figure>
  </section>;
}
