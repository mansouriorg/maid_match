import type { Metadata } from "next";
import Link from "next/link";
import { Check, PhoneIncoming, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Demande re\u00e7ue",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center animate-in fade-in duration-700">
      
      {/* Success Animation Circle */}
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50">
        <Check className="h-12 w-12 text-green-600" />
      </div>

      <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
        Demande Reçue !
      </h1>
      
      <p className="mb-8 max-w-md text-lg text-gray-600">
        Nous avons bien reçu vos informations. <br />
        <span className="font-semibold text-gray-900">Gardez votre téléphone à proximité.</span>
      </p>

      {/* What Happens Next Section */}
      <div className="mb-10 w-full max-w-sm rounded-2xl border border-teal-100 bg-teal-50/50 p-6 text-left shadow-sm">
        <h3 className="mb-4 font-bold text-teal-900 flex items-center gap-2">
          <PhoneIncoming className="h-5 w-5" />
          Et maintenant ?
        </h3>
        <ul className="space-y-4">
            <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-200 text-xs font-bold text-teal-800">1</div>
                <p className="text-sm text-teal-800">
                  Notre équipe analyse vos besoins en ce moment même.
                </p>
            </li>
            <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-200 text-xs font-bold text-teal-800">2</div>
                <p className="text-sm text-teal-800">
                  Nous vous appellerons sous <strong>30 minutes</strong> pour un devis personnalisé.
                </p>
            </li>
            <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-200 text-xs font-bold text-teal-800">3</div>
                <p className="text-sm text-teal-800">
                  Une fois validé, nous envoyons l&rsquo;intervenant(e) chez vous.
                </p>
            </li>
        </ul>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-gray-800 hover:scale-105"
        >
            <Home className="h-4 w-4" />
            Retour à l&rsquo;accueil
        </Link>
      </div>
    </div>
  );
}