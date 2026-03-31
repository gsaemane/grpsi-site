"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SectionHeading from '@/components/SectionHeading';
import { Fuel, Ship, HardHat, CheckCircle2, Waves, Drill, Truck, Factory, Loader2 } from 'lucide-react';

const iconMap: { [key: string]: any } = {
    Ship,
    Fuel,
    HardHat,
    Waves,
    Drill,
    Truck,
    Factory
};

export default function ServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/services`);
                const data = await res.json();
                setServices(data);
            } catch (err) {
                console.error("Failed to fetch services:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="w-16 h-16 animate-spin text-grpsi-blue mb-6" />
                <p className="font-bold tracking-widest uppercase text-grpsi-blue text-sm">Loading Divisions...</p>
            </div>
        );
    }

  return (
    <main className="pt-24 font-sans">
      {/* Page Header */}
      <section className="bg-slate-50 py-24 px-6 border-b border-slate-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-grpsi-gold/5 rounded-full blur-[100px]" />
           <div className="max-w-7xl mx-auto text-center relative z-10">
              <SectionHeading title="Specialized Capabilities" subtitle="Our Expertise" />
              <p className="text-xl text-slate-500 max-w-3xl mx-auto">
                  GPRSI delivers elite performance across three primary divisions, 
                  each critical to the development and connectivity of the Solomon Islands.
              </p>
           </div>
      </section>

      {/* Detailed Service Sections */}
      <section className="py-32 px-6 bg-white space-y-32">
          {services.map((s: any, i: number) => {
              const Icon = iconMap[s.icon] || Ship;
              return (
                  <div key={s.id} className={`max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <motion.div 
                          initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7 }}
                          className="flex-1"
                      >
                          <div className="w-16 h-16 bg-grpsi-blue rounded-2xl flex items-center justify-center mb-8 shadow-premium">
                              <Icon className="w-8 h-8 text-grpsi-gold" />
                          </div>
                          <h2 className="text-4xl font-bold text-grpsi-blue mb-6 tracking-tight">{s.title}</h2>
                          <p className="text-xl text-slate-500 mb-8 leading-relaxed">
                              {s.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {s.features.map((f: string, j: number) => (
                                  <div key={j} className="flex gap-3 items-center group">
                                      <div className="w-5 h-5 rounded-full bg-grpsi-gold/20 flex items-center justify-center shrink-0">
                                          <CheckCircle2 className="w-3.5 h-3.5 text-grpsi-gold" />
                                      </div>
                                      <p className="text-slate-600 font-medium group-hover:text-grpsi-blue transition-colors">{f}</p>
                                  </div>
                              ))}
                          </div>

                          <button className="mt-12 bg-grpsi-blue text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-premium">
                              Request Specification
                          </button>
                      </motion.div>

                      <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.2 }}
                          className="flex-1 w-full"
                      >
                          <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                              <img 
                                  src={s.image} 
                                  alt={s.title} 
                                  className="w-full h-full object-cover aspect-video group-hover:scale-110 transition-transform duration-1000"
                              />
                              <div className="absolute inset-0 bg-grpsi-blue/20 group-hover:bg-grpsi-blue/0 transition-colors" />
                          </div>
                      </motion.div>
                  </div>
              );
          })}
      </section>

      {/* Industry Focus Section */}
      <section className="py-32 bg-grpsi-blue text-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-white/5 rounded-full blur-[150px]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
              <SectionHeading title="Industries We Serve" subtitle="Market Reach" light />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                      { name: "Public Sector", icon: Factory },
                      { name: "Mining & Resources", icon: Drill },
                      { name: "Retail & Distribution", icon: Truck },
                      { name: "Maritime Transport", icon: Waves }
                  ].map((industry, i) => (
                      <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
                      >
                          <industry.icon className="w-8 h-8 text-grpsi-gold mx-auto mb-4" />
                          <h4 className="font-bold tracking-widest uppercase text-sm">{industry.name}</h4>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>
    </main>
  );
}
