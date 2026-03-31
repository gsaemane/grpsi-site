"use client";

import { motion } from "framer-motion";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Ship, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />

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
                        src="/hero_maritime_solomon_islands_1774927638390.png" 
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
                    title="Building the Future of Solomon Islands" 
                    subtitle="Our Mission"
                />
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                    <p>
                        GRP & Associates Ltd (GPRSI) is a multi-disciplinary powerhouse 
                        committed to delivering high-performance logistics and engineering solutions. 
                        We serve as a vital link, bridging the gap between provinces.
                    </p>
                    <p className="border-l-4 border-grpsi-gold pl-6 py-2 italic font-medium text-grpsi-blue">
                        "Delivering excellence since 1994 across the archipelago."
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
                    {[
                        { label: "Years Experience", value: "30+" },
                        { label: "Vessels in Fleet", value: "12" },
                        { label: "Provinces Covered", value: "9/9" },
                        { label: "Expert Engineers", value: "25+" }
                    ].map((stat, i) => (
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
                <h2 className="text-4xl md:text-6xl font-bold text-grpsi-blue mb-8 tracking-tighter leading-tight">Ready to navigate your next project?</h2>
                <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
                    Based in Honiara and serving the entire archipelago. Let's discuss how GPRSI can support your operations.
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
                        +677 24567
                    </div>
                </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-slate-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-20">
                <div className="col-span-2">
                    <div className="text-3xl font-bold text-grpsi-blue mb-6 tracking-tighter">GPRSI</div>
                    <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
                        Leading provider of logistical support and specialized services in the Solomon Islands. 
                        Dedicated to regional development through maritime and engineering excellence.
                    </p>
                    <div className="flex gap-4">
                        {[Globe, Ship, Users].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-grpsi-blue hover:border-grpsi-blue transition-all shadow-sm">
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-grpsi-blue mb-6 uppercase text-sm tracking-widest">Links</h4>
                    <ul className="space-y-4 text-slate-500">
                        <li><Link href="/about" className="hover:text-grpsi-blue transition-colors">Our Story</Link></li>
                        <li><Link href="/services" className="hover:text-grpsi-blue transition-colors">Services</Link></li>
                        <li><Link href="/contact" className="hover:text-grpsi-blue transition-colors">Get Started</Link></li>
                        <li><a href="#" className="hover:text-grpsi-blue transition-colors">Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-grpsi-blue mb-6 uppercase text-sm tracking-widest">Headquarters</h4>
                    <ul className="space-y-4 text-slate-500">
                        <li className="flex gap-3">
                            <MapPin className="w-5 h-5 text-grpsi-gold shrink-0" />
                            <span>Kukum Highway, Honiara, Solomon Islands</span>
                        </li>
                        <li className="flex gap-3">
                            <Mail className="w-5 h-5 text-grpsi-gold shrink-0" />
                            <span>info@grpsi.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
                <p>© {new Date().getFullYear()} GRP & Associates Ltd. Delivering Excellence Across the Islands.</p>
            </div>
        </div>
      </footer>
    </>
  );
}