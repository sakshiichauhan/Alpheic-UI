import React from 'react';

import edit from "@/assets/ContractUS/Edit.png";
import mail from "@/assets/ContractUS/Mail.png";
import chat from "@/assets/ContractUS/Chat.png";
import call from "@/assets/ContractUS/Call.png";

import SneekPeak from "@/Components/SneekPeak";

// Define the structure for each contact item for better type-checking
interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  value: string;
  isLink?: boolean;
}



const ContactSection: React.FC = () => {
  // Array to hold the contact information items, making it easy to manage
  const contactItems: ContactInfo[] = [
    { icon: <img src={edit} alt="edit" className="w-[48px] h-[48px]"/>, title: 'Ready to share a Project?', value: 'Start Your Project' },
    { icon: <img src={mail} alt="mail" className="w-[48px] h-[48px]"/>, title: 'Share a detailed specification', value: 'hello@alpheric.com', isLink: true },
    { icon: <img src={call} alt="call" className="w-[48px] h-[48px]"/>, title: 'Connect on WhatsApp', value: '+91 80108 80109' },
    { icon: <img src={chat} alt="chat" className="w-[48px] h-[48px]"/>, title: 'Begin a quick discussion', value: 'Live Chat with Us' },
  ];



  return (
    <section className="bg-white text-black 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]">
      <div className="text-center">

        <p className="text-[40px] font-semibold text-black">Drop us a line to</p>
        <h1 className="text-[72px] font-semibold">
          Start a Project with us
        </h1>
        <p className="mt-6 max-w-[950px] mx-auto text-[24px] font-urbanist text-[var(--medium-text)]">
          Tell us a little about your project, challenge, or vision — and our team will get in touch to explore how we can help you Consult, Build, and Grow confidently.
        </p>

        <div className="mt-[48px] grid grid-cols-1 md:grid-cols-2 text-left px-[180px] flex-shrink-0">
          {contactItems.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center group p-6 ${
                index === 0 ? 'border-b border-r-0 md:border-r ' : 
                index === 1 ? 'border-b border-r-0 md:border-r-0 ' :
                index === 2 ? 'border-b-0 border-r-0 md:border-r md:border-b-0' :
                'border-0'
              } border-[var(--border-color)] px-[48px] py-[20px]`}
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <div className="ml-4">
                <p className="text-[16px] text-[var(--medium-text)]">{item.title}</p>
                <p className={`text-[32px] font-bold text-[#4B4B4B] `}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[48px]">
          <SneekPeak />
        </div>
        
      </div>
    </section>
  );
};

export default ContactSection;