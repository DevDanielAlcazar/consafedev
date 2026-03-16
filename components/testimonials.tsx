'use client';

import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { GlassCard } from './ui/glass-card';

const TESTIMONIALS = [
  {
    company: "Arca Continental",
    author: "Director de Logística y Operaciones",
    content: "La arquitectura de software que ConSafeDev implementó transformó por completo nuestra visibilidad en la cadena de suministro. Redujimos los tiempos de conciliación en un 85% y eliminamos los cuellos de botella manuales. No solo entregan código, entregan soluciones de negocio reales y medibles.",
    rating: 5
  },
  {
    company: "Cadena Comercial OXXO",
    author: "VP de Innovación Tecnológica",
    content: "Necesitábamos un sistema de alta disponibilidad capaz de procesar miles de transacciones por minuto sin latencia. El equipo de Daniel no solo cumplió con los requerimientos de misión crítica, sino que optimizó nuestra infraestructura reduciendo costos de servidores en un 40%.",
    rating: 5
  },
  {
    company: "SIEMENS",
    author: "Head of Industrial Automation",
    content: "En el sector industrial, un fallo de software cuesta millones. ConSafeDev auditó y reconstruyó nuestros sistemas de monitoreo con una precisión absoluta. Su enfoque en la reducción de incidencias y la seguridad de los datos nos dio la confianza que necesitábamos para escalar.",
    rating: 5
  }
];

export function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="casos" className="py-24 relative z-10 bg-navy-dark/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass w-fit border-teal/30 mb-6"
          >
            <Star className="w-4 h-4 text-teal fill-teal" />
            <span className="text-sm font-medium text-teal-50">Casos de Éxito</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-space font-bold mb-6"
          >
            Resultados que <span className="text-teal">Hablan por Sí Solos</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-lg font-inter max-w-2xl mx-auto"
          >
            Empresas líderes confían en nuestra arquitectura para sostener sus operaciones más críticas.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <GlassCard className="p-8 h-full flex flex-col relative group hover:border-teal/50 transition-colors duration-500">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5 group-hover:text-teal/10 transition-colors duration-500" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-coral fill-coral" />
                  ))}
                </div>

                <p className="text-white/80 font-inter leading-relaxed mb-8 flex-grow relative z-10">
                  &quot;{testimonial.content}&quot;
                </p>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <h4 className="font-space font-bold text-lg text-white">{testimonial.company}</h4>
                  <p className="text-sm text-teal font-medium mt-1 uppercase tracking-wide">{testimonial.author}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
