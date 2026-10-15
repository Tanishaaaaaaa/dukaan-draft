import React from 'react';
import { ProductFormData, PlatformOption, LanguageOption, ToneOption, SampleProduct } from '../types.ts';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts.ts';
import { Sparkles, IndianRupee, Tag, FileText, Share2, Languages, Smile, RotateCcw, ArrowRight } from 'lucide-react';

interface ProductFormProps {
  formData: ProductFormData;
  onChange: (updated: Partial<ProductFormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onReset: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading,
  onReset,
}) => {
  const loadSample = (sample: SampleProduct) => {
    onChange({ ...sample.data });
  };

  const platformOptions: { id: PlatformOption; label: string; desc: string }[] = [
    { id: 'both', label: 'Both Channels', desc: 'Instagram + WhatsApp' },
    { id: 'Instagram', label: 'Instagram', desc: 'Reels, captions & tags' },
    { id: 'WhatsApp', label: 'WhatsApp', desc: 'Catalog & broadcast' },
  ];

  const languageOptions: { id: LanguageOption; label: string; sub: string }[] = [
    { id: 'English', label: 'English', sub: 'Warm Indian retail' },
    { id: 'Hinglish', label: 'Hinglish', sub: 'Everyday WhatsApp chat' },
    { id: 'Hindi', label: 'हिंदी (Hindi)', sub: 'Devanagari script' },
  ];

  const toneOptions: { id: ToneOption; label: string; emoji: string; desc: string }[] = [
    { id: 'Friendly', label: 'Friendly', emoji: '☕', desc: 'Warm local dukaan vibe' },
    { id: 'Premium', label: 'Premium', emoji: '✨', desc: 'Artisanal & sophisticated' },
    { id: 'Playful', label: 'Playful', emoji: '🎉', desc: 'Trendy, energetic & witty' },
    { id: 'Minimal', label: 'Minimal', emoji: '🎯', desc: 'Crisp, bulleted & fluff-free' },
  ];

  const isFormValid =
    formData.productName.trim().length > 0 &&
    formData.price.trim().length > 0 &&
    formData.features.trim().length > 0;

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-[#EBDDD5] p-5 sm:p-7 shadow-xs">
      {/* Header and Quick Samples */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-[#F2EAE4] gap-3">
        <div>
          <h2 className="text-lg font-serif font-bold text-[#2C1324] flex items-center gap-2">
            <span>Product Blueprint</span>
          </h2>
          <p className="text-xs text-[#785B6C]">
            Provide genuine product facts. Gemma preserves your exact price and details.
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-[#8C3A55] uppercase tracking-wider mr-1">
            Try Samples:
          </span>
          {SAMPLE_PRODUCTS.map((sample) => (
            <button
              key={sample.id}
              type="button"
              disabled={isLoading}
              onClick={() => loadSample(sample)}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#FAF2F5] hover:bg-[#F3E2E8] text-[#7D2947] border border-[#EAC4CF] transition-colors disabled:opacity-50"
              title={`Load sample: ${sample.title}`}
            >
              {sample.title}
            </button>
          ))}
          <button
            type="button"
            onClick={onReset}
            disabled={isLoading || (!formData.productName && !formData.features)}
            className="text-xs text-[#8C7684] hover:text-[#2C1324] p-1.5 rounded-md hover:bg-[#F4ECE6] transition-colors disabled:opacity-30 ml-1"
            title="Clear all fields"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Row 1: Product Name & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-[#3D1A32] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#C45E7A]" />
              <span>Product Name <span className="text-[#C45E7A]">*</span></span>
            </label>
            <input
              type="text"
              required
              disabled={isLoading}
              placeholder="e.g. Kashmiri Walnut Wood Coasters (Set of 6)"
              value={formData.productName}
              onChange={(e) => onChange({ productName: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#E2D2CB] bg-[#FDFAF7] text-[#2C1324] placeholder:text-[#A8929E] focus:outline-none focus:ring-2 focus:ring-[#D97D96] focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#3D1A32] flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-[#C45E7A]" />
              <span>Price in INR <span className="text-[#C45E7A]">*</span></span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7D2947] font-semibold text-sm">
                ₹
              </div>
              <input
                type="text"
                required
                disabled={isLoading}
                placeholder="499"
                value={formData.price}
                onChange={(e) => onChange({ price: e.target.value })}
                className="w-full text-sm pl-7 pr-3 py-2.5 rounded-xl border border-[#E2D2CB] bg-[#FDFAF7] text-[#2C1324] placeholder:text-[#A8929E] focus:outline-none focus:ring-2 focus:ring-[#D97D96] focus:border-transparent transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Features and Specifications */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#3D1A32] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#C45E7A]" />
              <span>Product Facts, Materials & Usage <span className="text-[#C45E7A]">*</span></span>
            </label>
            <span className="text-[11px] text-[#8C7684]">
              {formData.features.length} characters
            </span>
          </div>
          <textarea
            required
            rows={4}
            disabled={isLoading}
            placeholder="Mention genuine facts: materials, size/dimensions, color, origin, care guidelines, what is included. Gemma will strictly answer buyer FAQs only from what you write here."
            value={formData.features}
            onChange={(e) => onChange({ features: e.target.value })}
            className="w-full text-sm p-3.5 rounded-xl border border-[#E2D2CB] bg-[#FDFAF7] text-[#2C1324] placeholder:text-[#A8929E] focus:outline-none focus:ring-2 focus:ring-[#D97D96] focus:border-transparent transition-all resize-y leading-relaxed"
          />
          <p className="text-[11px] text-[#7A5F6E] italic">
            Tip: If a fact like COD, shipping timeline, or return policy isn’t included, Gemma will flag it as “Seller needs to confirm” in the buyer FAQs.
          </p>
        </div>

        {/* Row 3: Target Platform */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#3D1A32] flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-[#C45E7A]" />
            <span>Target Platform</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {platformOptions.map((opt) => {
              const isSelected = formData.platform === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isLoading}
                  onClick={() => onChange({ platform: opt.id })}
                  className={`px-3 py-2 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-[#FAF0F3] border-[#C45E7A] text-[#5A1D32] ring-1 ring-[#C45E7A]/40 shadow-xs'
                      : 'bg-[#FDFAF7] border-[#E8DCD5] text-[#4A2F40] hover:bg-[#F8EFEA]'
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[10px] text-[#7A5F6E] truncate">{opt.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 4: Output Language & Tone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Language */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#3D1A32] flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-[#C45E7A]" />
              <span>Listing Language</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {languageOptions.map((lang) => {
                const isSelected = formData.language === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    disabled={isLoading}
                    onClick={() => onChange({ language: lang.id })}
                    className={`px-2.5 py-2 rounded-xl text-center border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#FAF0F3] border-[#C45E7A] text-[#5A1D32] ring-1 ring-[#C45E7A]/40'
                        : 'bg-[#FDFAF7] border-[#E8DCD5] text-[#5A3E4E] hover:bg-[#F8EFEA]'
                    }`}
                  >
                    <div>{lang.label}</div>
                    <div className="text-[9px] font-normal text-[#8C6D7D] truncate">{lang.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tone */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#3D1A32] flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5 text-[#C45E7A]" />
              <span>Brand Tone</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {toneOptions.map((t) => {
                const isSelected = formData.tone === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    disabled={isLoading}
                    onClick={() => onChange({ tone: t.id })}
                    className={`px-2 py-2 rounded-xl text-center border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#FAF0F3] border-[#C45E7A] text-[#5A1D32] ring-1 ring-[#C45E7A]/40'
                        : 'bg-[#FDFAF7] border-[#E8DCD5] text-[#5A3E4E] hover:bg-[#F8EFEA]'
                    }`}
                    title={t.desc}
                  >
                    <div className="text-sm">{t.emoji}</div>
                    <div className="text-[11px] font-semibold">{t.label}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#3D1A32] via-[#522243] to-[#78284B] hover:from-[#2E1225] hover:to-[#631E3C] shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating with Gemma 4 26B (Open Weights)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#EAA6B8] group-hover:scale-110 transition-transform" />
                <span>Generate Marketing Copy with Gemma</span>
                <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
          <div className="flex items-center justify-between text-[11px] text-[#7A5F6E] mt-2 px-1">
            <span>Runs genuine inference via Google Gemma open-weight model</span>
            <span>Zero hallucinated materials or discounts</span>
          </div>
        </div>
      </div>
    </form>
  );
};
