import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Demande de devis",
  description:
    "Quelques questions sur votre logement et vos dates pour recevoir un devis.",
};

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Minimal Header */}
      <header className="flex h-16 items-center border-b bg-white px-6 shadow-sm">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quitter
        </Link>
        
        <div className="mx-auto flex items-center gap-2 font-bold text-xl text-teal-700">
           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-500 text-white shadow-md">
             <Sparkles className="h-4 w-4 fill-white" />
           </div>
           MaidMatch
        </div>

        {/* Empty div to balance the flex center */}
        <div className="w-24"></div> 
      </header>

      <main className="flex-1 container mx-auto max-w-2xl py-8 px-4">
        {children}
      </main>
      
      {/* Simple Footer */}
      <footer className="py-6 text-center text-xs text-gray-500">
        <p>🔒 Vos informations sont envoy&eacute;es sur une connexion chiffr&eacute;e.</p>
      </footer>
    </div>
  );
}