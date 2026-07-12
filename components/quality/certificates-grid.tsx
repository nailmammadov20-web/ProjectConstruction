import type { Certificate } from "@/lib/types";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Award } from "lucide-react";

export function CertificatesGrid({ certificates }: { certificates: Certificate[] }) {
  return (
    <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
      {certificates.map((cert) => (
        <RevealItem key={cert.code}>
          <div className="flex h-full flex-col rounded-sm border border-border bg-card p-7">
            <Award className="size-7 text-gold-500" />
            <h3 className="mt-5 text-base font-bold text-foreground">{cert.title.en}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{cert.issuer}</p>
            <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold-600">
              Certified {cert.year}
            </span>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
