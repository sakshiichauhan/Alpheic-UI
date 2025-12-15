/**
 * Utility functions for mapping cleaned URL parameters back to original API names
 */

/**
 * Clean a name for URL: remove all non-alphabetic characters
 */
export const cleanNameForUrl = (name: string | undefined): string => {
  if (!name) return '';
  return name.replace(/[^a-zA-Z]/g, '');
};

/**
 * Find original industry name from cleaned URL name
 * @param cleanedName - The cleaned name from URL (e.g., "EnergyEnvironment")
 * @param industryNames - Array of original industry names from API
 * @returns Original industry name or null if not found
 */
export const findOriginalIndustryName = (
  cleanedName: string,
  industryNames: string[]
): string | null => {
  if (!cleanedName || industryNames.length === 0) return null;
  
  // Find the original name that matches when cleaned
  const original = industryNames.find(name => cleanNameForUrl(name) === cleanedName);
  return original || null;
};

/**
 * Find original service name from cleaned URL name
 * @param cleanedName - The cleaned name from URL (e.g., "UXDesign")
 * @param serviceNames - Array of original service names from API
 * @returns Original service name or null if not found
 */
export const findOriginalServiceName = (
  cleanedName: string,
  serviceNames: string[]
): string | null => {
  if (!cleanedName || serviceNames.length === 0) return null;
  
  // Find the original name that matches when cleaned
  const original = serviceNames.find(name => 
    cleanNameForUrl(name).toLowerCase() === cleanedName.toLowerCase()
  );
  return original || null;
};

/**
 * Find original case study name from cleaned slug
 * @param cleanedSlug - The cleaned slug from URL (e.g., "CaseStudyName")
 * @param caseStudyNames - Array of original case study names
 * @returns Original case study name or null if not found
 */
export const findOriginalCaseStudyName = (
  cleanedSlug: string,
  caseStudyNames: string[]
): string | null => {
  if (!cleanedSlug || caseStudyNames.length === 0) return null;
  
  // Find the original name that matches when cleaned
  const original = caseStudyNames.find(name => 
    cleanNameForUrl(name).toLowerCase() === cleanedSlug.toLowerCase()
  );
  return original || null;
};

/**
 * Find original pilot name from cleaned URL name
 * @param cleanedName - The cleaned name from URL (e.g., "Dreamer")
 * @param pilotNames - Array of original pilot names from API
 * @returns Original pilot name or null if not found
 */
export const findOriginalPilotName = (
  cleanedName: string,
  pilotNames: string[]
): string | null => {
  if (!cleanedName || pilotNames.length === 0) return null;
  
  // Find the original name that matches when cleaned
  const original = pilotNames.find(name => 
    cleanNameForUrl(name).toLowerCase() === cleanedName.toLowerCase()
  );
  return original || null;
};

