# Architecture rules

- Keep client-side route social metadata synchronized when lazy pages update their title or description, not only on a fixed timer; slow route loading must not leave the previous page's preview tags behind.
- Treat static `index.html` social tags as the fallback for non-JavaScript crawlers; client-side route tags do not provide route-specific Facebook, LinkedIn or WhatsApp previews.