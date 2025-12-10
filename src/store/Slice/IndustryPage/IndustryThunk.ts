import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

// API Response Types
export interface LinkIndustryL2Item {
  name1?: string;
  doctype?: string;
}

export interface IndustryL2Card {
  name?: string;
  card_title?: string;
  card_description?: string;
  card_icon?: string;
}

export interface IndustryL1Data {
  industry_hero?: number;
  industry_hero_heading?: string;
  industry_hero_subheading?: string;
  industry_hero_description?: string;
  hero_section?: number;
  collaborate?: number;
  doctype?: string;
  link_industries_list?: LinkIndustryL2Item[];
}

interface IndustryPageState {
  l1Data: IndustryL1Data | null;
  l2Cards: IndustryL2Card[];
  loading: boolean;
  error: string | null;
}

const initialState: IndustryPageState = {
  l1Data: null,
  l2Cards: [],
  loading: false,
  error: null,
};

// Async thunk to fetch Industry L1 data and then fetch L2 data for each industry
export const fetchIndustryPageData = createAsyncThunk(
  'industryPage/fetchIndustryPageData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      // Step 1: Fetch Industry L1 data
      const l1Response = await fetch(
        '/api/resource/Industry L1/Page',
        {
          method: 'GET',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!l1Response.ok) {
        const errorData = await l1Response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch industry L1 data: ${l1Response.statusText}`
        );
      }

      const l1ResponseData = await l1Response.json();
      const l1Data: IndustryL1Data = l1ResponseData.data || l1ResponseData;

      // Step 2: Fetch Industry L2 data for each item in link_industries_list
      const l2Cards: IndustryL2Card[] = [];
      
      if (l1Data.link_industries_list && Array.isArray(l1Data.link_industries_list)) {
        const l2Results = await Promise.allSettled(
          l1Data.link_industries_list.map(async (item) => {
            const industryName = item.name1;
            if (!industryName) {
              console.warn('No name1 found for industry item');
              return null;
            }

            try {
              const l2Response = await fetch(
                `/api/resource/Industry L2/${encodeURIComponent(industryName)}`,
                {
                  method: 'GET',
                  headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              if (l2Response.ok) {
                const l2ResponseData = await l2Response.json();
                const l2Data = l2ResponseData.data || l2ResponseData;
                
                return {
                  name: l2Data.name || industryName,
                  card_title: l2Data.card_title,
                  card_description: l2Data.card_description,
                  card_icon: l2Data.card_icon,
                } as IndustryL2Card;
              } else {
                console.warn(`Failed to fetch Industry L2 data for ${industryName}`);
                return null;
              }
            } catch (error) {
              console.warn(`Error fetching Industry L2 data for ${industryName}:`, error);
              return null;
            }
          })
        );

        // Collect successful results
        l2Results.forEach((result) => {
          if (result.status === 'fulfilled' && result.value) {
            l2Cards.push(result.value);
          }
        });
      }

      return { l1Data, l2Cards };
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

const industryPageSlice = createSlice({
  name: 'industryPage',
  initialState,
  reducers: {
    clearIndustryPageData: (state) => {
      state.l1Data = null;
      state.l2Cards = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustryPageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndustryPageData.fulfilled, (state, action) => {
        state.loading = false;
        state.l1Data = action.payload.l1Data;
        state.l2Cards = action.payload.l2Cards;
        state.error = null;
      })
      .addCase(fetchIndustryPageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearIndustryPageData } = industryPageSlice.actions;
export default industryPageSlice.reducer;
