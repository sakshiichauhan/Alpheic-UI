import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

// API Response Types
export interface ServiceCategoryServiceItem {
  name: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  service?: string;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  doctype: string;
}

export interface LinkServiceNameItem {
  name: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  name1?: string;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  doctype: string;
  // Merged fields from ServicePage L3 API
  service_category_heading?: string;
  service_category_description?: string;
  service_category_services?: ServiceCategoryServiceItem[];
}

export interface ToolsListItem {
  name: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  tab_name?: string;
  tool?: string;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  doctype: string;
  // Merged fields from ToolsWeUse API
  logo_image?: string;
  logo_name?: string;
  link_to_site?: string;
}

export interface FAQsListItem {
  name: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  title?: string;
  description?: string;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  doctype: string;
}

export interface ConsultantsListItem {
  name: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  docstatus?: number;
  idx?: number;
  name1?: string;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  doctype: string;
  // Merged fields from Consultants API
  attach_image?: string;
  role?: string;
}

export interface DesignPageL2Data {
  service_category: number;
  service_category_smalltitle: string;
  service_category_heading: string;
  service_category_description: string;
  service_category_button1: string;
  service_category_button2: string;
  service_category_card_title?: string;
  service_category_card_subtitle?: string;
  service_category_card_description?: string;
  link_service: number;
  link_service_heading: string;
  link_service_description: string;
  link_service_names?: LinkServiceNameItem[];
  tools?: number;
  tools_heading?: string;
  tools_subheading?: string;
  insights?: number;
  insights_heading?: string;
  insights_buttondata?: string;
  consultants?: number;
  consultants_heading?: string;
  consultants_subheading?: string;
  consultants_buttondata?: string;
  faqs?: number;
  faqs_heading?: string;
  card?: number;
  card_heading?: string;
  card_subheading?: string;
  card_advertises?: string;
  card_sub_advertises?: string;
  card_buttondata?: string;
  tools_list?: ToolsListItem[];
  faqs_list?: FAQsListItem[];
  consultants_list?: ConsultantsListItem[];
}

interface DesignPageL2State {
  data: DesignPageL2Data | null;
  loading: boolean;
  error: string | null;
}

const initialState: DesignPageL2State = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk to fetch Design Page L2 data
export const fetchDesignPageL2Data = createAsyncThunk(
  'designPageL2/fetchDesignPageL2Data',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch('/api/resource/ServicePage L2/Design', {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch design page data: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      // Handle response format: { "data": { ... } }
      const pageData = responseData.data || responseData;

      // Fetch ServicePage L3 details for each item in link_service_names
      if (pageData.link_service_names && Array.isArray(pageData.link_service_names)) {
        const enrichedLinkServiceNames = await Promise.all(
          pageData.link_service_names.map(async (linkItem: LinkServiceNameItem) => {
            try {
              // Fetch ServicePage L3 details using name1 as the identifier
              const serviceName = linkItem.name1 || linkItem.name;
              if (!serviceName) {
                console.warn('No name1 or name found for link_service_names item');
                return linkItem;
              }

              const serviceResponse = await fetch(
                `/api/resource/ServicePage L3/${encodeURIComponent(serviceName)}`,
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
                
                // Merge ServicePage L3 details into the item
                return {
                  ...linkItem,
                  service_category_heading: serviceDetails.service_category_heading,
                  service_category_description: serviceDetails.service_category_description,
                  service_category_services: serviceDetails.service_category_services || [],
                };
              } else {
                // If ServicePage L3 fetch fails, return original item
                console.warn(`Failed to fetch ServicePage L3 details for ${serviceName}`);
                return linkItem;
              }
            } catch (error) {
              // If ServicePage L3 fetch fails, return original item
              console.warn(`Error fetching ServicePage L3 details for ${linkItem.name1 || linkItem.name}:`, error);
              return linkItem;
            }
          })
        );

        // Update pageData with enriched link_service_names list
        pageData.link_service_names = enrichedLinkServiceNames;
      }

      // Fetch Consultants details for each item in consultants_list
      if (pageData.consultants_list && Array.isArray(pageData.consultants_list)) {
        const enrichedConsultantsList = await Promise.all(
          pageData.consultants_list.map(async (consultantItem: ConsultantsListItem) => {
            try {
              // Fetch consultant details from Consultants API using name1 as the identifier
              const consultantName = consultantItem.name1 || consultantItem.name;
              if (!consultantName) {
                console.warn('No name1 or name found for consultants_list item');
                return consultantItem;
              }

              const consultantResponse = await fetch(
                `/api/resource/Consultants/${encodeURIComponent(consultantName)}`,
                {
                  method: 'GET',
                  headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              if (consultantResponse.ok) {
                const consultantData = await consultantResponse.json();
                const consultantDetails = consultantData.data || consultantData;
                
                // Merge consultant details into the item
                return {
                  ...consultantItem,
                  attach_image: consultantDetails.attach_image,
                  role: consultantDetails.role,
                };
              } else {
                // If consultant fetch fails, return original item
                console.warn(`Failed to fetch consultant details for ${consultantName}`);
                return consultantItem;
              }
            } catch (error) {
              // If consultant fetch fails, return original item
              console.warn(`Error fetching consultant details for ${consultantItem.name1 || consultantItem.name}:`, error);
              return consultantItem;
            }
          })
        );

        // Update pageData with enriched consultants_list
        pageData.consultants_list = enrichedConsultantsList;
      }

      // Fetch ToolsWeUse details for each item in tools_list
      if (pageData.tools_list && Array.isArray(pageData.tools_list)) {
        const enrichedToolsList = await Promise.all(
          pageData.tools_list.map(async (toolItem: ToolsListItem) => {
            try {
              // Fetch tool details from ToolsWeUse API using tool name as the identifier
              const toolName = toolItem.tool;
              if (!toolName) {
                console.warn('No tool name found for tools_list item');
                return toolItem;
              }

              const toolResponse = await fetch(
                `/api/resource/ToolsWeUse/${encodeURIComponent(toolName)}`,
                {
                  method: 'GET',
                  headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              if (toolResponse.ok) {
                const toolData = await toolResponse.json();
                const toolDetails = toolData.data || toolData;
                
                // Merge tool details into the item
                return {
                  ...toolItem,
                  logo_image: toolDetails.logo_image,
                  logo_name: toolDetails.logo_name,
                  link_to_site: toolDetails.link_to_site,
                };
              } else {
                // If tool fetch fails, return original item
                console.warn(`Failed to fetch tool details for ${toolName}`);
                return toolItem;
              }
            } catch (error) {
              // If tool fetch fails, return original item
              console.warn(`Error fetching tool details for ${toolItem.tool}:`, error);
              return toolItem;
            }
          })
        );

        // Update pageData with enriched tools_list
        pageData.tools_list = enrichedToolsList;
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
        error instanceof Error ? error.message : 'Failed to fetch design page data'
      );
    }
  }
);

const designPageL2Slice = createSlice({
  name: 'designPageL2',
  initialState,
  reducers: {
    clearDesignPageL2Data: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignPageL2Data.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesignPageL2Data.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDesignPageL2Data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDesignPageL2Data } = designPageL2Slice.actions;
export default designPageL2Slice.reducer;

