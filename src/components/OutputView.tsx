import React, { useState } from 'react';
import {
  GenerationResult,
  ProductFormData
} from '../types.ts';
import {
  Copy,
  Check,
  RotateCcw,
  Instagram,
  MessageCircle,
  HelpCircle,
  Megaphone,
  Sparkles,
  Layers,
  Eye,
  CheckCircle2,
  AlertCircle,
  Share2,
  Clock
} from 'lucide-react';

interface OutputViewProps {
  result: GenerationResult;
  formData: ProductFormData;
  modelUsed: string;
  latencyMs: number;
  onRegenerate: () => void;
  isLoading: boolean;
}

export const OutputView: React.FC<OutputViewProps> = ({
  result,
  formData,
  modelUsed,
  latencyMs,
  onRegenerate,
  isLoading,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'instagram' | 'whatsapp' | 'hooks' | 'faqs' | 'promo'>('all');
  const [previewChannel, setPreviewChannel] = useState<'none' | 'instagram' | 'whatsapp'>('none');

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopyAll = () => {
    const fullText = `=== DUKAANDRAFT LISTING PACK ===
Product: ${formData.productName}
Price: ₹${formData.price}
Generated via: Google Gemma (${modelUsed})

--- 1. INSTAGRAM CAPTION ---
${result.instagramCaption}

--- 2. WHATSAPP CATALOGUE ---
${result.whatsappCatalogue}

--- 3. THREE ALTERNATIVE OPENING HOOKS ---
1. ${result.alternativeHooks[0] || ''}
2. ${result.alternativeHooks[1] || ''}
3. ${result.alternativeHooks[2] || ''}

--- 4. BUYER FAQS (FACT-CHECKED) ---
${result.buyerFaqs.map((faq, idx) => `Q${idx + 1}: ${faq.question}\nA: ${faq.answer}`).join('\n\n')}

--- 5. PROMOTIONAL BROADCAST MESSAGE ---
${result.promoMessage}
`;
    copyToClipboard(fullText, 'copy-all');
  };

  const getWordCount = (str: string) => str.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Top Banner: Gemma Inference badge & Action toolbar */}
      <div className="bg-white rounded-2xl border border-[#EBDDD5] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FAF0F3] border border-[#E8C2CD] flex items-center justify-center text-[#7D2947]">
            <Sparkles className="w-5 h-5 text-[#C45E7A]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-serif font-bold text-base text-[#2C1324]">
                Ready-to-Post Copy Generated
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF0F3] text-[#7D2947] border border-[#E8C2CD]">
                Powered by Gemma ({modelUsed})
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#785B6C] mt-0.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#A88898]" />
                Inference latency: {(latencyMs / 1000).toFixed(2)}s
              </span>
              <span>•</span>
              <span>Language: {formData.language}</span>
              <span>•</span>
              <span>Tone: {formData.tone}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5A2437] bg-[#FAF2F5] hover:bg-[#F3E2E8] border border-[#E8C2CD] transition-all disabled:opacity-50 cursor-pointer"
            title="Generate a fresh variation with Gemma"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#3D1A32] hover:bg-[#2A1022] shadow-xs transition-all cursor-pointer"
          >
            {copiedKey === 'copy-all' ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#86EFAC]" />
                <span>All Sections Copied!</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-[#EAA6B8]" />
                <span>Copy Entire Pack</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Tabs and Social Simulator Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#3D1A32] text-white shadow-xs'
                : 'bg-white text-[#5A384D] hover:bg-[#F8EFEA] border border-[#EBDDD5]'
            }`}
          >
            All 5 Sections
          </button>
          <button
            onClick={() => setActiveTab('instagram')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'instagram'
                ? 'bg-[#3D1A32] text-white shadow-xs'
                : 'bg-white text-[#5A384D] hover:bg-[#F8EFEA] border border-[#EBDDD5]'
            }`}
          >
            <Instagram className="w-3.5 h-3.5 text-[#C45E7A]" />
            <span>Instagram Caption</span>
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'whatsapp'
                ? 'bg-[#3D1A32] text-white shadow-xs'
                : 'bg-white text-[#5A384D] hover:bg-[#F8EFEA] border border-[#EBDDD5]'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp Catalogue</span>
          </button>
          <button
            onClick={() => setActiveTab('hooks')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'hooks'
                ? 'bg-[#3D1A32] text-white shadow-xs'
                : 'bg-white text-[#5A384D] hover:bg-[#F8EFEA] border border-[#EBDDD5]'
            }`}
          >
            Opening Hooks
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'faqs'
                ? 'bg-[#3D1A32] text-white shadow-xs'
                : 'bg-white text-[#5A384D] hover:bg-[#F8EFEA] border border-[#EBDDD5]'
            }`}
          >
            Buyer FAQs
          </button>
          <button
            onClick={() => setActiveTab('promo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'promo'
                ? 'bg-[#3D1A32] text-white shadow-xs'
                : 'bg-white text-[#5A384D] hover:bg-[#F8EFEA] border border-[#EBDDD5]'
            }`}
          >
            Promo Blast
          </button>
        </div>

        {/* Live Channel Mockup Switch */}
        <div className="flex items-center gap-1.5 bg-white border border-[#EBDDD5] p-1 rounded-xl text-xs self-start sm:self-auto">
          <span className="text-[11px] font-medium text-[#785B6C] px-1.5 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-[#C45E7A]" />
            <span>Simulate View:</span>
          </span>
          <button
            type="button"
            onClick={() => setPreviewChannel(previewChannel === 'instagram' ? 'none' : 'instagram')}
            className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
              previewChannel === 'instagram'
                ? 'bg-[#FAF0F3] text-[#7D2947] border border-[#E8C2CD]'
                : 'text-[#5A384D] hover:bg-[#FAF6F2]'
            }`}
          >
            Instagram Card
          </button>
          <button
            type="button"
            onClick={() => setPreviewChannel(previewChannel === 'whatsapp' ? 'none' : 'whatsapp')}
            className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
              previewChannel === 'whatsapp'
                ? 'bg-[#EBF7EE] text-[#156B34] border border-[#BDE3C8]'
                : 'text-[#5A384D] hover:bg-[#FAF6F2]'
            }`}
          >
            WhatsApp Chat
          </button>
        </div>
      </div>

      {/* Simulated Channel Preview Modals / Cards (if toggled) */}
      {previewChannel === 'instagram' && (
        <div className="bg-[#FAF7F2] p-4 sm:p-6 rounded-2xl border-2 border-[#E7C7D2] shadow-sm">
          <div className="max-w-md mx-auto bg-white rounded-xl border border-[#EBDDD5] overflow-hidden shadow-md">
            {/* Insta Mock Header */}
            <div className="px-3.5 py-2.5 border-b border-[#F2EAE4] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-[10px] text-[#2C1324]">
                    {formData.productName.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2C1324] leading-tight">
                    yourdukaan_official
                  </div>
                  <div className="text-[10px] text-[#785B6C]">Verified Seller</div>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-bold">•••</span>
            </div>

            {/* Insta Mock Post Visual Placeholder */}
            <div className="bg-[#F8EFEA] h-52 flex flex-col items-center justify-center p-6 text-center border-b border-[#F2EAE4]">
              <span className="text-2xl mb-1">🛍️</span>
              <span className="font-serif font-bold text-lg text-[#2C1324]">{formData.productName}</span>
              <span className="text-sm font-semibold text-[#8C3A55] bg-[#F5DEE5] px-2.5 py-0.5 rounded-full mt-2">
                Price: ₹{formData.price}
              </span>
            </div>

            {/* Insta Mock Caption Content */}
            <div className="p-4 space-y-2">
              <p className="text-xs text-[#2C1324] whitespace-pre-wrap leading-relaxed">
                <span className="font-bold mr-1.5">yourdukaan_official</span>
                {result.instagramCaption}
              </p>
            </div>
          </div>
        </div>
      )}

      {previewChannel === 'whatsapp' && (
        <div className="bg-[#EFEAE2] p-4 sm:p-6 rounded-2xl border border-[#D5CEC5] shadow-sm">
          <div className="max-w-md mx-auto bg-[#ECE5DD] rounded-xl border border-[#D1C7BA] overflow-hidden shadow-md">
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] text-white px-3.5 py-2.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center font-bold text-xs">
                🛍️
              </div>
              <div>
                <div className="text-xs font-bold">{formData.productName}</div>
                <div className="text-[10px] text-[#A6D5CF]">Official WhatsApp Store • Online</div>
              </div>
            </div>

            {/* WhatsApp Chat Area */}
            <div className="p-4 space-y-3">
              <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-xs max-w-[92%] border border-gray-100">
                <div className="text-xs font-semibold text-[#128C7E] pb-1 border-b border-gray-100 mb-1.5 flex justify-between">
                  <span>Product Catalogue</span>
                  <span>₹{formData.price}</span>
                </div>
                <div className="text-xs text-[#2C1324] whitespace-pre-wrap leading-relaxed font-sans">
                  {result.whatsappCatalogue}
                </div>
                <div className="text-[10px] text-gray-400 text-right mt-1.5">
                  10:45 AM ✓✓
                </div>
              </div>

              {/* Promo broadcast bubble */}
              <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none p-3 shadow-xs max-w-[92%] ml-auto border border-[#C5E9AA]">
                <div className="text-[10px] font-bold text-[#075E54] uppercase tracking-wider mb-0.5">
                  Flash Broadcast
                </div>
                <div className="text-xs text-[#1E2E20] whitespace-pre-wrap leading-relaxed">
                  {result.promoMessage}
                </div>
                <div className="text-[10px] text-gray-500 text-right mt-1">
                  10:46 AM ✓✓
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: INSTAGRAM CAPTION */}
      {(activeTab === 'all' || activeTab === 'instagram') && (
        <div className="bg-white rounded-2xl border border-[#EBDDD5] p-5 sm:p-6 shadow-xs relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F2EAE4]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FAF0F3] flex items-center justify-center text-[#C45E7A]">
                <Instagram className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#2C1324]">
                  1. Instagram Caption & Hashtags
                </h4>
                <p className="text-[11px] text-[#785B6C]">
                  Optimized for engagement, factual specifications, and high-converting CTA
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#8C7684] hidden sm:inline">
                {getWordCount(result.instagramCaption)} words
              </span>
              <button
                onClick={() => copyToClipboard(result.instagramCaption, 'insta-caption')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF2F5] hover:bg-[#F3E2E8] text-[#7D2947] border border-[#E8C2CD] transition-colors cursor-pointer"
              >
                {copiedKey === 'insta-caption' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#F0E6DE] text-xs sm:text-sm text-[#2C1324] whitespace-pre-wrap leading-relaxed font-sans">
            {result.instagramCaption}
          </div>
        </div>
      )}

      {/* SECTION 2: WHATSAPP CATALOGUE DESCRIPTION */}
      {(activeTab === 'all' || activeTab === 'whatsapp') && (
        <div className="bg-white rounded-2xl border border-[#EBDDD5] p-5 sm:p-6 shadow-xs relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F2EAE4]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#EBF7EE] flex items-center justify-center text-[#156B34]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#2C1324]">
                  2. WhatsApp Catalogue Description
                </h4>
                <p className="text-[11px] text-[#785B6C]">
                  Formatted with bulleted facts, INR price highlight, and instant order instructions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#8C7684] hidden sm:inline">
                {getWordCount(result.whatsappCatalogue)} words
              </span>
              <button
                onClick={() => copyToClipboard(result.whatsappCatalogue, 'whatsapp-catalog')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF2F5] hover:bg-[#F3E2E8] text-[#7D2947] border border-[#E8C2CD] transition-colors cursor-pointer"
              >
                {copiedKey === 'whatsapp-catalog' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#F0E6DE] text-xs sm:text-sm text-[#2C1324] whitespace-pre-wrap leading-relaxed font-sans">
            {result.whatsappCatalogue}
          </div>
        </div>
      )}

      {/* SECTION 3: THREE ALTERNATIVE OPENING HOOKS */}
      {(activeTab === 'all' || activeTab === 'hooks') && (
        <div className="bg-white rounded-2xl border border-[#EBDDD5] p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F2EAE4]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FAF0F3] flex items-center justify-center text-[#C45E7A]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#2C1324]">
                  3. Three Alternative Opening Hooks
                </h4>
                <p className="text-[11px] text-[#785B6C]">
                  Use these to test reel intros, story openers, or ad taglines
                </p>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(result.alternativeHooks.join('\n\n'), 'all-hooks')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF2F5] hover:bg-[#F3E2E8] text-[#7D2947] border border-[#E8C2CD] transition-colors cursor-pointer"
            >
              {copiedKey === 'all-hooks' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>All Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All 3</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {result.alternativeHooks.map((hook, index) => (
              <div
                key={index}
                className="bg-[#FAF7F2] p-4 rounded-xl border border-[#F0E6DE] flex flex-col justify-between gap-3 group hover:border-[#E8C2CD] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C45E7A]">
                      Hook 0{index + 1}
                    </span>
                    <button
                      onClick={() => copyToClipboard(hook, `hook-${index}`)}
                      className="text-xs text-[#8C3A55] hover:text-[#2C1324] p-1 rounded-md hover:bg-[#F3E2E8] transition-colors cursor-pointer"
                      title="Copy this hook"
                    >
                      {copiedKey === `hook-${index}` ? (
                        <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2C1324] font-medium leading-relaxed">
                    "{hook}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: THREE BUYER FAQS ANSWERED ONLY FROM FACTS */}
      {(activeTab === 'all' || activeTab === 'faqs') && (
        <div className="bg-white rounded-2xl border border-[#EBDDD5] p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F2EAE4]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FAF0F3] flex items-center justify-center text-[#C45E7A]">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#2C1324]">
                  4. Buyer FAQs (Fact-Checked Grounding)
                </h4>
                <p className="text-[11px] text-[#785B6C]">
                  Strictly answered from supplied facts. Unconfirmed details are honestly flagged.
                </p>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(
                result.buyerFaqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n'),
                'all-faqs'
              )}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF2F5] hover:bg-[#F3E2E8] text-[#7D2947] border border-[#E8C2CD] transition-colors cursor-pointer"
            >
              {copiedKey === 'all-faqs' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy FAQs</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-3">
            {result.buyerFaqs.map((faq, index) => {
              const isUnconfirmed = faq.answer.toLowerCase().includes('seller needs to confirm');
              return (
                <div
                  key={index}
                  className="bg-[#FAF7F2] p-4 rounded-xl border border-[#F0E6DE] space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#2C1324] flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#EAD8DE] text-[#5A1D32] flex items-center justify-center text-[10px] font-bold shrink-0">
                        {index + 1}
                      </span>
                      <span>{faq.question}</span>
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isUnconfirmed ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                          <AlertCircle className="w-3 h-3" />
                          <span>Seller Confirmation Needed</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Factual Match</span>
                        </span>
                      )}
                      <button
                        onClick={() => copyToClipboard(`Q: ${faq.question}\nA: ${faq.answer}`, `faq-${index}`)}
                        className="text-xs text-[#8C3A55] hover:text-[#2C1324] p-1 rounded-md hover:bg-[#F3E2E8] transition-colors cursor-pointer"
                        title="Copy this FAQ"
                      >
                        {copiedKey === `faq-${index}` ? (
                          <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A2F40] pl-5.5 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 5: SHORT PROMOTIONAL MESSAGE */}
      {(activeTab === 'all' || activeTab === 'promo') && (
        <div className="bg-white rounded-2xl border border-[#EBDDD5] p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F2EAE4]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FAF0F3] flex items-center justify-center text-[#C45E7A]">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#2C1324]">
                  5. Short Promotional Message
                </h4>
                <p className="text-[11px] text-[#785B6C]">
                  Under 60 words for WhatsApp broadcasts, SMS flash announcements, or direct DMs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#8C7684] hidden sm:inline">
                {getWordCount(result.promoMessage)} words
              </span>
              <button
                onClick={() => copyToClipboard(result.promoMessage, 'promo-msg')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF2F5] hover:bg-[#F3E2E8] text-[#7D2947] border border-[#E8C2CD] transition-colors cursor-pointer"
              >
                {copiedKey === 'promo-msg' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#F0E6DE] text-xs sm:text-sm text-[#2C1324] whitespace-pre-wrap leading-relaxed font-sans font-medium">
            {result.promoMessage}
          </div>
        </div>
      )}
    </div>
  );
};
