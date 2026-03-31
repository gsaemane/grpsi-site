"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
    MapPin, 
    Calendar, 
    ChevronLeft, 
    Target, 
    Lightbulb, 
    Trophy, 
    ArrowRight, 
    Loader2, 
    Anchor,
    Shield,
    Activity
} from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [project, setProject] = useState<any>(null);
    const [allProjects, setAllProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
                const url = apiBase.endsWith('/api') ? `${apiBase}/projects` : `${apiBase}/api/projects`;
                
                const res = await fetch(url);
                const data = await res.json();
                setAllProjects(data);
                
                const found = data.find((p: any) => p.slug === slug);
                if (found) {
                    setProject(found);
                } else {
                    // Fallback to title matching if slug isn't perfect
                    const fallback = data.find((p: any) => 
                        p.title.toLowerCase().replace(/\s+/g, '-') === slug
                    );
                    setProject(fallback);
                }
            } catch (err) {
                console.error("Failed to fetch project details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="w-12 h-12 text-grpsi-blue animate-spin mb-4" />
                <p className="text-grpsi-blue font-bold tracking-widest uppercase text-sm">Accessing Mission Log...</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-8">
                    <Shield className="w-12 h-12" />
                </div>
                <h1 className="text-4xl font-bold text-grpsi-blue mb-4">Project Archive Not Found</h1>
                <p className="text-slate-500 max-w-md mb-12">The requested mission log is either classified or has been moved to another sector.</p>
                <Link href="/projects" className="bg-grpsi-blue text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                    Back to Fleet Registry
                </Link>
            </div>
        );
    }

    // Find next project for navigation with robust slug fallback
    const currentIndex = allProjects.findIndex(p => 
        (p.slug && p.slug === project.slug) || (p.title === project.title)
    );
    const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
    const nextProjectSlug = nextProject.slug || nextProject.title.toLowerCase().replace(/\s+/g, '-');

    return (
        <main className="bg-white min-h-screen font-sans">
            {/* Navigation Header */}
            <nav className="fixed top-24 left-0 right-0 z-40 px-6 pointer-events-none">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link 
                        href="/projects" 
                        className="pointer-events-auto flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full text-grpsi-blue font-bold text-xs uppercase tracking-widest shadow-premium border border-slate-100 hover:bg-grpsi-blue hover:text-white transition-all group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Showcase
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] flex items-end pb-24 px-6 overflow-hidden">
                <motion.div 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img 
                        src={project.image} 
                        className="w-full h-full object-cover"
                        alt={project.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-grpsi-blue via-grpsi-blue/40 to-transparent" />
                </motion.div>

                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="px-5 py-2 bg-grpsi-gold text-grpsi-blue rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
                            {project.category}
                        </span>
                        <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-none max-w-4xl">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-8 text-white/80 font-medium">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                                <MapPin className="w-5 h-5 text-grpsi-gold" /> {project.location}
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                                <Calendar className="w-5 h-5 text-grpsi-gold" /> Completed {project.year}
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                                <Activity className="w-5 h-5 text-grpsi-gold" /> Status: Operational
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Case Study Content */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Left Side: Summary & Details */}
                    <div className="lg:col-span-12">
                        <div className="flex flex-col lg:flex-row gap-20">
                            <div className="lg:w-1/3">
                                <div className="sticky top-40">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-grpsi-blue/40 mb-6 border-l-2 border-grpsi-gold pl-4">
                                        Executive Summary
                                    </h3>
                                    <p className="text-2xl text-grpsi-blue font-bold leading-snug mb-12 italic">
                                        "{project.description}"
                                    </p>
                                    
                                    {/* Project Stats (Mock since we'll add these later) */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="text-3xl font-black text-grpsi-blue mb-1">100%</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Local Employment</div>
                                        </div>
                                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="text-3xl font-black text-grpsi-blue mb-1">0</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Safety Incidents</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-2/3 space-y-24">
                                {project.challenge && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="relative group"
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-grpsi-blue group-hover:bg-grpsi-blue group-hover:text-white transition-all duration-500 shadow-sm">
                                                <Target className="w-8 h-8" />
                                            </div>
                                            <h4 className="text-3xl font-bold text-grpsi-blue">The Challenge</h4>
                                        </div>
                                        <div className="text-lg text-slate-600 leading-relaxed pl-20 border-l-2 border-blue-50">
                                            {project.challenge}
                                        </div>
                                    </motion.div>
                                )}

                                {project.solution && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="relative group"
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-16 h-16 bg-amber-50 rounded-[1.5rem] flex items-center justify-center text-amber-500 group-hover:bg-grpsi-gold group-hover:text-grpsi-blue transition-all duration-500 shadow-sm">
                                                <Lightbulb className="w-8 h-8" />
                                            </div>
                                            <h4 className="text-3xl font-bold text-grpsi-blue">Our Solution</h4>
                                        </div>
                                        <div className="text-lg text-slate-600 leading-relaxed pl-20 border-l-2 border-amber-50">
                                            {project.solution}
                                        </div>
                                    </motion.div>
                                )}

                                {project.result && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="relative group"
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-16 h-16 bg-green-50 rounded-[1.5rem] flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                                <Trophy className="w-8 h-8" />
                                            </div>
                                            <h4 className="text-3xl font-bold text-grpsi-blue">The Result</h4>
                                        </div>
                                        <div className="text-lg text-slate-600 leading-relaxed pl-20 border-l-2 border-green-50">
                                            {project.result}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Project Navigation */}
            <section className="py-24 bg-slate-900 text-white px-6 overflow-hidden relative">
                <div className="absolute inset-0 opacity-10">
                    <img src={nextProject.image} className="w-full h-full object-cover blur-sm" alt="Next Project" />
                </div>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-grpsi-gold mb-4 block">Next Case Study</span>
                        <h3 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-2xl">{nextProject.title}</h3>
                    </div>
                    <Link 
                        href={`/projects/${nextProjectSlug}`}
                        className="group flex items-center gap-6 bg-white text-grpsi-blue px-12 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:bg-grpsi-gold hover:scale-105 active:scale-95 transition-all shadow-2xl"
                    >
                        Explore Project <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
