import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function SectionTitle({
  eyebrow,
  title,
  body,
  align = "left",
  theme = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
              theme === "dark" ? "text-gold-400" : "text-gold-600",
            )}
          >
            <span className="h-px w-6 bg-gold-500" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.75rem]",
            theme === "dark" ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed sm:text-lg",
              theme === "dark" ? "text-white/65" : "text-muted-foreground",
            )}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
