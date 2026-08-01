import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y, filter: "blur(10px)" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-primary uppercase">
      <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
      {children}
    </span>
  );
}

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  size = "md",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
  size?: "md" | "lg" | "xl";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el || window.matchMedia("(pointer: coarse)").matches) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.32;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "translate3d(0,0,0)";
      }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-[transform,box-shadow,background-color] duration-500 [transition-timing-function:var(--ease-premium)] will-change-transform",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-base",
        size === "xl" && "px-8 py-5 text-base sm:px-14 sm:py-7 sm:text-xl",
        variant === "primary"
          ? "bg-[image:var(--gradient-blue)] text-foreground shadow-[var(--glow-md)] hover:shadow-[var(--glow-xl)]"
          : "glass text-foreground hover:border-primary/60 hover:bg-primary/10",
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,color-mix(in_oklab,white_35%,transparent),transparent)] transition-transform duration-1000 group-hover:translate-x-full" />
    </a>
  );
}
