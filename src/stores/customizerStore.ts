import { create } from 'zustand';

export interface SneakerConfig {
  sole: string;
  upper: string;
  laces: string;
  logo: string;
  material: 'matte' | 'shiny';
  customText?: string; // <--- ADD THIS
}

interface CustomizerState {
  config: SneakerConfig;
  productId: string | null;
  productName: string;
  basePrice: number;
  isLoading: boolean;
  
  // Actions
  setConfig: (config: Partial<SneakerConfig>) => void;
  setFullConfig: (config: SneakerConfig) => void;
  setProduct: (id: string, name: string, price: number, defaultConfig: SneakerConfig) => void;
  resetConfig: () => void;
}

const defaultConfig: SneakerConfig = {
  sole: '#1a1a1a',
  upper: '#ffffff',
  laces: '#000000',
  logo: '#00a8ff',
  material: 'matte',
  customText: '', // <--- ADD THIS
};

export const useCustomizerStore = create<CustomizerState>((set) => ({
  config: defaultConfig,
  productId: null,
  productName: 'Classic Runner',
  basePrice: 149.99,
  isLoading: false,

  setConfig: (partialConfig) =>
    set((state) => ({
      config: { ...state.config, ...partialConfig },
    })),

  setFullConfig: (config) =>
    set({ config }),

  setProduct: (id, name, price, defaultConfig) =>
    set({
      productId: id,
      productName: name,
      basePrice: price,
      config: defaultConfig,
    }),

  resetConfig: () =>
    set({ config: defaultConfig }),
}));
