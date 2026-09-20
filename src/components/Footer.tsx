import React from 'react';
import { Clock, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-24 border-t border-zinc-800/80 bg-gradient-to-b from-transparent via-zinc-950/90 to-black py-12 px-4 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/20 text-[11px] font-semibold tracking-wider text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>BARBEARIA PREMIUM</span>
          </div>
          <p className="text-sm font-medium text-zinc-300 italic pt-1">
            “Seu estilo começa com seu horário reservado.”
          </p>
        </div>

        {/* Operating Hours */}
        <div className="space-y-1.5 pt-1 text-xs text-zinc-400">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Seg a Sex: <strong className="text-zinc-200">08:00 às 19:00</strong> • Sáb: <strong className="text-cyan-300">08:00 às 17:00</strong></span>
          </div>
          <div className="text-[11px] text-zinc-500 font-medium">
            Domingo: <span className="text-red-400 font-bold">Fechado</span>
          </div>
        </div>

        <div className="pt-5 border-t border-zinc-900/90 flex items-center justify-center gap-2 text-[11px] text-zinc-600">
          <Shield className="w-3.5 h-3.5 text-zinc-500" />
          <span>Sistema inteligente com bloqueio de horários em tempo real</span>
        </div>
      </div>
    </footer>
  );
};
