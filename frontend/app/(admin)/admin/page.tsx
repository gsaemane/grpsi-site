"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeading from '@/components/SectionHeading';
import { Save, RefreshCw, Plus, Trash2, Edit3, Loader2, CheckCircle, AlertCircle, Globe, LayoutDashboard, Briefcase, FileText, Settings, Upload, Image as ImageIcon, Ship, Users } from 'lucide-react';

export default function AdminPage() {
    const searchParams = useSearchParams();
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "about");
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab) setActiveTab(tab);
    }, [searchParams]);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        setError("");
        try {
            const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
            const url = apiBase.endsWith('/api') ? `${apiBase}/content` : `${apiBase}/api/content`;
            
            const res = await fetch(url);
            const data = await res.json();
            setContent(data);
        } catch (err) {
            setError("Failed to fetch content from fleet server.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (collection: string, updatedData: any) => {
        setIsSaving(true);
        setSaveSuccess(false);
        setError("");
        const token = localStorage.getItem("gprsi_admin_token");
        
        try {
            const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
            const url = apiBase.endsWith('/api') ? `${apiBase}/admin/update` : `${apiBase}/api/admin/update`;

            const res = await fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ collection, fullCollection: updatedData })
            });

            if (res.ok) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            } else {
                const errData = await res.json();
                setError(errData.error || "Update failed.");
            }
        } catch (err: any) {
            console.error("Critical Maritime Link Failure:", err);
            const detail = err.name === 'TypeError' ? " (Possible CORS/Network issue)" : "";
            setError(`Connectivity lost. Check your maritime link${detail}.`);
        } finally {
            setIsSaving(false);
        }
    };

    // Helper for robust deep updates
    const updateDeep = (path: string[], value: any) => {
        setContent((prev: any) => {
            const newContent = { ...prev };
            let current = newContent;
            for (let i = 0; i < path.length - 1; i++) {
                current[path[i]] = { ...current[path[i]] };
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
            return newContent;
        });
    };

    // --- Image Uploader Sub-Component ---
    const ImageUploader = ({ label, currentUrl, onUpload }: { label: string, currentUrl: string, onUpload: (url: string) => void }) => {
        const [uploading, setUploading] = useState(false);

        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setUploading(true);
            try {
                const response = await fetch(`/api/upload?filename=${file.name}`, {
                    method: 'POST',
                    body: file,
                });

                if (response.ok) {
                    const blob = await response.json();
                    onUpload(blob.url);
                } else {
                    const err = await response.json();
                    setError(`Upload failed: ${err.error || 'Server error'}`);
                }
            } catch (err) {
                setError("Connectivity error during upload.");
            } finally {
                setUploading(false);
            }
        };

        return (
            <div className="space-y-3 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:border-blue-200">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</label>
                <div className="flex items-center gap-6">
                    <div className="w-24 h-16 bg-slate-50 rounded-xl border border-dashed border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                        {currentUrl ? (
                            <img src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <Upload className="w-5 h-5 text-slate-300" />
                        )}
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="relative group">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                disabled={uploading}
                            />
                            <button className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-bold transition-all ${uploading ? 'bg-slate-50 text-slate-400' : 'bg-white text-slate-600 group-hover:border-blue-400 group-hover:text-blue-600'}`}>
                                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                {uploading ? 'Uploading...' : 'Select Maritime Asset'}
                            </button>
                        </div>
                        <input 
                            type="text" 
                            className="w-full px-3 py-1.5 text-[10px] font-mono text-blue-500 bg-slate-50 rounded-md border-none outline-none overflow-hidden text-ellipsis"
                            value={currentUrl}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 animate-spin text-slate-200 mb-4" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing Control Panel...</p>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="bg-red-50 p-12 rounded-3xl text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-red-600 mb-2">Sync Error</h2>
                <p className="text-red-400 mb-6 font-medium">Unable to establish a link with the GPRSI database.</p>
                <button 
                    onClick={fetchContent}
                    className="bg-red-600 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                    <SectionHeading title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management`} subtitle="Control Center" />
                    <p className="text-slate-500 max-w-xl">
                        Universal management for the GPRSI {activeTab} collection. 
                        Ensure all technical specs are verified before publishing.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={fetchContent}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all font-sans"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Sync
                    </button>
                    {saveSuccess && (
                        <div className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-600 rounded-xl font-bold text-sm font-sans">
                            <CheckCircle className="w-4 h-4" />
                            Published
                        </div>
                    )}
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-center gap-4 text-red-600 font-bold font-sans">
                    <AlertCircle className="w-6 h-6" />
                    {error}
                </div>
            )}

            {/* Editor Content */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200/60 font-sans">
                
                {/* HOME/LANDING EDITOR */}
                {activeTab === "home" && content.home && (
                    <div className="space-y-12">
                        {/* Hero Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                                <LayoutDashboard className="w-5 h-5 text-blue-600" />
                                Hero Section
                            </h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Main Title</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-grpsi-blue outline-none text-slate-900"
                                        value={content.home.hero.title}
                                        onChange={(e) => updateDeep(['home', 'hero', 'title'], e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Highlight Word</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-grpsi-blue outline-none text-slate-900"
                                        value={content.home.hero.highlight}
                                        onChange={(e) => updateDeep(['home', 'hero', 'highlight'], e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subtitle / Description</label>
                                <textarea 
                                    rows={3}
                                    className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-grpsi-blue outline-none resize-none text-slate-900"
                                    value={content.home.hero.subtitle}
                                    onChange={(e) => updateDeep(['home', 'hero', 'subtitle'], e.target.value)}
                                />
                            </div>

                            {/* Hero Background Image */}
                            <ImageUploader 
                                label="Hero Background Image" 
                                currentUrl={content.home.hero.backgroundImage}
                                onUpload={(url) => updateDeep(['home', 'hero', 'backgroundImage'], url)}
                            />
                            
                            {/* Buttons Editor */}
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Primary Button</label>
                                    <input 
                                        type="text" className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-slate-900 text-sm"
                                        placeholder="Label" value={content.home.hero.buttons?.primary?.label}
                                        onChange={(e) => updateDeep(['home', 'hero', 'buttons', 'primary', 'label'], e.target.value)}
                                    />
                                    <input 
                                        type="text" className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-slate-900 text-sm"
                                        placeholder="Link" value={content.home.hero.buttons?.primary?.link}
                                        onChange={(e) => updateDeep(['home', 'hero', 'buttons', 'primary', 'link'], e.target.value)}
                                    />
                                </div>
                                <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Secondary Button</label>
                                    <input 
                                        type="text" className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-slate-900 text-sm"
                                        placeholder="Label" value={content.home.hero.buttons?.secondary?.label}
                                        onChange={(e) => updateDeep(['home', 'hero', 'buttons', 'secondary', 'label'], e.target.value)}
                                    />
                                    <input 
                                        type="text" className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-slate-900 text-sm"
                                        placeholder="Link" value={content.home.hero.buttons?.secondary?.link}
                                        onChange={(e) => updateDeep(['home', 'hero', 'buttons', 'secondary', 'link'], e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-100" />

                        {/* CTA Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                Call to Action (CTA)
                            </h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">CTA Title</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-grpsi-blue outline-none text-slate-900"
                                        value={content.home.cta.title}
                                        onChange={(e) => updateDeep(['home', 'cta', 'title'], e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact Phone</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-grpsi-blue outline-none text-slate-900"
                                        value={content.home.cta.phone}
                                        onChange={(e) => updateDeep(['home', 'cta', 'phone'], e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-8 border-t border-slate-100">
                            <button 
                                onClick={() => handleSave("home", content.home)}
                                disabled={isSaving}
                                className="flex items-center gap-3 px-12 py-5 bg-grpsi-blue text-white rounded-full font-bold uppercase tracking-widest hover:bg-grpsi-blue-light transition-all disabled:opacity-50 shadow-premium"
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Save Home Changes
                            </button>
                        </div>
                    </div>
                )}

                {/* ABOUT EDITOR */}
                {activeTab === "about" && content.about && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Main Title</label>
                                <input 
                                    type="text" 
                                    className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-grpsi-blue outline-none text-slate-900"
                                    value={content.about.title || ""}
                                    onChange={(e) => updateDeep(['about', 'title'], e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subtitle</label>
                                <input 
                                    type="text" 
                                    className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-grpsi-blue outline-none text-slate-900"
                                    value={content.about.subtitle || ""}
                                    onChange={(e) => updateDeep(['about', 'subtitle'], e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Stats Expansion */}
                        <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100/50 space-y-6">
                            <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest">Operational Success Metrics</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Experience (Years)</label>
                                    <input className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-slate-900"
                                        value={content.about.stats.experience} onChange={(e) => updateDeep(['about', 'stats', 'experience'], e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Team Size</label>
                                    <input className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-slate-900"
                                        value={content.about.stats.staff} onChange={(e) => updateDeep(['about', 'stats', 'staff'], e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Vessels</label>
                                    <input className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-slate-900"
                                        value={content.about.stats.vessels} onChange={(e) => updateDeep(['about', 'stats', 'vessels'], e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Provinces</label>
                                    <input className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-slate-900"
                                        value={content.about.stats.provinces} onChange={(e) => updateDeep(['about', 'stats', 'provinces'], e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Description</label>
                            <textarea 
                                rows={6}
                                className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-grpsi-blue outline-none resize-none text-slate-900"
                                value={content.about.description || ""}
                                onChange={(e) => updateDeep(['about', 'description'], e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end pt-8">
                            <button 
                                onClick={() => handleSave("about", content.about)}
                                disabled={isSaving}
                                className="flex items-center gap-3 px-12 py-5 bg-grpsi-blue text-white rounded-full font-bold uppercase tracking-widest hover:bg-grpsi-blue-light transition-all disabled:opacity-50 shadow-premium"
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Save About Changes
                            </button>
                        </div>
                    </div>
                )}

                {/* FOOTER / SETTINGS EDITOR */}
                {activeTab === "footer" && content.footer && (
                    <div className="space-y-8">
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                                <Globe className="w-5 h-5 text-blue-600" />
                                Global Contact Information
                            </h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Headquarters Address</label>
                                    <input type="text" className="w-full px-6 py-4 bg-white rounded-xl border border-slate-200 text-slate-900"
                                        value={content.footer.address} onChange={(e) => updateDeep(['footer', 'address'], e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Official Email</label>
                                    <input type="email" className="w-full px-6 py-4 bg-white rounded-xl border border-slate-200 text-slate-900"
                                        value={content.footer.email} onChange={(e) => updateDeep(['footer', 'email'], e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Description (Footer)</label>
                                <textarea rows={3} className="w-full px-6 py-4 bg-white rounded-xl border border-slate-200 text-slate-900 resize-none"
                                    value={content.footer.description} onChange={(e) => updateDeep(['footer', 'description'], e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact Phone</label>
                                <input type="text" className="w-full px-6 py-4 bg-white rounded-xl border border-slate-200 text-slate-900"
                                    value={content.footer.phone} onChange={(e) => updateDeep(['footer', 'phone'], e.target.value)} />
                            </div>
                        </div>
                        <div className="flex justify-end pt-8">
                            <button 
                                onClick={() => handleSave("footer", content.footer)}
                                disabled={isSaving}
                                className="flex items-center gap-3 px-12 py-5 bg-grpsi-blue text-white rounded-full font-bold uppercase tracking-widest hover:bg-grpsi-blue-light transition-all disabled:opacity-50 shadow-premium"
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Save Global Settings
                            </button>
                        </div>
                    </div>
                )}

                {/* SERVICES EDITOR */}
                {activeTab === "services" && content.services && (
                    <div className="space-y-12">
                        {content.services.map((service: any, index: number) => (
                            <div key={index} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-6">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-grpsi-blue flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-slate-100 italic text-slate-400">{index + 1}</div>
                                        {service.title}
                                    </h4>
                                    <button className="text-red-400 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service Title</label>
                                        <input className="w-full px-6 py-4 rounded-xl border border-slate-200 text-slate-900 text-sm font-bold"
                                            value={service.title} onChange={(e) => {
                                                const next = [...content.services];
                                                next[index] = { ...next[index], title: e.target.value };
                                                setContent({ ...content, services: next });
                                            }} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Icon (Ship, Fuel, HardHat)</label>
                                        <input className="w-full px-6 py-4 rounded-xl border border-slate-200 text-slate-900 text-sm"
                                            value={service.icon} onChange={(e) => {
                                                const next = [...content.services];
                                                next[index] = { ...next[index], icon: e.target.value };
                                                setContent({ ...content, services: next });
                                            }} />
                                    </div>
                                </div>
                                <ImageUploader 
                                    label="Service Visualization" 
                                    currentUrl={service.image}
                                    onUpload={(url) => {
                                        const next = [...content.services];
                                        next[index] = { ...next[index], image: url };
                                        setContent({ ...content, services: next });
                                    }}
                                />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</label>
                                    <textarea rows={2} className="w-full px-6 py-4 rounded-xl border border-slate-200 text-slate-900 text-sm resize-none"
                                        value={service.description} onChange={(e) => {
                                            const next = [...content.services];
                                            next[index] = { ...next[index], description: e.target.value };
                                            setContent({ ...content, services: next });
                                        }} />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capabilities Listing</label>
                                    {service.features.map((feature: string, fIndex: number) => (
                                        <input key={fIndex} className="w-full px-4 py-2 bg-white rounded-lg border border-slate-100 text-slate-900 text-xs"
                                            value={feature} onChange={(e) => {
                                                const next = [...content.services];
                                                const nextFeatures = [...next[index].features];
                                                nextFeatures[fIndex] = e.target.value;
                                                next[index] = { ...next[index], features: nextFeatures };
                                                setContent({ ...content, services: next });
                                            }} />
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end pt-8 border-t border-slate-100">
                            <button 
                                onClick={() => handleSave("services", content.services)}
                                disabled={isSaving}
                                className="flex items-center gap-3 px-12 py-5 bg-grpsi-blue text-white rounded-full font-bold uppercase tracking-widest hover:bg-grpsi-blue-light transition-all disabled:opacity-50 shadow-premium"
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Save Services
                            </button>
                        </div>
                    </div>
                )}

                {/* PROJECTS EDITOR */}
                {activeTab === "projects" && content.projects && (
                    <div className="space-y-12">
                        {content.projects.map((project: any, index: number) => (
                            <div key={index} className="flex flex-col lg:flex-row gap-8 p-8 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-full lg:w-48 h-32 rounded-xl border border-white overflow-hidden shadow-sm shrink-0">
                                    <img src={project.image} className="w-full h-full object-cover" alt="Fleet Project" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="col-span-2 space-y-1">
                                            <label className="text-[10px] uppercase text-slate-400 font-bold ml-1">Project Name</label>
                                            <input 
                                                className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                                                value={project.title} onChange={(e) => {
                                                    const next = [...content.projects];
                                                    next[index] = { ...next[index], title: e.target.value };
                                                    setContent({ ...content, projects: next });
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase text-slate-400 font-bold ml-1">Location</label>
                                            <input 
                                                className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-900"
                                                value={project.location} onChange={(e) => {
                                                    const next = [...content.projects];
                                                    next[index] = { ...next[index], location: e.target.value };
                                                    setContent({ ...content, projects: next });
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase text-slate-400 font-bold ml-1">Year</label>
                                            <input 
                                                className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-900"
                                                value={project.year} onChange={(e) => {
                                                    const next = [...content.projects];
                                                    next[index] = { ...next[index], year: e.target.value };
                                                    setContent({ ...content, projects: next });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-slate-400 font-bold ml-1">Operational Summary</label>
                                        <textarea 
                                            rows={2}
                                            className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-900 resize-none font-sans"
                                            value={project.description} onChange={(e) => {
                                                const next = [...content.projects];
                                                next[index] = { ...next[index], description: e.target.value };
                                                setContent({ ...content, projects: next });
                                            }}
                                        />
                                    </div>
                                    <ImageUploader 
                                        label="Project Showcase Image" 
                                        currentUrl={project.image}
                                        onUpload={(url) => {
                                            const next = [...content.projects];
                                            next[index] = { ...next[index], image: url };
                                            setContent({ ...content, projects: next });
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end pt-8 border-t border-slate-100">
                            <button 
                                onClick={() => handleSave("projects", content.projects)}
                                disabled={isSaving}
                                className="flex items-center gap-3 px-12 py-5 bg-grpsi-blue text-white rounded-full font-bold uppercase tracking-widest hover:bg-grpsi-blue-light transition-all disabled:opacity-50 shadow-premium"
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Save Fleet Portfolio
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === "footer" && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-50/50 p-12 rounded-[2.5rem] border border-slate-100">
                            <div className="col-span-2 space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 font-bold ml-1">Company Global Mission</label>
                                <textarea 
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-900 font-medium"
                                    value={content.footer?.description || ''} onChange={(e) => updateDeep(['footer', 'description'], e.target.value)}
                                />
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 font-bold ml-1">Headquarters (Physical)</label>
                                <input 
                                    className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                                    value={content.footer?.address || ''} onChange={(e) => updateDeep(['footer', 'address'], e.target.value)}
                                />
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 font-bold ml-1">Operations Email</label>
                                <input 
                                    className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                                    value={content.footer?.email || ''} onChange={(e) => updateDeep(['footer', 'email'], e.target.value)}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-slate-400 font-bold ml-1">Central Phone Relay</label>
                                <input 
                                    className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                                    value={content.footer?.phone || ''} onChange={(e) => updateDeep(['footer', 'phone'], e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bg-slate-50/50 p-12 rounded-[2.5rem] border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Social Connectivity</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {(content.footer?.social || []).map((social: any, i: number) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-grpsi-gold">
                                                {social.platform === 'Globe' && <Globe className="w-5 h-5" />}
                                                {social.platform === 'Ship' && <Ship className="w-5 h-5" />}
                                                {social.platform === 'Users' && <Users className="w-5 h-5" />}
                                            </div>
                                            <span className="font-bold text-slate-900">{social.platform}</span>
                                        </div>
                                        <input 
                                            className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-500 font-mono"
                                            value={social.url} onChange={(e) => {
                                                const next = [...content.footer.social];
                                                next[i] = { ...next[i], url: e.target.value };
                                                updateDeep(['footer', 'social'], next);
                                            }}
                                            placeholder="https://..."
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end pt-8 border-t border-slate-100">
                            <button 
                                onClick={() => handleSave("footer", content.footer)}
                                disabled={isSaving}
                                className="flex items-center gap-3 px-12 py-5 bg-grpsi-blue text-white rounded-full font-bold uppercase tracking-widest hover:bg-grpsi-blue-light transition-all disabled:opacity-50 shadow-premium"
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Synchronize Global Settings
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
