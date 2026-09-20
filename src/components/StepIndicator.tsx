import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number; // 1 to 5
  onStepClick?: (step: number) => void;
}

const STEPS = [
  { id: 1, label: 'SERVIÇO' },
  { id: 2, label: 'DATA' },
  { id: 3, label: 'HORÁRIO' },
  { id: 4, label: 'DADOS' },
  { id: 5, label: 'CONFIRMAR' }
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, onStepClick }) => {
  return (
    <div className="w-full max-w-xl mx-auto px-2 py-4 mb-6">
      {/* Desktop & Tablet View: Clean interconnected progressive line */}
      <div className="relative flex items-center justify-between">
        {/* Background connector line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[2px] bg-zinc-800 -z-0" />
        
        {/* Filled connector line with electric blue glow */}
        <div
          className="absolute top-1/2 left-4 -translate-y-1/2 h-[2px] bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 shadow-[0_0_10px_rgba(0,220,255,0.8)] -z-0 transition-all duration-500"
          style={{
            width: `${Math.max(0, Math.min(100, ((currentStep - 1) / (STEPS.length - 1)) * 92))}%`
          }}
        />

        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isClickable = step.id < currentStep && onStepClick;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10"
              onClick={() => isClickable && onStepClick(step.id)}
            >
              <button
                type="button"
                aria-label={`Ir para etapa ${step.label}`}
                disabled={!isClickable}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(0,200,255,0.7)] cursor-pointer'
                    : isCurrent
                    ? 'bg-zinc-950 text-cyan-300 border-2 border-cyan-400 shadow-[0_0_18px_rgba(0,220,255,0.9)] ring-4 ring-cyan-500/20 scale-110'
                    : 'bg-zinc-900 text-zinc-500 border border-zinc-700'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <span>{step.id}</span>
                )}
              </button>

              <span
                className={`mt-2 text-[10px] sm:text-xs font-semibold tracking-wider transition-colors duration-200 uppercase whitespace-nowrap ${
                  isCurrent
                    ? 'text-cyan-300 drop-shadow-[0_0_6px_rgba(0,200,255,0.6)]'
                    : isCompleted
                    ? 'text-zinc-300'
                    : 'text-zinc-600'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Step Status Pill */}
      <div className="flex items-center justify-center gap-2 mt-4 sm:hidden">
        <span className="text-xs text-zinc-400">
          Etapa <strong className="text-cyan-400">{currentStep}</strong> de 5
        </span>
        <span className="text-zinc-600">•</span>
        <span className="text-xs font-semibold text-zinc-200">
          {STEPS[currentStep - 1]?.label}
        </span>
      </div>
    </div>
  );
};
