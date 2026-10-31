import Link from "next/link";
import { DEMO_MODE } from "@/lib/business";

// Shown at the top of every page while the site is a portfolio demo.
export function DemoBanner() {
  if (DEMO_MODE === false) {
    return null;
  }
  return (
    <div
      role="note"
      className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-900"
    >
      <strong className="font-semibold">Projet de d&eacute;monstration</strong>{" "}
      &ndash; aucune prestation r&eacute;elle n&rsquo;est propos&eacute;e.
      N&rsquo;entrez pas de vraies donn&eacute;es personnelles.{" "}
      <Link href="/mentions-legales" className="font-medium underline">
        En savoir plus
      </Link>
    </div>
  );
}
