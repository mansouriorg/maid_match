import Link from "next/link";
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
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-cyan-100 selection:text-cyan-900">
      
      {/* --- HEADER / NAVBAR --- */}
      <header className="sticky top-0 z-50 w-full border-b border-cyan-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-2 font-extrabold text-2xl tracking-tight text-cyan-600">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 text-white shadow-lg">
              <Sparkles className="h-6 w-6 fill-white" />
            </div>
            MaidMatch
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <Link href="#how-it-works" className="transition-colors hover:text-cyan-600">How it Works</Link>
            <Link href="#services" className="transition-colors hover:text-cyan-600">Services</Link>
            <Link href="#reviews" className="transition-colors hover:text-cyan-600">Reviews</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              href="/request" 
              className="rounded-full bg-cyan-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition-all hover:scale-105 hover:bg-cyan-700 hover:shadow-xl"
            >
              Book a Maid
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50 via-white to-white pt-20 pb-32 lg:pt-40">
          
          {/* Decorative Background Elements (Bubbles) */}
          <div className="absolute top-20 right-0 -z-10 h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl filter" />
          <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-teal-50/50 blur-3xl filter" />

          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="inline-flex items-center rounded-full border border-cyan-100 bg-white px-3 py-1 text-sm font-medium text-cyan-600 shadow-sm">
                <Star className="mr-2 h-4 w-4 fill-cyan-400 text-cyan-400" />
                #1 Rated Cleaning Service in Your Area
              </div>
              
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">
                Experience the Joy of a <br />
                <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                  Spotless Home
                </span>
              </h1>
              
              <p className="mx-auto max-w-2xl text-xl text-gray-600 leading-relaxed">
                Life is too short to clean. Let our vetted professionals handle the dust and grime while you focus on what matters. 
              </p>
              
              <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                <Link
                  href="/request"
                  className="group flex h-16 w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 px-10 text-lg font-bold text-white shadow-xl shadow-cyan-200 transition-all hover:scale-105 hover:shadow-2xl sm:w-auto"
                >
                  Book Now - Get $10 Off
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="flex h-16 w-full items-center justify-center rounded-full border-2 border-gray-100 bg-white px-10 text-lg font-bold text-gray-600 transition-colors hover:border-cyan-100 hover:bg-cyan-50 hover:text-cyan-700 sm:w-auto"
                >
                  See How It Works
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 text-sm font-medium text-gray-500">
                <div className="flex items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="rounded-full bg-green-100 p-1">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <span>Background Checked Staff</span>
                </div>
                <div className="flex items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="rounded-full bg-green-100 p-1">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <span>100% Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="rounded-full bg-green-100 p-1">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <span>Cashless Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- HOW IT WORKS --- */}
        <section id="how-it-works" className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="mb-20 text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Clean Home in 3 Steps</h2>
              <p className="mt-4 text-lg text-gray-600">No phone calls, no hassle. Just a clean home.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="group relative flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-lg transition-shadow hover:shadow-xl">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 transition-colors group-hover:bg-cyan-600 group-hover:text-white">
                  <Clock className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">1. Customize</h3>
                <p className="text-gray-600">
                  Tell us about your home and choose a date and time that works for you.
                </p>
              </div>

              {/* Step 2 */}
              <div className="group relative flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-lg transition-shadow hover:shadow-xl">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 transition-colors group-hover:bg-cyan-600 group-hover:text-white">
                  <ShieldCheck className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">2. We Match</h3>
                <p className="text-gray-600">
                  Our algorithm matches you with the highest-rated cleaner in your neighborhood.
                </p>
              </div>

              {/* Step 3 */}
              <div className="group relative flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-lg transition-shadow hover:shadow-xl">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 transition-colors group-hover:bg-cyan-600 group-hover:text-white">
                  <Smile className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">3. Relax</h3>
                <p className="text-gray-600">
                  Your cleaner arrives fully equipped. You come home to a sparkling fresh house.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- WHY CHOOSE US --- */}
        <section id="services" className="bg-cyan-900 py-24 text-white">
          <div className="container mx-auto px-4">
             <div className="grid gap-16 md:grid-cols-2 items-center">
                <div>
                   <h2 className="text-3xl font-bold sm:text-4xl mb-6">Why we are different</h2>
                   <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="h-6 w-6 text-teal-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl">Hotel-Standard Cleaning</h4>
                          <p className="text-cyan-100">We train our staff using 5-star hotel housekeeping manuals.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="h-6 w-6 text-teal-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl">Eco-Friendly Products</h4>
                          <p className="text-cyan-100">Safe for your kids and pets. We use non-toxic, biodegradable supplies.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="h-6 w-6 text-teal-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xl">Same Day Availability</h4>
                          <p className="text-cyan-100">Need a last-minute clean? We have standby teams ready.</p>
                        </div>
                      </div>
                   </div>
                </div>
                <div className="relative h-96 rounded-3xl bg-cyan-800 p-8 border border-cyan-700">
                   {/* Abstract representation of a clean house */}
                   <div className="absolute inset-0 flex items-center justify-center text-cyan-600 opacity-20">
                      <Home className="h-64 w-64" />
                   </div>
                   <div className="relative z-10 text-center h-full flex flex-col justify-center">
                      <p className="text-5xl font-bold text-white mb-2">15,000+</p>
                      <p className="text-xl text-cyan-200">Houses Cleaned</p>
                      <div className="my-8 h-px bg-cyan-700 w-full" />
                      <p className="text-5xl font-bold text-white mb-2">4.9/5</p>
                      <p className="text-xl text-cyan-200">Average Rating</p>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center items-center gap-2 font-bold text-2xl text-cyan-900">
             <span className="rounded-lg bg-cyan-600 p-1.5 text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            MaidMatch
          </div>
          <p className="mb-8 text-gray-500 max-w-sm mx-auto">
            Making homes happier, one clean at a time. Book your trusted cleaning professional today.
          </p>
          <div className="flex justify-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/privacy" className="hover:text-cyan-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-cyan-600">Terms of Service</Link>
            <Link href="#" className="hover:text-cyan-600">Support</Link>
            <Link href="#" className="hover:text-cyan-600">Become a Cleaner</Link>
          </div>
          <p className="mt-12 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} MaidMatch Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}