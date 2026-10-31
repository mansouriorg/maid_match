import type { Metadata } from "next";
import Link from "next/link";
import { business, shown } from "@/lib/business";

export const metadata: Metadata = {
  title: "Mentions l\u00e9gales",
  description: "\u00c9diteur du site, h\u00e9bergeur et contact.",
};

function Row({
  label,
  value,
  optional = false,
}: {
  label: string;
  value: string;
  optional?: boolean;
}) {
  const missing = value.trim() === "";
  if (optional && missing) {
    return null;
  }
  return (
    <div className="grid gap-1 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-slate-900">{label}</dt>
      <dd className={missing ? "text-amber-700 sm:col-span-2" : "text-slate-700 sm:col-span-2"}>
        {shown(value)}
      </dd>
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

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            &Eacute;diteur du site
          </h2>
          <dl className="space-y-3 text-sm">
            <Row label="Nom ou raison sociale" value={business.name} />
            <Row label="Forme juridique" value={business.legalForm} />
            <Row label="Adresse" value={business.address} />
            <Row label="E-mail" value={business.email} />
            <Row label={"T\u00e9l\u00e9phone"} value={business.phone} />
            <Row label="SIREN ou SIRET" value={business.registration} />
            <Row
              label="TVA intracommunautaire"
              value={business.vatNumber}
              optional
            />
            <Row
              label="Directeur de la publication"
              value={business.publicationDirector}
            />
          </dl>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            H&eacute;bergeur
          </h2>
          <dl className="space-y-3 text-sm">
            <Row label="Nom" value={business.hostName} />
            <Row label="Adresse" value={business.hostAddress} />
          </dl>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Donn&eacute;es personnelles
          </h2>
          <p className="text-slate-700">
            Pour savoir comment vos informations sont utilis&eacute;es, consultez
            notre{" "}
            <Link href="/privacy" className="font-medium text-teal-700 underline">
              politique de confidentialit&eacute;
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
