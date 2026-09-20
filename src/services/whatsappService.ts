import { formatDateToBR, BARBERSHOP_PHONE } from './barbershopData';

export interface WhatsAppMessageParams {
  customerName: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  price: number;
}

export function generateWhatsAppMessage(params: WhatsAppMessageParams): string {
  const formattedDate = formatDateToBR(params.date);
  const formattedPrice = `R$ ${params.price.toFixed(2).replace('.', ',')}`;

  return `Olá! 👋

Acabei de fazer um agendamento pelo site da barbearia.

👤 Nome: ${params.customerName}
✂️ Serviço: ${params.serviceName}
📅 Data: ${formattedDate}
⏰ Horário: ${params.time}
💰 Valor: ${formattedPrice}

Meu horário foi reservado pelo sistema. Até lá!`;
}

export function generateWhatsAppUrl(params: WhatsAppMessageParams): string {
  const text = generateWhatsAppMessage(params);
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${BARBERSHOP_PHONE}?text=${encodedText}`;
}

export function openWhatsAppDirectly(params: WhatsAppMessageParams): boolean {
  try {
    const url = generateWhatsAppUrl(params);
    // Use location.href or window.open
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = url;
    }
    return true;
  } catch (err) {
    console.error('Failed to open WhatsApp automatically:', err);
    return false;
  }
}
