import React, { useEffect, useState } from 'react';
import { Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export const LoadingSkeleton: React.FC = () => {
  const steps = [
    "Contacting Google Gemma 4 26B open-weights model...",
    "Grounding facts: strictly locking in price and product materials...",
    "Drafting Instagram caption & hyper-targeted hashtags...",
    "Structuring WhatsApp catalog with bullet points and order flow...",
    "Synthesizing 3 opening hooks and fact-checked buyer FAQs...",
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-[#EBDDD5] p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#FAF0F3] border border-[#E8C2CD] flex items-center justify-center text-[#7D2947] animate-pulse">
          <Cpu className="w-5 h-5 text-[#C45E7A]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-base text-[#2C1324]">
              Gemma Model Generating Copy...
            </h3>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF0F3] text-[#7D2947] border border-[#E8C2CD]">
              Real Inference
            </span>
          </div>
          <p className="text-xs text-[#785B6C]">
            Model: gemma-4-26b-a4b-it • Zero hallucination guardrails active
          </p>
        </div>
      </div>

      {/* Steps progress */}
      <div className="space-y-2.5 bg-[#FAF7F2] p-4 rounded-xl border border-[#F0E6DE]">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 text-xs transition-opacity ${
                isDone
                  ? 'text-[#166534] font-medium'
                  : isCurrent
                  ? 'text-[#2C1324] font-bold'
                  : 'text-[#9A828F] opacity-50'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
              ) : isCurrent ? (
                <div className="w-4 h-4 border-2 border-[#C45E7A] border-t-transparent rounded-full animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-[#D5C2CC] shrink-0 flex items-center justify-center text-[9px]">
                  {idx + 1}
                </div>
              )}
              <span>{step}</span>
            </div>
          );
        })}
      </div>

      {/* Shimmer skeleton lines */}
      <div className="space-y-3 pt-2">
        <div className="h-4 bg-[#F2EAE4] rounded-md w-3/4 animate-pulse" />
        <div className="h-3 bg-[#F2EAE4] rounded-md w-full animate-pulse" />
        <div className="h-3 bg-[#F2EAE4] rounded-md w-5/6 animate-pulse" />
        <div className="h-3 bg-[#F2EAE4] rounded-md w-4/5 animate-pulse" />
      </div>
    </div>
  );
};
