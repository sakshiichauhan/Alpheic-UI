import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

type FaqItem = {
  title?: string;
  description?: string;
};

type BannerStep = {
  name?: string;
  duration?: string;
  description?: string;
};

type PilotCard = {
  piolet_name?: string;
  description?: string;
  time?: string;
  calander_img?: string;
};

type PilotTab = {
  piolet_name?: string;
  piolet_icon?: string;
};

type BannerTag = {
  tag_name?: string;
};

export type PilotPageData = {
  idx?: number;
  herosection?: number;
  herosection_heading?: string;
  herosection_subheading?: string;
  herosection_description?: string;
  herosection_button1?: string;
  herosection_button2?: string;
  piolets?: number;
  piolet_table?: number;
  piolet_table_heading?: string;
  banner?: number;
  banner_name?: string;
  banner_step1_name?: string;
  banner_step1_duration?: string;
  banner_step1_description?: string;
  banner_step2_name?: string;
  banner_step2_duration?: string;
  banner_step2_description?: string;
  banner_step3_name?: string;
  banner_step3_duration?: string;
  banner_step3_description?: string;
  banner_step4_name?: string;
  banner_step4_duration?: string;
  banner_step4_description?: string;
  report?: number;
  report_heading?: string;
  report_subheading?: string;
  report_title?: string;
  report_description?: string;
  report_image?: string;
  report_buttontext?: string;
  insights?: number;
  insights_heading?: string;
  insights_button?: string;
  faqs?: number;
  faqs_heading?: string;
  card?: number;
  card_heading?: string;
  card_description?: string;
  card_button1?: string;
  card_button2?: string;
  faqs_list?: FaqItem[];
  insights_tags?: Array<{
    name?: string;
    owner?: string;
    creation?: string;
    modified?: string;
    modified_by?: string;
    docstatus?: number;
    idx?: number;
    tag?: string;
    parent?: string;
    parentfield?: string;
    parenttype?: string;
    doctype?: string;
  }>;
  piolets_list?: PilotCard[];
  piolets_tabs?: PilotTab[];
  // Homepage banner data
  banner_title?: string;
  banner_image?: string;
  banner_description?: string;
  banner_time?: string;
  banner_button1?: string;
  banner_button?: string;
  banner_tags?: BannerTag[];
};

interface PilotPageState {
  data: PilotPageData | null;
  loading: boolean;
  error: string | null;
}

const initialState: PilotPageState = {
  data: null,
  loading: false,
  error: null,
};

// Pilot page endpoint (proxied)
const PILOT_PAGE_URL = '/api/resource/PioletPage/Page';

const toFlag = (value?: number | string | null) => Number(value) === 1 ? 1 : 0;

export const fetchPilotPageData = createAsyncThunk(
  'pilotPage/fetch',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue('No authentication token available');
      }

      const response = await fetch(PILOT_PAGE_URL, {
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(
          errorData.message ||
            `Failed to fetch pilot page data: ${response.statusText}`
        );
      }

      const json = await response.json();
      const payload = (json && (json.data || json)) as PilotPageData;
      const normalized: PilotPageData = {
        ...payload,
        herosection: toFlag(payload?.herosection),
        piolets: toFlag(payload?.piolets),
        piolet_table: toFlag(payload?.piolet_table),
        banner: toFlag(payload?.banner),
        report: toFlag(payload?.report),
        insights: toFlag(payload?.insights),
        faqs: toFlag(payload?.faqs),
        card: toFlag(payload?.card),
        faqs_list: payload?.faqs_list || [],
        insights_tags: payload?.insights_tags || [],
        piolets_list: payload?.piolets_list || [],
        piolets_tabs: payload?.piolets_tabs || [],
        banner_title: payload?.banner_title,
        banner_image: payload?.banner_image,
        banner_description: payload?.banner_description,
        banner_time: payload?.banner_time,
        banner_button1: payload?.banner_button1,
        banner_button: payload?.banner_button,
        banner_tags: payload?.banner_tags || [],
      };
      return normalized;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return rejectWithValue('Network error: Unable to connect to the server.');
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch pilot page data'
      );
    }
  }
);

const pilotPageSlice = createSlice({
  name: 'pilotPage',
  initialState,
  reducers: {
    clearPilotPage: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPilotPageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPilotPageData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchPilotPageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectPilotPage = (state: RootState) => state.pilotPage;
export const selectPilotBannerSteps = (data: PilotPageData | null): BannerStep[] => {
  if (!data) return [];
  return [
    {
      name: data.banner_step1_name,
      duration: data.banner_step1_duration,
      description: data.banner_step1_description,
    },
    {
      name: data.banner_step2_name,
      duration: data.banner_step2_duration,
      description: data.banner_step2_description,
    },
    {
      name: data.banner_step3_name,
      duration: data.banner_step3_duration,
      description: data.banner_step3_description,
    },
    {
      name: data.banner_step4_name,
      duration: data.banner_step4_duration,
      description: data.banner_step4_description,
    },
  ].filter((step) => step.name || step.duration || step.description);
};

export const { clearPilotPage } = pilotPageSlice.actions;
export default pilotPageSlice.reducer;

// Utility functions for components
export const stripHtml = (value?: string, fallback = "") => {
  if (!value) return fallback;
  const cleaned = value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || fallback;
};

export const buildImageUrl = (path?: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/files/")) return `https://work.alpheric.com${path}`;
  return path;
};

// If flag is undefined, allow render (fallback to defaults). Only hide when flag is explicitly 0.
export const isEnabled = (flag?: number | string | null) =>
  flag === undefined || flag === null ? true : Number(flag) === 1;
