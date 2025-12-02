// // AlphericComingSoon.tsx
// import { useState } from "react";
// import alphericLogo from "@/assets/logo/Whitelogo.png";
// import comingSoonRing from "@/assets/CommingSoon/comming-soon.gif";
// import background from "@/assets/CommingSoon/background.jpg";
// import container from "@/assets/CommingSoon/container.png";
// import facebook from "@/assets/CommingSoon/facebook.png";
// import instagram from "@/assets/CommingSoon/instagram.png";
// import twitter from "@/assets/CommingSoon/twitter.png";
// import linkedin from "@/assets/CommingSoon/linkedin.png";
// import youtube from "@/assets/CommingSoon/youtube.png";
// import ContactModal from "@/pages/form";

// export default function AlphericComingSoon() {
//   const [open, setOpen] = useState(false);
//   return (
//     <main className="h-auto w-full bg-white text-[#0b0b0b]">
//       {/* Desktop: 2-col with gap; Tablet/Mobile: stacked with vertical gap */}
//       <div
//         className="
//           flex flex-col h-full w-full
//           md:grid-rows-[minmax(72vh,72vh)_1fr]
//           gap-y-10 md:gap-y-14 lg:gap-y-0
//           lg:flex-row
//           lg:gap-x-16 xl:gap-x-24 2xl:gap-x-28
//         "
//       >
//         {/* ========== LEFT (visual) — changes only < 1024 ========== */}
//         <section
//           className="
//             relative order-1
//             max-[1024px]:min-w-full
//             h-[65vh] md:h-[72vh] lg:h-full
//             /* keep bg confined on mobile/tablet; allow normal on desktop */
//             overflow-hidden lg:overflow-visible
//             /* desktop width constraints preserved */
//             min-[1240px]:min-w-[600px] min-[1240px]:max-w-[600px]
//             max-[1240px]:max-w-[480px] max-[1240px]:min-w-[480px]
//           "
//         >
//           {/* Background (mobile/tablet: absolute + contain; desktop: static cover) */}
//           <div
//             className="
//               absolute inset-0 z-0 pointer-events-none
//               lg:static
//             "
//           >
//             <img
//               src={background}
//               alt=""
//               className="
//                 h-full w-full
//                 object-contain          /* < 1024: preserve original proportions */
//                 lg:object-cover         /* ≥ 1024: fill nicely like before */
//                 object-center
//               "
//             />
//           </div>

//           {/* Overlay for legibility (between bg and content) */}
//           <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/10 via-black/10 to-black/55" />

//           {/* Top-center logo */}
//           <div className="absolute left-1/2 top-10 -translate-x-1/2 sm:top-16 z-20">
//             <img
//               src={alphericLogo}
//               alt="Alpheric"
//               className="
//                 w-auto h-10 sm:h-11
//                 max-[1380px]:h-9
//                 max-[1200px]:h-8
//               "
//             />
//           </div>

//           {/* Center ring */}
//           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
//             <img
//               src={comingSoonRing}
//               alt="Coming Soon"
//               className="
//                 w-auto h-64 md:h-72
//                 max-[1380px]:md:h-[260px]
//                 max-[1200px]:md:h-[232px]
//               "
//             />
//           </div>

//           {/* Bottom copy */}
//           <div className="absolute bottom-0 left-0 right-0 px-6 pb-7 pt-4 sm:px-14 sm:pb-10 z-20">
//             <div>
//               <h2
//                 className="
//                   text-white font-medium font-poppins
//                   text-lg md:text-[32px]
//                   max-[1380px]:md:text-[28px]
//                   max-[1200px]:md:text-[24px]
//                   max-sm:leading-tight
//                 "
//               >
//                 Innovation. Creativity. Growth.
//               </h2>
//               <p
//                 className="
//                   mt-2 text-white/85 font-normal font-poppins text-justify
//                   text-[13px] sm:text-[20px]
//                   leading-[1.6] max-sm:leading-tight
//                   max-[1380px]:sm:text-[18px]
//                   max-[1200px]:sm:text-[16px]
//                 "
//               >
//                 We’re working behind the scenes to bring you a brand-new digital
//                 experience that will redefine how brands connect, grow, and
//                 succeed online.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* ========== RIGHT (content) — unchanged ≥1024; no overlap <1024 due to overflow-hidden on left ========== */}
//         <section className="order-2 flex h-auto w-full items-center">
//           <div className="w-full px-6 sm:px-10 lg:pl-2 xl:pl-6 lg:pr-10 xl:pr-16 2xl:pr-24">
//             <h1
//               className="
//                 font-semibold tracking-[-0.01em]
//                 text-[28px] sm:text-[34px] lg:text-[48px]
//                 leading-tight max-sm:leading-tight
//                 max-[1380px]:lg:text-[44px]
//                 max-[1200px]:lg:text-[40px]
//               "
//             >
//               Something exciting is coming!
//             </h1>

