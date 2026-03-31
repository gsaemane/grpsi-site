"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SectionHeading from '@/components/SectionHeading';
import { Target, Eye, Shield, Users, Clock, Globe, Loader2 } from 'lucide-react';

export default function AboutPage() {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
                const url = apiBase.endsWith('/api') ? `${apiBase}/about` : `${apiBase}/api/about`;
                
                const res = await fetch(url);
                const data = await res.json();
                setContent(data);
            } catch (err) {
                console.error("Failed to fetch about content:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAbout();
    }, []);

    const values = [
        {
            title: "Integrity",
            description: "Operating with honesty and transparency in every contract and maritime operation.",
            icon: Shield
        },
        {
            title: "Excellence",
            description: "Setting the gold standard for engineering and logistical support in the Solomon Islands.",
            icon: Target
        },
        {
            title: "Sustainability",
            description: "Committed to long-term regional growth and environmentally conscious practices.",
            icon: Globe
        }
    ];

    const milestones = [
        { year: "1994", event: "GPRSI Established in Honiara" },
        { year: "2005", event: "Acquisition of LC Alcol Landing Craft" },
        { year: "2012", event: "Expansion into Civil Engineering & Infrastructure" },
        { year: "2024", event: "Leading Multi-disciplinary Firm in the Archipelago" }
    ];

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-grpsi-blue text-white">
                <Loader2 className="w-16 h-16 animate-spin text-grpsi-gold mb-6" />
                <p className="font-bold tracking-[0.3em] uppercase text-sm">Syncing History...</p>
            </div>
        );
    }

    return (
        <main className="pt-18 font-sans bg-white">
            {/* Page Header */}
            <section className="bg-grpsi-blue py-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="/gprsi_team_operations_image_1774928148738.png"
                        className="w-full h-full object-cover"
                        alt="Background"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Our {content?.title || 'Legacy'}
                    </motion.h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        {content?.description?.split('.')[0]}. Serving the Solomon Islands since 1994.
                    </p>
                </div>
            </section>

            {/* History & Mission */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-20">
                        <div className="flex-1">
                            <SectionHeading title={content?.title || "Decades of Service"} subtitle={content?.subtitle || "Company History"} />
                            <div className="space-y-6 text-slate-600 text-lg">
                                <p>
                                    {content?.description}
                                </p>
                            </div>

                            {/* Timeline */}
                            <div className="mt-12 space-y-8">
                                {milestones.map((m: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="flex gap-6 items-start"
                                    >
                                        <div className="text-grpsi-gold font-bold text-xl w-20 pt-1">{m.year}</div>
                                        <div className="flex-1 pb-8 border-l-2 border-slate-100 pl-8 relative">
                                            <div className="absolute w-3 h-3 bg-grpsi-blue rounded-full -left-[7px] top-2" />
                                            <div className="text-grpsi-blue font-bold text-lg">{m.event}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 bg-slate-50 p-12 rounded-3xl border border-slate-100">
                            <SectionHeading title="Our Mission" subtitle="Guidance" />
                            <p className="text-2xl font-light text-grpsi-blue italic mb-12 leading-relaxed">
                                "{content?.mission}"
                            </p>

                            <div className="space-y-8">
                                {values.map((v: any, i: number) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                            <v.icon className="w-6 h-6 text-grpsi-gold" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-grpsi-blue text-lg mb-2">{v.title}</h4>
                                            <p className="text-slate-500">{v.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Snapshot */}
            <section className="py-32 bg-grpsi-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1 order-2 lg:order-1">
                            <div className="relative">
                                <img
                                    src="/gprsi_team_operations_image_1774928148738.png"
                                    alt="Our Team"
                                    className="rounded-2xl shadow-premium relative z-10"
                                />
                                <div className="absolute -top-10 -right-10 w-64 h-64 bg-grpsi-gold/10 rounded-full blur-3xl" />
                            </div>
                        </div>
                        <div className="flex-1 order-1 lg:order-2">
                            <SectionHeading title="The Minds Behind GPRSI" subtitle="Our Experts" />
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                GPRSI is powered by a team of over {content?.stats?.staff} dedicated professionals, including
                                expert maritime captains, certified civil engineers, and logistics specialists.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-4xl font-bold text-grpsi-blue mb-1">{content?.stats?.staff}</div>
                                    <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Total Staff</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-grpsi-blue mb-1">{content?.stats?.experience}</div>
                                    <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Years Avg Exp.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
