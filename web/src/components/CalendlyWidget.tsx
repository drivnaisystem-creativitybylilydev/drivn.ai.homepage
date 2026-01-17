"use client";

import { useMemo } from "react";

type CalendlyWidgetProps = {
  url: string;
};

export function CalendlyWidget({ url }: CalendlyWidgetProps) {
  const iframeSrc = useMemo(() => {
    const calendlyUrl = new URL(url);
    calendlyUrl.searchParams.set("embed_domain", "drivn.ai");
    calendlyUrl.searchParams.set("embed_type", "Inline");
    return calendlyUrl.toString();
  }, [url]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(107,54,255,0.22)]">
      <iframe
        src={iframeSrc}
        className="h-[760px] w-full rounded-3xl"
        title="Book a strategy call"
        frameBorder={0}
        allowFullScreen
      />
    </div>
  );
}

