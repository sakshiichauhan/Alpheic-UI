import { ArrowUpRight } from "lucide-react";

export function DefaultButton({children, onClick, href, className}: {children: React.ReactNode, onClick: () => void, href: string | undefined, className?: string }){
    return (
              <a
                href={href ?? "#"}
                className={`inline-flex items-center gap-2 border-[2px] px-4 sm:px-6 lg:px-8 py-2 text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] transition-colors font-urbanist ${className}`}
                style={{ borderColor: "var(--color)", color: "black" }}
                onClick={onClick}
              >
                {children}
                <ArrowUpRight strokeWidth={1.5} className="h-full w-[20px] sm:w-[22px] md:w-[24px] lg:w-[30px] xl:w-[36px] 2xl:w-[40px] shrink-0" aria-hidden />
              </a>
    )
}