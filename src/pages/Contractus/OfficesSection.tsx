import Office1 from "@/assets/ContractUS/Office1.png";
import Office2 from "@/assets/ContractUS/Office2.png";
import Office3 from "@/assets/ContractUS/Office3.png";
import React from 'react';

interface Office {
  imageSrc: string;
  city: string;
  type: string;
  address: string;
}

const officeLocations: Office[] = [
  {
    imageSrc: Office1,
    city: 'New Delhi',
    type: 'Sales Office',
    address: '3rd Floor, Thapar House, VPC, Janpath Rd, New Delhi, Delhi 110001',
  },
  {
    imageSrc: Office2,
    city: 'Noida',
    type: 'India Headquarters',
    address: '6th Floor, Magnus Tower, Sector 73, Noida, Basi Bahuddin Nagar, Uttar Pradesh 201316',
  },
  {
    imageSrc: Office3,
    city: 'Chandigarh',
    type: 'Technical Support',
    address: 'TDI South Ex II, SCO 421-422, Sector 117, Sahibzada Ajit Singh Nagar, Punjab 160055',
  },
];

const OfficesSection: React.FC = () => {
  return (
    <section className="bg-[#F9FAFB] text-black 2xl:py-[84px] xl:py-[72px] lg:py-[60px] md:py-[52px] py-[40px] px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] mx-auto">
      <div className="">
        <h2 className="text-[72px] font-bold text-center">
          Our offices
        </h2>
        <div className="mt-[48px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {officeLocations.map((office, index) => (
            <div 
              key={index} 
              className={`
                text-left p-[48px]
                border-[var(--border-color)] 
                border-b md:border-b-0 lg:border-r
                last:border-b-0 lg:last:border-r-0
                md:odd:border-r 
                lg:[&:nth-child(2)]:border-r
                lg:[&:nth-child(3n)]:border-r-0
              `}
            >
              <img 
                src={office.imageSrc} 
                alt={`Office in ${office.city}`} 
                className="w-[390px] h-[208px] object-cover"
              />
              
              <div className="mt-[16px]">
                <h3 className="text-[32px] font-semibold text-black">
                  {office.city}
                  <span className="text-[14px] text-black font-urbanist ml-2 ">{office.type}</span>
                </h3>
                
                <p className="mt-[8px] text-[var(--medium-text)] font-normal font-urbanist">
                  {office.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficesSection;