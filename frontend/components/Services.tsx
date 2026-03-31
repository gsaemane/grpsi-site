"use client";

import { motion } from "framer-motion";
import { Fuel, Ship, HardHat, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const services = [
    {
        title: "Fuel & Lube Sales",
        description: "Premium supply of lubricants and fuel for industrial, maritime, and commercial operations across the islands.",
        icon: Fuel,
        color: "bg-blue-500/10",
        iconColor: "text-blue-600"
    },
    {
        title: "Shipping & Logistics",
        description: "Comprehensive maritime transport featuring the LC Alcol landing craft, delivering heavy equipment and cargo.",
        icon: Ship,
        color: "bg-teal-500/10",
        iconColor: "text-teal-600"
    },
    {
        title: "Construction & Engineering",
        description: "Multi-disciplinary engineering solutions for infrastructure, civil works, and large-scale project management.",
        icon: HardHat,
        color: "bg-amber-500/10",
        iconColor: "text-amber-600"
    }
];

export default function Services() {
    return (
        <section id="services" className="py-32 bg-white relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-grpsi-blue/5 rounded-full blur-[120px] -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-grpsi-gold/5 rounded-full blur-[120px] -ml-40 -mb-40" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SectionHeading 
                    title="Our Specialized Services" 
                    subtitle="Excellence in Execution"
                />
                
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group bg-white p-10 rounded-2xl border border-slate-100 shadow-premium hover:border-grpsi-gold transition-all duration-300"
                        >
                            <div className={`w-16 h-16 ${s.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <s.icon className={`w-8 h-8 ${s.iconColor}`} />
                            </div>
                            <h3 className="text-2xl font-bold text-grpsi-blue mb-4">{s.title}</h3>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                {s.description}
                            </p>
                            <button className="flex items-center gap-2 text-sm font-bold text-grpsi-blue group-hover:text-grpsi-blue-light transition-colors">
                                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}