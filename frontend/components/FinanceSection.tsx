import Image from 'next/image';

export default function FinanceSection() {
  return (
    <section className="relative w-full py-16 bg-white border-b border-zinc-100 overflow-hidden">
      
      {/* Faint Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none z-0">
        <span className="text-[15rem] md:text-[20rem] font-black tracking-tighter">nmc</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
        
        <h3 className="text-2xl font-bold text-zinc-600 mb-12">
          Finance Partners
        </h3>

        {/* Responsive Logo Grid - Static */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
           
           {/* Bajaj */}
           <div className="h-10 md:h-12 relative w-32 md:w-40">
             <Image src="/bajaj.png" alt="Bajaj Finserv" fill className="object-contain" />
           </div>
           
           {/* HDFC */}
           <div className="h-10 md:h-12 relative w-32 md:w-40">
             <Image src="/hdfc.png" alt="HDFC Bank" fill className="object-contain" />
           </div>
           
           {/* Axis */}
           <div className="h-10 md:h-12 relative w-32 md:w-40">
             <Image src="/axis.png" alt="Axis Bank" fill className="object-contain" />
           </div>
           
           {/* TVS */}
           <div className="h-10 md:h-12 relative w-32 md:w-40">
             <Image src="/tvs.png" alt="TVS Credit" fill className="object-contain" />
           </div>

        </div>
      </div>
    </section>
  );
}