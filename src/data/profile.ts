import type { Profile } from './types';

export const profile: Profile = {
  name: 'Mohammed Afaan Ansari',
  shortName: 'Afaan Ansari',
  tagline: 'AI/ML Engineer · Generative AI, Multimodal LLMs & RAG',
  subtitleMetrics: [
    '99.98% LLM cost reduction @ MSCI',
    'Lead author, COLM 2026 (under review)',
    '2nd Best Paper, ASONAM 2023',
  ],
  bio: [
    "I'm a Master's student in Computer Science at the University of Maryland, College Park, advised by Prof. Cody Buntain at the CLIP Lab and iSchool. My research sits at the intersection of multimodal LLMs and crisis informatics, where I build and benchmark vision-language pipelines that turn raw social-media imagery into structured, traceable summaries for emergency-response analysts.",
    "Before UMD I spent two years at MSCI as a Data Science Technology Associate (promoted from Analyst in one year vs. the typical three to four; recognized as Star Performer 2023 across 1,200+ employees), where I cut production LLM serving cost from $10 to $0.002 per 1K items via prompt engineering and ONNX-optimized inference. I've also led a real-time crisis-mapping platform used by 1,500+ journalists in 52+ countries, and shipped vision-AI infrastructure with Georgia Tech and Mayo Clinic.",
    "I'm the lead author on ChartDesign (under review at COLM 2026) and co-authored the ASONAM 2023 2nd Best Paper on social-web dataset transience. I care about LLMs that actually ship: efficient inference, faithful retrieval, and pipelines that survive contact with messy real-world data.",
  ],
  email: 'mansari1@umd.edu',
  phone: '+1 (240) 413-1682',
  location: 'College Park, MD',
  linkedin: { label: 'linkedin.com/in/afaan001', url: 'https://www.linkedin.com/in/afaan001' },
  github: { label: 'github.com/affan00733', url: 'https://github.com/affan00733' },
  resumePath: '/resumes/Resume_Afaan_Ansari_AI_ML.pdf',
  cvPath: '/resumes/Mohammed_Afaan_Ansari_CV.pdf',
};
