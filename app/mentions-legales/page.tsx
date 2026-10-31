import type { Metadata } from "next";
import Link from "next/link";
import { DEMO_MODE, publisher } from "@/lib/business";

export const metadata: Metadata = {
  title: "Mentions l\u00e9gales",
  description: "\u00c9diteur du site, h\u00e9bergeur et contact.",
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-slate-900">{label}</dt>
      <dd className="text-slate-700 sm:col-span-2">{children}</dd>
    </div>
  );
}

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <Link
            href="/"
            className="text-sm font-medium text-teal-700 hover:underline"
          >
            &larr; Retour &agrave; l&rsquo;accueil
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Mentions l&eacute;gales
          </h1>
        </div>

        {DEMO_MODE && (
          <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <h2 className="font-semibold">Projet de d&eacute;monstration</h2>
            <p className="mt-1">
              MaidMatch est un projet de portfolio r&eacute;alis&eacute; par{" "}
              {publisher.name}. Ce n&rsquo;est pas une entreprise : aucune
              prestation de m&eacute;nage n&rsquo;est propos&eacute;e ni vendue,
              et les demandes envoy&eacute;es depuis ce site ne sont pas
              trait&eacute;es.
            </p>
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            &Eacute;diteur du site
          </h2>
          <dl className="space-y-3 text-sm">
            <Row label="Nom">{publisher.name}</Row>
            <Row label="Statut">
              {DEMO_MODE
                ? "Projet personnel de d\u00e9monstration, sans activit\u00e9 commerciale"
                : "Voir les informations de l\u2019entreprise"}
            </Row>
            <Row label="Contact">
              <a
                href={publisher.contactUrl}
                className="font-medium text-teal-700 hover:underline"
              >
                {publisher.contactLabel}
              </a>
            </Row>
            <Row label="Directeur de la publication">{publisher.name}</Row>
          </dl>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            H&eacute;bergement
          </h2>
          <p className="text-sm text-slate-700">
            {publisher.hostName === ""
              ? "Le site n\u2019est pas encore h\u00e9berg\u00e9 publiquement."
              : `${publisher.hostName}, ${publisher.hostAddress}`}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Code source
          </h2>
          <p className="text-sm text-slate-700">
            Le code de ce projet est consultable sur{" "}
            <a
              href={publisher.sourceUrl}
              className="font-medium text-teal-700 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </section>

        <p className="text-sm text-slate-600">
          Voir aussi la{" "}
          <Link
            href="/privacy"
            className="font-medium text-teal-700 hover:underline"
          >
            politique de confidentialit&eacute;
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
