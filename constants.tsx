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
    cta: 'Pre-Order Hardcover',
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
    cta: 'Pre-Order eBook',
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
    cta: 'Pre-Order Audiobook',
    color: 'orange'
  }
];

export const HERO_CONTENT = {
  headline: "Excerpt from: 300 Million Connections",
  subheadline: "MTN & the African Tech Revolution",
  chapter: "Chapter 3: A Network Is Born",
  section: "The Founders",
  text: [
    "When the clocks turned toward midnight on 26 April 994, and South Africans waited in hushed anticipation for the dawn that would bring their first democratic elections, few imagined that another revolution quieter, but no less transformative was germinating in the same air. The political birth of the \"Rainbow Nation\" has been chronicled endlessly: the ballots, the queues, the jubilant collapse of apartheid's architecture. Less remembered is that within that same year, amid the swirl of liberation politics, the foundations of an entirely different freedom were being laid a freedom not of ideology or law, but of connection.",
    "The early 1990s in South Africa were years of paradox: immense moral clarity and immense administrative confusion. The apartheid state had been dismantled, but its bureaucracies remained, their ledgers and offices still filled with the detritus of a segregated order. The telecommunications system mirrored the society that had produced it unequal, centralised, hierarchical. The parastatal Telkom SA operated as both gatekeeper and bottleneck, its copper wires running thick through white suburbs and barely brushing the peripheries of the townships. To obtain a telephone line was a ritual of privilege; waiting lists stretched beyond a decade for those without political or economic clout. In Soweto, a community of more than two million people, there were fewer than 20 000 working landlines. In Sandton, with a population one-twentieth the size, there were more than twice as many."
  ]
};

export const AUTHOR_BIO = `Dr. Charles Wirsuiy Snr is a media/tech researcher, empathetic journalism advocate, and Christian Evangelist whose career spans over twenty-five years across broadcasting, research, and digital storytelling.

He holds an MSc. in Journalism, an MPhil. in Anthropology Development, and a Doctorate in Media Strategy, credentials that reflect both academic depth and practical mastery of communication in the modern age.

Dr. Wirsuiy has worked and colaborated with leading international broadcast institutions in Germany, the United Kingdom, the United States, and South Korea; contributing to some of the most significant global conversations on development, technology, and Africa's evolving media and technological landscape.

`;

export const AUTHOR_BIO_FULL = `Dr. Charles Wirsuiy Snr is a media and technology researcher, empathetic journalism advocate, and Christian evangelist whose career spans more than twenty-five years across broadcasting, research, and digital storytelling.

He holds an MSc in Journalism, an MPhil in Anthropology & Development, and a Doctorate in Media Strategy — credentials that reflect both academic depth and practical mastery of communication in the modern age.

Dr. Wirsuiy has worked and collaborated with leading international broadcast institutions in Germany, the United Kingdom, the United States, and South Korea, contributing to important global conversations on development, technology, and Africa's evolving media and technological landscape.

Beyond journalism, he is a media entrepreneur and cultural historian. His ventures in FM radio broadcasting and digital publishing in Cameroon and South Africa have positioned him among a generation of African thinkers who see media not merely as an industry but as an instrument of nation-building.

As a ghostwriter and editorial strategist, Dr. Wirsuiy has quietly shaped the voices of many authors and leaders across Africa and the diaspora. His work is characterised by precision, empathy, and an unwavering belief in the power of narrative to shape public destiny.

With 300 Million Connections: MTN & the African Tech Revolution, Dr. Wirsuiy extends his lifelong pursuit: documenting the making of modern Africa through the stories of its institutions, innovators, and invisible builders.

He lives in South Africa and continues to work at the intersection of faith, people, technology, and the human story.`;

