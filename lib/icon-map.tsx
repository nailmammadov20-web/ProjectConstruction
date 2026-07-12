import {
  HardHat,
  ClipboardList,
  PenTool,
  CalendarClock,
  Compass,
  Calculator,
  BadgeCheck,
  ShieldCheck,
  Cpu,
  Boxes,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  HardHat,
  ClipboardList,
  PenTool,
  CalendarClock,
  Compass,
  Calculator,
  BadgeCheck,
  ShieldCheck,
  Cpu,
  Boxes,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? HardHat;
}
