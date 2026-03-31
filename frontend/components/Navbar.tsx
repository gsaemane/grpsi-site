"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || pathname !== "/" ? "glass py-3 shadow-premium" : "bg-transparent py-5 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-2xl font-bold tracking-tighter flex items-center gap-2 ${
              isScrolled || pathname !== "/" ? "text-grpsi-blue" : "text-white"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
              isScrolled || pathname !== "/" ? "bg-grpsi-gold text-grpsi-blue" : "bg-white text-grpsi-blue"
            }`}>G</div>
            <span>GPRSI</span>
          </motion.div>
        </Link>

        <div className={`hidden md:flex space-x-10 text-sm font-semibold uppercase tracking-widest ${
          isScrolled || pathname !== "/" ? "text-grpsi-blue" : "text-white"
        }`}>
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className="relative group overflow-hidden"
            >
              <span className="hover:text-grpsi-gold transition-colors">{item.name}</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-grpsi-gold transform transition-transform origin-left ${
                pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </Link>
          ))}
        </div>

        <Link href="/contact">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all hover:shadow-lg active:scale-95 ${
              isScrolled || pathname !== "/" ? "bg-grpsi-blue text-white hover:bg-grpsi-blue-light" : "bg-white text-grpsi-blue hover:bg-grpsi-gold"
            }`}
          >
            Get Quote
          </motion.button>
        </Link>
      </div>
    </nav>
  );
}