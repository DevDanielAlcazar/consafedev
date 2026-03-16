'use client';

import { motion } from 'motion/react';
import { GlassCard } from './ui/glass-card';
import { MonitorSmartphone, Database, Bot, Cpu } from 'lucide-react';

export function BentoServices() {
  const services = [
    {
      title: "Desarrollo Moderno (Web & Mobile)",
      description: "Arquitecturas de vanguardia con Next.js y React. Velocidades de carga instantáneas y SEO superior para dominar su mercado.",
      icon: <MonitorSmartphone className="w-8 h-8 text-teal" />,
      className: "md:col-span-2 md:row-span-2",
      metric: "10x",
      metricLabel: "Más rápido con Turbopack"
    },
    {
      title: "Sistemas de Misión Crítica",
      description: "ERPs y CRMs personalizados que se adaptan al 100% a la lógica de su negocio.",
      icon: <Database className="w-8 h-8 text-blue-400" />,
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Inteligencia Agentica",
      description: "Flujos inteligentes y automatización extrema conectando cualquier API.",
      icon: <Bot className="w-8 h-8 text-coral" />,
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Modernización de Legados",
      description: "Transformamos sistemas obsoletos o basados en Excel hacia plataformas cloud seguras y escalables.",
      icon: <Cpu className="w-8 h-8 text-purple-400" />,
      className: "md:col-span-2 md:row-span-1",
    }
  ];

  return (
    <section id="servicios" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-space font-bold mb-6">
            Ingeniería Universal para <br/>
            <span className="text-teal">Desafíos Complejos</span>
          </h2>
          <p className="text-white/70 text-lg font-inter">
            Si el proceso existe, podemos digitalizarlo, optimizarlo y escalarlo. No nos limitamos a una herramienta; construimos la solución exacta que su empresa necesita.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={service.className}
            >
              <GlassCard className="h-full p-8 flex flex-col justify-between">
                <div>
                  <div className="mb-6 p-3 bg-white/5 w-fit rounded-2xl border border-white/10">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-space font-bold mb-3">{service.title}</h3>
                  <p className="text-white/60 font-inter text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                {service.metric && (
                  <div className="mt-6 flex items-end gap-3">
                    <span className="text-4xl font-space font-bold text-teal">{service.metric}</span>
                    <span className="text-sm text-white/50 mb-1">{service.metricLabel}</span>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
