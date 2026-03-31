"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-grpsi-blue">
            {/* Background Image with subtle scale animation */}
            <motion.div 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-grpsi-blue/40 z-10" />
                <img 
                    src="/hero_maritime_solomon_islands_1774927638390.png" 
                    alt="Maritime Logistics Solomon Islands"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            <div className="relative z-20 text-center text-white px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase bg-grpsi-gold text-grpsi-blue rounded-full">
                        Established 1994
                    </span>
                    <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter leading-tight">
                        GRP & <span className="text-grpsi-gold">ASSOCIATES</span> LTD
                    </h1>
                    <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto text-blue-50/90 leading-relaxed mb-10">
                        Pioneering maritime logistics, engineering, and fuel distribution 
                        across the archipelago of the Solomon Islands.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-grpsi-gold text-grpsi-blue px-10 py-4 rounded-full font-bold uppercase transition-all hover:scale-105 active:scale-95 shadow-xl">
                            Our Fleet
                        </button>
                        <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-bold uppercase transition-all hover:bg-white/20 active:scale-95">
                            Expertise
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <motion.div 
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-1.5 bg-grpsi-gold rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}