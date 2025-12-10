import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

// API Response Types
export interface PlatformTag {
  idx: number;
  pl_name: string;
  name?: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  doctype: string;
}

export interface Attachment {
  idx: number;
  attach: string;
  name?: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  doctype: string;
}

export interface IndustryLinking {
  idx: number;
  name1: string;
  name?: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  doctype: string;
}

export interface CaseStudyData {
  name: string;
  full_title: string;
  short_title?: string;
  short_description: string;
  heading?: string;
  description?: string;
  link?: string;
  deliverables?: string;
  industry?: string;
  duration?: string;
  main_platform?: string;
  platform_tags?: PlatformTag[];
  attachments?: Attachment[];
  industry_linking?: IndustryLinking[];
  brand_linking?: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  doctype: string;
}

interface CaseStudyState {
  caseStudies: Record<string, CaseStudyData>;
  loading: boolean;
  error: string | null;
}

const initialState: CaseStudyState = {
  caseStudies: {},
  loading: false,
  error: null,
};

// Async thunk to fetch a single case study by name
export const fetchCaseStudyByName = createAsyncThunk(
  'caseStudy/fetchCaseStudyByName',
  async (caseStudyName: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch(
        `/api/resource/CaseStudy/${encodeURIComponent(caseStudyName)}`,
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
          errorData.message || `Failed to fetch case study: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      // Handle response format: { "data": { ... } }
      const caseStudyData = responseData.data || responseData;
      
      // Ensure name is set
      if (!caseStudyData.name) {
        caseStudyData.name = caseStudyName;
      }

      return { name: caseStudyName, data: caseStudyData };
    } catch (error) {
      // Provide more specific error messages
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return rejectWithValue(
          'Network error: Unable to connect to the server. Please check your internet connection.'
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch case study'
      );
    }
  }
);

// Async thunk to fetch multiple case studies
export const fetchCaseStudies = createAsyncThunk(
  'caseStudy/fetchCaseStudies',
  async (caseStudyNames: string[], { dispatch, rejectWithValue }) => {
    try {
      const results = await Promise.allSettled(
        caseStudyNames.map((name) => dispatch(fetchCaseStudyByName(name) as any))
      );

      const successful: Array<{ name: string; data: CaseStudyData }> = [];
      const errors: string[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.type?.endsWith('/fulfilled')) {
          successful.push(result.value.payload);
        } else {
          errors.push(`Failed to fetch ${caseStudyNames[index]}`);
        }
      });

      if (errors.length > 0 && successful.length === 0) {
        return rejectWithValue(errors.join('; '));
      }

      return successful;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch case studies'
      );
    }
  }
);

// Interface for case study list item
export interface CaseStudyListItem {
  name: string;
}

// Async thunk to fetch case studies filtered by platform tags
export const fetchCaseStudiesByPlatformTags = createAsyncThunk(
  'caseStudy/fetchCaseStudiesByPlatformTags',
  async (platformTagNames: string[], { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      if (!platformTagNames || platformTagNames.length === 0) {
        return [];
      }

      // Step 1: Fetch the list of case studies
      const listResponse = await fetch('/api/resource/CaseStudy', {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!listResponse.ok) {
        const errorData = await listResponse.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch case study list: ${listResponse.statusText}`
        );
      }

      const listData = await listResponse.json();
      const caseStudyList: CaseStudyListItem[] = Array.isArray(listData.data)
        ? listData.data
        : Array.isArray(listData)
        ? listData
        : [];

      if (caseStudyList.length === 0) {
        return [];
      }

      // Step 2: Fetch full details for each case study
      const caseStudyDetails = await Promise.allSettled(
        caseStudyList.map(async (item) => {
          const caseStudyName = item.name;
          if (!caseStudyName) {
            throw new Error('Case study name is missing');
          }

          const detailResponse = await fetch(
            `/api/resource/CaseStudy/${encodeURIComponent(caseStudyName)}`,
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
              errorData.message || `Failed to fetch case study ${caseStudyName}: ${detailResponse.statusText}`
            );
          }

          const detailData = await detailResponse.json();
          const caseStudyData = detailData.data || detailData;
          
          if (!caseStudyData.name) {
            caseStudyData.name = caseStudyName;
          }

          return { name: caseStudyName, data: caseStudyData };
        })
      );

      // Step 3: Filter case studies by platform tags
      const successful: Array<{ name: string; data: CaseStudyData }> = [];
      const errors: string[] = [];

      caseStudyDetails.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          const caseStudy = result.value;
          const caseStudyPlatformTags = caseStudy.data.platform_tags || [];
          
          // Check if any platform tag matches the filter tags
          const hasMatchingTag = caseStudyPlatformTags.some((tag: PlatformTag) =>
            platformTagNames.includes(tag.pl_name)
          );

          if (hasMatchingTag) {
            successful.push(caseStudy);
          }
        } else {
          const caseStudyName = caseStudyList[index]?.name || 'Unknown';
          errors.push(`Failed to fetch ${caseStudyName}: ${result.reason?.message || 'Unknown error'}`);
          console.warn(`Failed to fetch case study ${caseStudyName}:`, result.reason);
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
          'Network error: Unable to connect to the server. Please check your internet connection.'
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch case studies by platform tags'
      );
    }
  }
);

