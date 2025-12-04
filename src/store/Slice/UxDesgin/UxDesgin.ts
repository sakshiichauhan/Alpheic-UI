import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

// API Response Types
export interface WhyChooseUsCard {
  name: string;
  attach_image?: string;
  title: string;
  description: string;
  doctype: string;
}

export interface ServiceHireCard {
  name: string;
  attach_image?: string;
  title: string;
  description: string;
  doctype: string;
}

export interface ServiceDesignCard {
  name: string;
  attach_image?: string;
  title: string;
  description: string;
  doctype: string;
}

export interface FAQItem {
  name: string;
  title: string;
  description: string;
  doctype: string;
}

export interface ServicePageData {
  // Service Hero Section
  service_hero: number;
  service_hero_name: string;
  service_hero_other_name: string;
  service_hero_short_description: string;
  service_hero_description: string;

  // Why Choose Us Section
  why_choose_us: number;
  why_choose_us_heading: string;
  why_choose_us_description: string;
  why_choose_us_cards: WhyChooseUsCard[];

  // Case Studies Section
  service_casestudies: number;
  service_casestudies_heading: string;
  service_casestudies_description: string;
  service_casestudies_buttondata?: string ;

  // Industries Section
  linked_industries: number;
  linked_industries_heading: string;

  // What We Offer / Service Hire Section
  service_hire: number;
  service_hire_heading: string;
  service_hire_cards: ServiceHireCard[];
  service_hire_buttondata?: string;
  
  // Resource Card Section
  resource_card: number;
  resource_card_heading: string;
  resource_card_title: string;
  resource_card_description: string;
  resource_card_image: string;
  resource_card_buttondata?: string;

  // Design Consultants Section
  design_consultants: number;
  design_consultants_heading: string;
  design_consultants_description: string;
  design_consultants_buttondata?: string;

  // Hire Card Section
  hire_card: number;
  hire_card_title: string;
  hire_card_heading: string;
  hire_card_description: string;
  hire_card_buttondata?: string;

  // Service Brands Section
  service_brands: number;
  service_brands_heading: string;
  service_brands_description: string;

  // Service Insights Section
  service_insights: number;
  service_insights_heading: string;
  service_insights_description: string;
  service_insights_buttondata?: string;

  // Service Pilot Section
  service_piolet: number;
  service_piolet_title: string;
  service_piolet_heading: string;
  service_piolet_description: string;
  service_piolet_buttondata?: string;

  // Section FAQs
  section_faqs: number;
  faqs?: FAQItem[];

  // Section Collaborate Card
  section_collaborate_card: number;

  // Human / Service Design Cards Section
  service_design_cards_table: ServiceDesignCard[];
}

interface ServicePageState {
  data: ServicePageData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServicePageState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk to fetch ServicePage data
export const fetchServicePageData = createAsyncThunk(
  'uxDesign/fetchServicePageData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch('/api/resource/ServicePage L4/Page', {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch service page data: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      // Handle response format: { "data": { ... } }
      return responseData.data || responseData;
    } catch (error) {
      // Provide more specific error messages
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return rejectWithValue(
          'Network error: Unable to connect to the server. Please check your internet connection.'
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch service page data'
      );
    }
  }
);

const servicePageSlice = createSlice({
  name: 'servicePage',
  initialState,
  reducers: {
    clearServicePageData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicePageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicePageData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchServicePageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearServicePageData } = servicePageSlice.actions;
export default servicePageSlice.reducer;

