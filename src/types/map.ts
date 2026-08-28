export interface Hotspot { x: number; y: number; width: number; height: number; rotation?: number }
export interface Point { x: number; y: number }
export interface Product { id: string; name: string; image?: string }
export interface Exhibitor {
  id: string; name: string; stand: string; logo?: string | null; category?: string | null;
  description?: string | null; websiteUrl?: string | null; catalogUrl?: string | null;
  instagramUrl?: string | null; whatsappUrl?: string | null; featuredProducts?: Product[];
  catalogMode?: "iframe" | "external"; aliases?: string[]; hotspot: Hotspot; featured?: boolean;
}
export interface MapLocation { id: string; name: string; shortName: string; icon: string; hotspot: Hotspot; kind: string }
export interface Kiosk { id: string; name: string; location: Point }