export const EXCERPT_TEXT = `When the clocks turned toward midnight on 26 April 1994, and South Africans waited in hushed anticipation for the dawn that would bring their first democratic elections, few imagined that another revolution quieter, but no less transformative was germinating in the same air. The political birth of the "Rainbow Nation" has been chronicled endlessly: the ballots, the queues, the jubilant collapse of apartheid's architecture. Less remembered is that within that same year, amid the swirl of liberation politics, the foundations of an entirely different freedom were being laid a freedom not of ideology or law, but of connection.

The early 1990s in South Africa were years of paradox: immense moral clarity and immense administrative confusion. The apartheid state had been dismantled, but its bureaucracies remained, their ledgers and offices still filled with the detritus of a segregated order. The telecommunications system mirrored the society that had produced it unequal, centralised, hierarchical. The parastatal Telkom SA operated as both gatekeeper and bottleneck, its copper wires running thick through white suburbs and barely brushing the peripheries of the townships. To obtain a telephone line was a ritual of privilege; waiting lists stretched beyond a decade for those without political or economic clout. In Soweto, a community of more than two million people, there were fewer than 20 000 working landlines. In Sandton, with a population one-twentieth the size, there were more than twice as many.

Against this backdrop, a small group of engineers, financiers, and entrepreneurs began to imagine something audacious: a private, mobile telecommunications company that could operate across race, geography, and eventually, across borders. Their proposal seemed quixotic. The state still guarded the electromagnetic spectrum as a sovereign domain, the economy was in flux, and foreign investors regarded South Africa with both fascination and trepidation. Yet this group sensed a convergence of necessity and opportunity. The collapse of apartheid had not only freed politics it had freed policy. Entire sectors of the economy, long closed to black participation, were suddenly open to reimagination. Telecommunications, once a fortress of state control, was one of them.

The intellectual climate of that moment was saturated with talk of reconstruction. The Reconstruction and Development Programme (RDP), unveiled by Nelson Mandela's incoming government, proposed a sweeping vision of social renewal through infrastructure and employment. Electricity, housing, and education occupied the headlines, but communications was the quiet thread binding them all. The new administration understood instinctively that a modern state could not govern without modern networks. Yet Telkom's bureaucracy was slow to adapt; its unions resisted reform, and its technology was years behind international standards. The vacuum created by its inertia was the opening through which MTN would step.

The idea coalesced around a consortium of individuals who, in retrospect, embodied the transitional generation of South African business. Phuthuma Nhleko, an engineer turned financier educated at Ohio State University and the University of New York, had returned to South Africa in the late 1980s with a vision of using corporate structure as an instrument of empowerment. Sifiso Dabengwa, an electrical engineer from the University of the Witwatersrand, had built his career at Eskom, the national power utility, where he gained an intimate understanding of large-scale infrastructure management. They were joined by figures from the emerging black business movement Cyril Ramaphosa's National Empowerment Consortium, among others who saw in telecommunications not just an industry but a platform for symbolic restitution.

In 1993, as the transitional government negotiated its way toward democracy, South Africa's broadcasting and telecommunications regulators began drafting the framework for two national mobile licences. The first would almost certainly go to the incumbent Telkom SA, which planned a joint venture with Britain's Vodafon; an entity that would become Vodacom. The second, open to competitive tender, would be awarded through a bidding process designed to encourage black economic participation. That process would later be criticised for its opacity, but at the time it represented a rare experiment in reconciling market efficiency with social justice.

MTN's founders moved quickly. They assembled a consortium that combined technical expertise with political credibility. International partners were necessary, GSM equipment and know-how were concentrated in Europe but the controlling interest would remain local. The consortium's early backers included M-Cell, a holding company structured to attract empowerment capital, and a group of institutional investors who saw in mobile telephony the same explosive potential that the computer industry had exhibited a decade earlier. It was a delicate balance: too much foreign participation risked political backlash; too little, and the project would lack the technical and financial muscle to compete.

The licence application, submitted to the Independent Broadcasting Authority (IBA) in late 1993, read less like a corporate bid than a manifesto. It argued that mobile communications could become the infrastructure of inclusion, that the very technology which had made distance a tool of segregation could now be repurposed as an instrument of equality.

The tone was not rhetorical but prophetic. "South Africa," it declared, "has the opportunity to leap directly into the information age, bypassing the historical stages of wired dependency that have constrained other nations." The words captured both the optimism and the impatience of a country determined to rebuild not only its institutions but its self-image.

Negotiations stretched through the political transition. While the world's cameras captured Mandela's inauguration, engineers and lawyers in Johannesburg and Pretoria pored over spectrum charts, interconnection agreements, and network plans. On 15 September 1994, after months of technical evaluations, the government announced the award of the second GSM licence to MTN (Mobile Telecommunications Network).`;
