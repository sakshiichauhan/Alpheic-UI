import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../rootReducer';
import type { Attachment } from '../CaseStudy/CaseStudyThunk';

// API Response Types
export interface ServiceCategoryServiceItem {
  service?: string;
}

// Helper function to generate slug from case study name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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

export interface CaseStudySlideData {
  full_title: string;
  very_short_description?: string;
  first_attachment?: string;
  case_study_slug?: string;
  case_study_name?: string;
}

export interface LinkServiceNameItem {
  name1: string;
  // Merged fields from ServicePage L3 API
  service_category_heading?: string;
  service_category_description?: string;
  service_category_services?: ServiceCategoryServiceItem[];
  // Case study data - can have multiple case studies for one service
  case_study_slides?: CaseStudySlideData[];
}

export interface ToolsListItem {
  tab_name: string;
  tool?: string;
  // Merged fields from ToolsWeUse API
  logo_image?: string;
  logo_name?: string;
  link_to_site?: string;
}

export interface FAQsListItem {
  title?: string;
  description?: string;
}

export interface ConsultantsListItem {
  name1?: string;
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
              const serviceName = linkItem.name1;
              if (!serviceName) {
                console.warn('No name1 found for link_service_names item');
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
              console.warn(`Error fetching ServicePage L3 details for ${linkItem.name1}:`, error);
              return linkItem;
            }
          })
        );

        // Update pageData with enriched link_service_names list
        pageData.link_service_names = enrichedLinkServiceNames;

        // Fetch all CaseStudies and match them with link_service_names
        try {
          // Step 1: Fetch the list of case studies
          const caseStudyListResponse = await fetch('/api/resource/CaseStudy', {
            method: 'GET',
            headers: {
              'Authorization': `token ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (caseStudyListResponse.ok) {
            const caseStudyListData = await caseStudyListResponse.json();
            const caseStudyList = Array.isArray(caseStudyListData.data)
              ? caseStudyListData.data
              : Array.isArray(caseStudyListData)
              ? caseStudyListData
              : [];

            if (caseStudyList.length > 0) {
              // Step 2: Fetch full details for each case study
              const caseStudyDetails = await Promise.allSettled(
                caseStudyList.map(async (item: { name: string }) => {
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
                    throw new Error(`Failed to fetch case study ${caseStudyName}`);
                  }

                  const detailData = await detailResponse.json();
                  const caseStudyData = detailData.data || detailData;
                  
                  return { name: caseStudyName, data: caseStudyData };
                })
              );

              // Step 3: Match ALL case studies with link_service_names by service_linking.name1 === name1
              console.log('=== Starting Case Study Matching ===');
              console.log('Total case studies fetched:', caseStudyDetails.filter(r => r.status === 'fulfilled').length);
              
              const enrichedWithCaseStudies = enrichedLinkServiceNames.map((linkItem) => {
                const serviceName = linkItem.name1;
                if (!serviceName) {
                  console.warn('No name1 found for link_service_names item:', linkItem);
                  return linkItem;
                }

                console.log(`\n--- Looking for ALL case studies matching service: "${serviceName}" ---`);

                // Find ALL matching case studies where service_linking.name1 === name1
                const matchingCaseStudies = caseStudyDetails
                  .filter((result) => result.status === 'fulfilled')
                  .map((result) => (result as PromiseFulfilledResult<{ name: string; data: any }>).value)
                  .filter((cs) => {
                    // Check both lowercase and capitalized field names
                    const serviceLinking = cs.data.service_linking || cs.data.Service_linking;
                    
                    if (!serviceLinking) {
                      return false;
                    }
                    
                    // Handle array format - service_linking is an array of objects with 'name1' field
                    if (Array.isArray(serviceLinking)) {
                      const matches = serviceLinking.some((sl: any) => {
                        const name1Value = sl?.name1 || sl?.Name1;
                        const isMatch = name1Value === serviceName;
                        if (isMatch) {
                          console.log(`    ✓ MATCH FOUND! CaseStudy "${cs.data.name}" has name1 "${name1Value}" matching "${serviceName}"`);
                        }
                        return isMatch;
                      });
                      return matches;
                    }
                    
                    // If it's an object, check if it has a name1 field
                    if (typeof serviceLinking === 'object') {
                      const name1Value = serviceLinking.name1 || serviceLinking.Name1;
                      const isMatch = name1Value === serviceName;
                      if (isMatch) {
                        console.log(`    ✓ MATCH FOUND! CaseStudy "${cs.data.name}" has name1 "${name1Value}" matching "${serviceName}"`);
                      }
                      return isMatch;
                    }
                    
                    return false;
                  });

                if (matchingCaseStudies.length > 0) {
                  console.log(`\n✓ Found ${matchingCaseStudies.length} matching case study/studies for service "${serviceName}"`);

                  // Helper function to check if attachment is a video
                  const isVideoFile = (attachPath: string | undefined | null): boolean => {
                    if (!attachPath || typeof attachPath !== 'string') {
                      return false;
                    }
                    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.m4v'];
                    const lowerPath = attachPath.toLowerCase();
                    return videoExtensions.some(ext => lowerPath.endsWith(ext));
                  };

                  // Get all case study slides - create array of slides from all matching case studies
                  const caseStudySlides = matchingCaseStudies
                    .map((matchingCaseStudy) => {
                      const csData = matchingCaseStudy.data;
                      
                      console.log(`  Processing case study "${csData.name}":`, {
                        attachmentsCount: csData.attachments?.length || 0,
                        attachments: csData.attachments
                      });
                      
                      // Get 1st attachment from attachments array - filter out videos, only get images
                      const attachments = csData.attachments && Array.isArray(csData.attachments) 
                        ? csData.attachments 
                        : [];
                      
                     
                      const firstAttachment = attachments.length > 0 ? attachments[0] : undefined;
                      const firstAttachmentPath = firstAttachment?.attach;

                      console.log(`  Case study "${csData.name}" attachment processing:`, {
                        totalAttachments: attachments.length,
                        imageAttachmentsCount: attachments.length,
                        allAttachments: attachments.map((att: Attachment) => ({
                          attach: att.attach,
                          isVideo: att.attach ? isVideoFile(att.attach) : false
                        })),
                        firstAttachment: firstAttachment,
                        attachmentUrl: firstAttachmentPath ? getImageUrl(firstAttachmentPath) : 'N/A'
                      });

                      // Only include if we have all required fields
                      if (csData.full_title && firstAttachmentPath) {
                        const imageUrl = getImageUrl(firstAttachmentPath);
                        console.log(`  ✓ Adding case study slide: "${csData.full_title}" with image: ${imageUrl}`);
                        return {
                          full_title: csData.full_title, // From CaseStudy API
                          very_short_description: csData.very_short_description || csData.short_description || '', // From CaseStudy API
                          first_attachment: imageUrl, // From CaseStudy API - 1st attachment (processed URL)
                          case_study_slug: generateSlug(csData.name), // Generated from CaseStudy name
                          case_study_name: csData.name, // From CaseStudy API
                        };
                      } else {
                        console.warn(`  ⚠ Skipping case study "${csData.name}" - missing required fields:`, {
                          hasFullTitle: !!csData.full_title,
                          hasAttachment: !!firstAttachment,
                          attachmentsArray: attachments
                        });
                        return null;
                      }
                    })
                    .filter((slide: CaseStudySlideData | null): slide is CaseStudySlideData => slide !== null);

                  if (caseStudySlides.length > 0) {
                    return {
                      ...linkItem,
                      case_study_slides: caseStudySlides, // Array of all matching case studies
                    };
                  }
                } else {
                  console.warn(`\n✗ No matching case studies found for service: "${serviceName}"`);
                  console.warn('  Available case studies:', caseStudyDetails
                    .filter(r => r.status === 'fulfilled')
                    .map(r => (r as PromiseFulfilledResult<{ name: string; data: any }>).value.data.name));
                }

                return linkItem;
              });
              
              console.log('=== Case Study Matching Complete ===\n');

              // Update pageData with case study enriched link_service_names
              pageData.link_service_names = enrichedWithCaseStudies;
            }
          }
        } catch (error) {
          // If case study fetch fails, continue with existing data
          console.warn('Error fetching case studies for link_service_names:', error);
        }
      }

      // Fetch Consultants details for each item in consultants_list
      if (pageData.consultants_list && Array.isArray(pageData.consultants_list)) {
        const enrichedConsultantsList = await Promise.all(
          pageData.consultants_list.map(async (consultantItem: ConsultantsListItem) => {
            try {
              // Fetch consultant details from Consultants API using name1 as the identifier
              const consultantName = consultantItem.name1;
              if (!consultantName) {
                console.warn('No name1 found for consultants_list item');
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
              console.warn(`Error fetching consultant details for ${consultantItem.name1}:`, error);
              return consultantItem;
            }
          })
        );

        // Update pageData with enriched consultants_list
        pageData.consultants_list = enrichedConsultantsList;
      }

      // Fetch ToolsWeUse details for each item in tools_list
      if (pageData.tools_list && Array.isArray(pageData.tools_list)) {
        console.log('=== Starting ToolsWeUse Enrichment ===');
        console.log('Total tools fetched:', pageData.tools_list.length);
        
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

