import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BARBERSHOP_PHONE, BARBERSHOP_PHONE_DISPLAY } from '../services/barbershopData';

export const WhatsAppFloatingButton: React.FC = () => {
  const defaultText = encodeURIComponent('Olá! Gostaria de tirar uma dúvida sobre os horários da barbearia.');
  const whatsappUrl = `https://wa.me/${BARBERSHOP_PHONE}?text=${defaultText}`;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        id="btn-whatsapp-flutuante"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Barbearia no WhatsApp"
        className="group relative flex items-center gap-2 p-3.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.8)] border border-emerald-300 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          Dúvidas? WhatsApp
        </span>

        {/* Status ring */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
        </span>
      </a>
    </div>
  );
};
