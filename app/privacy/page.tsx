import type { Metadata } from "next";
import Link from "next/link";
import { business, shown } from "@/lib/business";

export const metadata: Metadata = {
  title: "Politique de confidentialit\u00e9",
  description:
    "Les informations recueillies lorsque vous demandez un devis et la raison pour laquelle elles sont recueillies.",
};

export default function PrivacyPage() {
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
            Politique de confidentialit&eacute;
          </h1>
          <p className="mt-3 text-slate-700">
            Cette page explique quelles informations nous recueillons lorsque
            vous demandez un devis sur MaidMatch, et pourquoi.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Responsable du traitement
          </h2>
          <p className="text-slate-700">
            Les informations recueillies sur ce site sont trait&eacute;es par{" "}
            {shown(business.name)}, {shown(business.address)}. Contact&nbsp;:{" "}
            {shown(business.email)}, {shown(business.phone)}.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Informations recueillies
          </h2>
          <p className="text-slate-700">
            Dans le formulaire de demande&nbsp;: votre nom, votre num&eacute;ro
            de t&eacute;l&eacute;phone, votre adresse e-mail, l&rsquo;adresse et
            le type de votre logement, le nombre de pi&egrave;ces et de salles
            de bain, le type de prestation et les options choisies, ainsi que
            les dates et horaires souhait&eacute;s.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Pourquoi nous les recueillons
          </h2>
          <p className="text-slate-700">
            Ces informations nous permettent de vous rappeler pour
            &eacute;tablir un devis, puis d&rsquo;organiser l&rsquo;intervention.
            Ce traitement est n&eacute;cessaire pour r&eacute;pondre &agrave;
            votre demande de devis (mesures pr&eacute;contractuelles).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            O&ugrave; elles sont enregistr&eacute;es
          </h2>
          <p className="text-slate-700">
            Pendant que vous remplissez le formulaire, vos r&eacute;ponses sont
            gard&eacute;es dans votre navigateur afin de ne pas &ecirc;tre
            perdues si vous quittez la page. Elles sont remises &agrave; z&eacute;ro
            apr&egrave;s l&rsquo;envoi de la demande. Lorsque vous envoyez la
            demande, elles sont transmises &agrave; notre serveur.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Dur&eacute;e de conservation
          </h2>
          <p className="text-slate-700">{shown(business.retention)}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Cookies et suivi
          </h2>
          <p className="text-slate-700">
            Ce site ne d&eacute;pose pas de cookies de suivi et n&rsquo;utilise
            pas d&rsquo;outil d&rsquo;analyse tiers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">Vos droits</h2>
          <p className="text-slate-700">
            Vous disposez d&rsquo;un droit d&rsquo;acc&egrave;s, de
            rectification, d&rsquo;effacement, d&rsquo;opposition, de limitation
            du traitement et de portabilit&eacute; de vos donn&eacute;es. Pour
            les exercer, contactez-nous&nbsp;: {shown(business.email)} ou{" "}
            {shown(business.phone)}.
          </p>
          <p className="text-slate-700">
            Si vous estimez, apr&egrave;s nous avoir contact&eacute;s, que vos
            droits ne sont pas respect&eacute;s, vous pouvez introduire une
            r&eacute;clamation aupr&egrave;s de la CNIL (www.cnil.fr).
          </p>
          <p className="text-slate-700">
            Voir aussi nos{" "}
            <Link
              href="/mentions-legales"
              className="font-medium text-teal-700 underline"
            >
              mentions l&eacute;gales
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
