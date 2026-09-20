import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Phone, ShieldCheck, Zap } from 'lucide-react';
import { CustomerData } from '../types';
import { formatBRPhone } from '../services/barbershopData';

interface CustomerStepProps {
  customerData: CustomerData;
  onChangeCustomerData: (data: CustomerData) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const CustomerStep: React.FC<CustomerStepProps> = ({
  customerData,
  onChangeCustomerData,
  onContinue,
  onBack
}) => {
  const [error, setError] = useState<string>('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBRPhone(e.target.value);
    onChangeCustomerData({ ...customerData, phone: formatted });
    if (error) setError('');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeCustomerData({ ...customerData, name: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerData.name.trim() || customerData.name.trim().length < 2) {
      setError('Por favor, informe seu nome completo ou primeiro nome.');
      return;
    }

    const cleanPhoneDigits = customerData.phone.replace(/\D/g, '');
    if (cleanPhoneDigits.length < 10) {
      setError('Por favor, informe um número de WhatsApp válido com DDD (ex: 38 99814-6155).');
      return;
    }

    setError('');
    onContinue();
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Seus <span className="text-cyan-400">dados de contato</span>
        </h2>
        <p className="text-sm text-zinc-400">
          Rápido e direto: sem senhas, sem e-mails e sem formulários demorados
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        {/* Name Input */}
        <div className="space-y-1.5">
          <label htmlFor="customer-name" className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            Seu Nome
          </label>
          <div className="relative">
            <input
              id="customer-name"
              type="text"
              required
              autoFocus
              placeholder="Ex: Carlos Silva"
              value={customerData.name}
              onChange={handleNameChange}
              className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all font-medium text-base shadow-inner"
            />
          </div>
        </div>

        {/* WhatsApp Phone Input */}
        <div className="space-y-1.5">
          <label htmlFor="customer-phone" className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            Seu WhatsApp
          </label>
          <div className="relative">
            <input
              id="customer-phone"
              type="tel"
              required
              placeholder="(38) 99999-9999"
              value={customerData.phone}
              onChange={handlePhoneChange}
              maxLength={15}
              className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all font-medium text-base shadow-inner"
            />
          </div>
          <span className="text-[11px] text-zinc-500 block">
            Utilizado para a confirmação direta da sua reserva.
          </span>
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2"
          >
            <span>⚠️</span>
            <span>{error}</span>
          </motion.div>
        )}

        {/* Privacy Note */}
        <div className="p-3.5 rounded-xl bg-blue-950/25 border border-blue-500/20 text-xs text-zinc-400 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-zinc-200">Privacidade Garantida:</strong> Seus dados de contato ficam guardados com segurança e nunca são expostos na consulta pública de horários.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-3">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-3.5 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white bg-zinc-900/70 border border-zinc-800 hover:bg-zinc-800 transition-all cursor-pointer"
          >
            ← Voltar
          </button>

          <button
            type="submit"
            id="btn-continue-to-summary"
            className="flex-1 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(0,180,255,0.4)] hover:shadow-[0_0_30px_rgba(0,220,255,0.6)] border border-cyan-400/40 transition-all cursor-pointer text-center flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-cyan-200 fill-current" />
            <span>Revisar Agendamento</span>
          </button>
        </div>
      </form>
    </div>
  );
};
