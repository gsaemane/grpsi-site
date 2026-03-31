"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Fuel, Ship, HardHat, ArrowRight, Loader2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

const iconMap: { [key: string]: any } = {
    Fuel,
    Ship,
    HardHat
};

const colorMap: { [key: string]: string } = {
    Fuel: "bg-blue-500/10",
    Ship: "bg-teal-500/10",
    HardHat: "bg-amber-500/10"
};

const iconColorMap: { [key: string]: string } = {
    Fuel: "text-blue-600",
    Ship: "text-teal-600",
    HardHat: "text-amber-600"
};

export default function Services() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/services`);
                const data = await res.json();
                setServices(data.slice(0, 3)); // Only show top 3 on homepage
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
            <div className="py-32 flex justify-center items-center bg-white">
                <Loader2 className="w-10 h-10 animate-spin text-grpsi-blue" />
            </div>
        );
    }
    return (
        <section id="services" className="py-32 bg-white relative overflow-hidden font-sans">
            {/* Subtle Background Pattern */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-grpsi-blue/5 rounded-full blur-[120px] -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-grpsi-gold/5 rounded-full blur-[120px] -ml-40 -mb-40" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <SectionHeading 
                    title="Our Specialized Services" 
                    subtitle="Excellence in Execution"
                />
                
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((s, i) => {
                        const Icon = iconMap[s.icon] || Ship;
                        const bgColor = colorMap[s.icon] || "bg-slate-50";
                        const iconColor = iconColorMap[s.icon] || "text-slate-400";
                        
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group bg-white p-10 rounded-2xl border border-slate-100 shadow-premium hover:border-grpsi-gold transition-all duration-300"
                            >
                                <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon className={`w-8 h-8 ${iconColor}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-grpsi-blue mb-4">{s.title}</h3>
                                <p className="text-slate-600 leading-relaxed mb-8">
                                    {s.description}
                                </p>
                                <button className="flex items-center gap-2 text-sm font-bold text-grpsi-blue group-hover:text-grpsi-blue-light transition-colors">
                                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}