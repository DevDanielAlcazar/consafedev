'use client';

import { motion } from 'motion/react';
import { Shield, Globe, Award, ChevronRight } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import Link from 'next/link';
import Image from 'next/image';

export function CeoFooter() {
  return (
    <section id="ceo" className="py-24 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-navy-dark/50">
      <div className="max-w-7xl mx-auto px-6">
        <GlassCard className="p-8 md:p-12 overflow-hidden relative">
          
          {/* Abstract Background for CEO Section */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/10 rounded-full mix-blend-screen filter blur-[80px] opacity-50 translate-x-1/3 -translate-y-1/3 pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* CEO Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4"
            >
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-navy to-teal/20 border border-white/10 relative overflow-hidden group shadow-2xl">
                <Image 
                  src="https://drive.google.com/file/d/1HBpPicZMFow4Le80a4yaGG9Gydl6C7W-/view?usp=drive_link" 
                  alt="Jesús Daniel Nava Alcázar - CEO de ConSafeDev" 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay gradient for text readability and blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal/20 border border-teal/50 flex items-center justify-center backdrop-blur-md">
                    <Shield className="w-5 h-5 text-teal" />
                  </div>
                  <span className="font-space font-bold text-sm tracking-widest uppercase text-white drop-shadow-md">
                    Garantía de Calidad
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CEO Copywriting */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 flex flex-col justify-center"
            >
              <div className="mb-6">
                <h3 className="text-3xl md:text-4xl font-space font-bold mb-2">Jesús Daniel Nava Alcázar</h3>
                <p className="text-teal font-medium tracking-wide uppercase text-sm">Estratega de Operaciones y Maestro Arquitecto</p>
              </div>

              <blockquote className="text-xl md:text-2xl font-inter font-light text-white/90 leading-relaxed mb-8 border-l-2 border-teal pl-6">
                &quot;Un software es tan bueno como la mente que lo diseña. En ConSafeDev, no escribimos líneas de código; construimos activos digitales resilientes. El software es una inversión, y mi compromiso es garantizar que retorne con creces.&quot;
              </blockquote>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 mt-1">
                    <Award className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <h4 className="font-space font-bold text-lg text-white">78% Reducción de Incidencias</h4>
                    <p className="text-sm text-white/60 font-inter mt-1">Historial comprobado optimizando infraestructuras críticas y eliminando fallos operativos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 mt-1">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-space font-bold text-lg text-white">Impacto Global</h4>
                    <p className="text-sm text-white/60 font-inter mt-1">Arquitectura de soluciones desplegadas en proyectos de alta exigencia a nivel nacional e internacional.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-white/10">
                <div className="flex-1">
                  <p className="text-sm text-white/50 font-inter">
                    Respaldando cada línea de código de <strong className="text-white">ConSafeDev</strong>.
                  </p>
                </div>
                <Link 
                  href="#contacto"
                  className="group flex items-center gap-2 text-sm font-bold text-teal hover:text-teal-300 transition-colors"
                >
                  Agendar con Daniel
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.div>

          </div>
        </GlassCard>
      </div>
    </section>
  );
}
