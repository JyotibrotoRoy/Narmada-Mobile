import Image from 'next/image';

export default function BannerSection() {
  return (
    <section className="max-w-[1400px] mx-auto my-16 w-full">
      {/* Removed the background and border. Let the image do the work. */}
      <div className="w-full flex items-center justify-center">
        <Image
          src="/web-banner.png"
          alt="Northeast India's No.1 Mobile Destination"
          width={2000}
          height={400} 
          className="w-full h-auto object-cover" // Changed to object-cover to eliminate letterboxing
          priority={false}
        />
      </div>
    </section>
  );
}