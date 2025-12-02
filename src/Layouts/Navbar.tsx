import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  cubicBezier,
  type Transition,
  useSpring,
} from "framer-motion";
import {
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import BlackLogo from "@/assets/logo/Blacklogo.png";
import Menu from "@/assets/Homepage/menu.png";

/* ---------------- Types & Data ---------------- */
type SubLink = { id: string; label: string; href: string; frontImg?: string; backImg?: string };
type MenuItem = { id: string; label: string; href?: string; items?: SubLink[]; variant?: "links" | "cards" };

const MENU: MenuItem[] = [
  { id: "Pilot",   label: "Pilot",   href: "/Pilot" },
  // { id: "Consult", label: "Consult", href: "/Consult" }, // Inactive - will be added in future when content is ready
  { id: "Industries", label: "Industries", href: "/Industries" },
  { 
    id: "Services", label: "Services", href: "/Services",
    items: [
      { id: "Design", label: "Design", href: "/Design" },
      // { id: "Build", label: "Build", href: "/Build" },
      // { id: "Secure", label: "Secure", href: "/Secure" },
      // { id: "Host", label: "Host", href: "/Host" },
      // { id: "Market", label: "Market", href: "/Market" },

    ],
    variant: "links",
  },
  { id: "Insights", label: "Insights", href: "/Insights" },
  { id: "Actions", label: "Actions", href: "/Actions" },
  { id: "About Us", label: "About Us", href: "/About Us" },
  { id: "Careers", label: "Careers", href: "/Careers" },
  { id: "Contact Us", label: "Contact Us", href: "/Contact Us" },
];

/* ---------------- Utils ---------------- */
const SPRING: Transition = { type: "spring", stiffness: 420, damping: 32, mass: 0.8 };
const FADE:   Transition = { duration: 0.18, ease: cubicBezier(0.22, 1, 0.36, 1) };
const cx = (...xs: Array<string | false | null | undefined>) => xs.filter(Boolean).join(" ");

/* ---------------- Component ---------------- */
export default function Navbar() {
  const prefersReducedMotion = useReducedMotion();

  // Desktop gate
  const [isDesktop, setIsDesktop] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // Scroll mapping (desktop animation remains)
  const { scrollY } = useScroll();
  const playRaw = useTransform(scrollY, [0, 160], [0, 1]);
  const play    = useSpring(playRaw, { stiffness: 220, damping: 28, mass: 0.9 });

  const TRAVEL_END = 0.58;
  const travel = useTransform(play, v => (isDesktop ? (v <= 0 ? 0 : v >= TRAVEL_END ? 1 : v / TRAVEL_END) : 0));
  const stylin = useTransform(play, v => (isDesktop ? (v <= TRAVEL_END ? 0 : (v - TRAVEL_END) / (1 - TRAVEL_END)) : 0));

  const bgColor   = useTransform(stylin, [0, 1], ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]);
  const shadow    = useTransform(stylin, [0, 1], ["0 0 0 rgba(0,0,0,0)", "0 12px 36px #00000014"]);// already have: const { scrollY } = useScroll();
  const mobileBg = useTransform(scrollY, [0, 24], ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]);
  

  // Dimensions for the desktop capsule
  const CONTENT_H = 56;
  const PAD_Y_START = 24;
  const PAD_Y_END   = 8;
  const bgHeight = useTransform(
    stylin,
    [0, 1],
    [`${CONTENT_H + 2 * PAD_Y_START}px`, `${CONTENT_H + 2 * PAD_Y_END}px`]
  );

  const PAD_X_START = 24;
  const PAD_X_END   = 8;
  const SAFE_FUDGE  = 4;

  const [compact, setCompact] = React.useState(false);
  useMotionValueEvent(stylin, "change", (v) => setCompact(v > 0.02));

  // Width-measurements (desktop)
  const shellRef = React.useRef<HTMLDivElement | null>(null);
  const rowRef   = React.useRef<HTMLDivElement | null>(null);
  const logoWrapRef = React.useRef<HTMLSpanElement | null>(null);
  const menuRef  = React.useRef<HTMLUListElement | null>(null);
  const ctaRef   = React.useRef<HTMLAnchorElement | null>(null);

  const [startW, setStartW]   = React.useState<number>(typeof window !== "undefined" ? window.innerWidth : 1440);
  const [targetW, setTargetW] = React.useState<number>(800);
  const [contentW, setContentW] = React.useState<number>(0);
  const CLUSTER_GAP = 8;

  const measure = React.useCallback(() => {
    const logo  = logoWrapRef.current;
    const menu  = menuRef.current;
    const cta   = ctaRef.current;
    if (!logo || !menu || !cta) return;

    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    setStartW(vw);

    const logoW = Math.ceil(logo.getBoundingClientRect().width);
    const menuW = Math.ceil(menu.getBoundingClientRect().width);
    const ctaW  = Math.ceil(cta.getBoundingClientRect().width);

    const cw = logoW + CLUSTER_GAP + menuW + CLUSTER_GAP + ctaW;
    setContentW(cw);

    const finalW = cw + 2 * PAD_X_END + SAFE_FUDGE;
    setTargetW(finalW);
  }, []);

  React.useLayoutEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => measure());
    if (rowRef.current)      ro.observe(rowRef.current);
    if (menuRef.current)     ro.observe(menuRef.current);
    if (logoWrapRef.current) ro.observe(logoWrapRef.current);
    if (ctaRef.current)      ro.observe(ctaRef.current);

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [measure]);

  const shellW  = useTransform(travel, (t) => startW + (targetW - startW) * t);
  const bgWidth = useTransform(stylin, (s) => {
    const padX = PAD_X_START + (PAD_X_END - PAD_X_START) * s;
    const w = contentW + 2 * padX + SAFE_FUDGE;
    return `${w}px`;
  });

  // States
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [deskOpen,   setDeskOpen]   = React.useState<string | null>(null);

  // --- MOBILE ONLY: bg becomes white on scroll & submenu toggle
  const [, setMobileSolid] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
  useMotionValueEvent(scrollY, "change", (v) => {
    if (!isDesktop) setMobileSolid(v > 4);
  });

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setDeskOpen(null);
        setMobileExpanded(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4 2xl:px-[60px] xl:px-[0px] box-border">
      <motion.div
        ref={shellRef}
        style={{ width: isDesktop ? (shellW as any) : "100%" }}
        transition={FADE}
        className="relative pointer-events-auto box-border"
      >
      

        {/* Desktop capsule bg */}
        
        <motion.div
          aria-hidden
          className="absolute left-0 right-0 mx-auto pointer-events-none overflow-hidden"
          style={{
            top: 0,
            bottom: 0,
            marginTop: "auto",
            marginBottom: "auto",
            height: isDesktop ? (bgHeight as any) : `${CONTENT_H + 2 * 8}px`,
            width: isDesktop ? (bgWidth as any) : "100%",
            backgroundColor: (bgColor as any) ,
            boxShadow: isDesktop ? (shadow as any) : "none",
            zIndex: 0,
          }}
        />

          {/* CONTENT ROW             MOBILE UI*/}
          <motion.div ref={rowRef} className="p-[8px] box-border relative z-10 flex items-center gap-0 h-full" style={{ backgroundColor: isDesktop ? bgColor : mobileBg }}>
          {/* ====== MOBILE LEFT: MENU OPENER ====== */}
          <div className={`${!isDesktop ? "flex items-center justify-center gap-2 md:gap-4" : ""}`}>
          <button
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={cx(
              "inline-flex h-[24px] w-[24px] md:h-[32px] md:w-[32px] items-center justify-center lg:hidden transition",
              "border-black/15 text-black hover:bg-black/[0.05]"
            )}
          >
            <motion.div>
              <img src={Menu} alt="menu" className="h-[24px] w-[24px] md:h-[32px] md:w-[32px]" />
            </motion.div>
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center self-center" aria-label="Homepage">
            <span ref={logoWrapRef} className="inline-flex items-center shrink-0">
              <div className="relative">
                <motion.img
                  src={BlackLogo}
                  alt="logo"
                  className="h-[20px] md:h-[28px] lg:h-8 w-auto select-none xl:pl-6"
                  draggable={false}
                />
              </div>
            </span>
          </Link>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          <div className="hidden lg:block overflow-visible">
            <ul
              className="flex items-center 2xl:gap-2 gap-1 rounded-full 2xl:px-2 xl:px-1 px-0.5 py-1"
              style={
                isDesktop && !compact
                  ? {
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: "transparent",
                      borderImageSource:
                        "linear-gradient(to right, #5AC8DC33, #B8F4FF1A, #FFFFFF)",
                      borderImageSlice: 1,
                    }
                  : undefined
              }
              ref={menuRef}
            >
              {MENU.map((m) => {
                const open = deskOpen === m.id;
                const hasMenu = !!m.items?.length;
                return (
                  <li
                    key={m.id}
                    className="relative"
                    onMouseEnter={() => hasMenu && setDeskOpen(m.id)}
                    onMouseLeave={() => setDeskOpen(null)}
                  >
                    {hasMenu ? (
                      <div className="inline-flex items-center gap-1">
                        {m.href ? (
                          <Link
                            to={m.href}
                            className={cx(
                              "group inline-flex items-center text-[16px] rounded-full 2xl:px-4 xl:px-3 px-2 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2",
                              "text-black hover:bg-black/[0.05] focus-visible:ring-black/40"
                            )}
                          >
                            {m.label}
                          </Link>
                        ) : (
                          <span
                            className={cx(
                              "inline-flex items-center text-[16px] rounded-full 2xl:px-4 xl:px-3 px-2 py-2 text-sm",
                              "text-black"
                            )}
                          >
                            {m.label}
                          </span>
                        )}
                        <button
                          className={cx(
                            "inline-flex items-center justify-center rounded-full p-1 transition focus-visible:outline-none focus-visible:ring-2",
                            "text-black hover:bg-black/[0.05] focus-visible:ring-black/40"
                          )}
                          aria-haspopup="menu"
                          aria-expanded={open}
                          onClick={() => setDeskOpen(open ? null : m.id)}
                        >
                          <ChevronDown
                            className="h-4 w-4 opacity-70 transition-transform duration-300"
                            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                          />
                        </button>
                      </div>
                    ) : (
                      <Link
                        to={m.href || "#"}
                        className={cx(
                          "group inline-flex items-center gap-1 text-[16px] rounded-full 2xl:px-4 xl:px-3 px-2 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2",
                          "text-black hover:bg-black/[0.05] focus-visible:ring-black/40"
                        )}
                      >
                        {m.label}
                      </Link>
                    )}

                    <AnimatePresence>
                      {hasMenu && open && (
                        <motion.div
                          key="dd"
                          role="menu"
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={prefersReducedMotion ? FADE : SPRING}
                          className={cx("absolute left-0 mt-2 min-w-[260px] border p-2 shadow-xl z-[10000]", "border-black/10 bg-white text-gray-900")}
                        >
                          <ul className="grid gap-1">
                            {m.items!.map((s) => (
                              <li key={s.id}>
                                <Link
                                  to={s.href}
                                  role="menuitem"
                                  className={cx("group flex items-center gap-2 rounded-lg px-3 py-2 text-sm", "text-gray-800 hover:bg-gray-50")}
                                >
                                  <span>{s.label}</span>
                                  <ArrowUpRight
                                    className={cx("ml-auto h-4 w-4 transition", "opacity-50 group-hover:opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5")}
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* ====== RIGHT: CTA ====== */}
          <div className="flex items-center">
            {/* Desktop CTA (unchanged) */}
            <Link
              ref={ctaRef}
              to="/LetsTalk"
              className={cx(
                "hidden lg:inline-flex shrink-0 items-center justify-center",
                "px-6 text-sm font-medium h-14 text-[20px]",
                "focus-visible:outline-none focus-visible:ring-2",
                "transition-all duration-300",
                "w-[160px]",
                compact
                  ? "bg-black text-white hover:bg-black/90 focus-visible:ring-black/40"
                  : "bg-white text-black hover:bg-white/90 focus-visible:ring-white/40"
              )}
            >
              {"Let's Talk"}
            </Link>

            {/* MOBILE CTA — same look as PC "Let's Talk" */}
            <Link
              to="/LetsTalk"
              className="lg:hidden inline-flex items-center justify-center gap-2 font-urbanist bg-black text-[14px] py-2 px-4 text-white
              md:text-[16px] md:py-3 md:px-5
              "
              aria-label="Let's Talk"
            >
              Let's Talk <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" />
            </Link>
          </div>
        </motion.div>

        {/* ---------------- MOBILE MENU (drawer) ---------------- */}
        <AnimatePresence>
          {!isDesktop && mobileOpen && (
            <>
              {/* Scrim */}
              <motion.div
                key="scrim"
                className="fixed inset-0 z-[60] bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />

              {/* Drawer */}
              <motion.aside
                key="drawer"
                className="fixed left-0 top-0 bottom-0 z-[61] w-[88%] max-w-sm bg-white px-5 pb-8 pt-24 overflow-y-auto"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={SPRING}
                aria-label="Mobile navigation"
              >
                {/* Brand mini row */}
                <div className="mb-6">
                  <img src={BlackLogo} alt="logo" className="h-7 w-auto select-none" draggable={false} />
                </div>

                {/* Menu items */}
                <nav>
                  <ul className="space-y-2">
                    {MENU.map((m) => {
                      const hasChildren = !!m.items?.length;
                      const open = mobileExpanded === m.id;

                      return (
                        <li key={m.id} className="border-b border-black/10 pb-2">
                          {hasChildren ? (
                            <div className="flex items-center justify-between">
                              {m.href ? (
                                <Link
                                  to={m.href}
                                  className="flex-1 py-3 text-left text-[17px] font-medium"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {m.label}
                                </Link>
                              ) : (
                                <span className="flex-1 py-3 text-left text-[17px] font-medium">{m.label}</span>
                              )}
                              <button
                                className="p-3"
                                aria-expanded={open}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMobileExpanded(open ? null : m.id);
                                }}
                              >
                                <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
                              </button>
                            </div>
                          ) : (
                            <Link
                              to={m.href || "#"}
                              className="flex w-full items-center justify-between py-3 text-left text-[17px] font-medium"
                            >
                              <span>{m.label}</span>
                              <ArrowUpRight className="h-5 w-5 opacity-60" />
                            </Link>
                          )}

                          {/* Sub-links */}
                          {hasChildren && (
                            <AnimatePresence initial={false}>
                              {open && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={FADE}
                                  className="overflow-hidden pl-3"
                                >
                                  {m.items!.map((s) => (
                                    <li key={s.id}>
                                      <Link to={s.href} className="block rounded-md px-2 py-2 text-[15px] text-neutral-700 hover:bg-neutral-100">
                                        {s.label}
                                      </Link>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* CTA inside drawer (optional) */}
                <a
                  href="/LetsTalk"
                  className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-black text-white text-[16px] font-medium"
                >
                  Let's Talk <ArrowUpRight className="h-5 w-5" />
                </a>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
