import React from 'react';
import { PricingTier } from './types';

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'print',
    title: 'Print First Edition',
    price: 'R545',
    originalPrice: 'R595',
    description: 'A beautifully bound collector-grade volume printed on archival paper.',
    features: [
      'Full-color inserts, maps, and photographs',
      'Exclusive early-access excerpt via email',
      'Invitation to "Africa’s Digital Century" launch',
      'Priority shipping on release week'
    ],
    cta: 'Preorder Hardcover',
    color: 'yellow',
    badge: 'Limited Time'
  },
  {
    id: 'collector',
    title: 'Collector’s Edition',
    price: 'R995',
    description: 'Limited to 300 hand-signed copies. For leaders and collectors.',
    features: [
      'Individually numbered & gold embossed',
      'Author-signed bookplate & certificate',
      'Exclusive digital chapter: "Behind the Signal"',
      'Private virtual roundtable invitation',
      'Early delivery ahead of launch'
    ],
    cta: 'Reserve Collector’s Edition',
    color: 'purple',
    badge: 'Only 300 Copies'
  },
  {
    id: 'ebook',
    title: 'eBook Edition',
    price: 'R199',
    description: 'Delivered automatically on launch day in EPUB and Kindle formats.',
    features: [
      'Perfect for international readers',
      'Digital bonus photo gallery',
      'Lifetime access to future updated editions'
    ],
    cta: 'Preorder eBook',
    color: 'blue'
  },
  {
    id: 'audio',
    title: 'Audiobook Edition',
    price: 'R199',
    description: 'Narrated in a warm, cinematic tone. Available via Hiro.fm.',
    features: [
      'Serialized chapter releases before launch',
      'Bonus Q&A session: "The Making of"',
      'Compatible with all major platforms'
    ],
    cta: 'Preorder Audiobook',
    color: 'orange'
  }
];

export const HERO_CONTENT = {
  headline: "300 MILLION CONNECTIONS",
  subheadline: "MTN & The African Tech Revolution",
  intro: "In October 2025, MTN became the first African-headquartered telecom to surpass 300 million subscribers. This is the untold story of how an African company rewired a continent and built the digital future of a billion people.",
  quote: "“Africa’s progress will be defined by how we connect her people; digitally, financially, and socially.”",
  quoteAuthor: "Ralph Mupita, President & Group CEO, MTN Group"
};

export const AUTHOR_BIO = `Dr. Charles Wirsuiy is a writer, researcher, and storyteller of African enterprise and innovation. With a background spanning over 25 years in journalism, media, technology, history, people and policy his work explores how people, ideas, infrastructure, and technology are reshaping the modern African experience. He is also author of; God Lives in Sandton: The Jewish Imagination & the Making of Africa’s Richest square Mile and Microsoft at 50: 33 Years of Impact in Africa. 
300 Million Connections is his most ambitious work to date; a decade-long vision to document Africa’s journey from the periphery of the digital world to its creative frontier.`;

export const EXCERPT_TEXT = `They gathered that morning in Abuja, at the Nicon Hilton a half-finished monument of marble and ambition, where the air-conditioning whined louder than the crowd. On one side sat regulators from the Nigerian Communications Commission (NCC), led by the quiet but unflinching engineer Dr. Ernest Ndukwe. On the other, a collection of bidders bankers from Europe, diplomats from the Gulf, and, in the middle, a small delegation from South Africa carrying a yellow folder embossed with three letters: MTN.

It was January 2001, and Nigeria newly democratic after years of military rule was about to auction its first private mobile telecommunications licences. The stakes were enormous. A nation of more than 120 million people had fewer than half a million fixed telephone lines, most of them broken, many monopolised. For Nigerians, a functioning phone was a miracle.`;
