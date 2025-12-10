import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../rootReducer';

// API Response Types
export interface BrandClientData {
  name: string;
  brand_name: string;
  attach_logo?: string;
  idx?: number;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  doctype: string;
}

interface BrandClientState {
  brandClients: Record<string, BrandClientData>;
  loading: boolean;
  error: string | null;
}

const initialState: BrandClientState = {
  brandClients: {},
  loading: false,
  error: null,
};

// Helper function to convert API attachment path to full URL
const getImageUrl = (attachPath: string | undefined | null): string => {
  if (!attachPath || typeof attachPath !== 'string' || attachPath.trim() === '') {
    return "";
  }
  
  const trimmedPath = attachPath.trim();
  
  // If it's already a full URL, return as is
  if (trimmedPath.startsWith("http://") || trimmedPath.startsWith("https://")) {
    return trimmedPath;
  }
  
  // If it starts with /files/, construct the full URL
  if (trimmedPath.startsWith("/files/")) {
    return `https://work.alpheric.com${trimmedPath}`;
  }
  
  // If it doesn't start with /, add /files/ prefix
  if (!trimmedPath.startsWith("/")) {
    return `https://work.alpheric.com/files/${trimmedPath}`;
  }
  
  // Otherwise, construct the full URL
  return `https://work.alpheric.com${trimmedPath}`;
};

// Async thunk to fetch a single brand client by name
export const fetchBrandClientByName = createAsyncThunk(
  'brandClient/fetchBrandClientByName',
  async (brandName: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch(
        `/api/resource/Client Brands/${encodeURIComponent(brandName)}`,
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
          errorData.message || `Failed to fetch brand client: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      // Handle response format: { "data": { ... } }
      const brandClientData = responseData.data || responseData;
      
      // Ensure name is set
      if (!brandClientData.name) {
        brandClientData.name = brandName;
      }

      // Process logo URL
      if (brandClientData.attach_logo) {
        brandClientData.attach_logo = getImageUrl(brandClientData.attach_logo);
      }

      return { name: brandName, data: brandClientData };
    } catch (error) {
      // Provide more specific error messages
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return rejectWithValue(
          'Network error: Unable to connect to the server. Please check your internet connection.'
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch brand client'
      );
    }
  }
);

// Async thunk to fetch multiple brand clients
export const fetchBrandClients = createAsyncThunk(
  'brandClient/fetchBrandClients',
  async (brandNames: string[], { dispatch, rejectWithValue }) => {
    try {
      const results = await Promise.allSettled(
        brandNames.map((name) => dispatch(fetchBrandClientByName(name) as any))
      );

      const successful: Array<{ name: string; data: BrandClientData }> = [];
      const errors: string[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.type?.endsWith('/fulfilled')) {
          successful.push(result.value.payload);
        } else {
          errors.push(`Failed to fetch ${brandNames[index]}`);
        }
      });

      if (errors.length > 0 && successful.length === 0) {
        return rejectWithValue(errors.join('; '));
      }

      return successful;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch brand clients'
      );
    }
  }
);

const brandClientSlice = createSlice({
  name: 'brandClient',
  initialState,
  reducers: {
    clearBrandClientData: (state) => {
      state.brandClients = {};
      state.error = null;
    },
    clearBrandClientByName: (state, action) => {
      delete state.brandClients[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandClientByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandClientByName.fulfilled, (state, action) => {
        state.loading = false;
        state.brandClients[action.payload.name] = action.payload.data;
        state.error = null;
      })
      .addCase(fetchBrandClientByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBrandClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandClients.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach(({ name, data }) => {
          state.brandClients[name] = data;
        });
        state.error = null;
      })
      .addCase(fetchBrandClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBrandClientData, clearBrandClientByName } = brandClientSlice.actions;
export default brandClientSlice.reducer;
