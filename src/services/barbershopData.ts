import { ServiceItem } from '../types';

export const BARBERSHOP_PHONE = '5538998146155';
export const BARBERSHOP_PHONE_DISPLAY = '(38) 99814-6155';

export const SERVICES: ServiceItem[] = [
  {
    id: 'disfarce',
    name: 'DISFARCE',
    price: 30.0,
    formattedPrice: 'R$ 30,00',
    durationMinutes: 45,
    description: 'Degradê perfeito na régua, acabamento limpo e finalização com pomada.',
    badge: 'Mais Popular',
    iconType: 'fade'
  },
  {
    id: 'social',
    name: 'SOCIAL',
    price: 20.0,
    formattedPrice: 'R$ 20,00',
    durationMinutes: 45,
    description: 'Corte tradicional elegante, tesoura e máquina com alinhamento impecável.',
    iconType: 'scissors'
  },
  {
    id: 'barba',
    name: 'BARBA',
    price: 15.0,
    formattedPrice: 'R$ 15,00',
    durationMinutes: 45,
    description: 'Modelagem completa com toalha quente, navalha e óleo hidratante.',
    iconType: 'beard'
  },
  {
    id: 'pigmentacao',
    name: 'PIGMENTAÇÃO',
    price: 20.0,
    formattedPrice: 'R$ 20,00',
    durationMinutes: 45,
    description: 'Camuflagem de falhas e destaque ultra nítido das linhas e degradê.',
    badge: 'Destaque',
    iconType: 'sparkles'
  },
  {
    id: 'sobrancelha',
    name: 'SOBRANCELHA',
    price: 5.0,
    formattedPrice: 'R$ 5,00',
    durationMinutes: 15,
    description: 'Alinhamento preciso na navalha para realçar a harmonia facial.',
    iconType: 'eyebrows'
  },
  {
    id: 'pezinho',
    name: 'PEZINHO',
    price: 10.0,
    formattedPrice: 'R$ 10,00',
    durationMinutes: 20,
    description: 'Contorno de nuca e costeletas na navalha afiada.',
    iconType: 'razor'
  }
];

// Generates slot key deterministically: AAAA-MM-DD_HH-mm
// Example: 2026-09-20_10-15
export function generateSlotKey(dateStr: string, timeStr: string): string {
  const sanitizedTime = timeStr.replace(':', '-');
  return `${dateStr}_${sanitizedTime}`;
}

// Horários de Segunda a Sexta: 08:00 às 19:00 (último início às 18:30)
export const SCHEDULE_TIMES_WEEKDAY = [
  '08:00',
  '08:45',
  '09:30',
  '10:15',
  '11:00',
  '11:45',
  '12:30',
  '13:15',
  '14:00',
  '14:45',
  '15:30',
  '16:15',
  '17:00',
  '17:45',
  '18:30'
];

// Horários de Sábado: 08:00 às 17:00 (último atendimento às 16:15, fechando às 17:00)
export const SCHEDULE_TIMES_SATURDAY = [
  '08:00',
  '08:45',
  '09:30',
  '10:15',
  '11:00',
  '11:45',
  '12:30',
  '13:15',
  '14:00',
  '14:45',
  '15:30',
  '16:15'
];

// Default fallback
export const SCHEDULE_TIMES = SCHEDULE_TIMES_WEEKDAY;

/**
 * Retorna o dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
 */
export function getDayOfWeek(dateStr: string): number {
  if (!dateStr) return -1;
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).getDay();
}

export function isSunday(dateStr: string): boolean {
  return getDayOfWeek(dateStr) === 0;
}

export function isSaturday(dateStr: string): boolean {
  return getDayOfWeek(dateStr) === 6;
}

export function isDateClosed(dateStr: string): boolean {
  return isSunday(dateStr);
}

/**
 * Retorna a lista de horários de acordo com o dia selecionado.
 * Domingo = Fechado ([])
 * Sábado = Até às 17:00 (08:00 às 16:15)
 * Segunda a Sexta = Até às 19:00 (08:00 às 18:30)
 */
export function getScheduleTimesForDate(dateStr: string): string[] {
  if (!dateStr || isSunday(dateStr)) {
    return [];
  }
  if (isSaturday(dateStr)) {
    return SCHEDULE_TIMES_SATURDAY;
  }
  return SCHEDULE_TIMES_WEEKDAY;
}

/**
 * Retorna a data inicial recomendada para agendamento.
 * Se hoje for Domingo (fechado), avança automaticamente para o próximo dia aberto (Segunda-feira).
 */
export function getInitialAvailableBookingDate(): string {
  const today = getSaoPauloToday();
  if (isDateClosed(today)) {
    const [y, m, d] = today.split('-').map(Number);
    const nextDate = new Date(y, m - 1, d + 1);
    const ny = nextDate.getFullYear();
    const nm = String(nextDate.getMonth() + 1).padStart(2, '0');
    const nd = String(nextDate.getDate()).padStart(2, '0');
    return `${ny}-${nm}-${nd}`;
  }
  return today;
}

/**
 * Returns true if a given time has already passed for today in America/Sao_Paulo
 */
export function isTimePastToday(dateStr: string, timeStr: string): boolean {
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  // Current time in America/Sao_Paulo
  const now = new Date();
  const spDateStr = now.toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }); // YYYY-MM-DD
  
  if (dateStr < spDateStr) {
    return true;
  }
  if (dateStr > spDateStr) {
    return false;
  }

  // Same day: compare hour and minutes in SP
  const spTimeParts = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(now);

  const spHours = Number(spTimeParts.find(p => p.type === 'hour')?.value || 0);
  const spMinutes = Number(spTimeParts.find(p => p.type === 'minute')?.value || 0);

  if (hours < spHours) return true;
  if (hours === spHours && minutes <= spMinutes) return true;
  return false;
}

/**
 * Get current date string (YYYY-MM-DD) in America/Sao_Paulo
 */
export function getSaoPauloToday(): string {
  const now = new Date();
  return now.toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
}

/**
 * Phone mask helper for Brazilian WhatsApp: (XX) XXXXX-XXXX
 */
export function formatBRPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Formats YYYY-MM-DD into DD/MM/AAAA
 */
export function formatDateToBR(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}
