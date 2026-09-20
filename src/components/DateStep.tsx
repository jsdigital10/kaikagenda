import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { getSaoPauloToday, isSunday, isSaturday } from '../services/barbershopData';

interface DateStepProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const DateStep: React.FC<DateStepProps> = ({
  selectedDate,
  onSelectDate,
  onContinue,
  onBack
}) => {
  const todaySP = getSaoPauloToday();
  const [currentYear, currentMonth] = (selectedDate || todaySP).split('-').map(Number);
  const [viewDate, setViewDate] = useState(new Date(currentYear, currentMonth - 1, 1));

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth(); // 0 - 11

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Days in month
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const totalDaysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  // Check if viewing previous month than current
  const [todayYear, todayMonth] = todaySP.split('-').map(Number);
  const isPastMonth = viewYear < todayYear || (viewYear === todayYear && viewMonth < todayMonth - 1);

  // Generate day items
  const calendarCells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const dStr = String(d).padStart(2, '0');
    const mStr = String(viewMonth + 1).padStart(2, '0');
    const dateKey = `${viewYear}-${mStr}-${dStr}`;
    calendarCells.push({ dayNumber: d, dateKey });
  }

  const isSelectedDateSunday = selectedDate ? isSunday(selectedDate) : false;
  const isSelectedDateSaturday = selectedDate ? isSaturday(selectedDate) : false;

  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Qual dia fica <span className="text-cyan-400">melhor para você?</span>
        </h2>
        <p className="text-sm text-zinc-300">
          Selecione a data para seu atendimento
        </p>
      </div>

      {/* Calendar Card */}
      <div className="relative max-w-md mx-auto p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-black/95 border border-zinc-800 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl">
        {/* Header month & navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(0,210,255,0.3)]">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-bold text-white capitalize">
                {monthNames[viewMonth]} {viewYear}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={isPastMonth}
              onClick={handlePrevMonth}
              aria-label="Mês anterior"
              className="p-2 rounded-xl bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Próximo mês"
              className="p-2 rounded-xl bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 pt-4 pb-2 text-center">
          {daysOfWeek.map((dow, idx) => (
            <span
              key={dow}
              className={`text-[11px] font-bold tracking-wider uppercase ${
                idx === 0 ? 'text-red-400/80' : idx === 6 ? 'text-cyan-300' : 'text-zinc-400'
              }`}
            >
              {dow}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {calendarCells.map((cell, idx) => {
            if (!cell) {
              return <div key={`empty-${idx}`} className="h-11 sm:h-12" />;
            }

            const isPast = cell.dateKey < todaySP;
            const isSun = isSunday(cell.dateKey);
            const isSat = isSaturday(cell.dateKey);
            const isDisabled = isPast || isSun;
            const isSelected = selectedDate === cell.dateKey && !isSun;
            const isToday = cell.dateKey === todaySP;

            return (
              <button
                key={cell.dateKey}
                type="button"
                id={`calendar-day-${cell.dateKey}`}
                disabled={isDisabled}
                onClick={() => !isDisabled && onSelectDate(cell.dateKey)}
                title={
                  isSun
                    ? 'Fechado aos domingos'
                    : isPast
                    ? 'Data anterior já passou'
                    : isSat
                    ? 'Sábado: Atendimento até às 17h'
                    : 'Segunda a Sexta: Atendimento até às 19h'
                }
                className={`h-11 sm:h-12 rounded-xl font-medium text-xs sm:text-sm flex flex-col items-center justify-center relative transition-all duration-200 ${
                  isSun
                    ? 'text-zinc-600 bg-zinc-950/40 border border-zinc-900/60 cursor-not-allowed opacity-50'
                    : isPast
                    ? 'text-zinc-600 bg-transparent cursor-not-allowed opacity-30'
                    : isSelected
                    ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-extrabold shadow-[0_0_20px_rgba(0,220,255,0.85)] border border-cyan-200 scale-105 z-10 cursor-pointer'
                    : 'text-zinc-200 bg-zinc-900/60 hover:bg-blue-950/40 hover:text-cyan-300 border border-zinc-800/70 cursor-pointer'
                }`}
              >
                <span className={isSun ? 'line-through text-zinc-600' : ''}>
                  {cell.dayNumber}
                </span>

                {isSun ? (
                  <span className="text-[8px] font-bold text-red-400/80 leading-none mt-0.5">
                    Fechado
                  </span>
                ) : isToday && !isSelected ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-0.5 shadow-[0_0_6px_#00e5ff]" />
                ) : isSat && !isSelected && !isPast ? (
                  <span className="text-[8px] font-medium text-cyan-400/80 leading-none mt-0.5">
                    até 17h
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Selected date feedback & day rules */}
        {selectedDate && !isSelectedDateSunday && (
          <div className="mt-4 pt-3.5 border-t border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Dia selecionado:</span>
            <span className="font-extrabold text-cyan-300">
              {selectedDate.split('-').reverse().join('/')}{' '}
              <span className="font-normal text-zinc-400">
                ({isSelectedDateSaturday ? 'Sábado até 17h' : 'Até 19h'})
              </span>
            </span>
          </div>
        )}

        {/* Operating hours info breakdown */}
        <div className="mt-4 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/90 text-xs">
          <div className="flex items-center gap-1.5 text-zinc-300 font-semibold mb-2">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Horários de Atendimento:</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
              <span className="block text-zinc-400 font-medium text-[10px]">Seg a Sex</span>
              <strong className="text-zinc-100 font-bold">08:00 - 19:00</strong>
            </div>
            <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-500/30 shadow-[0_0_10px_rgba(0,180,255,0.15)]">
              <span className="block text-cyan-300 font-medium text-[10px]">Sábado</span>
              <strong className="text-cyan-200 font-bold">08:00 - 17:00</strong>
            </div>
            <div className="p-2 rounded-lg bg-red-950/30 border border-red-500/30">
              <span className="block text-zinc-400 font-medium text-[10px]">Domingo</span>
              <strong className="text-red-400 font-bold">Fechado</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3.5 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white bg-zinc-900/70 border border-zinc-800 hover:bg-zinc-800 transition-all cursor-pointer"
        >
          ← Voltar
        </button>

        <button
          type="button"
          id="btn-continue-to-time"
          disabled={!selectedDate || isSelectedDateSunday}
          onClick={onContinue}
          className="flex-1 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(0,180,255,0.4)] disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(0,220,255,0.6)] border border-cyan-400/40 transition-all cursor-pointer text-center"
        >
          Ver Horários Disponíveis →
        </button>
      </div>
    </div>
  );
};