// Async thunk to fetch case studies filtered by industry linking
export const fetchCaseStudiesByIndustry = createAsyncThunk(
  'caseStudy/fetchCaseStudiesByIndustry',
  async (industryName: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      if (!industryName) {
        return [];
      }

      // Step 1: Fetch the list of case studies
      const listResponse = await fetch('/api/resource/CaseStudy', {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!listResponse.ok) {
        const errorData = await listResponse.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch case study list: ${listResponse.statusText}`
        );
      }

      const listData = await listResponse.json();
      const caseStudyList: CaseStudyListItem[] = Array.isArray(listData.data)
        ? listData.data
        : Array.isArray(listData)
        ? listData
        : [];

      if (caseStudyList.length === 0) {
        return [];
      }

      // Step 2: Fetch full details for each case study
      const caseStudyDetails = await Promise.allSettled(
        caseStudyList.map(async (item) => {
          const caseStudyName = item.name;
          if (!caseStudyName) {
            throw new Error('Case study name is missing');
          }

          const detailResponse = await fetch(
            `/api/resource/CaseStudy/${encodeURIComponent(caseStudyName)}`,
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
              errorData.message || `Failed to fetch case study ${caseStudyName}: ${detailResponse.statusText}`
            );
          }

          const detailData = await detailResponse.json();
          const caseStudyData = detailData.data || detailData;
          
          if (!caseStudyData.name) {
            caseStudyData.name = caseStudyName;
          }

          return { name: caseStudyName, data: caseStudyData };
        })
      );

      // Step 3: Filter case studies by industry_linking
      const successful: Array<{ name: string; data: CaseStudyData }> = [];
      const errors: string[] = [];

      caseStudyDetails.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          const caseStudy = result.value;
          const industryLinking = caseStudy.data.industry_linking || [];
          
          // Check if any industry_linking item has name1 matching the industry name
          const hasMatchingIndustry = industryLinking.some((link: IndustryLinking) =>
            link.name1 === industryName
          );

          if (hasMatchingIndustry) {
            successful.push(caseStudy);
          }
        } else {
          const caseStudyName = caseStudyList[index]?.name || 'Unknown';
          errors.push(`Failed to fetch ${caseStudyName}: ${result.reason?.message || 'Unknown error'}`);
          console.warn(`Failed to fetch case study ${caseStudyName}:`, result.reason);
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
          'Network error: Unable to connect to the server. Please check your internet connection.'
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch case studies by industry'
      );
    }
  }
);

// Async thunk to fetch all case studies (list first, then details)
export const fetchAllCaseStudies = createAsyncThunk(
  'caseStudy/fetchAllCaseStudies',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      // Step 1: Fetch the list of case studies
      const listResponse = await fetch('/api/resource/CaseStudy', {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!listResponse.ok) {
        const errorData = await listResponse.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch case study list: ${listResponse.statusText}`
        );
      }

      const listData = await listResponse.json();
      // Handle response format: { "data": [{ "name": "..." }, ...] }
      const caseStudyList: CaseStudyListItem[] = Array.isArray(listData.data)
        ? listData.data
        : Array.isArray(listData)
        ? listData
        : [];

      if (caseStudyList.length === 0) {
        return [];
      }

      // Step 2: Fetch full details for each case study
      const caseStudyDetails = await Promise.allSettled(
        caseStudyList.map(async (item) => {
          const caseStudyName = item.name;
          if (!caseStudyName) {
            throw new Error('Case study name is missing');
          }

          const detailResponse = await fetch(
            `/api/resource/CaseStudy/${encodeURIComponent(caseStudyName)}`,
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
              errorData.message || `Failed to fetch case study ${caseStudyName}: ${detailResponse.statusText}`
            );
          }

          const detailData = await detailResponse.json();
          // Handle response format: { "data": { ... } }
          const caseStudyData = detailData.data || detailData;
          
          // Ensure name is set
          if (!caseStudyData.name) {
            caseStudyData.name = caseStudyName;
          }

          return { name: caseStudyName, data: caseStudyData };
        })
      );

      // Process results - collect successful and log errors
      const successful: Array<{ name: string; data: CaseStudyData }> = [];
      const errors: string[] = [];

      caseStudyDetails.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successful.push(result.value);
        } else {
          const caseStudyName = caseStudyList[index]?.name || 'Unknown';
          errors.push(`Failed to fetch ${caseStudyName}: ${result.reason?.message || 'Unknown error'}`);
          console.warn(`Failed to fetch case study ${caseStudyName}:`, result.reason);
        }
      });

      // If all failed, return error
      if (successful.length === 0 && errors.length > 0) {
        return rejectWithValue(errors.join('; '));
      }

      // Return successful results (even if some failed)
      return successful;
    } catch (error) {
      // Provide more specific error messages
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return rejectWithValue(
          'Network error: Unable to connect to the server. Please check your internet connection.'
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch all case studies'
      );
    }
  }
);

