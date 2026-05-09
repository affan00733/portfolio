import type { WhatIDoCard } from './types';

/**
 * Three cards, all under the AI/ML umbrella. Production-engineering and
 * full-stack work appears as supporting evidence inside Card 3, not as
 * a separate identity claim.
 */
export const whatIDo: WhatIDoCard[] = [
  {
    id: 'genai',
    role: 'aiml',
    title: 'Generative AI & LLMs',
    description:
      'Designing, fine-tuning, and shipping LLM systems that survive production budgets and latency targets.',
    examples: [
      'ChartDesign · LoRA on Phi-3 / Qwen-3 / InternVL2.5 (84% attribute accuracy, COLM 2026)',
      'Multimodal RAG: LVLM extraction → Mistral-7B summarization → embedding dedup',
      'MSCI prompt engineering · 99.98% serving cost reduction, <100 ms ONNX inference',
    ],
  },
  {
    id: 'multimodal-cv',
    role: 'diffusion',
    title: 'Multimodal & Computer Vision',
    description:
      'Vision-language modelling, diffusion-based restoration, and CV systems benchmarked for clinical and mobile latency.',
    examples: [
      '9-VLM benchmark (InternVL, Gemma 3, LLaVA, Pixtral, Phi-3.5 V) on crisis fact extraction',
      'UNet DDPM low-light restoration · PSNR +3 dB at <150 ms mobile GPU',
      'CNN MRI brain-tumor detection · 85% accuracy, targeted for Mayo Clinic clinical practice',
    ],
  },
  {
    id: 'production-ml',
    role: 'dataeng',
    title: 'Production ML & Systems',
    description:
      'Hybrid-cloud pipelines, ETL at 10M+ scale, agentic systems, and the full-stack engineering needed to ship ML to real users.',
    examples: [
      'MSCI hybrid-cloud GCP pipeline · 100K+ research reports, 90%+ accuracy',
      'ARIA · 10-agent CVE prioritization (Claude Sonnet + FastAPI + React)',
      'Sourceable crisis-mapping platform · 1,500+ journalists in 52+ countries (React, K8s)',
    ],
  },
];
