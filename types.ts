export interface PricingTier {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  cta: string;
  color: 'yellow' | 'purple' | 'blue' | 'orange';
  badge?: string;
}

export interface NavItem {
  label: string;
  href: string;
}