"use client";

import { motion } from "framer-motion";
import Navbar from '@/components/Navbar';
import SectionHeading from '@/components/SectionHeading';
import { Mail, Phone, MapPin, Clock, Send, Globe } from 'lucide-react';
import { useState } from "react";

export default function ContactPage() {
    const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Page Header */}
        <section className="bg-grpsi-blue py-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-grpsi-gold/10 rounded-full blur-[150px] -mr-40" />
            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
                >
                    Contact Us
                </motion.h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    Headquartered in Honiara, GPRSI is ready to support your inter-island 
                    logistics and engineering requirements across the archipelago.
                </p>
            </div>
        </section>

        <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Contact Info */}
                    <div className="flex-1">
                        <SectionHeading title="Get In Touch" subtitle="Global Reach" />
                        <div className="space-y-12">
                            <div className="flex gap-6 items-start group">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-grpsi-blue group-hover:text-white transition-all duration-300 shadow-sm">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-grpsi-blue text-lg mb-2">Headquarters</h4>
                                    <p className="text-slate-500 max-w-xs leading-relaxed">
                                        Lot 15, Kukum Highway, Honiara, Solomon Islands
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start group">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-grpsi-blue group-hover:text-white transition-all duration-300 shadow-sm">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-grpsi-blue text-lg mb-2">Direct Line</h4>
                                    <p className="text-slate-500">+677 24567 / +677 24568</p>
                                    <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-medium">Mon-Fri: 8am-5pm</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start group">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-grpsi-blue group-hover:text-white transition-all duration-300 shadow-sm">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-grpsi-blue text-lg mb-2">General Inquiries</h4>
                                    <p className="text-slate-500">info@grpsi.com</p>
                                    <p className="text-slate-500">logistics@grpsi.com</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start group">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-grpsi-blue group-hover:text-white transition-all duration-300 shadow-sm">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-grpsi-blue text-lg mb-2">Emergency Support</h4>
                                    <p className="text-slate-500">Available 24/7 for critical maritime operations.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="flex-1 bg-slate-50 p-12 rounded-3xl border border-slate-100 shadow-premium relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-grpsi-gold/5 rounded-full blur-3xl" />
                        <SectionHeading title="Send a Message" subtitle="Enquiry" />
                        
                        {isSubmitted ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white p-12 rounded-2xl text-center shadow-lg"
                            >
                                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-grpsi-blue mb-4">Message Received!</h3>
                                <p className="text-slate-500">Our team will get back to you within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-grpsi-blue uppercase tracking-widest">Full Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:border-grpsi-blue focus:ring-2 focus:ring-grpsi-blue/20 outline-none transition-all"
                                            placeholder="John Doe"
                                            value={formState.name}
                                            onChange={(e) => setFormState({...formState, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-grpsi-blue uppercase tracking-widest">Email Address</label>
                                        <input 
                                            required
                                            type="email" 
                                            className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:border-grpsi-blue focus:ring-2 focus:ring-grpsi-blue/20 outline-none transition-all"
                                            placeholder="john@example.com"
                                            value={formState.email}
                                            onChange={(e) => setFormState({...formState, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-grpsi-blue uppercase tracking-widest">Subject</label>
                                    <select 
                                        className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:border-grpsi-blue outline-none appearance-none bg-white"
                                        value={formState.subject}
                                        onChange={(e) => setFormState({...formState, subject: e.target.value})}
                                    >
                                        <option value="">Select a Topic</option>
                                        <option value="logistics">Logistics Inquiry</option>
                                        <option value="engineering">Engineering Project</option>
                                        <option value="fuel">Fuel Logistics</option>
                                        <option value="other">Other Inquiry</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-grpsi-blue uppercase tracking-widest">Message</label>
                                    <textarea 
                                        required
                                        rows={5}
                                        className="w-full px-6 py-4 rounded-xl border border-slate-200 focus:border-grpsi-blue outline-none resize-none"
                                        placeholder="How can we help you?"
                                        value={formState.message}
                                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                                    />
                                </div>
                                <button className="w-full bg-grpsi-blue text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-grpsi-blue-light hover:shadow-2xl active:scale-95 transition-all">
                                    Submit Inquiry
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>

        {/* Global Operations Section */}
        <section className="py-24 bg-slate-50 border-t border-slate-100 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex gap-6 items-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Globe className="w-8 h-8 text-grpsi-blue" />
                    </div>
                    <div>
                        <h4 className="font-bold text-grpsi-blue whitespace-nowrap">Nationwide Network</h4>
                        <p className="text-slate-500">Serving all 9 provinces from the Shortlands to Temotu.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white text-grpsi-blue border border-slate-200 px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:border-grpsi-blue transition-colors">Download Port Guide</button>
                    <button className="bg-white text-grpsi-blue border border-slate-200 px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:border-grpsi-blue transition-colors">Emergency Protocols</button>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} GRP & Associates Ltd. All rights reserved.</p>
      </footer>
    </>
  );
}
