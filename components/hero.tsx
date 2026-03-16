'use client';

import { motion } from 'motion/react';
import { ArrowRight, Activity, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  // Kinetic Typography Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-navy rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal rounded-full mix-blend-screen filter blur-[120px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Copy */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass w-fit border-teal/30">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-sm font-medium text-teal-50">Boutique de Ingeniería Universal</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-space font-bold leading-[1.1] tracking-tight">
            El Software Dejó de Ser un Gasto. <br />
            <span className="text-gradient">Conviértalo en su Motor de Rentabilidad.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-inter">
            Transformamos el caos operativo en sistemas de alto rendimiento. Desarrollo a medida, inteligencia agentica y modernización de infraestructuras críticas que escalan su visión.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="#contacto"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-coral hover:bg-coral-hover text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(255,111,97,0.3)] hover:shadow-[0_0_40px_rgba(255,111,97,0.6)]"
            >
              Iniciar Transformación
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#roi"
              className="flex items-center justify-center px-8 py-4 rounded-xl liquid-glass hover:bg-white/10 text-white font-semibold text-lg transition-all"
            >
              Calcular mi ROI
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column: Office Image with Glass Overlay */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative hidden lg:block perspective-1000"
        >
          <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl transform-gpu hover:rotate-y-[-5deg] hover:rotate-x-[5deg] transition-transform duration-700 group">
            
            {/* The Office/Team Image */}
            <Image 
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070" 
              alt="Equipo de ingeniería de software analizando datos en una mesa interactiva" 
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-dark/80 via-navy-dark/40 to-transparent mix-blend-multiply" />
            <div className="absolute inset-0 bg-teal/10 mix-blend-overlay" />

            {/* Floating Glass UI Elements over the image */}
            <div className="absolute bottom-8 left-8 right-8 liquid-glass rounded-2xl p-6 border-white/10 backdrop-blur-md">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-teal/20 flex items-center justify-center border border-teal/30">
                  <Activity className="w-6 h-6 text-teal" />
                </div>
                <div className="px-4 py-1.5 rounded-full bg-coral/20 border border-coral/30 text-coral-100 text-sm font-bold shadow-[0_0_15px_rgba(255,111,97,0.4)]">
                  +391% Eficiencia
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <ShieldCheck className="w-6 h-6 text-blue-400 mb-1" />
                  <div className="text-xl font-space font-bold text-white">100%</div>
                  <div className="text-xs text-white/60">Misión Crítica</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <Zap className="w-6 h-6 text-teal mb-1" />
                  <div className="text-xl font-space font-bold text-white">&lt; 5ms</div>
                  <div className="text-xs text-white/60">Latencia</div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
