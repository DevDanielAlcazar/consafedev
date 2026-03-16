'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from './ui/glass-card';
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react';

export function RoiCalculator() {
  const [hours, setHours] = useState<number>(40);
  const [cost, setCost] = useState<number>(25);

  // Fórmula: Horas manuales x Costo x 52 semanas
  const annualCost = hours * cost * 52;
  // Estimamos un 85% de ahorro al automatizar procesos repetitivos
  const estimatedSavings = annualCost * 0.85;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="roi" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Copywriting B2B High-Ticket */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass w-fit border-coral/30 mb-6">
              <Calculator className="w-4 h-4 text-coral" />
              <span className="text-sm font-medium text-coral-50">Proyección de Rentabilidad</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-space font-bold mb-6 leading-tight">
              Deje de Subsidiar la <br/>
              <span className="text-teal">Ineficiencia Operativa.</span>
            </h2>
            
            <p className="text-white/70 text-lg font-inter mb-8 leading-relaxed">
              En la economía actual, el trabajo manual repetitivo no es solo un cuello de botella; es una fuga de capital silenciosa. Calcule el costo oculto de sus operaciones y descubra el impacto directo en su EBITDA al implementar Arquitectura de Software de alto rendimiento.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                'Eliminación de errores humanos en un 99.9%',
                'Reasignación de talento a tareas de alto valor',
                'Operación continua 24/7 sin costos extra'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80 font-inter">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Interactive Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard className="p-8 md:p-10 border-teal/20">
              <div className="space-y-8">
                
                {/* Sliders */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-teal" /> Horas manuales por semana
                      </label>
                      <span className="font-space font-bold text-teal">{hours} hrs</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="200" 
                      step="5"
                      value={hours} 
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-teal" /> Costo promedio por hora
                      </label>
                      <span className="font-space font-bold text-teal">{formatCurrency(cost)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="1000" 
                      step="10"
                      value={cost} 
                      onChange={(e) => setCost(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal"
                    />
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Results */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-white/60 text-sm">Costo Anual de Ineficiencia</span>
                    <span className="font-space text-xl text-white/80">{formatCurrency(annualCost)}</span>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal/20 to-navy p-6 border border-teal/30">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <TrendingUp className="w-24 h-24 text-teal" />
                    </div>
                    <span className="relative z-10 block text-teal-100 text-sm font-medium mb-1">Ahorro Anual Estimado (85%)</span>
                    <span className="relative z-10 block font-space text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                      {formatCurrency(estimatedSavings)}
                    </span>
                  </div>
                </div>

              </div>
            </GlassCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
