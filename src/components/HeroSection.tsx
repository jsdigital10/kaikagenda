import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Icon3D } from './Icon3D';

interface HeroSectionProps {
  onStartBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartBooking }) => {
  return (
    <section className="relative w-full pt-6 pb-12 px-4 flex flex-col items-center text-center overflow-hidden">
      {/* Background ambient lighting and cinematographic glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-b from-blue-600/25 via-cyan-500/10 to-transparent rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-[70px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* Floating particles effect (subtle luxury) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 opacity-40">
        <div className="absolute top-12 left-1/5 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_8px_#00f0ff] animate-pulse" />
        <div className="absolute top-36 right-1/6 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_#00a8ff]" />
        <div className="absolute top-64 left-1/3 w-1 h-1 bg-sky-200 rounded-full shadow-[0_0_6px_#38bdf8]" />
      </div>

      {/* Barbershop Logo with transparent PNG preserved + light sweep animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-6 group cursor-pointer"
        onClick={onStartBooking}
      >
        {/* Subtle electric blue aura behind logo (NO background box or white frame) */}
        <div className="absolute inset-0 bg-blue-500/15 blur-2xl rounded-full scale-95 group-hover:scale-105 transition-transform duration-700" />
        
        <div className="relative overflow-hidden inline-block rounded-2xl">
          <img
            src="https://i.postimg.cc/HnLtM85x/Design-sem-nome.png"
            alt="Logo da Barbearia"
            className="w-56 sm:w-72 md:w-80 h-auto object-contain drop-shadow-[0_0_20px_rgba(0,180,255,0.4)] transition-transform duration-500 hover:scale-[1.02]"
          />
          {/* Light sweep animation crossing smoothly through the logo */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_3.8s_infinite] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="max-w-xl mx-auto space-y-3"
      >
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md uppercase">
          SEU VISUAL. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_20px_rgba(0,210,255,0.6)]">SEU HORÁRIO.</span>
        </h1>

        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto font-normal">
          Escolha seu serviço e reserve seu horário com praticidade. Confirmação instantânea direto no WhatsApp.
        </p>
      </motion.div>

      {/* CTA Button with 3D Calendar Icon & Electric Neon Glow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mt-7 w-full max-w-xs"
      >
        <button
          id="btn-hero-agendar"
          onClick={onStartBooking}
          className="relative group w-full py-4 px-6 rounded-2xl font-bold text-white text-base tracking-wide flex items-center justify-center gap-3 overflow-hidden cursor-pointer transition-all duration-300 active:scale-[0.98] shadow-[0_0_30px_rgba(0,162,255,0.45)] border border-cyan-400/40 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 hover:shadow-[0_0_40px_rgba(0,200,255,0.7)] hover:border-cyan-300"
        >
          {/* Subtle sheen highlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <Icon3D type="calendar" size={24} className="shadow-none" />
          <span className="relative z-10 text-white font-extrabold drop-shadow">
            AGENDAR AGORA
          </span>
          <ArrowDown className="w-5 h-5 text-cyan-200 group-hover:translate-y-1 transition-transform" />
        </button>

        {/* Quick assurance info */}
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Sem cadastro
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Confirmação instantânea
          </span>
        </div>
      </motion.div>
    </section>
  );
};
