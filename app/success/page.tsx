import Link from "next/link";
import { Check, PhoneIncoming, Home } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center animate-in fade-in duration-700">
      
      {/* Success Animation Circle */}
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50">
        <Check className="h-12 w-12 text-green-600" />
      </div>

      <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
        Request Received!
      </h1>
      
      <p className="mb-8 max-w-md text-lg text-gray-600">
        We have received your details. <br />
        <span className="font-semibold text-gray-900">Please keep your phone close.</span>
      </p>

      {/* What Happens Next Section */}
      <div className="mb-10 w-full max-w-sm rounded-2xl border border-blue-100 bg-blue-50/50 p-6 text-left shadow-sm">
        <h3 className="mb-4 font-bold text-blue-900 flex items-center gap-2">
          <PhoneIncoming className="h-5 w-5" />
          What happens now?
        </h3>
        <ul className="space-y-4">
            <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-blue-800">1</div>
                <p className="text-sm text-blue-800">
                  Our team is reviewing your home details right now.
                </p>
            </li>
            <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-blue-800">2</div>
                <p className="text-sm text-blue-800">
                  We will call you within <strong>30 minutes</strong> to provide a custom quote.
                </p>
            </li>
            <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-blue-800">3</div>
                <p className="text-sm text-blue-800">
                  Once agreed, we dispatch the maid to your location.
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
            Return to Home
        </Link>
      </div>
    </div>
  );
}