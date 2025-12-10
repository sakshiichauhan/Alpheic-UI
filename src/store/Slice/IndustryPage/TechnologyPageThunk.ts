import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

// API Response Types
export interface IndustryExperience {
  name?: string;
  exp_head?: string;
  exp_description?: string;
}

export interface ImageCard {
  name?: string;
  attach_image?: string;
  title?: string;
  description?: string;
}

export interface FAQItem {
  name?: string;
  title?: string;
  description?: string;
}

export interface IndustryL2Data {
  industry_hero?: number;
  industry_hero_heading?: string;
  industry_hero_subheading?: string;
  industry_hero_description?: string;
  industry_experience?: number;
  industry_experience_heading?: string;
  industry_experience_description?: string;
  whatwedeliver?: number;
  whatwedeliver_heading?: string;
  hire_section?: number;
  hire_section_heading?: string;
  hire_section_description?: string;
  hire_section_lasttext?: string;
  hire_section_buttontext?: string;
  case_study?: number;
  case_study_heading?: string;
  case_study_subheading?: string;
  case_study_buttontext?: string;
  contract_card?: number;
  contract_card_heading?: string;
  contract_card_description?: string;
  contract_card_industrydata?: string;
  contract_card_buttontext?: string;
  faqs?: number;
  faqs_heading?: string;
  industry_experience_highlights?: IndustryExperience[];
  whatwedeliver_cards?: ImageCard[];
  hire_section_cards?: ImageCard[];
  faqs_list?: FAQItem[];
  name?: string;
  doctype?: string;
}

interface TechnologyPageState {
  data: IndustryL2Data | null;
  loading: boolean;
  error: string | null;
}

const initialState: TechnologyPageState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk to fetch Industry L2 data by name
export const fetchIndustryL2Data = createAsyncThunk(
  'technologyPage/fetchIndustryL2Data',
  async (industryName: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch(
        `/api/resource/Industry L2/${encodeURIComponent(industryName)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch industry data: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      // Handle response format: { "data": { ... } }
      const industryData = responseData.data || responseData;

      return industryData;
    } catch (error) {
      // Provide more specific error messages
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return rejectWithValue(
          'Network error: Unable to connect to the server. Please check your internet connection.'
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch industry data'
      );
    }
  }
);

const technologyPageSlice = createSlice({
  name: 'technologyPage',
  initialState,
  reducers: {
    clearTechnologyPageData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustryL2Data.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndustryL2Data.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchIndustryL2Data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTechnologyPageData } = technologyPageSlice.actions;
export default technologyPageSlice.reducer;
