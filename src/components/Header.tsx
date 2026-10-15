import React from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, Cpu } from 'lucide-react';

interface HeaderProps {
  onOpenAbout?: () => void;
  isGemmaActive: boolean;
  modelName?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAbout, isGemmaActive, modelName = 'gemma-4-26b-a4b-it' }) => {
  return (
    <header className="border-b border-[#EBDDD5] bg-[#FAF7F2]/90 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2C1324] to-[#4A203E] flex items-center justify-center text-white shadow-sm ring-2 ring-[#EAD8DE]">
            <ShoppingBag className="w-5 h-5 text-[#EAA6B8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-2xl tracking-tight text-[#2C1324]">
                DukaanDraft
              </span>
              <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#F3E3E8] text-[#8C3A55] border border-[#E7C7D2]">
                Hacktoberfest '26
              </span>
            </div>
            <p className="text-[12px] text-[#785B6C] hidden sm:block">
              Marketing copy engine for Indian online sellers
            </p>
          </div>
        </div>

        {/* Right side stats & info */}
        <div className="flex items-center gap-3">
          {/* Gemma indicator: only show 'Powered by Gemma' when Gemma is powering generation */}
          {isGemmaActive && (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF0F3] border border-[#E8C2CD] text-[#7D2947] text-xs font-medium shadow-xs"
              title={`Inference powered by Google's open-weight model: ${modelName}`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#C45E7A] animate-pulse" />
              <span>Powered by <strong>Gemma</strong></span>
              <span className="hidden md:inline-block text-[10px] text-[#9A4C64] bg-[#F5DEE5] px-1.5 py-0.2 rounded-md">
                4-26B
              </span>
            </div>
          )}

          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#5A384D] hover:text-[#2C1324] px-3 py-1.5 rounded-lg hover:bg-[#F2EAE4] transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-[#8C3A55]" />
            <span className="hidden sm:inline">Product Guidelines</span>
            <span className="sm:hidden">Info</span>
          </button>
        </div>
      </div>
    </header>
  );
};
