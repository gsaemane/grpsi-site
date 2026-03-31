"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    light?: boolean;
}

export default function SectionHeading({ title, subtitle, light = false }: SectionHeadingProps) {
    return (
        <div className="mb-16 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {subtitle && (
                    <span className={`text-sm font-bold tracking-[0.2em] uppercase mb-3 block ${light ? 'text-grpsi-gold' : 'text-grpsi-blue-light'}`}>
                        {subtitle}
                    </span>
                )}
                <h2 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${light ? 'text-white' : 'text-grpsi-blue'}`}>
                    {title}
                </h2>
                <div className={`h-1.5 w-20 mx-auto rounded-full ${light ? 'bg-grpsi-gold' : 'bg-grpsi-gold'}`} />
            </motion.div>
        </div>
    );
}
