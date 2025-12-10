import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

export interface LatestInsight {
  name: string;
  title?: string;
  creation?: string;
  image?: string;
  read_time?: string;
  read?: string;
  about?: string;
}

interface LatestInsightsState {
  items: LatestInsight[];
  loading: boolean;
  error: string | null;
}

const initialState: LatestInsightsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchLatestInsights = createAsyncThunk(
  'latestInsights/fetchLatestInsights',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      // Fetch list of insights
      const listResponse = await fetch('/api/resource/Insights', {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!listResponse.ok) {
        const errorData = await listResponse.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch insights list: ${listResponse.statusText}`);
      }

      const listData = await listResponse.json();
      const insightList: Array<{ name: string }> = Array.isArray(listData.data)
        ? listData.data
        : Array.isArray(listData)
        ? listData
        : [];

      if (insightList.length === 0) {
        return [];
      }

      // Fetch details for each insight
      const insightsResult = await Promise.allSettled(
        insightList.map(async (item) => {
          const insightName = item.name;
          if (!insightName) {
            throw new Error('Insight name is missing');
          }

          const detailResponse = await fetch(
            `/api/resource/Insights/${encodeURIComponent(insightName)}`,
            {
              method: 'GET',
              headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (!detailResponse.ok) {
            const errorData = await detailResponse.json().catch(() => ({}));
            throw new Error(
              errorData.message || `Failed to fetch insight ${insightName}: ${detailResponse.statusText}`
            );
          }

          const detailData = await detailResponse.json();
          const insightData = detailData.data || detailData;

          return {
            name: insightData.name || insightName,
            title: insightData.title || insightData.name,
            creation: insightData.creation,
            image: insightData.main_image || insightData.image || insightData.banner_image || insightData.thumbnail || '',
            read_time: insightData.read_time,
            read: insightData.read || insightData.read_time,
            about: insightData.about || insightData.tag || 'Insights',
          } as LatestInsight;
        })
      );

      const successful: LatestInsight[] = [];
      const errors: string[] = [];

      insightsResult.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successful.push(result.value);
        } else {
          const insightName = insightList[index]?.name || 'Unknown';
          errors.push(`Failed to fetch ${insightName}`);
        }
      });

      if (successful.length === 0 && errors.length > 0) {
        return rejectWithValue(errors.join('; '));
      }

      return successful;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return rejectWithValue('Network error: Unable to connect to the server.');
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch insights'
      );
    }
  }
);

const latestInsightsSlice = createSlice({
  name: 'latestInsights',
  initialState,
  reducers: {
    clearLatestInsights: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchLatestInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearLatestInsights } = latestInsightsSlice.actions;
export default latestInsightsSlice.reducer;

