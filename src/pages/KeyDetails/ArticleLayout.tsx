import React from "react";

/* -------------------------------------------------
   1. Flexible Types — backend friendly
---------------------------------------------------*/
type ContentBlock = {
  type: "paragraph" | "image" | "list" | "cta" | "subheading";
  value?: string;
  items?: string[];
  src?: string;
  alt?: string;
};

type Section = {
  id: string;
  heading?: string;
  blocks: ContentBlock[];
};

type TOCItem = {
  id: string;
  title: string;
  href: string;
};

/* -------------------------------------------------
   2. Table of Contents
---------------------------------------------------*/
const TableOfContents: React.FC<{ items: TOCItem[] }> = ({ items }) => {
  return (
    <nav className="sticky top-25">
      <div className="mb-6 flex items-center gap-6">
        <h2 className="xl:text-[32px] md:text-[28px] text-[24px] font-semibold text-black">Contents</h2>
        <span className="h-[4px] flex-1 rounded-full bg-[#E5E5E5]" />
      </div>
      <ul className="space-y-3 xl:ml-8 md:ml-6 ml-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className="flex w-full items-center gap-2 overflow-hidden xl:text-[20px] md:text-[18px] text-[16px] text-black transition-colors hover:text-[var(--color)]"
            >
              <span className="inline-flex h-4 w-4 items-center justify-center text-[18px] leading-none text-[var(--color)]">
                ▶
              </span>
              <span className="max-w-[255px] truncate font-normal text-[var(--hero-text)]">
                {item.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/* -------------------------------------------------
   3. Article Layout — fully flexible
---------------------------------------------------*/
const ArticleLayout: React.FC = () => {
  /* -------------------------------------------------
     4. FUTURE BACKEND FORMAT (flexible)
     You ONLY need to map the backend API to this structure
  ---------------------------------------------------*/
  const tocItems: TOCItem[] = [
    { id: "metrics", title: "Why traditional metrics fall short", href: "#metrics" },
    { id: "solution", title: "The solution: DWR", href: "#solution" },
    { id: "charts", title: "DWR survey charts", href: "#charts" },
    { id: "matters", title: "Why it matters", href: "#matters" },
  ];

  const contentSections: Section[] = [
    {
      id: "intro",
      heading: "How do you know if an AI agent really solved the problem?",
      blocks: [
        {
          type: "paragraph",
          value:
            "For most teams, success is measured in call length, transfer rates, or escalation counts. But these metrics don’t always answer the most important question: did the person on the call feel like their issue was resolved?",
        },
        {
          type: "cta",
          value: "That’s where Did We Resolve (DWR) surveys come in.",
        },
        {
          type: "image",
          src: 'https://placehold.co/1200x700/263A50/FFFFFF?text=99.9%25',
          alt: "Intro Image",
        },
      ],
    },
    {
      id: "metrics",
      heading: "Why traditional metrics fall short",
      blocks: [
        {
          type: "subheading",
          value:
            "Traditional quality metrics in support automation can be misleading.",
        },
        {
          type: "list",
          items: [
            "A short call might still leave a customer frustrated.",
            "An escalation avoided doesn’t guarantee the customer got what they needed.",
            "Without direct feedback, it’s hard to tell if automation is truly working or if people are coming back with the same problem later.",
          ],
        },
      ],
    },
    {
      id: "solution",
      heading: "Dev Anand’s Juhu Bungalow has been sold?",
      blocks: [
        {
          type: "paragraph",
          value:
            `At the end of calls, the agent asks a simple question: “Did we resolve your issue today?”\b
Responses are captured as Yes / No / Unclear.\n

If the customer hangs up before the survey starts, they automatically receive a branded SMS within 12 hours with the same question.\n

When a customer responds “No” the system prompts: “Can you tell us more?”. Short explanations create clear opportunities to refine workflows and agent policies.\n

Every response is logged in real time and tied directly to the call record. This closes the loop between automation and real-world outcomes.`,
        },
        {
          type: "image",
          src: 'https://placehold.co/1200x700/263A50/FFFFFF?text=99.9%25',
          alt: "Second Image",
        },
      ],
    },
    {
      id: "charts",
      heading: "DWR survey charts in the dashboard",
      blocks: [
        {
          type: "paragraph",
          value:
            "To make feedback actionable, DWR survey charts are now built directly into the dashboard. The charts show:",
        },
        {
            type: "list",
            items: [
              "How often the survey was asked",
              "Response rate (voice vs SMS)",
              "Breakdown of Resolved / Unresolved / Unclear",
            ],
          },
          {
            type: "paragraph",
            value:
              "This makes it easy for teams to spot patterns. For example, if “No” responses climb in a certain workflow, it’s a clear signal automation needs refinement",
          },
      ],
    },
    {
      id: "matters",
      heading: "Why it matters",
      blocks: [
        {
          type: "list",
          items: [
            "Direct signal from customers instead of internal metrics.",
            "Smarter prioritization linked to call types.",
          ],
        },
        {
          type: "paragraph",
          value:
            "With DWR, automation quality becomes measurable and improvable.",
        },
      ],
    },
  ];

  /* -------------------------------------------------
     5. RENDER
  ---------------------------------------------------*/
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 md:px-12 lg:px-[80px] xl:px-[120px] 2xl:px-[200px] pb-[80px] pt-[40px]">
      <div className="flex flex-row justify-between gap-x-12">
        {/* LEFT - TOC */}
        <div className="hidden lg:block min-w-[308px]">
          <TableOfContents items={tocItems} />
        </div>

        {/* RIGHT - CONTENT */}
        <div className="lg:col-span-3 w-full">
          {contentSections.map((section, idx) => (
            <section
              id={section.id}
              key={section.id}
              className={`${idx > 0 ? "mt-[40px]" : ""}`}
            >
              {/* Heading */}
              {section.heading && (
                <h2 className="xl:text-[40px] md:text-[32px] text-[28px] font-medium text-black">
                  {section.heading}
                </h2>
              )}

              {/* BLOCKS */}
              {section.blocks.map((block, i) => {
                switch (block.type) {
                  case "paragraph":
                    return (
                      <p key={i} className="mt-4 xl:text-[20px] md:text-[18px] text-[16px] text-[var(--medium-text)] font-urbanist">
                        {block.value?.split('\n').map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            {index < block.value!.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    );

                  case "cta":
                    return (
                      <p
                        key={i}
                        className="mt-4 xl:text-[20px] md:text-[18px] text-[16px] text-black font-urbanist"
                      >
                        {block.value}
                      </p>
                    );

                  case "subheading":
                    return (
                      <p
                        key={i}
                        className="xl:text-[20px] md:text-[18px] text-[16px] text-[var(--medium-text)] mt-2 font-urbanist"
                      >
                        {block.value}
                      </p>
                    );

                  case "list":
                    return (
                      <ul
                        key={i}
                        className="md:ml-6 ml-4 mt-6 mb-6 space-y-3 xl:text-[20px] md:text-[18px] text-[16px] text-[var(--medium-text)] font-urbanist"
                      >
                        {block.items?.map((item, li) => (
                          <li
                            key={li}
                            className="relative md:pl-6 pl-4 xl:text-[20px] md:text-[18px] text-[16px] text-[var(--medium-text)] leading-relaxed"
                          >
                            <span className="absolute left-0 xl:top-[15px] md:top-[14px] top-[12px] sm:h-[3px] sm:w-[3px] h-[2px] w-[2px] rounded-full bg-[#B3B3B3]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    );

                  case "image":
                    return (
                      <div key={i} className="my-8 w-full">
                        <img
                          src={block.src}
                          alt={block.alt}
                          className="w-full object-cover"
                        />
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleLayout;
