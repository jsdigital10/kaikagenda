import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { MessageCircle, Check, Scissors, Calendar, Clock, DollarSign, RotateCcw } from 'lucide-react';
import { ServiceItem, CustomerData } from '../types';
import { formatDateToBR } from '../services/barbershopData';
import { openWhatsAppDirectly, generateWhatsAppUrl } from '../services/whatsappService';
import { Icon3D } from './Icon3D';

interface SuccessStepProps {
  service: ServiceItem;
  date: string;
  time: string;
  customer: CustomerData;
  appointmentId: string;
  onReset: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  service,
  date,
  time,
  customer,
  appointmentId,
  onReset
}) => {
  const formattedDate = formatDateToBR(date);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00e5ff', '#3b82f6', '#ffffff', '#60a5fa']
      });
    } catch (e) {
      // safe fallback if canvas is restricted
    }
  }, []);

  const handleOpenWhatsApp = () => {
    openWhatsAppDirectly({
      customerName: customer.name,
      serviceName: service.name,
      date,
      time,
      price: service.price
    });
  };

  const whatsappHref = generateWhatsAppUrl({
    customerName: customer.name,
    serviceName: service.name,
    date,
    time,
    price: service.price
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto space-y-6 text-center"
    >
      {/* 3D Success Check Icon with Electric Neon Glow */}
      <div className="flex justify-center pt-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-cyan-400/40 rounded-full blur-2xl animate-pulse" />
          <Icon3D type="check" size={42} />
        </motion.div>
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AGENDAMENTO <span className="text-cyan-400">CONFIRMADO!</span>
        </h2>
        <p className="text-sm text-zinc-300">
          Seu horário está 100% reservado no sistema.
        </p>
        <span className="inline-block text-[11px] font-mono text-zinc-500 mt-1">
          ID: {appointmentId}
        </span>
      </div>

      {/* Booking Summary Box */}
      <div className="p-5 rounded-2xl bg-zinc-900/90 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,180,255,0.2)] text-left space-y-3">
        <div className="flex items-center justify-between text-sm pb-2 border-b border-zinc-800">
          <span className="text-zinc-400 flex items-center gap-2">
            <Scissors className="w-4 h-4 text-cyan-400" />
            Serviço
          </span>
          <span className="font-bold text-white">{service.name}</span>
        </div>

        <div className="flex items-center justify-between text-sm pb-2 border-b border-zinc-800">
          <span className="text-zinc-400 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            Data
          </span>
          <span className="font-bold text-white">{formattedDate}</span>
        </div>

        <div className="flex items-center justify-between text-sm pb-2 border-b border-zinc-800">
          <span className="text-zinc-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Horário
          </span>
          <span className="font-extrabold text-cyan-300">{time}</span>
        </div>

        <div className="flex items-center justify-between text-sm pt-1">
          <span className="text-zinc-400 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-cyan-400" />
            Valor
          </span>
          <span className="font-extrabold text-white text-base">{service.formattedPrice}</span>
        </div>
      </div>

      {/* WhatsApp Official Button */}
      <div className="space-y-3 pt-2">
        <a
          id="btn-abrir-whatsapp-sucesso"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleOpenWhatsApp}
          className="w-full py-4 px-6 rounded-2xl font-extrabold text-white text-base tracking-wide flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.75)] border border-emerald-300 active:scale-[0.98] transition-all cursor-pointer"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          <span>ABRIR WHATSAPP</span>
        </a>

        <p className="text-xs text-zinc-400 leading-relaxed px-2">
          Caso o aplicativo não tenha aberto automaticamente na confirmação, toque no botão acima para enviar os dados para o barbeiro.
        </p>
      </div>

      {/* Make another reservation option */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800 hover:bg-zinc-800 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Fazer outro agendamento</span>
        </button>
      </div>
    </motion.div>
  );
};
