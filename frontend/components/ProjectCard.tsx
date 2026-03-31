"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
    title: string;
    location: string;
    year: string;
    category: string;
    image: string;
    description: string;
    slug?: string;
}

export default function ProjectCard({ title, location, year, category, image, description, slug }: ProjectCardProps) {
    const projectSlug = slug || title.toLowerCase().replace(/\s+/g, '-');

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-premium border border-slate-100 hover:border-grpsi-gold transition-all duration-500 flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-grpsi-blue shadow-sm">
                        {category}
                    </span>
                </div>
                <div className="absolute inset-0 bg-grpsi-blue/0 group-hover:bg-grpsi-blue/20 transition-colors duration-500" />
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-grpsi-blue mb-2 group-hover:text-grpsi-blue-light transition-colors leading-tight">
                            {title}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400 font-medium">
                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {location}</span>
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {year}</span>
                        </div>
                    </div>
                    <Link 
                        href={`/projects/${projectSlug}`}
                        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-grpsi-blue group-hover:bg-grpsi-gold group-hover:rotate-45 transition-all shrink-0"
                    >
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {description}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-grpsi-blue/40">Status: Completed</span>
                    <Link 
                        href={`/projects/${projectSlug}`}
                        className="text-grpsi-blue font-bold text-xs uppercase tracking-widest hover:text-grpsi-gold transition-colors"
                    >
                        View Case Study
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
