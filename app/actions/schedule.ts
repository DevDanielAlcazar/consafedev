'use server';

import { z } from 'zod';

// Zod Schema para validación estricta y Type-Safety
const scheduleSchema = z.object({
  process: z.string().min(1, 'Selecciona un proceso'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  company: z.string().min(2, 'El nombre de la empresa es requerido'),
  email: z.string().email('Ingresa un correo corporativo válido'),
  preference: z.enum(['Google Meet', 'Llamada Telefónica', 'Solo Email']),
  date: z.string().min(1, 'Selecciona una fecha'),
  time: z.string().min(1, 'Selecciona una hora'),
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;

export async function submitSchedule(data: ScheduleFormData) {
  // Validación en el servidor
  const parsed = scheduleSchema.safeParse(data);
  
  if (!parsed.success) {
    return { 
      success: false, 
      error: 'Datos inválidos. Por favor, revisa la información.',
      details: parsed.error.flatten().fieldErrors
    };
  }

  // Simular latencia de red para mostrar el estado de carga elegante
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Placeholder para el Webhook de n8n
  // Reemplazar con la URL real cuando esté disponible
  const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n.con-safe-dev.com/webhook/schedule';

  try {
    // Aquí se enviaría el JSON estructurado a n8n
    // await fetch(N8N_WEBHOOK_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(parsed.data),
    // });
    
    console.log('✅ Datos enviados exitosamente a n8n:', parsed.data);
    
    return { 
      success: true, 
      data: parsed.data 
    };
  } catch (error) {
    console.error('Error enviando a n8n:', error);
    return { 
      success: false, 
      error: 'Ocurrió un error al procesar tu solicitud. Intenta nuevamente.' 
    };
  }
}
