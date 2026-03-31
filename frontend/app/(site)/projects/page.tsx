"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/ProjectCard';
import { Filter, Layers, Loader2 } from 'lucide-react';

const categories = ["All", "Logistics", "Engineering", "Fuel"];

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/projects`);
                const data = await res.json();
                setProjects(data);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = filter === "All" 
        ? projects 
        : projects.filter((p: any) => p.category === filter);

    return (
        <main className="pt-24 bg-grpsi-white min-h-screen font-sans">
            {/* Page Header */}
            <section className="relative bg-grpsi-blue py-32 px-6 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img 
                        src="/gprsi_projects_showcase_hero_1774928512898.png" 
                        className="w-full h-full object-cover"
                        alt="Background"
                    />
                </div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter"
                    >
                        Impact <span className="text-grpsi-gold">Showcase</span>
                    </motion.h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
                        A curated gallery of GPRSI’s most significant maritime, 
                        engineering, and logistical projects across the Solomon Islands.
                    </p>
                </div>
            </section>

            {/* Filter & Grid Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                {/* Filtering Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-grpsi-blue border border-slate-100">
                            <Filter className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-grpsi-blue tracking-widest uppercase text-sm">Filter Portfolio</h3>
                    </div>

                    <div className="flex p-1.5 bg-white rounded-2xl shadow-premium border border-slate-100 gap-1">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setFilter(c)}
                                className={`px-8 py-2.5 rounded-xl text-sm font-bold tracking-widest transition-all ${
                                    filter === c 
                                    ? "bg-grpsi-blue text-white shadow-lg" 
                                    : "text-slate-400 hover:text-grpsi-blue hover:bg-slate-50"
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Grid */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                            <Loader2 className="w-12 h-12 animate-spin mb-4" />
                            <p className="font-bold tracking-widest uppercase text-sm">Syncing with Fleet Data...</p>
                        </div>
                    ) : (
                        <motion.div 
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((p: any, i: number) => (
                                    <motion.div
                                        key={p.title}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                    >
                                        <ProjectCard {...p} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>

                {/* Empty State */}
                {!loading && filteredProjects.length === 0 && (
                    <div className="py-32 text-center">
                        <Layers className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-slate-300 uppercase tracking-widest">No matching projects found</h3>
                    </div>
                )}
            </section>

            {/* Regional Collaboration CTA */}
            <section className="py-32 bg-white px-6">
                <div className="max-w-4xl mx-auto p-16 rounded-[3rem] bg-grpsi-blue text-white text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-grpsi-gold/5 rounded-full blur-[100px] -ml-32 -mt-32" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Have a project in mind for your province?</h2>
                        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                            We are actively seeking new logistical and infrastructure partnerships 
                            to further the development of the Solomon Islands.
                        </p>
                        <a 
                            href="/contact" 
                            className="inline-block bg-grpsi-gold text-grpsi-blue px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                            Partnership Proposal
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
