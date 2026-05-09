import type { WhatIDoCard } from './types';

export const whatIDo: WhatIDoCard[] = [
  {
    id: 'genai',
    role: 'aiml',
    title: 'Generative AI & LLMs',
    description:
      'Designing, fine-tuning, and shipping LLM systems that survive production budgets and latency targets.',
    examples: [
      'ChartDesign · LoRA on Phi-3 / Qwen-3 / InternVL2.5 (84% attribute accuracy)',
      'Multimodal RAG: LVLM extraction → Mistral-7B summarization → embedding dedup',
      'MSCI prompt engineering · 99.98% serving cost reduction',
    ],
  },
  {
    id: 'mlops',
    role: 'dataeng',
    title: 'MLOps & Data Engineering',
    description:
      'Production data + model pipelines on hybrid cloud, ETL at 10M+ scale, and inference under 100 ms.',
    examples: [
      'MSCI hybrid-cloud GCP pipeline · 100K+ research reports, 90%+ accuracy',
      'FAA-compliant ETL on 10M+ aviation-weather records (CSSI)',
      'ONNX quantization + GitHub Actions CI/CD across model deployments',
    ],
  },
  {
    id: 'cv',
    role: 'diffusion',
    title: 'Computer Vision & Multimodal',
    description:
      'Vision-language modelling, diffusion-based restoration, and CV systems benchmarked for clinical / mobile latency.',
    examples: [
      '9-VLM benchmark (InternVL, Gemma 3, LLaVA, Pixtral, Phi-3.5 V) on crisis fact extraction',
      'UNet DDPM for low-light restoration · PSNR +3 dB, <150 ms mobile GPU',
      'CNN MRI brain-tumor detection · 85% accuracy, targeted for Mayo Clinic',
    ],
  },
  {
    id: 'datasci',
    role: 'datasci',
    title: 'Data Science & Analytics',
    description:
      'Modeling on noisy real-world data (financial reports, social media, ESG telemetry) with rigorous evaluation.',
    examples: [
      'RoBERTa-large priority classifier on 126K labeled posts (macro-F1 0.77)',
      'ESG / CapEx metrics from 10K+ records (MSCI Sustainability Institute)',
      'Anomaly detection on 10M+ FAA records (90%+ recall)',
    ],
  },
  {
    id: 'sde',
    role: 'sde',
    title: 'Software Engineering',
    description:
      'Full-stack systems built to ship, from agentic AI backends to crisis-mapping platforms used in 50+ countries.',
    examples: [
      'ARIA · 10-agent system on Claude Sonnet + FastAPI + React',
      'Sourceable crisis-mapping (React, K8s, Dialogflow) · 1,500+ journalists / 52+ countries',
      'EVADB GPT-4 + ONNX vision-encoder integration · 40% latency reduction',
    ],
  },
];
