import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { SERVICES } from '../services/barbershopData';
import { Icon3D } from './Icon3D';

interface ServicesStepProps {
  selectedService: ServiceItem | null;
  onSelectService: (service: ServiceItem) => void;
  onContinue: () => void;
}

export const ServicesStep: React.FC<ServicesStepProps> = ({
  selectedService,
  onSelectService,
  onContinue
}) => {
  return (
    <div className="w-full space-y-7">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-[11px] font-bold uppercase tracking-widest text-cyan-300">
          Passo 1 de 5
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
          Escolha seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">serviço</span>
        </h2>
        <p className="text-sm text-zinc-300 max-w-sm mx-auto font-light">
          Selecione o procedimento desejado para conferir as datas e horários disponíveis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {SERVICES.map((service) => {
          const isSelected = selectedService?.id === service.id;

          return (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              whileHover={{ scale: 1.018, y: -2 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelectService(service)}
              className={`relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-b from-[#0a192f] via-[#091424] to-[#040810] border-2 border-cyan-400 shadow-[0_12px_35px_rgba(0,210,255,0.45),inset_0_1px_1px_rgba(255,255,255,0.3)] ring-2 ring-cyan-400/50'
                  : 'bg-gradient-to-b from-[#13151b] via-[#0e1015] to-[#08090d] border border-zinc-800/90 hover:border-cyan-500/50 hover:shadow-[0_10px_25px_rgba(0,180,255,0.2)] shadow-[0_4px_15px_rgba(0,0,0,0.6)]'
              }`}
            >
              {/* Electric light sheen on active card */}
              {isSelected && (
                <>
                  <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                </>
              )}

              {/* Service Header with 3D Embossed Icon */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3.5">
                  <Icon3D type={service.iconType} size={30} />
                  <div>
                    <h3 className="text-lg font-extrabold text-white tracking-wide">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                      <span className="font-medium">{service.durationMinutes} min</span>
                      {service.badge && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,220,255,0.4)]">
                          <Sparkles className="w-3 h-3 text-cyan-300" />
                          {service.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300 drop-shadow-[0_0_8px_rgba(0,220,255,0.4)]">
                    {service.formattedPrice}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300/90 leading-relaxed my-2">
                {service.description}
              </p>

              {/* Selection footer state with tactile pill */}
              <div className="pt-3.5 mt-2 border-t border-zinc-800/80 flex items-center justify-between">
                {isSelected ? (
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold tracking-wide">
                    <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center text-black shadow-[0_0_8px_#00e5ff]">
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                    </div>
                    <span>Selecionado</span>
                  </div>
                ) : (
                  <span className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                    Toque para escolher
                  </span>
                )}

                <div
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wider transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_15px_rgba(0,220,255,0.8)]'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                  }`}
                >
                  {isSelected ? 'ESCOLHIDO' : 'SELECIONAR'}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating or Bottom Continue Button */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-2 flex justify-end"
        >
          <button
            id="btn-continue-to-date"
            onClick={onContinue}
            className="w-full sm:w-auto px-9 py-4 rounded-2xl font-black text-white text-sm uppercase tracking-wider bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 shadow-[0_0_30px_rgba(0,180,255,0.5)] hover:shadow-[0_0_45px_rgba(0,220,255,0.8)] border border-cyan-300 flex items-center justify-center gap-2.5 cursor-pointer transition-all active:scale-[0.98]"
          >
            <span>Prosseguir para Escolher a Data</span>
            <ArrowRight className="w-4 h-4 text-cyan-200" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
