"use server";

export type ScheduleFormData = {
  process?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  preference?: string;
  date?: string;
  time?: string;
};

/**
 * Legacy scheduling action retained only because the current automation
 * environment blocks file deletion.
 *
 * Production scheduling is handled by the configured Google Calendar and
 * WhatsApp destinations in `lib/consafedev/site-config.ts`.
 */
export async function submitSchedule(_data: ScheduleFormData) {
  return {
    success: false,
    error: "Este flujo de agenda fue retirado. Usa los canales de contacto publicados.",
  };
}