//             <p
//               className="
//                 mt-4 max-w-4xl text-black/70
//                 text-base sm:text-[28px]
//                 leading-[1.6] max-sm:leading-tight
//                 max-[1380px]:sm:text-[26px]
//                 max-[1200px]:sm:text-[24px]
//               "
//             >
//               Our new website is launching soon, a space built for ideas, impact,
//               and possibilities. Stay tuned for the Alpheric experience! 💡✨
//             </p>

//             <div className="mt-12 space-y-2">
//               <p
//                 className="
//                   text-[28px] text-black/60
//                   max-sm:leading-tight
//                   max-[1380px]:text-[24px]
//                   max-[1200px]:text-[22px]
//                 "
//               >
//                 Shall we chat?
//               </p>
//               <a
//                 href="mailto:hello@alpheric.com"
//                 className="
//                   font-semibold decoration-black/20 underline-offset-4 hover:decoration-black break-words
//                   text-[28px] sm:text-[36px]
//                   max-[1380px]:sm:text-[32px]
//                   max-[1200px]:sm:text-[28px]
//                   max-sm:text-[22px] max-sm:leading-tight
//                   hover:underline
//                 "
//               >
//                 hello@alpheric.com
//               </a>
//             </div>

//             <div className="mt-8 flex items-center justify-between group">
//               <div className="flex items-center gap-4 sm:gap-5 ">
//                 <span
//                   className="
//                     font-semibold leading-none border-b-3 border-b-transparent group-hover:border-b-3 group-hover:border-black
//                     text-[48px] sm:text-[56px] lg:text-[87px]
//                     max-[1380px]:lg:text-[78px]
//                     max-[1200px]:lg:text-[70px]
//                     max-[1080px]:lg:text-[60px]
//                     max-sm:leading-tight
//                   "
//                 >
//                   Let’s
//                 </span>
//                 <img
//                   src={container}
//                   alt="Avatar/Pill"
//                   className="
//                     h-10 w-auto sm:w-auto sm:h-[72px]
//                     max-[1380px]:sm:h-[64px] max-[1380px]:sm:w-auto
//                     max-[1200px]:sm:h-[56px] max-[1200px]:sm:w-auto
//                   "
//                 />
//                 <span
//                   className="
//                     font-semibold leading-none border-b-3 border-b-transparent group-hover:border-b-3 group-hover:border-black
//                     text-[48px] sm:text-[56px] lg:text-[87px]
//                     max-[1380px]:lg:text-[78px]
//                     max-[1200px]:lg:text-[70px]
//                     max-[1080px]:lg:text-[60px]
//                     max-sm:leading-tight
//                   "
//                 >
//                   talk
//                 </span>
//                 <span
//                   onClick={() => setOpen(true)}
//                   aria-label="Open contact form"
//                   className="
//                     inline-flex items-center justify-center rounded-full
//                     w-15 h-12 sm:w-20 sm:h-15 lg:w-34 lg:h-20
//                     text-xl sm:text-2xl lg:text-3xl
//                     bg-transparent text-current
//                     transition-all duration-200 ease-out
//                     group-hover:bg-black group-hover:text-white group-hover:scale-95
//                     group-hover:active:scale-90
//                     max-sm:leading-tight
//                     hover:cursor-pointer
//                   "
//                 >
//                   →
//                 </span>
//               </div>

//               <ContactModal open={open} onClose={() => setOpen(false)} onSubmit={() => {}} />
//             </div>

//             <div className="mt-6 lg:mb-0 mb-12 flex items-center gap-2.5 sm:gap-3">
//               {SOCIALS.map((s) => (
//                 <a
//                   key={s.label}
//                   href={s.href}
//                   aria-label={s.label}
//                   className="
//                     grid place-items-center rounded-md border border-[#d6eef3] bg-[#eaf7f9]
//                     shadow-[0_1px_0_rgba(0,0,0,0.03)] transition hover:bg-[#def2f5]
//                     h-8 w-8 sm:h-10 sm:w-10
//                     max-[1380px]:sm:h-9 max-[1380px]:sm:w-9
//                     max-[1200px]:sm:h-8 max-[1200px]:sm:w-8
//                   "
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   <img
//                     src={s.icon}
//                     alt={s.label}
//                     className="
//                       h-4 w-4 sm:h-5 sm:w-5
//                       max-[1380px]:sm:h-4 max-[1380px]:sm:w-4
//                       max-[1200px]:sm:h-3.5 max-[1200px]:sm:w-3.5
//                     "
//                   />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// const SOCIALS = [
//   { label: "Facebook", href: "https://www.facebook.com/alpheric/", icon: facebook },
//   { label: "Instagram", href: "https://www.instagram.com/alpheric.consultants/", icon: instagram },
//   { label: "X", href: "#", icon: twitter },
//   { label: "LinkedIn", href: "https://in.linkedin.com/company/alphericconsultants", icon: linkedin },
//   { label: "YouTube", href: "https://www.youtube.com/@AlphericLive", icon: youtube },
// ];



























