"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Key, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("gprsi_admin_token", data.token);
                router.push("/admin");
            } else {
                setError(data.error || "Login Failed");
            }
        } catch (err) {
            setError("Server unreachable. Check backend connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-[150px] -mr-40 -mt-40" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-400/5 rounded-full blur-[120px] -ml-20 -mb-20" />
            </div>

            <div className="w-full max-w-lg bg-white/5 backdrop-blur-3xl p-16 rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 transition-all">
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-premium transform rotate-3">
                        <Shield className="w-10 h-10 text-slate-900" />
                    </div>
                    <h1 className="text-white text-4xl font-black tracking-tighter mb-4">GPRSI Center</h1>
                    <p className="text-white/40 uppercase tracking-[0.3em] font-bold text-xs">Security Checkpoint</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold ml-1">Access Credentials</label>
                        <div className="relative group">
                            <Key className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-white transition-colors" />
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 text-white border border-white/10 px-16 py-5 rounded-2xl outline-none focus:border-white/30 focus:bg-white/10 transition-all font-mono"
                                placeholder="Admin Token"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl text-center text-sm font-bold animate-shake">
                            Authentication Failed: {error}
                        </div>
                    )}

                    <button 
                        disabled={loading}
                        className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black uppercase tracking-[0.3em] shadow-premium hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin text-slate-900" /> : "Verify Access"}
                        {!loading && <ArrowRight className="w-5 h-5 ml-1" />}
                    </button>
                </form>

                <div className="mt-12 pt-8 border-t border-white/5 text-center">
                    <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Global Maritime Logistical Integration</p>
                </div>
            </div>
        </div>
    );
}
