import { MapPin, Clock, Phone, Mail, Map as MapIcon } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 md:px-12 lg:px-24">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Visit Our Store
        </h1>
        <p className="mt-4 text-lg text-zinc-500">
          Experience the latest technology in person
        </p>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Store Information */}
        <div className="rounded-[2.5rem] border border-zinc-100 bg-zinc-50/50 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">Store Information</h2>
          
          <div className="space-y-8">
            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-bold text-zinc-900">Location</p>
                <p className="text-zinc-600">Bongaigaon, Assam</p>
              </div>
            </div>

            {/* Store Hours */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <Clock size={20} />
              </div>
              <div>
                <p className="font-bold text-zinc-900">Store Hours</p>
                <p className="text-zinc-600">Monday - Saturday</p>
                <p className="text-zinc-400 text-sm italic">Closed on Sundays</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-bold text-zinc-900">Phone</p>
                <p className="text-zinc-500 italic">+91 9954325690</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-bold text-zinc-900">Email</p>
                <p className="text-zinc-500 italic">sameshm445@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Map Placeholder */}
        <div className="relative flex flex-col items-center justify-center rounded-[2.5rem] bg-zinc-100/50 border border-zinc-200 p-12 overflow-hidden">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-zinc-400 mb-4">
            <MapIcon size={32} />
          </div>
          <p className="text-zinc-500 font-medium">Map integration coming soon</p>
          <p className="text-zinc-400 text-sm">Bongaigaon, Assam</p>
          
          {/* Decorative subtle grid background */}
          <div className="absolute inset-0 -z-10 opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" 
               style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} 
          />
        </div>
      </section>

      {/* Footer Section: Why Visit Us */}
      <section className="max-w-7xl mx-auto mt-16 px-4">
        <h3 className="text-xl font-bold text-zinc-900">Why Visit Us?</h3>
        <ul className="mt-6 space-y-3">
          <li className="flex items-center gap-3 text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
            Hands-on experience with latest devices
          </li>
          <li className="flex items-center gap-3 text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
            Expert repair consultations
          </li>
          <li className="flex items-center gap-3 text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
            Genuine accessories and parts
          </li>
        </ul>
      </section>
    </main>
  );
}