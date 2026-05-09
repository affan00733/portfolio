import type { ProjectEntry } from './types';

export const projects: ProjectEntry[] = [
  {
    id: 'chartdesign',
    title: 'ChartDesign · LLM Designer of Data Visualization',
    period: '2024 to Present',
    summary:
      'Compact LLMs post-trained with LoRA to translate raw tabular data into renderer-agnostic JSON design specifications.',
    bullets: [
      'Post-trained Phi-3 mini, Qwen-3 8B, and InternVL2.5 8B via LoRA on a 2,118-chart corpus (PewResearch + CharXiV).',
      '84% attribute accuracy on held-out test vs. 55% best zero-shot baseline; LLM judge 92% agreement with humans.',
      'Outputs render across Matplotlib, Vega-Lite, Altair, and ggplot2.',
    ],
    stack: ['PyTorch', 'HuggingFace', 'LoRA / PEFT', 'Phi-3', 'Qwen-3', 'InternVL2.5'],
    roles: ['aiml'],
    featured: true,
  },
  {
    id: 'signbridge',
    title: 'SignBridge · Real-Time Sign Language for Meetings',
    period: '2026',
    summary:
      'Agentic AI system that turns multi-speaker meetings into a fully accessible experience for deaf participants in real time, with a continuous 3D signing avatar.',
    bullets: [
      '6-agent system coordinated by Gemini 2.5: browser mic capture, OpenAI Whisper STT, pyannote.audio diarization, Gemini-with-Claude-fallback translation across 10 languages, sign.mt 3D signing avatar, LLM-extracted action items with owners and deadlines.',
      'Backed by the WLASL dataset (1,959 ASL glosses) and a custom LLM router with auto-fallback. Zero mocks; every component is real ML running through real APIs.',
      'Won Best of Social Good Track at the Build with AI: Gemini Hackathon @ UMD (Google Cloud × GDG on Campus × Big Think AI).',
    ],
    stack: ['Gemini 2.5', 'Claude', 'OpenAI Whisper', 'pyannote.audio', 'sign.mt', 'WLASL'],
    roles: ['aiml', 'sde'],
    featured: true,
  },
  {
    id: 'multimodal-facts',
    title: 'Multimodal FACTS · Crisis Summarization Pipeline',
    period: '2025 to Present',
    summary:
      'End-to-end pipeline for extracting, ranking, and summarizing image-grounded facts during ongoing crises.',
    bullets: [
      'LVLM fact extraction → Mistral-7B summarization → SentenceTransformer dedup → JSON submission output.',
      'Benchmarked 9 vision-language model families; chosen model: 50% high-importance facts at 28 s/image vs. 295 s for Gemma 3 27B.',
      'RoBERTa-large priority classifier on 126K labeled posts (macro-F1 = 0.77) for scalable LVLM ranking.',
    ],
    stack: ['InternVL 2.5', 'Mistral 7B', 'RoBERTa', 'SentenceTransformers', 'PyTerrier'],
    roles: ['aiml', 'diffusion', 'datasci'],
    featured: true,
  },
  {
    id: 'aria',
    title: 'ARIA · Autonomous Risk Intelligence Agent',
    period: '2026',
    summary:
      '10-agent agentic AI system for business-risk-aware CVE vulnerability prioritization with full audit trails.',
    bullets: [
      'Agents ingest NVD / EPSS / CISA KEV; map CVEs to org assets via natural-language business-context docs.',
      'Estimates compliance fine exposure (PCI DSS, HIPAA, SOC2); simulates blast-radius paths through service dependency graphs; outputs per-CVE ROI.',
      'Built on Claude Sonnet + FastAPI + React; validated against HHS Breach Portal. Projected 70-80% reduction in manual triage labor vs. CVSS-only baselines.',
    ],
    stack: ['Claude Sonnet', 'FastAPI', 'React', 'NVD', 'EPSS', 'MITRE ATT&CK'],
    roles: ['aiml', 'sde'],
    featured: true,
  },
  {
    id: 'unet-diffusion',
    title: 'UNet Diffusion · Low-Light Image Restoration',
    period: '2024',
    summary:
      'UNet-conditioned DDPM for low-light enhancement on a 3,000-image smartphone dataset, deployed for mobile GPU.',
    bullets: [
      'PSNR +3 dB and SSIM +0.02 vs. baseline restoration models.',
      'Mixed-precision ONNX inference meeting <150 ms mobile GPU latency budget.',
    ],
    stack: ['PyTorch', 'UNet', 'DDPM', 'ONNX', 'Mixed Precision'],
    roles: ['diffusion', 'aiml'],
    featured: true,
  },
  {
    id: 'ceed',
    title: 'CEED · Cross Event Evolution Detection',
    period: '2020 to 2022',
    summary:
      'Real-time social event mining on Apache Flume + HDFS with bursty-segment extraction and topic evolution.',
    bullets: [
      'Tweet segmentation via Wikipedia-titles DB, Jarvis-Patrick clustering, cross-event similarity.',
      'Topic Evolution Algorithm tracking fulcrum shifts across 10 sub-windows per event.',
      'Validated on 278,817 tweets from the 2019 Pulwama attack news cycle.',
    ],
    stack: ['Apache Flume', 'HDFS', 'Python', 'TF-IDF', 'Wikipedia API'],
    roles: ['datasci', 'dataeng'],
  },
  {
    id: 'blockchain-blood',
    title: 'Blockchain-Based Secure Blood Distribution System',
    period: '2021',
    summary:
      'Hyperledger Fabric blockchain solution for end-to-end blood-bank supply-chain integrity (Springer ICCET 2021).',
    bullets: [
      'Verified donation, storage, and recipient authenticity on a permissioned ledger.',
      'Designed transaction model and smart contracts for multi-party blood logistics.',
    ],
    stack: ['Hyperledger Fabric', 'Solidity', 'Node.js', 'Docker'],
    roles: ['sde'],
    link: { label: 'GitHub', url: 'https://github.com/affan00733/Securring-Blood-Distribution-using-BlockChain' },
  },
  {
    id: 'enterprise-qna',
    title: 'LLM QnA System for Enterprise Knowledge Bases',
    period: '2023',
    summary:
      'Domain-adaptive QnA engine combining dense + sparse retrieval and cross-encoder reranking with citation-backed responses.',
    bullets: [
      'GPT-4 generation conditioned on BM25 + dense retrieval candidate pool.',
      'Cross-encoder reranking layer for accuracy on technical document corpora.',
    ],
    stack: ['GPT-4', 'BM25', 'LangChain', 'Cross-Encoder Reranker'],
    roles: ['aiml', 'dataeng'],
    link: { label: 'GitHub', url: 'https://github.com/affan00733/rag-pipeline' },
  },
  {
    id: 'crisis-mapping',
    title: 'Sourceable Crisis-Mapping Platform',
    period: '2022 to 2024',
    summary:
      'Real-time global crisis-mapping platform for journalists in humanitarian contexts.',
    bullets: [
      'React, React Native, Node.js, Docker, Kubernetes, Dialogflow stack.',
      'Adopted by 1,500+ journalists across 52+ countries; 30% page-load reduction; 25% retention lift.',
    ],
    stack: ['React', 'React Native', 'Node.js', 'Docker', 'Kubernetes', 'Dialogflow'],
    roles: ['sde'],
    link: { label: 'GitHub', url: 'https://github.com/affan00733/SourceableAppDTMar25' },
  },
];
