import {

  Banknote,
  BookOpen,
  Building2,
  Calculator,
  CircleHelp,
  CreditCard,
  FileText,
  Gem,
  Handshake,
  History,
  Info,
  Landmark,
  Mail,
  MapPin,
  Megaphone,
  Newspaper,
  PiggyBank,
  PlayCircle,
  Receipt,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  UserRound,
  Users,
  Venus,
  Zap,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/site";

const MAP: Record<IconName, React.ComponentType<LucideProps>> = {
  piggy: PiggyBank,
  loan: Banknote,
  venus: Venus,
  gem: Gem,
  zap: Zap,
  users: Users,
  receipt: Receipt,
  phone: Smartphone,
  play: PlayCircle,
  calculator: Calculator,
  book: BookOpen,
  info: Info,
  history: History,
  leader: UserRound,
  file: FileText,
  handshake: Handshake,
  news: Newspaper,
  pin: MapPin,
  atm: CreditCard,
  building: Building2,
  help: CircleHelp,
  shield: ShieldCheck,
  mail: Mail,
  megaphone: Megaphone,
  trend: TrendingUp,
};

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & LucideProps) {
  const C = MAP[name] ?? Landmark;
  return <C size={size} strokeWidth={1.6} aria-hidden="true" {...rest} />;
}


const SOCIAL_PATHS = {
  facebook: "M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6Z",
  instagram:
    "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3.6c2.3 0 2.5 0 3.4.1 2.3.1 3.4 1.2 3.5 3.5.1.9.1 1.2.1 3.4v2.8c0 2.3 0 2.5-.1 3.4-.1 2.3-1.2 3.4-3.5 3.5-.9.1-1.1.1-3.4.1s-2.5 0-3.4-.1c-2.3-.1-3.4-1.2-3.5-3.5C5 15.9 5 15.6 5 13.4v-2.8c0-2.3 0-2.5.1-3.4.1-2.3 1.2-3.4 3.5-3.5.9-.1 1.1-.1 3.4-.1Z",
  linkedin:
    "M6.9 8.6H3.6V20h3.3V8.6ZM5.3 3.4a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 13.4c0-3.1-1.7-4.6-3.9-4.6a3.4 3.4 0 0 0-3 1.6V8.6h-3.2V20h3.3v-5.6c0-1.5.3-2.9 2.1-2.9s1.8 1.7 1.8 3V20h3.3l-.4-6.6Z",
};

export function SocialIcon({ network, size = 18 }: { network: keyof typeof SOCIAL_PATHS; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={SOCIAL_PATHS[network]} />
    </svg>
  );
}
