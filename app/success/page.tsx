import Link from "next/link";
import { Check, ArrowRight, MessageCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      
      {/* Success Animation Circle */}
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50 animate-in zoom-in duration-500">
        <Check className="h-12 w-12 text-green-600" />
      </div>

      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">
        Booking Confirmed!
      </h1>
      
      <p className="mb-8 max-w-md text-lg text-gray-600">
        Thank you. We have received your request. <br />
        Our team is reviewing your details and will contact you shortly via <strong>WhatsApp</strong> to confirm the maid.
      </p>

      {/* What Happens Next Section */}
      <div className="mb-10 w-full max-w-sm rounded-2xl border border-gray-100 bg-gray-50 p-6 text-left shadow-sm">
        <h3 className="mb-4 font-bold text-gray-900">What happens next?</h3>
        <ul className="space-y-4">
            <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700">1</div>
                <p className="text-sm text-gray-600">We assign the best rated maid in your area.</p>
            </li>
            <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700">2</div>
                <p className="text-sm text-gray-600">You receive a confirmation message with her profile.</p>
            </li>
            <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700">3</div>
                <p className="text-sm text-gray-600">She arrives at your doorstep on time!</p>
            </li>
        </ul>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
            href="/"
            className="flex w-full items-center justify-center rounded-full bg-gray-900 py-3.5 text-sm font-bold text-white transition-all hover:bg-gray-800"
        >
            Return to Home
        </Link>
        <a 
            href="https://wa.me/" 
            target="_blank"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 py-3.5 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50"
        >
            <MessageCircle className="h-4 w-4" />
            Contact Support
        </a>
      </div>
    </div>
  );
}