const caseStudySlice = createSlice({
  name: 'caseStudy',
  initialState,
  reducers: {
    clearCaseStudyData: (state) => {
      state.caseStudies = {};
      state.error = null;
    },
    clearCaseStudyByName: (state, action) => {
      delete state.caseStudies[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseStudyByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCaseStudyByName.fulfilled, (state, action) => {
        state.loading = false;
        state.caseStudies[action.payload.name] = action.payload.data;
        state.error = null;
      })
      .addCase(fetchCaseStudyByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCaseStudies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCaseStudies.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach(({ name, data }) => {
          state.caseStudies[name] = data;
        });
        state.error = null;
      })
      .addCase(fetchCaseStudies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllCaseStudies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCaseStudies.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach(({ name, data }) => {
          state.caseStudies[name] = data;
        });
        state.error = null;
      })
      .addCase(fetchAllCaseStudies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCaseStudiesByPlatformTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCaseStudiesByPlatformTags.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach(({ name, data }) => {
          state.caseStudies[name] = data;
        });
        state.error = null;
      })
      .addCase(fetchCaseStudiesByPlatformTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCaseStudiesByIndustry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCaseStudiesByIndustry.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach(({ name, data }) => {
          state.caseStudies[name] = data;
        });
        state.error = null;
      })
      .addCase(fetchCaseStudiesByIndustry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCaseStudyData, clearCaseStudyByName } = caseStudySlice.actions;
export default caseStudySlice.reducer;

