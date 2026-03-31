"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link';
import { Phone, ArrowRight, Loader2 } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeContent = async () => {
        try {
            const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
            const url = apiBase.endsWith('/api') ? `${apiBase}/content` : `${apiBase}/api/content`;

            const res = await fetch(url);
            const allData = await res.json();
            setData(allData);
        } catch (err) {
            console.error("Failed to fetch home content:", err);
        } finally {
            setLoading(false);
        }
    };
    fetchHomeContent();
  }, []);

  if (loading) {
      return (
          <div className="h-screen flex flex-col items-center justify-center bg-grpsi-blue text-white">
              <Loader2 className="w-16 h-16 animate-spin text-grpsi-gold mb-6" />
              <p className="font-bold tracking-[0.3em] uppercase text-sm">Initializing Fleet...</p>
          </div>
      );
  }

  const about = data?.about;
  const home = data?.home;

  const stats = [
    { label: "Years Experience", value: about?.stats?.experience || "30+" },
    { label: "Vessels in Fleet", value: about?.stats?.vessels || "12" },
    { label: "Provinces Covered", value: about?.stats?.provinces || "9/9" },
    { label: "Expert Engineers", value: about?.stats?.staff || "25+" }
  ];

  return (
    <main className="overflow-hidden">
      <Hero data={home?.hero} />

      {/* About Summary Section */}
      <section id="about" className="py-32 px-6 bg-grpsi-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                      src={home?.hero?.backgroundImage || "/hero_maritime_solomon_islands_1774927638390.png"} 
                      alt="GPRSI Operations" 
                      className="w-full h-full object-cover aspect-video lg:aspect-auto"
                  />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-grpsi-gold rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-grpsi-blue rounded-2xl -z-10" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <SectionHeading 
                  title={about?.title || "Building the Future"} 
                  subtitle={about?.subtitle || "Our Mission"}
              />
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                  <p>
                      {about?.description}
                  </p>
                  <p className="border-l-4 border-grpsi-gold pl-6 py-2 italic font-medium text-grpsi-blue">
                      "{about?.mission?.split('.')[0] || 'Delivering Excellence Across the Islands'}."
                  </p>
                  <div className="pt-4">
                      <Link href="/about">
                          <button className="bg-grpsi-blue text-white px-8 py-3 rounded-full font-bold flex items-center gap-3 group transition-all hover:bg-grpsi-blue-light">
                              Discover Our Legacy
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                      </Link>
                  </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Summary Section */}
      <Services />
      <div className="bg-white pb-32 text-center">
          <Link href="/services">
              <button className="inline-flex items-center gap-3 text-grpsi-blue font-bold text-lg hover:gap-5 transition-all group">
                  Explore Detailed Capabilities 
                  <span className="w-12 h-px bg-grpsi-blue group-hover:w-16 transition-all" />
              </button>
          </Link>
      </div>

      {/* Global Reach Stats Section */}
      <section className="py-24 bg-grpsi-blue text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-grpsi-gold/5" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                  {stats.map((stat: any, i: number) => (
                      <motion.div 
                          key={i}
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                      >
                          <div className="text-4xl md:text-5xl font-bold text-grpsi-gold mb-2">{stat.value}</div>
                          <div className="text-sm uppercase tracking-widest text-blue-100/70 font-medium">{stat.label}</div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 bg-white text-center relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
          >
              <h2 className="text-4xl md:text-6xl font-bold text-grpsi-blue mb-8 tracking-tighter leading-tight">
                  {home?.cta?.title || "Ready to navigate your next project?"}
              </h2>
              <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
                  {home?.cta?.description || "Based in Honiara and serving the entire archipelago."}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link href="/contact">
                      <button className="bg-grpsi-blue text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-grpsi-blue-light transition-all hover:shadow-2xl shadow-premium">
                          Start a Conversation
                      </button>
                  </Link>
                  <div className="flex items-center gap-4 text-grpsi-blue font-bold">
                      <div className="w-12 h-12 rounded-full bg-grpsi-blue/5 flex items-center justify-center">
                          <Phone className="w-5 h-5" />
                      </div>
                      {home?.cta?.phone || data?.footer?.phone || "+677 24567"}
                  </div>
              </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}