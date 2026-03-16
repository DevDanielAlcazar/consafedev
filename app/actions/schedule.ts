'use server';

export type ScheduleFormData = {
  process?: string;
  name?: string;
  company?: string;
  email?: string;
  preference?: string;
  date?: string;
  time?: string;
};

export async function submitSchedule(data: ScheduleFormData) {
  try {
    const webhookUrl = 'https://n8n.ebillia.dpdns.org/webhook/d542c4b4-9839-49b4-ae53-b979f6e8f987';
    
    // Enviamos los datos al webhook de n8n
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error en el webhook: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error al enviar el formulario a n8n:', error);
    return { success: false, error: 'Ocurrió un error al procesar la solicitud. Por favor, intente de nuevo.' };
  }
}
