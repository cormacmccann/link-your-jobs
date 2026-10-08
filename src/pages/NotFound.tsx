import { Link } from "@/lib/router-compat";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => { document.title = "Page Not Found | KAMROK"; }, []);
  return (
    <section className="studio-container py-20 min-h-[50vh]">
      <p className="text-sm text-muted-foreground mb-5">404</p>
      <h1 className="text-4xl mb-5">This page isn’t here.</h1>
      <p className="text-muted-foreground mb-8">Take a look at our work, or head back to the moon.</p>
      <Link to="/work" className="studio-contact">View the work ↗</Link>
    </section>
  );
}
