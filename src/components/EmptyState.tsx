import React from 'react';
import { ShoppingBag, Sparkles, CheckCircle2, ShieldCheck, Instagram, MessageCircle, HelpCircle } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts.ts';
import { SampleProduct } from '../types.ts';

interface EmptyStateProps {
  onSelectSample: (sample: SampleProduct) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectSample }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#EBDDD5] p-6 sm:p-8 shadow-xs text-center space-y-6">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FAF0F3] to-[#F3E2E8] border border-[#E8C2CD] mx-auto flex items-center justify-center text-[#7D2947] shadow-xs">
        <ShoppingBag className="w-7 h-7 text-[#C45E7A]" />
      </div>

      <div className="max-w-md mx-auto space-y-2">
        <h3 className="font-serif font-bold text-xl text-[#2C1324]">
          Your listing will appear here
        </h3>
        <p className="text-xs sm:text-sm text-[#785B6C] leading-relaxed">
          Enter your product name, price, and genuine specifications on the left, then click <strong>Generate Marketing Copy</strong> to run real Gemma inference.
        </p>
      </div>

      {/* Feature summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto pt-2">
        <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#F0E6DE] space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C1324]">
            <Instagram className="w-3.5 h-3.5 text-[#C45E7A]" />
            <span>Instagram Copy</span>
          </div>
          <p className="text-[11px] text-[#785B6C] leading-snug">
            Catchy hooks, bulleted highlights, price callout, and targeted hashtags.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#F0E6DE] space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C1324]">
            <MessageCircle className="w-3.5 h-3.5 text-[#156B34]" />
            <span>WhatsApp Ready</span>
          </div>
          <p className="text-[11px] text-[#785B6C] leading-snug">
            Catalog-formatted details and a short promo broadcast message for groups.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#F0E6DE] space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C1324]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C3A55]" />
            <span>Strict Truthfulness</span>
          </div>
          <p className="text-[11px] text-[#785B6C] leading-snug">
            Preserves your actual INR price and facts. Never hallucinates claims.
          </p>
        </div>
      </div>

      {/* Sample product quick starter buttons */}
      <div className="pt-2 border-t border-[#F4ECE6]">
        <p className="text-xs font-semibold text-[#8C3A55] mb-2.5">
          Want a quick demo? Load a sample into the form:
        </p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {SAMPLE_PRODUCTS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="text-xs font-medium px-3.5 py-1.5 rounded-xl bg-[#FAF2F5] hover:bg-[#F3E2E8] text-[#7D2947] border border-[#EAC4CF] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#C45E7A]" />
              <span>{sample.title} (₹{sample.data.price})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