// AlphericComingSoon.tsx
import { useState } from "react";
import alphericLogo from "@/assets/logo/Whitelogo.png";
import comingSoonRing from "@/assets/CommingSoon/comming-soon.gif";
import background from "@/assets/CommingSoon/background.jpg";
import container from "@/assets/CommingSoon/container.png";
import facebook from "@/assets/CommingSoon/facebook.png";
import instagram from "@/assets/CommingSoon/instagram.png";
import twitter from "@/assets/CommingSoon/twitter.png";
import linkedin from "@/assets/CommingSoon/linkedin.png";
import youtube from "@/assets/CommingSoon/youtube.png";
import ContactModal from "@/pages/form";

export default function AlphericComingSoon() {
  const [open, setOpen] = useState(false);
  return (
    <main className="h-auto w-full bg-white text-[#0b0b0b]">
      {/* Desktop: 2-col with gap; Tablet/Mobile: stacked with vertical gap */}
      <div
        className="
          flex flex-col h-full w-full
          md:grid-rows-[minmax(72vh,72vh)_1fr]
          gap-y-10 md:gap-y-14 lg:gap-y-0
          lg:flex-row
          lg:gap-x-16 xl:gap-x-24 2xl:gap-x-28
        "
      >
        {/* ========== LEFT (visual) ========== */}
        <section
          className="
            relative order-1
            max-[1024px]:min-w-full
            h-auto lg:h-full                         /* <1024: size by image; ≥1024: fill column */
            overflow-hidden lg:overflow-visible     /* prevent any overlap on small screens */
            min-[1240px]:min-w-[600px] min-[1240px]:max-w-[600px]
            max-[1240px]:max-w-[480px] max-[1240px]:min-w-[480px]
          "
        >
          {/* Background:
              - <1024: in-flow image (cannot cover anything)
              - ≥1024: absolute cover like your desktop layout
           */}
          <img
            src={background}
            alt=""
            className="block w-full h-auto select-none"
          />
          <div className="absolute inset-0 hidden lg:block z-0 pointer-events-none">
            <img
              src={background}
              alt=""
              className="h-full w-full object-cover object-center select-none"
            />
          </div>

          {/* Overlay for legibility (between bg and content) */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/10 via-black/10 to-black/55" />

          {/* Top-center logo (above overlay) */}
          <div className="absolute left-1/2 top-10 -translate-x-1/2 sm:top-16 z-20">
            <img
              src={alphericLogo}
              alt="Alpheric"
              className="
                w-auto h-10 sm:h-11
                max-[1380px]:h-9
                max-[1200px]:h-8
              "
            />
          </div>

          {/* Center ring (above overlay) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <img
              src={comingSoonRing}
              alt="Coming Soon"
              className="
                w-auto h-64 md:h-72
                max-[1380px]:md:h-[260px]
                max-[1200px]:md:h-[232px]
              "
            />
          </div>

          {/* Bottom copy (above overlay) */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-7 pt-4 sm:px-14 sm:pb-10 z-20">
            <div>
              <h2
                className="
                  text-white font-medium font-poppins
                  text-lg md:text-[32px]
                  max-[1380px]:md:text-[28px]
                  max-[1200px]:md:text-[24px]
                  max-sm:leading-tight
                "
              >
                Innovation. Creativity. Growth.
              </h2>
              <p
                className="
                  mt-2 text-white/85 font-normal font-poppins text-justify
                  text-[13px] sm:text-[20px]
                  leading-[1.6] max-sm:leading-tight
                  max-[1380px]:sm:text-[18px]
                  max-[1200px]:sm:text-[16px]
                "
              >
                We’re working behind the scenes to bring you a brand-new digital
                experience that will redefine how brands connect, grow, and
                succeed online.
              </p>
            </div>
          </div>
        </section>

        {/* ========== RIGHT (content) ========== */}
        <section className="order-2 flex h-auto w-full items-center">
          <div className="w-full px-6 sm:px-10 lg:pl-2 xl:pl-6 lg:pr-10 xl:pr-16 2xl:pr-24">
            {/* Heading */}
            <h1
              className="
                font-semibold tracking-[-0.01em]
                text-[28px] sm:text-[34px] lg:text-[48px]
                leading-tight max-sm:leading-tight
                max-[1380px]:lg:text-[44px]
                max-[1200px]:lg:text-[40px]
              "
            >
              Something exciting is coming!
            </h1>

            {/* Paragraph */}
            <p
              className="
                mt-4 max-w-4xl text-black/70
                text-base sm:text-[28px]
                leading-[1.6] max-sm:leading-tight
                max-[1380px]:sm:text-[26px]
                max-[1200px]:sm:text-[24px]
              "
            >
              Our new website is launching soon, a space built for ideas, impact,
              and possibilities. Stay tuned for the Alpheric experience! 💡✨
            </p>

            <div className="mt-12 space-y-2">
              <p
                className="
                  text-[28px] text-black/60
                  max-sm:leading-tight
                  max-[1380px]:text-[24px]
                  max-[1200px]:text-[22px]
                "
              >
                Shall we chat?
              </p>
              <a
                href="mailto:hello@alpheric.com"
                className="
                  font-semibold decoration-black/20 underline-offset-4 hover:decoration-black break-words
                  text-[28px] sm:text-[36px]
                  max-[1380px]:sm:text-[32px]
                  max-[1200px]:sm:text-[28px]
                  max-sm:text-[22px] max-sm:leading-tight
                  hover:underline
                "
              >
                hello@alpheric.com
              </a>
            </div>

            {/* Let’s talk */}
            <div className="mt-8 flex items-center justify-between group">
              <div className="flex items-center gap-4 sm:gap-5">
                <span
                  className="
                    font-semibold leading-none border-b-3 border-b-transparent group-hover:border-b-3 group-hover:border-black
                    text-[40px] min-[500px]:text-[48px] sm:text-[56px] lg:text-[87px]
                    max-[1380px]:lg:text-[78px]
                    max-[1200px]:lg:text-[70px]
                    max-[1080px]:lg:text-[60px]
                    max-sm:leading-tight
                  "
                >
                  Let’s
                </span>
                <img
                  src={container}
                  alt="Avatar/Pill"
                  className="
                    h-10 w-auto sm:w-auto sm:h-[72px]
                    max-[1380px]:sm:h-[64px] max-[1380px]:sm:w-auto
                    max-[1200px]:sm:h-[56px] max-[1200px]:sm:w-auto
                  "
                />
                <span
                  className="
                    font-semibold leading-none border-b-3 border-b-transparent group-hover:border-b-3 group-hover:border-black
                    text-[40px] min-[500px]:text-[48px] sm:text-[56px] lg:text-[87px]
                    max-[1380px]:lg:text-[78px]
                    max-[1200px]:lg:text-[70px]
                    max-[1080px]:lg:text-[60px]
                    max-sm:leading-tight
                  "
                >
                  talk
                </span>
                <span
                  onClick={() => setOpen(true)}
                  aria-label="Open contact form"
                  className="
                    inline-flex items-center justify-center rounded-full
                    w-15 h-12 sm:w-20 sm:h-15 lg:w-34 lg:h-20
                    text-xl sm:text-2xl lg:text-3xl
                    bg-transparent text-current
                    transition-all duration-200 ease-out
                    group-hover:bg-black group-hover:text-white group-hover:scale-95
                    group-hover:active:scale-90
                    max-sm:leading-tight
                    hover:cursor-pointer
                  "
                >
                  →
                </span>
              </div>

              <ContactModal open={open} onClose={() => setOpen(false)} onSubmit={() => {}} />
            </div>

            {/* Socials */}
            <div className="mt-6 lg:mb-0 mb-30 flex items-center gap-2.5 sm:gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="
                    grid place-items-center rounded-md border border-[#d6eef3] bg-[#eaf7f9]
                    shadow-[0_1px_0_rgba(0,0,0,0.03)] transition hover:bg-[#def2f5]
                    h-8 w-8 sm:h-10 sm:w-10
                    max-[1380px]:sm:h-9 max-[1380px]:sm:w-9
                    max-[1200px]:sm:h-8 max-[1200px]:sm:w-8
                  "
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={s.icon}
                    alt={s.label}
                    className="
                      h-4 w-4 sm:h-5 sm:w-5
                      max-[1380px]:sm:h-4 max-[1380px]:sm:w-4
                      max-[1200px]:sm:h-3.5 max-[1200px]:sm:w-3.5
                    "
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/alpheric/", icon: facebook },
  { label: "Instagram", href: "https://www.instagram.com/alpheric.consultants/", icon: instagram },
  { label: "X", href: "#", icon: twitter },
  { label: "LinkedIn", href: "https://in.linkedin.com/company/alphericconsultants", icon: linkedin },
  { label: "YouTube", href: "https://www.youtube.com/@AlphericLive", icon: youtube },
];
