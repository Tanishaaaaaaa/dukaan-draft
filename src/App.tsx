/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProductFormData, GenerationResult, GenerateResponse, SampleProduct } from './types.ts';
import { Header } from './components/Header.tsx';
import { ProductForm } from './components/ProductForm.tsx';
import { OutputView } from './components/OutputView.tsx';
import { LoadingSkeleton } from './components/LoadingSkeleton.tsx';
import { EmptyState } from './components/EmptyState.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import { AlertCircle, RefreshCw, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

const INITIAL_FORM_DATA: ProductFormData = {
  productName: '',
  price: '',
  features: '',
  platform: 'both',
  language: 'English',
  tone: 'Friendly',
};

export default function App() {
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [latencyMs, setLatencyMs] = useState<number>(0);
  const [modelUsed, setModelUsed] = useState<string>('gemma-4-26b-a4b-it');
  const [error, setError] = useState<string | null>(null);
  const [isGemmaActive, setIsGemmaActive] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // Check health on mount to verify backend and model readiness
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.model) {
          setModelUsed(data.model);
        }
      })
      .catch((err) => {
        console.warn('Backend health check note:', err);
      });
  }, []);

  const handleFormChange = (updated: Partial<ProductFormData>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setResult(null);
    setError(null);
    setIsGemmaActive(false);
  };

  const handleSelectSample = (sample: SampleProduct) => {
    setFormData({ ...sample.data });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!formData.productName.trim() || !formData.price.trim() || !formData.features.trim()) {
      setError('Please fill in product name, price in INR, and product facts.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: GenerateResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate copy with the Gemma model.');
      }

      setResult(data.data);
      setLatencyMs(data.latencyMs || 0);
      setModelUsed(data.modelUsed || 'gemma-4-26b-a4b-it');
      setIsGemmaActive(true);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e.message || 'An unexpected error occurred during generation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1324] flex flex-col font-sans">
      {/* Header */}
      <Header
        onOpenAbout={() => setIsAboutOpen(true)}
        isGemmaActive={isGemmaActive}
        modelName={modelUsed}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F3] border border-[#E8C2CD] text-[#7D2947] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C45E7A]" />
            <span>Honest marketing copy for Indian micro-retailers</span>
          </div>
          <h1 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#2C1324] tracking-tight leading-[1.15]">
            Your products. Better words. More sales.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#6B4D60] font-normal leading-relaxed">
            Create ready-to-post product listings in seconds. Powered by Google's open-weight Gemma model with zero hallucinated claims.
          </p>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] text-[#9F1239] flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-[#E11D48] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm">Inference Notice</h4>
                <p className="text-xs mt-0.5 leading-relaxed">{error}</p>
                {error.includes('GEMINI_API_KEY') && (
                  <p className="text-xs mt-1.5 font-medium text-[#881337]">
                    Tip: Open <strong>Settings &gt; Secrets</strong> in AI Studio to ensure your API key is attached.
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/70 hover:bg-white text-[#9F1239] border border-[#FECDD3] transition-colors shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 2-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Input Form */}
          <div className="lg:col-span-5">
            <ProductForm
              formData={formData}
              onChange={handleFormChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              onReset={handleReset}
            />
          </div>

          {/* Right Column: Output / Loading / Empty State */}
          <div className="lg:col-span-7">
            {isLoading ? (
              <LoadingSkeleton />
            ) : result ? (
              <OutputView
                result={result}
                formData={formData}
                modelUsed={modelUsed}
                latencyMs={latencyMs}
                onRegenerate={() => handleSubmit()}
                isLoading={isLoading}
              />
            ) : (
              <EmptyState onSelectSample={handleSelectSample} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#EBDDD5] bg-[#FAF7F2] py-6 mt-12 text-center text-xs text-[#785B6C]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#2C1324]">DukaanDraft</span>
            <span>•</span>
            <span>Built for Hacktoberfest 2026 Week 2 Side Hustle Challenge</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Model: {modelUsed}</span>
            <span>•</span>
            <span>Strict Truthfulness Guaranteed</span>
          </div>
        </div>
      </footer>

      {/* About & Technical Info Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        modelName={modelUsed}
      />
    </div>
  );
}
