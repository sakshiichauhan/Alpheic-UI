import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

export type SelectSubPiolet = {
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
};

export type ImageCard = {
  name?: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  attach_image?: string;
  title?: string;
  description?: string;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  doctype?: string;
};

export type BannerTag = {
  name?: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  tag_name?: string;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  doctype?: string;
};

export type PilotData = {
  active?: number;
  piolet_name?: string;
  description?: string;
  time?: string;
  calander_img?: string;
  piolet_icon?: string;
  banner_title?: string;
  banner_image?: string;
  banner_description?: string;
  banner_time?: string;
  banner_button1?: string;
  banner_button2?: string;
  banner_tags?: BannerTag[];
  select_sub_piolets?: SelectSubPiolet[];
  herosection?: number;
  herosection_heading?: string;
  herosection_subheading?: string;
  herosection_button1?: string;
  herosection_button2?: string;
  whoithelps?: number;
  whoithelps_heading?: string;
  whoithelps_cards?: ImageCard[];
  outcomeinweeks?: number;
  outcomeinweeks_heading?: string;
  outcomeinweeks_cards?: ImageCard[];
  piolets?: number;
  piolets_heading?: string;
  piolets_list?: SelectSubPiolet[];
  doctype?: string;
};

interface PilotState {
  pilots: Record<string, PilotData>;
  loading: boolean;
  error: string | null;
}

const initialState: PilotState = {
  pilots: {},
  loading: false,
  error: null,
};

// Async thunk to fetch a single pilot by name
export const fetchPilotByName = createAsyncThunk(
  'pilot/fetchPilotByName',
  async (pilotName: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue('No authentication token available');
      }

      const response = await fetch(
        `/api/resource/Piolets/${encodeURIComponent(pilotName)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(
          errorData.message ||
            `Failed to fetch pilot: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      // Handle response format: { "data": { ... } }
      const pilotData = responseData.data || responseData;

      // Ensure piolet_name is set
      if (!pilotData.piolet_name) {
        pilotData.piolet_name = pilotName;
      }

      return { name: pilotName, data: pilotData };
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return rejectWithValue(
          'Network error: Unable to connect to the server.'
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch pilot'
      );
    }
  }
);

// Async thunk to fetch multiple pilots
export const fetchPilots = createAsyncThunk(
  'pilot/fetchPilots',
  async (pilotNames: string[], { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue('No authentication token available');
      }

      // Fetch all pilots in parallel
      const results = await Promise.allSettled(
        pilotNames.map((name) =>
          dispatch(fetchPilotByName(name)).unwrap()
        )
      );

      const successful: Array<{ name: string; data: PilotData }> = [];
      const errors: string[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successful.push(result.value);
        } else {
          errors.push(
            `Failed to fetch ${pilotNames[index]}: ${result.reason}`
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
        error instanceof Error ? error.message : 'Failed to fetch pilots'
      );
    }
  }
);

const pilotSlice = createSlice({
  name: 'pilot',
  initialState,
  reducers: {
    clearPilot: (state, action) => {
      const name = action.payload;
      if (name) {
        delete state.pilots[name];
      } else {
        state.pilots = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPilotByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPilotByName.fulfilled, (state, action) => {
        state.loading = false;
        state.pilots[action.payload.name] = action.payload.data;
        state.error = null;
      })
      .addCase(fetchPilotByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPilots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPilots.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach(({ name, data }) => {
          state.pilots[name] = data;
        });
        state.error = null;
      })
      .addCase(fetchPilots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPilot } = pilotSlice.actions;
export const selectPilot = (state: RootState, name: string) =>
  state.pilot.pilots[name];
export const selectPilots = (state: RootState) => state.pilot.pilots;
export const selectPilotLoading = (state: RootState) => state.pilot.loading;
export const selectPilotError = (state: RootState) => state.pilot.error;

export default pilotSlice.reducer;

// Utility function to build image URLs
export const buildPilotImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/files/')) return `https://work.alpheric.com${path}`;
  return path;
};

// If flag is undefined, allow render (fallback to defaults). Only hide when flag is explicitly 0.
export const isPilotSectionEnabled = (flag?: number | string | null) =>
  flag === undefined || flag === null ? true : Number(flag) === 1;
