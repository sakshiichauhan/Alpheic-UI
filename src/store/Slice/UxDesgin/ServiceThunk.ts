import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

// API Response Types
export interface SelectServiceCategoryItem {
  name: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  select?: string;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  doctype: string;
  // Merged fields from ServicePage L2 API
  service_category_heading?: string;
  service_category_description?: string;
  link_service_heading?: string;
  link_service_description?: string;
}

export interface ServicePageL1Data {
  heading?: string;
  subheading?: string;
  description?: string;
  select_service_categories?: SelectServiceCategoryItem[];
}

interface ServicePageL1State {
  data: ServicePageL1Data | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServicePageL1State = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk to fetch ServicePage L1 data
export const fetchServicePageL1Data = createAsyncThunk(
  'servicePageL1/fetchServicePageL1Data',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch('/api/resource/ServicePage L1/Page', {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch service page L1 data: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      // Handle response format: { "data": { ... } }
      const pageData = responseData.data || responseData;

      // Fetch ServicePage L2 details for each item in select_service_categories
      if (pageData.select_service_categories && Array.isArray(pageData.select_service_categories)) {
        const enrichedCategoriesList = await Promise.all(
          pageData.select_service_categories.map(async (categoryItem: SelectServiceCategoryItem) => {
            try {
              // Fetch ServicePage L2 details using select field as the identifier
              const serviceName = categoryItem.select;
              if (!serviceName) {
                console.warn('No select field found for select_service_categories item');
                return categoryItem;
              }

              const serviceResponse = await fetch(
                `/api/resource/ServicePage L2/${encodeURIComponent(serviceName)}`,
                {
                  method: 'GET',
                  headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              if (serviceResponse.ok) {
                const serviceData = await serviceResponse.json();
                const serviceDetails = serviceData.data || serviceData;
                
                // Merge ServicePage L2 details into the item
                return {
                  ...categoryItem,
                  service_category_heading: serviceDetails.service_category_heading,
                  service_category_description: serviceDetails.service_category_description,
                  link_service_heading: serviceDetails.link_service_heading,
                  link_service_description: serviceDetails.link_service_description,
                };
              } else {
                // If ServicePage L2 fetch fails, return original item
                console.warn(`Failed to fetch ServicePage L2 details for ${serviceName}`);
                return categoryItem;
              }
            } catch (error) {
              // If ServicePage L2 fetch fails, return original item
              console.warn(`Error fetching ServicePage L2 details for ${categoryItem.select}:`, error);
              return categoryItem;
            }
          })
        );

        // Update pageData with enriched select_service_categories list
        pageData.select_service_categories = enrichedCategoriesList;
      }

      return pageData;
    } catch (error) {
      // Provide more specific error messages
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return rejectWithValue(
          'Network error: Unable to connect to the server. Please check your internet connection.'
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch service page L1 data'
      );
    }
  }
);

const servicePageL1Slice = createSlice({
  name: 'servicePageL1',
  initialState,
  reducers: {
    clearServicePageL1Data: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicePageL1Data.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicePageL1Data.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchServicePageL1Data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearServicePageL1Data } = servicePageL1Slice.actions;
export default servicePageL1Slice.reducer;

