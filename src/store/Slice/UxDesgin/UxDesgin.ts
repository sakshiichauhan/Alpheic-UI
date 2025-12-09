import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';

// API Response Types
export interface WhyChooseUsCard {
  name: string;
  attach_image?: string;
  title: string;
  description: string;
  doctype: string;
}

export interface ServiceHireCard {
  name: string;
  attach_image?: string;
  title: string;
  description: string;
  doctype: string;
}

export interface ServiceDesignCard {
  name: string;
  attach_image?: string;
  title: string;
  description: string;
  doctype: string;
}

export interface FAQItem {
  name: string;
  title: string;
  description: string;
  doctype: string;
}

export interface ServiceBrandListItem {
  
  name1?: string;
  brand_name?: string;
  attach_logo?: string;
}

export interface DesignConsultantListItem {
  name1?: string;
  attach_image?: string;
  role?: string;
}

export interface ServicePageData {
  // Service Hero Section
  service_hero: number;
  service_hero_name: string;
  service_hero_other_name: string;
  service_hero_short_description: string;
  service_hero_description: string;
  service_hero_bg_image?: string;

  // Why Choose Us Section
  why_choose_us: number;
  why_choose_us_heading: string;
  why_choose_us_description: string;
  why_choose_us_cards: WhyChooseUsCard[];

  // Case Studies Section
  service_casestudies: number;
  service_casestudies_heading: string;
  service_casestudies_description: string;
  service_casestudies_buttondata?: string ;

  // Industries Section
  linked_industries: number;
  linked_industries_heading: string;

  // What We Offer / Service Hire Section
  service_hire: number;
  service_hire_heading: string;
  service_hire_cards: ServiceHireCard[];
  service_hire_buttondata?: string;
  
  // Resource Card Section
  resource_card: number;
  resource_card_heading: string;
  resource_card_title: string;
  resource_card_description: string;
  resource_card_image: string;
  resource_card_buttondata?: string;

  // Design Consultants Section
  design_consultants: number;
  design_consultants_heading: string;
  design_consultants_description: string;
  design_consultants_buttondata?: string;
  design_consultants_list?: DesignConsultantListItem[];

  // Hire Card Section
  hire_card: number;
  hire_card_title: string;
  hire_card_heading: string;
  hire_card_description: string;
  hire_card_buttondata?: string;

  // Service Brands Section
  service_brands: number;
  service_brands_heading: string;
  service_brands_description: string;
  service_brands_list?: ServiceBrandListItem[];

  // Service Insights Section
  service_insights: number;
  service_insights_heading: string;
  service_insights_description: string;
  service_insights_buttondata?: string;

  // Service Pilot Section
  service_piolet: number;
  service_piolet_title: string;
  service_piolet_heading: string;
  service_piolet_description: string;
  service_piolet_buttondata?: string;

  // Section FAQs
  section_faqs: number;
  faqs?: FAQItem[];

  // Section Collaborate Card
  section_collaborate_card: number;

  // Human / Service Design Cards Section
  service_design_cards_table: ServiceDesignCard[];
}

interface ServicePageState {
  data: ServicePageData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServicePageState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk to fetch ServicePage data
export const fetchServicePageData = createAsyncThunk(
  'uxDesign/fetchServicePageData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch('/api/resource/ServicePage L4/Page', {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch service page data: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      // Handle response format: { "data": { ... } }
      const pageData = responseData.data || responseData;

      // Fetch brand details for each item in service_brands_list
      if (pageData.service_brands_list && Array.isArray(pageData.service_brands_list)) {
        const enrichedBrandsList = await Promise.all(
          pageData.service_brands_list.map(async (brandItem: ServiceBrandListItem) => {
            try {
              // Fetch brand details from Client Brands API
              const brandResponse = await fetch(
                `/api/resource/Client Brands/${brandItem.name1}`,
                {
                  method: 'GET',
                  headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              if (brandResponse.ok) {
                const brandData = await brandResponse.json();
                const brandDetails = brandData.data || brandData;
                
                // Merge brand details into the item
                return {
                  ...brandItem,
                  brand_name: brandDetails.brand_name,
                  attach_logo: brandDetails.attach_logo,
                };
              } else {
                // If brand fetch fails, return original item
                console.warn(`Failed to fetch brand details for ${brandItem.name1}`);
                return brandItem;
              }
            } catch (error) {
              // If brand fetch fails, return original item
              console.warn(`Error fetching brand details for ${brandItem.name1}:`, error);
              return brandItem;
            }
          })
        );

        // Update pageData with enriched brands list
        pageData.service_brands_list = enrichedBrandsList;
      }

      // Fetch consultant details for each item in design_consultants_list
      if (pageData.design_consultants_list && Array.isArray(pageData.design_consultants_list)) {
        const enrichedConsultantsList = await Promise.all(
          pageData.design_consultants_list.map(async (consultantItem: DesignConsultantListItem) => {
            try {
              // Fetch consultant details from Consultants API
              const consultantResponse = await fetch(
                `/api/resource/Consultants/${consultantItem.name1}`,
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
                  name1: consultantDetails.name1 || consultantItem.name1,
                };
              } else {
                // If consultant fetch fails, return original item
                console.warn(`Failed to fetch consultant details for ${consultantItem.name1}`);
                return consultantItem;
              }
            } catch (error) {
              // If consultant fetch fails, return original item
              console.warn(`Error fetching consultant details for ${consultantItem.name1}:`, error);
              return consultantItem;
            }
          })
        );

        // Update pageData with enriched consultants list
        pageData.design_consultants_list = enrichedConsultantsList;
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
        error instanceof Error ? error.message : 'Failed to fetch service page data'
      );
    }
  }
);

const servicePageSlice = createSlice({
  name: 'servicePage',
  initialState,
  reducers: {
    clearServicePageData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicePageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicePageData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchServicePageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearServicePageData } = servicePageSlice.actions;
export default servicePageSlice.reducer;

