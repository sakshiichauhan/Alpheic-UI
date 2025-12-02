import React from 'react';
import ThankYouMessage from '@/Components/PopUp/ThankYouMessage';

interface ThankYouProps {
  messageComponent?: React.ComponentType;
}

export const ThankYou: React.FC<ThankYouProps> = ({ messageComponent: MessageComponent = ThankYouMessage }) => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-full w-3/4 opacity-40 hidden lg:block"
        style={{ background: 'radial-gradient(ellipse 80% 80% at left bottom, #9747FF 30%, #FFFFFF 100%)' }}
      />
      <div
        className="pointer-events-none absolute -right-1/4 top-0 h-full w-3/4 opacity-40 hidden lg:block"
        style={{ background: 'radial-gradient(ellipse 80% 80% at right top, #9747FF 30%, #FFFFFF 100%)' }}
      />

      <div className="relative z-10 flex w-full max-w-5xl items-center justify-center px-4 pt-12 2xl:py-0 sm:px-8">
        <MessageComponent />
      </div>
    </div>
  );
};

export default ThankYou;

