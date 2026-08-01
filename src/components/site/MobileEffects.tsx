import { useEffect, useRef, useState } from "react";

/**
 * Efeitos dinâmicos para mobile:
 * - Glow que segue o dedo
 * - Vibração sutil ao tocar botões
 * - Paralaxe com giroscópio
 */

/** Glow que acompanha o toque no mobile */
export function TouchGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      setVisible(true);
      glow.style.transform = `translate3d(${t.clientX - 60}px, ${t.clientY - 60}px, 0)`;
    };

    const onEnd = () => {
      setVisible(false);
    };

    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });

    return () => {
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onEnd);
    };
  }, []);

  if (!window.matchMedia?.("(pointer: coarse)").matches) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[998] md:hidden"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s",
      }}
    >
      <div className="size-[120px] rounded-full bg-primary/20 blur-[40px]" />
    </div>
  );
}

/** Vibração sutil ao tocar botões interativos */
export function HapticFeedback() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    const vibrate = () => {
      if (navigator.vibrate) navigator.vibrate(8);
    };

    const listener = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor]")) {
        vibrate();
      }
    };

    document.addEventListener("touchstart", listener, { passive: true });
    return () => document.removeEventListener("touchstart", listener);
  }, []);

  return null;
}

/** Parallax com giroscópio / device motion no mobile */
export function MotionParallax() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    if (!window.DeviceOrientationEvent) return;

    const layer = layerRef.current;
    if (!layer) return;

    const onOrientation = (e: DeviceOrientationEvent) => {
      const x = (e.gamma ?? 0) / 45; // -1 a 1
      const y = (e.beta ?? 0) / 45;
      layer.style.transform = `translate3d(${x * 15}px, ${y * 15}px, 0)`;
    };

    window.addEventListener("deviceorientation", onOrientation, { passive: true });
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] md:hidden"
    >
      <div className="absolute top-[20%] left-[10%] size-32 rounded-full bg-primary/10 blur-[60px] animate-float" />
      <div className="absolute bottom-[30%] right-[15%] size-24 rounded-full bg-[color:var(--royal)]/10 blur-[50px] animate-float" style={{ animationDelay: "1s" }} />
    </div>
  );
}
