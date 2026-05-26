"use client";

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "MJ Creationz",
    rating: 5,
    text: "I have bought many phones from this shop. They are doing fine. The shopkeeper is very nice (like my brother) and the service and behavior of all the staff is the best. I proudly tell you to please come to the store and get your dream phone.",
    date: "2 months ago"
  },
  {
    id: 2,
    name: "Monir Gaming",
    rating: 5,
    text: "All kind of mobile phone available here and actually i love this shop and owner behaviour. Highly recommended for anyone in the Northeast looking for genuine products.",
    date: "3 weeks ago"
  },
  {
    id: 3,
    name: "Rahul S.",
    rating: 5,
    text: "Best prices on iPhones in the region. The team helped me transfer all my data seamlessly. Excellent after-sales support.",
    date: "1 month ago"
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section - Centered for impact */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">
            Client Feedback
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900">
            Trusted across the Northeast.
          </h3>
        </div>

        {/* Static Grid - Perfect for a small number of reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review, index) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col justify-between p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Star Rating */}
                <div className="flex gap-1 mb-6 text-[#F59E0B]">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-zinc-700 leading-relaxed font-medium mb-8">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
                <div>
                  <h4 className="font-bold text-zinc-900">{review.name}</h4>
                  <p className="text-sm text-zinc-500">Verified Buyer</p>
                </div>
                <span className="text-xs font-semibold text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">
                  {review.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}