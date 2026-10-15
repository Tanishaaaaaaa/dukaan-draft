import React from 'react';
import { X, ShieldCheck, Cpu, Sparkles, Check, Key, HelpCircle } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelName: string;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, modelName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#EBDDD5] max-w-xl w-full p-6 sm:p-7 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#F2EAE4]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF0F3] border border-[#E8C2CD] flex items-center justify-center text-[#7D2947]">
              <ShieldCheck className="w-4 h-4 text-[#C45E7A]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#2C1324]">
                About DukaanDraft & Gemma Integration
              </h3>
              <p className="text-xs text-[#785B6C]">
                Hacktoberfest 2026 Week 2 Side Hustle Challenge
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8C7684] hover:text-[#2C1324] p-1.5 rounded-lg hover:bg-[#F2EAE4] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#4A2F40] leading-relaxed">
          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#F0E6DE] space-y-2">
            <h4 className="font-bold text-[#2C1324] flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#C45E7A]" />
              <span>Real Google Gemma Model Inference</span>
            </h4>
            <p>
              Every listing is generated through real inference calls to Google's open-weight model:
              <code className="mx-1 px-2 py-0.5 rounded bg-white border border-[#E2D2CB] text-[#7D2947] font-semibold text-xs">
                {modelName}
              </code>
              via the official <code className="text-xs">@google/genai</code> SDK on the server side. DukaanDraft never uses hardcoded mocks or simulated responses.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#2C1324] flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#16A34A]" />
              <span>5 Ready-to-Publish Sections</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Instagram Caption:</strong> Complete with hook, body, price callout, and 8-12 relevant hashtags.</li>
              <li><strong>WhatsApp Catalogue:</strong> Structured bullet points and quick ordering instructions.</li>
              <li><strong>3 Alternative Opening Hooks:</strong> Perfect for Reels, Stories, or carousel slide 1.</li>
              <li><strong>3 Grounded Buyer FAQs:</strong> Answered strictly from supplied facts. Any missing detail (e.g. COD or shipping timelines) is explicitly flagged as needing seller confirmation.</li>
              <li><strong>Short Promotional Message:</strong> Under 60 words for WhatsApp broadcasts or SMS alerts.</li>
            </ul>
          </div>

          <div className="bg-[#FAF0F3] p-4 rounded-xl border border-[#E8C2CD] space-y-2">
            <h4 className="font-bold text-[#7D2947] flex items-center gap-1.5">
              <Key className="w-4 h-4 text-[#C45E7A]" />
              <span>API Credentials & AI Studio Secrets</span>
            </h4>
            <p className="text-xs">
              In accordance with Google AI Studio security standards, the API key is handled exclusively on the backend via <code className="text-[11px] bg-white px-1.5 py-0.5 rounded border border-[#E8C2CD]">process.env.GEMINI_API_KEY</code> and is never exposed in browser code. Users can attach their key in the <strong>Settings &gt; Secrets</strong> panel.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-[#F2EAE4] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#3D1A32] hover:bg-[#2A1022] transition-colors cursor-pointer"
          >
            Got it, Let's Draft!
          </button>
        </div>
      </div>
    </div>
  );
};
