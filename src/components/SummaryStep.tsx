import React from 'react';
import { motion } from 'motion/react';
import { User, Scissors, Calendar, Clock, DollarSign, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { ServiceItem, CustomerData } from '../types';
import { formatDateToBR } from '../services/barbershopData';
import { Icon3D } from './Icon3D';

interface SummaryStepProps {
  service: ServiceItem;
  date: string;
  time: string;
  customer: CustomerData;
  isSubmitting: boolean;
  conflictError: string | null;
  onConfirmBooking: () => void;
  onBack: () => void;
  onPickAnotherTime: () => void;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({
  service,
  date,
  time,
  customer,
  isSubmitting,
  conflictError,
  onConfirmBooking,
  onBack,
  onPickAnotherTime
}) => {
  const formattedDate = formatDateToBR(date);

  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Confira seu <span className="text-cyan-400">agendamento</span>
        </h2>
        <p className="text-sm text-zinc-400">
          Revise os detalhes antes da confirmação atômica no banco de dados
        </p>
      </div>

      {/* Summary Premium Card */}
      <div className="max-w-md mx-auto relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-zinc-900/95 via-zinc-900/90 to-black/95 border-2 border-blue-500/40 shadow-[0_0_35px_rgba(0,180,255,0.25)] backdrop-blur-xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-40 h-20 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Resumo Oficial
          </span>
          <span className="text-xs text-zinc-400">
            Status: <span className="text-amber-400 font-semibold">Pronto para confirmar</span>
          </span>
        </div>

        {/* Details list */}
        <div className="py-4 space-y-4">
          {/* Customer */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 text-zinc-300">
              <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-cyan-400">
                <User className="w-4 h-4" />
              </div>
              <span>Cliente</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-white block">{customer.name}</span>
              <span className="text-xs text-zinc-400">{customer.phone}</span>
            </div>
          </div>

          {/* Service */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 text-zinc-300">
              <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-cyan-400">
                <Scissors className="w-4 h-4" />
              </div>
              <span>Serviço</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-white block">{service.name}</span>
              <span className="text-xs text-zinc-400">{service.durationMinutes} minutos</span>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 text-zinc-300">
              <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-cyan-400">
                <Calendar className="w-4 h-4" />
              </div>
              <span>Data</span>
            </div>
            <span className="font-bold text-white">{formattedDate}</span>
          </div>

          {/* Time */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 text-zinc-300">
              <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-cyan-400">
                <Clock className="w-4 h-4" />
              </div>
              <span>Horário</span>
            </div>
            <span className="font-extrabold text-cyan-300 text-base">{time}</span>
          </div>

          {/* Price */}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-zinc-300">
              <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="font-medium text-white">Valor Total</span>
            </div>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400">
              {service.formattedPrice}
            </span>
          </div>
        </div>

        {/* Conflict Error Message (Requirement 10) */}
        {conflictError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 p-4 rounded-xl bg-amber-950/40 border-2 border-amber-500/60 text-amber-200 text-xs space-y-2"
          >
            <div className="flex items-center gap-2 font-bold text-sm text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{conflictError}</span>
            </div>
            <p className="text-zinc-300">
              Outro cliente concluiu a reserva para este mesmo slot milissegundos antes. Por favor, selecione outro horário vago.
            </p>
            <button
              type="button"
              onClick={onPickAnotherTime}
              className="w-full py-2.5 px-3 rounded-lg bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors cursor-pointer mt-1"
            >
              Escolher outro horário disponível
            </button>
          </motion.div>
        )}

        {/* Large Confirm Button */}
        {!conflictError && (
          <div className="pt-3">
            <button
              type="button"
              id="btn-confirm-booking"
              disabled={isSubmitting}
              onClick={onConfirmBooking}
              className="w-full py-4 px-6 rounded-xl font-extrabold text-white text-base tracking-wide flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 shadow-[0_0_30px_rgba(0,180,255,0.6)] hover:shadow-[0_0_40px_rgba(0,220,255,0.8)] border border-cyan-300 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-cyan-200" />
                  <span>Verificando & Reservando no Firebase…</span>
                </>
              ) : (
                <>
                  <Icon3D type="check" size={20} className="shadow-none" />
                  <span>CONFIRMAR AGENDAMENTO</span>
                  <ArrowRight className="w-5 h-5 text-cyan-200" />
                </>
              )}
            </button>
          </div>
        )}

        <div className="text-center mt-3">
          <span className="text-[11px] text-zinc-500">
            A reserva é gravada instantaneamente e abrirá o WhatsApp do barbeiro.
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      {!conflictError && (
        <div className="flex items-center justify-center pt-1 max-w-md mx-auto">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onBack}
            className="px-5 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer disabled:opacity-40"
          >
            ← Alterar informações
          </button>
        </div>
      )}
    </div>
  );
};
