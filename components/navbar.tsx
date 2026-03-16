'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './logo';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Servicios', href: '#servicios' },
    { name: 'Casos de Éxito', href: '#casos' },
    { name: 'Calculadora ROI', href: '#roi' },
    { name: 'El CEO', href: '#ceo' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto liquid-glass rounded-2xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
            <Logo className="w-full h-full" />
          </div>
          <span className="font-space font-bold text-xl tracking-tight text-white">
            ConSafe<span className="text-teal">Dev</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link 
            href="#contacto"
            className="px-6 py-2.5 rounded-xl bg-coral hover:bg-coral-hover text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(255,111,97,0.3)] hover:shadow-[0_0_30px_rgba(255,111,97,0.5)]"
          >
            Agendar Consultoría
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-24 left-6 right-6 liquid-glass rounded-2xl p-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-lg font-medium text-white/80 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="#contacto"
            className="mt-4 px-6 py-3 rounded-xl bg-coral text-white font-semibold text-center"
            onClick={() => setIsOpen(false)}
          >
            Agendar Consultoría
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
