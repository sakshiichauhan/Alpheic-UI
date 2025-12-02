import React from 'react';
import { useParams } from 'react-router-dom';
import { ThankYou } from '@/pages/ThankYou';
import { getThankYouMessageComponent } from '@/pages/ThankYou/thankYouConfig';

/**
 * Wrapper component that extracts the type from URL params
 * and passes the appropriate message component to ThankYou
 */
export const ThankYouWrapper: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const MessageComponent = getThankYouMessageComponent(type);
  
  return <ThankYou messageComponent={MessageComponent} />;
};

export default ThankYouWrapper;

