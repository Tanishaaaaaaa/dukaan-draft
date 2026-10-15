export interface GenerationResult {
  instagramCaption: string;
  whatsappCatalogue: string;
  alternativeHooks: string[];
  buyerFaqs: Array<{
    question: string;
    answer: string;
  }>;
  promoMessage: string;
}

export interface GenerateResponse {
  success: boolean;
  modelUsed: string;
  modelFamily: string;
  latencyMs: number;
  data: GenerationResult;
  error?: string;
}

export type PlatformOption = 'Instagram' | 'WhatsApp' | 'both';
export type LanguageOption = 'English' | 'Hindi' | 'Hinglish';
export type ToneOption = 'Friendly' | 'Premium' | 'Playful' | 'Minimal';

export interface ProductFormData {
  productName: string;
  price: string;
  features: string;
  platform: PlatformOption;
  language: LanguageOption;
  tone: ToneOption;
}

export interface SampleProduct {
  id: string;
  title: string;
  category: string;
  data: ProductFormData;
}
