"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Ship, Users } from "lucide-react";

export default function Footer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchFooter = async () => {
        try {
            const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
            const url = apiBase.endsWith('/api') ? `${apiBase}/content` : `${apiBase}/api/content`;
            
            const res = await fetch(url);
            const allData = await res.json();
            setData(allData.footer);
        } catch (err) {
            console.error("Footer sync failed");
        }
    };
    fetchFooter();
  }, []);

  const footer = data || {
    description: "Leading provider of logistical support and specialized services in the Solomon Islands. Dedicated to regional development through maritime and engineering excellence.",
    address: "Kukum Highway, Honiara, Solomon Islands",
    email: "info@grpsi.com",
    phone: "+677 24567"
  };

  const icons:Record<string, any> = { Globe, Ship, Users };

  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-24 pb-12 font-sans">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-20">
                <div className="col-span-2">
                    <div className="text-3xl font-bold text-grpsi-blue mb-6 tracking-tighter">GPRSI</div>
                    <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
                        {footer.description}
                    </p>
                    <div className="flex gap-4">
                        {(footer.social || [{platform: "Globe", url: "#"}, {platform: "Ship", url: "#"}, {platform: "Users", url: "#"}]).map((item: any, i: number) => {
                            const Icon = icons[item.platform] || Globe;
                            return (
                                <a key={i} href={item.url} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-grpsi-blue hover:border-grpsi-blue transition-all shadow-sm">
                                    <Icon className="w-5 h-5" />
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-grpsi-blue mb-6 uppercase text-sm tracking-widest">Links</h4>
                    <ul className="space-y-4 text-slate-500">
                        <li><Link href="/about" className="hover:text-grpsi-blue transition-colors">Our Story</Link></li>
                        <li><Link href="/services" className="hover:text-grpsi-blue transition-colors">Services</Link></li>
                        <li><Link href="/contact" className="hover:text-grpsi-blue transition-colors">Get Started</Link></li>
                        <li><a href="#" className="hover:text-grpsi-blue transition-colors">Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-grpsi-blue mb-6 uppercase text-sm tracking-widest">Headquarters</h4>
                    <ul className="space-y-4 text-slate-500 text-sm md:text-base">
                        <li className="flex gap-3">
                            <MapPin className="w-5 h-5 text-grpsi-gold shrink-0 border-none" />
                            <span>{footer.address}</span>
                        </li>
                        <li className="flex gap-3">
                            <Mail className="w-5 h-5 text-grpsi-gold shrink-0" />
                            <span>{footer.email}</span>
                        </li>
                        <li className="flex gap-3">
                            <Phone className="w-5 h-5 text-grpsi-gold shrink-0" />
                            <span>{footer.phone}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="pt-8 border-t border-slate-200 text-center text-slate-400 text-xs md:text-sm">
                <p>© {new Date().getFullYear()} GRP & Associates Ltd. Delivering Excellence Across the Islands.</p>
            </div>
        </div>
    </footer>
  );
}
