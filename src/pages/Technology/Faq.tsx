import React, { useId, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchIndustryL2Data } from "@/store/Slice/IndustryPage/TechnologyPageThunk";
import { ChevronDown } from "lucide-react";
import { ParsedHtml } from "@/Components/ParsedHtml";

type FaqItem = { q: string; a: string };

interface FaqProps {
    className?: string;
}

const Faq: React.FC<FaqProps> = ({ 
    className = "" 
}) => {
    const { industryName } = useParams<{ industryName?: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector((state: RootState) => state.technologyPage);

    // Get industry name from route or use default
    const currentIndustry = industryName ? decodeURIComponent(industryName) : "Energy & Environment";

    useEffect(() => {
        // Fetch industry data on component mount
        if (!data || data.name !== currentIndustry) {
            if (!loading) {
                dispatch(fetchIndustryL2Data(currentIndustry));
            }
        }
    }, [dispatch, data, loading, currentIndustry]);

    // Check flag - if 0, don't render
    if (data && data.faqs !== 1) {
        return null;
    }

    const heading = data?.faqs_heading;
    const faqs = data?.faqs_list || [];
    const [openIndex, setOpenIndex] = useState<number | null>(null); // all closed

    // Default FAQs if no API data
    const defaultFaqs: FaqItem[] = [
        { q: "How do you approach UX ", a: "We begin with user research, mapping goals, and creating wireframes before crafting visuals and validating with user testing." },
        { q: "Can you revamp our existing app?", a: "Founded in 2012, Hostripples is an Indian web hosting company headquartered in Nashik, Maharashtra. We provide best web hosting services globally with data centers in six countries including, India, the USA, the UK, Canada, Australia and Singapore. We are proud to be one of the top-rated hosts in the industry and are dedicated to raising the bar every day. You can learn more about us." },
        { q: "Do you handle both design and development?", a: "Founded in 2012, Hostripples is an Indian web hosting company headquartered in Nashik, Maharashtra. We provide best web hosting services globally with data centers in six countries including, India, the USA, the UK, Canada, Australia and Singapore. We are proud to be one of the top-rated hosts in the industry and are dedicated to raising the bar every day. You can learn more about us." },
        { q: "How secure is the data handled by AI Agents?", a: "Founded in 2012, Hostripples is an Indian web hosting company headquartered in Nashik, Maharashtra. We provide best web hosting services globally with data centers in six countries including, India, the USA, the UK, Canada, Australia and Singapore. We are proud to be one of the top-rated hosts in the industry and are dedicated to raising the bar every day. You can learn more about us." },
    ];

    // Use API data if available, otherwise use defaults
    const displayFaqs: FaqItem[] = faqs.length > 0
        ? faqs.map(faq => ({
            q: faq.title || '',
            a: faq.description || '',
        }))
        : defaultFaqs;

    return (
        <section className={`mx-auto px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px]
     py-10 md:py-[60px] lg:py-[120px] ${className}`}>
            <div className="grid md:gap-12 sm:gap-[32px] gap-[24px] lg:grid-cols-10 lg:gap-16">
                {/* Left — 40%, centered */}
                <div className="lg:col-span-4 flex flex-col lg:items-start items-center justify-center text-left 2xl:min-w-[480px]">
                    {heading ? (
                        <>
                            <div className="text-left lg:block hidden 2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px]">
                                <ParsedHtml htmlContent={heading} as="h2" />
                            </div>
                            <div className="text-center lg:hidden block 2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px]">
                                <ParsedHtml htmlContent={heading} as="h2" />
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-left lg:block hidden">
                                Frequently<br />Asked<br />
                                <span className=" lg:font-bold">Questions</span>
                            </h2>
                            <h2 className="2xl:text-[96px] xl:text-[82px] md:text-[68px] sm:text-[48px] text-[32px] text-center lg:hidden block">
                                Frequently Asked <br /> Questions
                            </h2>
                        </>
                    )}
                </div>

                {/* Right — 60% */}
                <div className="lg:col-span-6 lg:pl-[50px]">
                    {loading ? (
                        <div className="divide-y divide-neutral-200">
                            {[1, 2, 3, 4].map((idx) => (
                                <div key={idx} className="p-6 animate-pulse">
                                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="divide-y divide-neutral-200">
                            {displayFaqs.map((item, idx) => (
                                <AccordionItem
                                    key={idx}
                                    q={item.q}
                                    a={item.a}
                                    isOpen={openIndex === idx}
                                    onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

type AccordionItemProps = {
    q: string;
    a: string;
    isOpen: boolean;
    onToggle: () => void;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ q, a, isOpen, onToggle }) => {
    const uid = useId();
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                // Opening: set height to scrollHeight
                setHeight(contentRef.current.scrollHeight);
            } else {
                // Closing: set height to 0
                setHeight(0);
            }
        }
    }, [isOpen]);

    return (
        <div className={`transition-all duration-300 ease-in-out ${isOpen ? "border border-[#E5E7EA]/50 p-[12px] sm:p-[16px] md:p-[20px] lg:p-[24px]" : "border-none px-[12px] py-[8px] sm:px-[16px] sm:py-[10px] md:px-[20px] md:py-[12px] lg:px-[24px] lg:py-[16px]"}`}>
            <button
                id={`faq-btn-${uid}`}
                className="flex w-full items-center justify-between gap-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 transition-colors duration-200 hover:bg-gray-50/50 rounded-lg"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${uid}`}
                onClick={onToggle}
            >
                <span className="2xl:text-[24px] xl:text-[22px] md:text-[18px] sm:text-[16px] text-[14px] font-medium transition-colors duration-200">{q}</span>
                <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Answer — animated height */}
            <div
                id={`faq-panel-${uid}`}
                role="region"
                aria-labelledby={`faq-btn-${uid}`}
                aria-hidden={!isOpen}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ height: `${height}px` }}
            >
                <div ref={contentRef} className="pb-5 pr-4 text-[var(--medium-text)]">
                    <p className="leading-relaxed 2xl:text-[20px] xl:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] font-urbanist">{a}</p>
                </div>
            </div>
        </div>
    );
};

export default Faq;
