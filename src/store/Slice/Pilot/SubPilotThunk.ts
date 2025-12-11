import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

export type SubPioletData = {
  name?: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  piolet?: string;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  doctype?: string;
  // Fields for table display
  objective?: string;
  objective_name?: string;
  short_objective?: string;
  service_mix?: string;
  serviceMix?: string;
  service_mix_name?: string;
  primary_kpi?: string;
  kpi?: string;
  primary_kpi_name?: string;
  duration?: string;
  duration_time?: string;
  // Fields for ViewScope modal
  description?: string;
  deliverables?: string;
  deliverables_name?: string;
  features?: string[];
  features_list?: Array<{ feature?: string; name?: string }>;
  scope_items?: string[];
  scope_list?: Array<{ item?: string; name?: string }>;
  objective_points?: Array<{
    name?: string;
    owner?: string;
    creation?: string;
    modified?: string;
    modified_by?: string;
    docstatus?: number;
    idx?: number;
    point?: string;
    parent?: string;
    parentfield?: string;
    parenttype?: string;
    doctype?: string;
  }>;
  // Button fields
  action_button1?: string;
  action_button2?: string;
  buttontext?: string;
  [key: string]: any; // Allow for additional fields
};

interface SubPilotState {
  subPilots: Record<string, SubPioletData>;
  loading: boolean;
  error: string | null;
}

const initialState: SubPilotState = {
  subPilots: {},
  loading: false,
  error: null,
};

// Async thunk to fetch a single SubPiolet by name
export const fetchSubPilotByName = createAsyncThunk(
  'subPilot/fetchSubPilotByName',
  async (subPilotName: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue('No authentication token available');
      }

      // Try proxy endpoint first, fallback to full URL
      const proxyUrl = `/api/resource/SubPiolet/${encodeURIComponent(subPilotName)}`;
      const fullUrl = `https://work.alpheric.com/api/resource/SubPiolet/${encodeURIComponent(subPilotName)}`;
      
      // Try proxy endpoint first
      let response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // If proxy fails, try full URL
      if (!response.ok) {
        response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(
          errorData.message ||
            `Failed to fetch SubPiolet: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      // Handle response format: { "data": { ... } }
      const subPilotData = responseData.data || responseData;

      // Ensure name is set
      if (!subPilotData.name) {
        subPilotData.name = subPilotName;
      }

      return { name: subPilotName, data: subPilotData };
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return rejectWithValue(
          'Network error: Unable to connect to the server.'
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch SubPiolet'
      );
    }
  }
);

// Async thunk to fetch multiple SubPilots
export const fetchSubPilots = createAsyncThunk(
  'subPilot/fetchSubPilots',
  async (subPilotNames: string[], { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue('No authentication token available');
      }

      // Fetch all SubPilots in parallel
      const results = await Promise.allSettled(
        subPilotNames.map((name) =>
          dispatch(fetchSubPilotByName(name)).unwrap()
        )
      );

      const successful: Array<{ name: string; data: SubPioletData }> = [];
      const errors: string[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successful.push(result.value);
        } else {
          errors.push(
            `Failed to fetch ${subPilotNames[index]}: ${result.reason}`
          );
        }
      });

      // If all failed, return error
      if (successful.length === 0 && errors.length > 0) {
        return rejectWithValue(errors.join('; '));
      }

      return successful;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return rejectWithValue(
          'Network error: Unable to connect to the server.'
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch SubPilots'
      );
    }
  }
);

const subPilotSlice = createSlice({
  name: 'subPilot',
  initialState,
  reducers: {
    clearSubPilot: (state, action) => {
      const name = action.payload;
      if (name) {
        delete state.subPilots[name];
      } else {
        state.subPilots = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubPilotByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubPilotByName.fulfilled, (state, action) => {
        state.loading = false;
        state.subPilots[action.payload.name] = action.payload.data;
        state.error = null;
      })
      .addCase(fetchSubPilotByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSubPilots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubPilots.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach(({ name, data }) => {
          state.subPilots[name] = data;
        });
        state.error = null;
      })
      .addCase(fetchSubPilots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSubPilot } = subPilotSlice.actions;
export const selectSubPilot = (state: RootState, name: string) =>
  state.subPilot.subPilots[name];
export const selectSubPilots = (state: RootState) => state.subPilot.subPilots;
export const selectSubPilotLoading = (state: RootState) => state.subPilot.loading;
export const selectSubPilotError = (state: RootState) => state.subPilot.error;

export default subPilotSlice.reducer;
