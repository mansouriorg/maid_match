import type { Metadata } from "next";
import Link from "next/link";
import { DEMO_MODE, publisher } from "@/lib/business";

export const metadata: Metadata = {
  title: "Politique de confidentialit\u00e9",
  description: "Les donn\u00e9es du formulaire de r\u00e9servation et leur usage.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-8 text-sm text-slate-700">
        <div>
          <Link
            href="/"
            className="text-sm font-medium text-teal-700 hover:underline"
          >
            &larr; Retour &agrave; l&rsquo;accueil
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Politique de confidentialit&eacute;
          </h1>
        </div>

        {DEMO_MODE && (
          <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <h2 className="font-semibold">Projet de d&eacute;monstration</h2>
            <p className="mt-1">
              Ce site montre le fonctionnement d&rsquo;une application. N&rsquo;y
              entrez pas de vraies donn&eacute;es personnelles : utilisez un nom,
              un t&eacute;l&eacute;phone et une adresse fictifs.
            </p>
          </section>
        )}

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Donn&eacute;es demand&eacute;es
          </h2>
          <p>
            Le formulaire de r&eacute;servation demande un nom, une adresse
            e-mail, un num&eacute;ro de t&eacute;l&eacute;phone, l&rsquo;adresse
            et la description du logement, ainsi que les dates et horaires
            souhait&eacute;s.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Utilisation
          </h2>
          <p>
            Ces informations servent uniquement &agrave; montrer comment
            l&rsquo;application traite une demande. Elles ne sont ni vendues,
            ni transmises &agrave; des tiers, ni utilis&eacute;es pour de la
            prospection.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Conservation
          </h2>
          <p>
            Les donn&eacute;es de d&eacute;monstration peuvent &ecirc;tre
            supprim&eacute;es &agrave; tout moment, notamment lorsque la
            d&eacute;monstration est remise &agrave; z&eacute;ro.
          </p>
          <p>
            Pendant que vous remplissez le formulaire, votre progression est
            gard&eacute;e dans le stockage local de votre navigateur. Elle est
            effac&eacute;e d&egrave;s que la demande est envoy&eacute;e.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">Vos droits</h2>
          <p>
            Pour faire supprimer une information envoy&eacute;e par erreur,
            contactez l&rsquo;auteur du projet, {publisher.name}, via{" "}
            <a
              href={publisher.contactUrl}
              className="font-medium text-teal-700 hover:underline"
            >
              {publisher.contactLabel}
            </a>
            .
          </p>
        </section>

        <p className="text-slate-600">
          Voir aussi les{" "}
          <Link
            href="/mentions-legales"
            className="font-medium text-teal-700 hover:underline"
          >
            mentions l&eacute;gales
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
