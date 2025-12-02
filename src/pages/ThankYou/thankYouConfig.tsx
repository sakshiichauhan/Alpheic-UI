import React from 'react';
import ThankYouMessage from '@/Components/PopUp/ThankYouMessage';
import ThankYouForPilot from '@/Components/PopUp/ThankYouForPilot';
import ApplicationRecieved from '@/Components/PopUp/ApplicationRecieved';

// Type definitions for thank you message variants
export type ThankYouType = 'default' | 'pilot' | 'applicationReceived' | 'design' | 'build' | 'contact' | string;

// Mapping of thank you types to their message components
export const thankYouMessageMap: Record<string, React.ComponentType> = {
  default: ThankYouMessage,
  pilot: ThankYouForPilot,
  applicationReceived: ApplicationRecieved,
};

/**
 * Get the appropriate thank you message component for a given type
 * Falls back to default if type is not found
 */
export const getThankYouMessageComponent = (type?: string): React.ComponentType => {
  if (!type) return thankYouMessageMap.default;
  return thankYouMessageMap[type] || thankYouMessageMap.default;
};

