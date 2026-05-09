import type { PublicationEntry } from './types';

export const publications: PublicationEntry[] = [
  {
    id: 'chartdesign',
    title: 'ChartDesign: Towards LLM Designer of Data Visualization',
    authors: 'Mohammed Afaan Ansari, Aniruddh Bansal, Tianyi Zhou',
    venue: { kind: 'conference', venue: 'COLM', year: 2026, status: 'Under review' },
    summary:
      'LoRA post-training of compact LLMs (Phi-3 mini 4B, Qwen-3 8B, InternVL2.5 8B) to map CSV data to renderer-agnostic JSON chart specifications. 84% attribute accuracy vs. 55% best zero-shot baseline; 65% of annotators preferred our charts over human originals.',
    leadAuthor: true,
    highlight: true,
  },
  {
    id: 'asonam-transience',
    title: 'Quantifying the Transience of Social Web Datasets',
    authors: 'Mohammed Afaan Ansari, Jiten Oswal, Vivek Kulkarni, Ashiqur R. KhudaBukhsh',
    venue: { kind: 'conference', venue: 'IEEE/ACM ASONAM', year: 2023 },
    summary:
      'Measured lifespan and dataset drift in social-web corpora using BERT-based models on longitudinal Twitter and Reddit snapshots across 100+ crisis and social events.',
    award: '2nd Best Paper Award',
    highlight: true,
    link: { label: 'ACM DL', url: 'https://dl.acm.org/' },
  },
  {
    id: 'cross-event',
    title: 'Cross Event Detection and Topic Evolution Mining in Cross Events for Man-Made Disasters in Social Media Streams',
    authors: 'Pramod Bide, Sudhir Dhage, Mohammed Afaan Ansari, Rudresh Veerkhare',
    venue: { kind: 'journal', venue: 'Peer-reviewed journal', year: 2022 },
    summary:
      'Real-time event mining and topic-evolution algorithm tracking topic fulcrum shifts across 10 sub-windows per event using inverse-frequency-weighted TF-IDF similarity.',
  },
  {
    id: 'fake-news',
    title: 'Fake News and Fake Profile Detection Using Hybrid Machine Learning on Social Media',
    authors: 'Pramod Bide, Sudhir Dhage, Mohammed Afaan Ansari, et al.',
    venue: { kind: 'journal', venue: 'Springer', year: 2022 },
    summary:
      'Hybrid LSTM + network-topology classifier for joint fake-news and fake-profile detection on social-media data.',
  },
  {
    id: 'blockchain-blood',
    title: 'Securing Blood Distribution Systems Using Blockchain',
    authors: 'Mohammed Afaan Ansari, et al.',
    venue: { kind: 'conference', venue: 'Springer SIST · ICCET', year: 2021 },
    summary:
      'Hyperledger Fabric solution for blood-bank supply-chain integrity; verified donation, storage, and recipient authenticity on a permissioned ledger.',
    link: { label: 'Springer', url: 'https://link.springer.com/' },
  },
  {
    id: 'aria',
    title: 'ARIA: Autonomous Risk Intelligence Agent for Vulnerability Prioritization',
    authors: 'Mohammed Afaan Ansari',
    venue: { kind: 'in-prep', venue: 'Technical report / system design', year: 2026 },
    summary:
      '10-agent agentic AI system for business-risk-aware CVE prioritization. Integrates NVD, EPSS, CISA KEV, MITRE ATT&CK, and PCI DSS / HIPAA / SOC2 to translate technical CVE data into per-CVE ROI calculations and remediation plans with full audit trails.',
    leadAuthor: true,
  },
  {
    id: 'vlm-inference',
    title: 'Efficient Vision-Language Model Inference for Image-Grounded Generation and Retrieval',
    authors: 'Mohammed Afaan Ansari',
    venue: { kind: 'preprint', venue: 'Technical report / preprint', year: 2025 },
    summary:
      'Comparative inference study across 9 LVLM families with quantization, prompt-budget, and runtime trade-off analysis.',
    leadAuthor: true,
  },
];
