import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Check, Clock, AlertCircle } from 'lucide-react';
import {
  getScheduleTimesForDate,
  isSaturday,
  isSunday,
  isTimePastToday,
  generateSlotKey,
  formatDateToBR
} from '../services/barbershopData';
import { subscribeToPublicAvailability } from '../services/bookingService';

interface TimeStepProps {
  selectedDate: string;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const TimeStep: React.FC<TimeStepProps> = ({
  selectedDate,
  selectedTime,
  onSelectTime,
  onContinue,
  onBack
}) => {
  const [occupiedSlots, setOccupiedSlots] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isSun = isSunday(selectedDate);
  const isSat = isSaturday(selectedDate);
  const availableTimes = getScheduleTimesForDate(selectedDate);

  // Real-time listener for this specific date
  useEffect(() => {
    if (isSun) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const unsubscribe = subscribeToPublicAvailability(
      selectedDate,
      (occupied) => {
        setOccupiedSlots(occupied);
        setIsLoading(false);
      },
      (error) => {
        console.warn('Realtime listener error:', error);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [selectedDate, isSun]);

  if (isSun) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6 text-center">
        <div className="p-8 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-black/95 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)] space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Barbearia Fechada aos Domingos</h3>
          <p className="text-sm text-zinc-300">
            Aos domingos descansamos para atendê-lo com a melhor qualidade durante a semana e aos sábados.
          </p>
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
            <span>Atendimento: <strong>Seg a Sex (08h às 19h)</strong> e <strong>Sábados (08h às 17h)</strong></span>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-[0_0_20px_rgba(0,180,255,0.4)] transition-all cursor-pointer"
          >
            ← Escolher Outra Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Escolha seu <span className="text-cyan-400">horário</span>
        </h2>
        <p className="text-sm text-zinc-300">
          {isSat ? (
            <span>
              <strong className="text-cyan-300">Sábado:</strong> 08:00 às 17:00 (intervalos de 45 min)
            </span>
          ) : (
            <span>
              <strong className="text-zinc-200">Segunda a Sexta:</strong> 08:00 às 19:00 (intervalos de 45 min)
            </span>
          )}{' '}
          • Data: <span className="text-cyan-300 font-bold">{formatDateToBR(selectedDate)}</span>
        </p>
      </div>

      {/* Real-time status indicator */}
      <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span>Disponibilidade sincronizada em tempo real</span>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="max-w-lg mx-auto p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-center gap-3 text-cyan-400 py-3">
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-semibold tracking-wide">
              Buscando horários disponíveis…
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-12 rounded-xl bg-zinc-900 animate-pulse border border-zinc-800"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto space-y-5">
          {/* Slots Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {availableTimes.map((timeStr) => {
              const slotKey = generateSlotKey(selectedDate, timeStr);
              const isOccupiedInDb = occupiedSlots.has(slotKey);
              const isPast = isTimePastToday(selectedDate, timeStr);
              const isBlocked = isOccupiedInDb || isPast;
              const isSelected = selectedTime === timeStr && !isBlocked;

              if (isBlocked) {
                return (
                  <div
                    key={timeStr}
                    id={`time-slot-${timeStr.replace(':', '-')}`}
                    className="h-14 rounded-xl flex flex-col items-center justify-center bg-zinc-950/90 border border-zinc-800/80 text-zinc-500 cursor-not-allowed select-none opacity-50"
                    title={isPast ? 'Horário já passou hoje' : 'Horário já reservado por outro cliente'}
                  >
                    <span className="text-xs line-through font-medium">{timeStr}</span>
                    <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-semibold mt-0.5">
                      <Lock className="w-3 h-3 text-zinc-500" />
                      Ocupado
                    </span>
                  </div>
                );
              }

              if (isSelected) {
                return (
                  <button
                    key={timeStr}
                    type="button"
                    id={`time-slot-${timeStr.replace(':', '-')}`}
                    onClick={() => onSelectTime(timeStr)}
                    className="h-14 rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-extrabold shadow-[0_0_22px_rgba(0,220,255,0.85)] border border-cyan-200 cursor-pointer scale-105 transition-transform"
                  >
                    <span className="text-sm font-black">{timeStr}</span>
                    <span className="flex items-center gap-1 text-[10px] text-white font-bold mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                      Selecionado
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={timeStr}
                  type="button"
                  id={`time-slot-${timeStr.replace(':', '-')}`}
                  onClick={() => onSelectTime(timeStr)}
                  className="h-14 rounded-xl flex flex-col items-center justify-center bg-zinc-900/80 hover:bg-blue-950/60 border border-blue-500/30 hover:border-cyan-400 text-zinc-200 hover:text-cyan-300 transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(0,180,255,0.3)] active:scale-95"
                >
                  <span className="text-sm font-bold group-hover:text-cyan-300">{timeStr}</span>
                  <span className="text-[10px] text-cyan-400/80 group-hover:text-cyan-300 font-medium">
                    Disponível
                  </span>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 text-xs text-zinc-400 pt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-md bg-zinc-900 border border-blue-500/40" />
              <span>Disponível</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-md bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
              <span>Selecionado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-md bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                <Lock className="w-2 h-2 text-zinc-500" />
              </div>
              <span>Ocupado</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2 max-w-lg mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3.5 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white bg-zinc-900/70 border border-zinc-800 hover:bg-zinc-800 transition-all cursor-pointer"
        >
          ← Voltar
        </button>

        <button
          type="button"
          id="btn-continue-to-customer"
          disabled={!selectedTime}
          onClick={onContinue}
          className="flex-1 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(0,180,255,0.4)] disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(0,220,255,0.6)] border border-cyan-400/40 transition-all cursor-pointer text-center"
        >
          Informar Meus Dados →
        </button>
      </div>
    </div>
  );
};
