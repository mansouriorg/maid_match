"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Home, 
  Smile 
} from "lucide-react";

export default function LandingPage() {
  // État pour stocker le prix de base (on met "..." ou "15" par défaut le temps que ça charge)
  const [basePrice, setBasePrice] = useState<number | string>("15");

  // Requête API pour récupérer le paramètre dynamique au chargement
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        if (res.data && res.data.defaultHourlyRate) {
          setBasePrice(res.data.defaultHourlyRate);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du tarif :", error);
        // Si l'API ne répond pas, le prix restera à "15" (fallback de sécurité)
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* --- HEADER / NAVBAR --- */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-2 font-extrabold text-2xl tracking-tight text-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-200">
              <Sparkles className="h-6 w-6 fill-white" />
            </div>
            MaidMatch
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <Link href="#how-it-works" className="transition-colors hover:text-teal-700">Comment ça marche</Link>
            <Link href="#services" className="transition-colors hover:text-teal-700">Services</Link>
            {/* The "Avis" link is removed until the page has a real reviews section. */}
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              href="/request" 
              className="rounded-full bg-teal-700 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-200 transition-all hover:scale-105 hover:bg-teal-800 hover:shadow-xl"
            >
              Réserver
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden bg-white pt-20 pb-32 lg:pt-40">
          
          {/* Decorative Background Elements (Bubbles) - More subtle now */}
          <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-teal-50/60 blur-3xl filter opacity-70" />
          <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-teal-50/60 blur-3xl filter opacity-70" />

          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="inline-flex items-center rounded-full border border-teal-100 bg-teal-50/50 px-3 py-1 text-sm font-medium text-teal-700 shadow-sm">
                <Star className="mr-2 h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">Service de ménage</span>
                <span className="mx-2 text-teal-300">|</span>
                <span>Paris & Île-de-France</span>
              </div>
              
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
                Découvrez la joie d&rsquo;une <br />
                <span className="bg-gradient-to-r from-teal-500 via-blue-500 to-teal-600 bg-clip-text text-transparent">
                  Maison Impeccable
                </span>
              </h1>
              
              <p className="mx-auto max-w-2xl text-xl text-slate-600 leading-relaxed">
                La vie est trop courte pour faire le ménage. Laissez nos professionnels vérifiés s&rsquo;occuper de la poussière pendant que vous profitez de l&rsquo;essentiel.
              </p>
              
              <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                <Link
                  href="/request"
                  className="group flex h-16 w-full items-center justify-center rounded-full bg-gradient-to-r from-teal-600 to-teal-600 px-10 text-lg font-bold text-white shadow-xl shadow-teal-200 transition-all hover:scale-105 hover:shadow-2xl sm:w-auto"
                >
                  Demander un Devis
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="flex h-16 w-full items-center justify-center rounded-full border-2 border-slate-100 bg-white px-10 text-lg font-bold text-slate-600 transition-colors hover:border-teal-100 hover:bg-teal-50 hover:text-teal-700 sm:w-auto"
                >
                  Comment ça marche ?
                </Link>
              </div>

              {/* DYNAMIQUE : Affichage du tarif réel sous les boutons */}
              <p className="text-sm font-medium text-slate-500 animate-in fade-in duration-700 delay-300">
                Tarif simple et transparent à partir de <span className="font-bold text-teal-700">{basePrice}&nbsp;&euro; / heure</span>.
              </p>

              {/* Trust Badges */}
              <div className="pt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 text-sm font-medium text-slate-500">
                <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white/50 p-4 shadow-sm backdrop-blur-sm">
                  <div className="rounded-full bg-emerald-100 p-1">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span>Personnel Vérifié</span>
                </div>
                <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white/50 p-4 shadow-sm backdrop-blur-sm">
                  <div className="rounded-full bg-emerald-100 p-1">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span>Devis personnalis&eacute;</span>
                </div>
                <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white/50 p-4 shadow-sm backdrop-blur-sm">
                  <div className="rounded-full bg-emerald-100 p-1">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span>Confirmation par t&eacute;l&eacute;phone</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- HOW IT WORKS --- */}
        <section id="how-it-works" className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="mb-20 text-center">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Une maison propre en 3 étapes</h2>
              <p className="mt-4 text-lg text-slate-600">Pas d&rsquo;appels inutiles, pas de tracas. Juste une maison propre.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="group relative flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-lg transition-all hover:-translate-y-1 hover:border-teal-100 hover:shadow-xl">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-700 group-hover:text-white">
                  <Clock className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">1. Personnalisez</h3>
                <p className="text-slate-600">
                  Décrivez votre logement et choisissez la date et l&rsquo;heure qui vous conviennent.
                </p>
              </div>

              {/* Step 2 */}
              <div className="group relative flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-lg transition-all hover:-translate-y-1 hover:border-teal-100 hover:shadow-xl">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-700 group-hover:text-white">
                  <ShieldCheck className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">2. Nous Trouvons</h3>
                <p className="text-slate-600">
                  Nous choisissons une intervenante disponible et nous vous rappelons pour confirmer le rendez-vous.
                </p>
              </div>

              {/* Step 3 */}
              <div className="group relative flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-lg transition-all hover:-translate-y-1 hover:border-teal-100 hover:shadow-xl">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-700 group-hover:text-white">
                  <Smile className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">3. Profitez</h3>
                <p className="text-slate-600">
                  Votre intervenant(e) arrive équipé(e). Rentrez dans une maison étincelante.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- WHY CHOOSE US (Dark Mode Section) --- */}
        <section id="services" className="bg-slate-900 py-24 text-white">
          <div className="container mx-auto px-4">
             <div className="grid gap-16 md:grid-cols-2 items-center">
                <div>
                   <h2 className="text-3xl font-bold sm:text-4xl mb-8">Pourquoi nous choisir ?</h2>
                   <div className="space-y-8">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1 rounded-full bg-slate-800 p-2">
                          <CheckCircle2 className="h-6 w-6 text-teal-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl">Standard Hôtelier</h4>
                          <p className="text-slate-400 mt-1">Nous formons notre personnel avec des manuels d&rsquo;entretien 5 étoiles.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="flex-shrink-0 mt-1 rounded-full bg-slate-800 p-2">
                          <CheckCircle2 className="h-6 w-6 text-teal-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl">Produits Écologiques</h4>
                          <p className="text-slate-400 mt-1">Sans danger pour enfants et animaux. Nous utilisons des produits non toxiques.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="flex-shrink-0 mt-1 rounded-full bg-slate-800 p-2">
                          <CheckCircle2 className="h-6 w-6 text-teal-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl">Disponibilité Immédiate</h4>
                          <p className="text-slate-400 mt-1">Besoin d&rsquo;un ménage urgent ? Nos équipes sont prêtes à intervenir.</p>
                        </div>
                      </div>
                      
                      {/* DYNAMIQUE : Affichage du tarif réel dans la section argumentaire */}
                      <div className="flex gap-4">
                         <div className="flex-shrink-0 mt-1 rounded-full bg-slate-800 p-2">
                          <CheckCircle2 className="h-6 w-6 text-teal-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl">Tarifs Transparents</h4>
                          <p className="text-slate-400 mt-1">À partir de {basePrice}&nbsp;&euro;/h. Pas de frais cachés, vous savez exactement ce que vous payez dès la réservation.</p>
                        </div>
                      </div>
                   </div>
                </div>
                
                {/* Stats Card */}
                <div className="relative h-[420px] rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 border border-slate-700 shadow-2xl">
                   {/* Abstract representation of a clean house */}
                   <div className="absolute inset-0 flex items-center justify-center text-slate-800 opacity-50">
                      <Home className="h-64 w-64" />
                   </div>
                   <div className="relative z-10 text-center h-full flex flex-col justify-center">
                      <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-400 mb-2">4 &eacute;tapes</p>
                      <p className="text-xl text-slate-300">pour envoyer votre demande</p>
                      <div className="my-8 h-px bg-slate-700 w-full" />
                      <p className="text-5xl font-extrabold text-white mb-2">1 appel</p>
                      <p className="text-xl text-slate-300">pour confirmer votre devis</p>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-200 bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center items-center gap-2 font-bold text-2xl text-slate-800">
             <span className="rounded-lg bg-teal-700 p-1.5 text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            MaidMatch
          </div>
          <p className="mb-8 text-slate-500 max-w-sm mx-auto">
            Rendre les foyers plus heureux, un ménage à la fois. Réservez votre professionnel de confiance aujourd&rsquo;hui.
          </p>
          <div className="flex justify-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/privacy" className="hover:text-teal-700 transition-colors">Confidentialité</Link>
            <Link href="/mentions-legales" className="hover:text-teal-700 transition-colors">Mentions l&eacute;gales</Link>
            <Link href="/request" className="hover:text-teal-700 transition-colors">Demander un devis</Link>
            {/* Add the "Devenir Intervenant" link back when that page exists. */}
          </div>
          <p className="mt-12 text-xs text-slate-500">
            &copy; {new Date().getFullYear()} MaidMatch. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}