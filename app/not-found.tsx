import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="mb-6 rounded-full bg-cyan-100 p-6">
        <FileQuestion className="h-12 w-12 text-cyan-600" />
      </div>
      
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
        Page Introuvable
      </h1>
      
      <p className="mb-8 max-w-md text-gray-600">
        Désolé, nous ne trouvons pas la page que vous recherchez. Elle a peut-être été déplacée ou supprimée.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg bg-cyan-600 px-6 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à l'accueil
      </Link>
    </div>
  );
}