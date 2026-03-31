"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Briefcase, Settings, LogOut, Loader2, Globe } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("gprsi_admin_token");
    if (!token && !pathname.includes("/login")) {
      router.push("/admin/login"); // We'll move login to admin/login for clarity
    } else {
      setAuthorized(true);
    }
    setLoading(false);
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("gprsi_admin_token");
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Content Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Landing Page", href: "/admin?tab=home", icon: Globe },
    { name: "About Page", href: "/admin?tab=about", icon: FileText },
    { name: "Services", href: "/admin?tab=services", icon: Settings },
    { name: "Projects Portfolio", href: "/admin?tab=projects", icon: Briefcase },
    { name: "Global Settings", href: "/admin?tab=footer", icon: Settings },
  ];

  if (loading) {
    return (
        <div className="h-screen flex items-center justify-center bg-slate-900">
            <Loader2 className="w-12 h-12 animate-spin text-white opacity-20" />
        </div>
    );
  }

  // Allow the login page to render without the sidebar
  if (pathname.includes("/admin/login")) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Dashboard Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col fixed inset-y-0 shadow-2xl z-50">
        <div className="p-8 border-b border-white/5">
            <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 font-black shadow-lg group-hover:scale-110 transition-all">G</div>
                <div>
                    <h1 className="font-black tracking-tight text-xl">Command</h1>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">GPRSI Center</p>
                </div>
            </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2 mt-4">
            {navItems.map((item) => (
                <Link 
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold transition-all ${
                        pathname === item.href 
                        ? "bg-white text-slate-900 shadow-xl scale-105" 
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                </Link>
            ))}
        </nav>

        <div className="p-6 border-t border-white/5">
            <Link href="/" className="flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold text-blue-400 hover:bg-blue-400/10 transition-all">
                <Globe className="w-5 h-5" />
                View Website
            </Link>
            <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all mt-2"
            >
                <LogOut className="w-5 h-5" />
                Logout
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}
