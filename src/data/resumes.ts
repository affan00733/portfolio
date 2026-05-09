import type { ResumeVariant } from './types';

// Drop the 6 PDFs into /public/resumes/ with the filenames below.
// The dropdown will surface them automatically.
export const resumes: ResumeVariant[] = [
  {
    id: 'cv',
    label: 'Full CV (academic)',
    description: 'Complete academic CV · publications, research, teaching, awards.',
    file: '/resumes/Mohammed_Afaan_Ansari_CV.pdf',
    primaryRole: 'all',
  },
  {
    id: 'aiml',
    label: 'AI / ML Engineer',
    description: 'Generative AI, multimodal LLMs, RAG, ONNX inference.',
    file: '/resumes/Resume_Afaan_Ansari_AI_ML.pdf',
    primaryRole: 'aiml',
  },
  {
    id: 'diffusion',
    label: 'AI / Diffusion specialist',
    description: 'Computer vision, diffusion models, mobile GPU deployment.',
    file: '/resumes/Resume_Afaan_Ansari_AI_specific_diffussion.pdf',
    primaryRole: 'diffusion',
  },
  {
    id: 'datasci',
    label: 'Data Scientist',
    description: 'Statistical modelling, evaluation, ML on real-world noisy data.',
    file: '/resumes/Resume_Afaan_Ansari_data_scientist.pdf',
    primaryRole: 'datasci',
  },
  {
    id: 'datanalyst',
    label: 'Data Analyst',
    description: 'BI, dashboards, analytics on financial and operational data.',
    file: '/resumes/Resume_Afaan_Ansari_data_analyst.pdf',
    primaryRole: 'datasci',
  },
  {
    id: 'dataeng',
    label: 'Data Engineer',
    description: 'GCP / AWS pipelines, ETL, Airflow, hybrid-cloud architecture.',
    file: '/resumes/Resume_Afaan_Ansari_data_engineer.pdf',
    primaryRole: 'dataeng',
  },
  {
    id: 'sde',
    label: 'Software Engineer (SDE)',
    description: 'Full-stack engineering · React, Node, FastAPI, K8s, CI/CD.',
    file: '/resumes/Resume_Afaan_Ansari_SDE.pdf',
    primaryRole: 'sde',
  },
];
