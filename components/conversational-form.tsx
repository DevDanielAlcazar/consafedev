'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, ArrowLeft, Calendar as CalendarIcon, Clock, Loader2, Sparkles } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { Calendar } from './ui/calendar';
import { submitSchedule, ScheduleFormData } from '@/app/actions/schedule';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const PROCESS_OPTIONS = ['Ventas', 'Operación', 'Administración', 'Otro'];
const PREFERENCE_OPTIONS = ['Google Meet', 'Llamada Telefónica', 'Solo Email'] as const;
const TIME_SLOTS = [
  '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', 
  '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', 
  '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
];

export function ConversationalForm() {
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<Partial<ScheduleFormData>>({});
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const updateData = (fields: Partial<ScheduleFormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    setError(null);
    setStep(s => s + 1);
  };
  
  const prevStep = () => {
    setError(null);
    setStep(s => s - 1);
  };

  const handleSubmit = () => {
    if (!formData.process || !formData.name || !formData.email || !formData.preference || !date || !formData.time) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    startTransition(async () => {
      const result = await submitSchedule({
        ...formData,
        date: date.toISOString(),
      } as ScheduleFormData);

      if (result.success) {
        setStep(4); // Success step
      } else {
        setError(result.error || 'Ocurrió un error.');
      }
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      filter: 'blur(10px)',
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      filter: 'blur(10px)',
    }),
  };

  return (
    <section id="contacto" className="py-24 relative z-10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-space font-bold mb-4">
            Agende su <span className="text-teal">Transformación</span>
          </h2>
          <p className="text-white/70 font-inter">
            Comencemos a diseñar la arquitectura que escalará su visión.
          </p>
        </div>

        <GlassCard className="p-8 md:p-12 min-h-[450px] flex flex-col relative overflow-hidden">
          
          {/* Progress Bar */}
          {step < 4 && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
              <motion.div 
                className="h-full bg-teal"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          )}

          <div className="flex-1 relative">
            <AnimatePresence mode="wait" custom={1}>
              
              {/* STEP 0: Process */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  custom={1}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col h-full justify-center"
                >
                  <h3 className="text-2xl font-space font-bold mb-8 text-center">¿Cuál es el proceso que más tiempo le quita hoy?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PROCESS_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { updateData({ process: opt }); nextStep(); }}
                        className="p-6 rounded-2xl liquid-glass border border-white/10 hover:border-teal/50 hover:bg-white/5 transition-all text-lg font-medium text-white/90 group flex items-center justify-between"
                      >
                        {opt}
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-teal" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 1: Contact Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={1}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col h-full justify-center max-w-md mx-auto w-full"
                >
                  <h3 className="text-2xl font-space font-bold mb-8 text-center">Datos de Contacto</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Nombre Completo</label>
                      <input 
                        type="text" 
                        value={formData.name || ''}
                        onChange={(e) => updateData({ name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-transparent transition-all"
                        placeholder="Tu nombre de contacto"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Empresa <span className="text-white/30 text-xs font-normal">(Opcional)</span></label>
                      <input 
                        type="text" 
                        value={formData.company || ''}
                        onChange={(e) => updateData({ company: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-transparent transition-all"
                        placeholder="ConSafeDev"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Teléfono <span className="text-white/30 text-xs font-normal">(Opcional)</span></label>
                      <input 
                        type="tel" 
                        value={formData.phone || ''}
                        onChange={(e) => updateData({ phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-transparent transition-all"
                        placeholder="+52 123 456 7890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Correo Electrónico</label>
                      <input 
                        type="email" 
                        value={formData.email || ''}
                        onChange={(e) => updateData({ email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-transparent transition-all"
                        placeholder="ejemplo@correo.com"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-8">
                    <button onClick={prevStep} className="px-6 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" /> Volver
                    </button>
                    <button 
                      onClick={nextStep} 
                      disabled={!formData.name || !formData.email}
                      className="px-6 py-3 rounded-xl bg-teal hover:bg-teal/90 text-white font-semibold transition-all shadow-[0_0_20px_rgba(0,95,107,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      Siguiente <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Preference */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={1}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col h-full justify-center"
                >
                  <h3 className="text-2xl font-space font-bold mb-8 text-center">¿Cómo prefiere que lo contactemos?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {PREFERENCE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { updateData({ preference: opt }); nextStep(); }}
                        className="p-6 rounded-2xl liquid-glass border border-white/10 hover:border-teal/50 hover:bg-white/5 transition-all text-center group"
                      >
                        <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-teal/20 group-hover:text-teal transition-colors">
                          {opt === 'Google Meet' && <Sparkles className="w-6 h-6" />}
                          {opt === 'Llamada Telefónica' && <Clock className="w-6 h-6" />}
                          {opt === 'Solo Email' && <CalendarIcon className="w-6 h-6" />}
                        </div>
                        <span className="font-medium text-white/90">{opt}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-start mt-8">
                    <button onClick={prevStep} className="px-6 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" /> Volver
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Date & Time */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={1}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col h-full justify-center"
                >
                  <h3 className="text-2xl font-space font-bold mb-8 text-center">Seleccione Fecha y Hora</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="liquid-glass rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        locale={es}
                        className="text-white"
                      />
                      {date && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 px-4 py-2 rounded-lg bg-teal/20 border border-teal/30 text-teal-50 text-sm font-medium text-center w-full"
                        >
                          Seleccionaste: <br/>
                          <span className="text-white font-bold capitalize">{format(date, "EEEE d 'de' MMMM", { locale: es })}</span>
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-white/70 mb-2">Horarios Disponibles</h4>
                      <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            onClick={() => updateData({ time: t })}
                            className={`p-3 rounded-xl border transition-all text-sm font-medium ${
                              formData.time === t 
                                ? 'bg-teal border-teal text-white shadow-[0_0_15px_rgba(0,95,107,0.4)]' 
                                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>

                      {error && (
                        <div className="p-3 mt-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
                        <button onClick={prevStep} disabled={isPending} className="px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={handleSubmit} 
                          disabled={!date || !formData.time || isPending}
                          className="px-8 py-3 rounded-xl bg-coral hover:bg-coral-hover text-white font-bold transition-all shadow-[0_0_20px_rgba(255,111,97,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {isPending ? (
                            <>Procesando <Loader2 className="w-5 h-5 animate-spin" /></>
                          ) : (
                            <>Confirmar Cita <CheckCircle2 className="w-5 h-5" /></>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Success */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", delay: 0.2, duration: 0.8 }}
                    className="w-24 h-24 rounded-full bg-teal/20 border border-teal flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,95,107,0.5)]"
                  >
                    <CheckCircle2 className="w-12 h-12 text-teal" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-space font-bold mb-4">
                    ¡Excelente elección, <span className="text-teal">{formData.name?.split(' ')[0]}</span>!
                  </h3>
                  
                  <p className="text-lg text-white/80 font-inter max-w-md leading-relaxed">
                    En ConSafeDev ya tenemos tu caso en nuestro escritorio. Nos vemos el <strong className="text-white">{date ? format(date, "d 'de' MMMM", { locale: es }) : ''}</strong> a las <strong className="text-white">{formData.time}</strong> vía <strong className="text-white">{formData.preference}</strong>.
                  </p>

                  <p className="mt-8 text-sm text-white/50 italic">
                    Vamos a transformar ConSafeDev en tu mejor aliado.
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
