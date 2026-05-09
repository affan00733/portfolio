import type { EducationEntry } from './types';

export const education: EducationEntry[] = [
  {
    id: 'umd-msc',
    degree: 'Master of Science, Computer Science',
    institution: 'University of Maryland, College Park',
    location: 'College Park, MD',
    start: 'Aug 2024',
    end: 'May 2026',
    gpa: '3.81 / 4.0',
    advisor: 'Prof. Cody Buntain (College of Information Studies)',
    highlights: [
      'Research focus: multimodal LLM optimization, RAG pipeline design, parameter-efficient fine-tuning, crisis informatics.',
    ],
  },
  {
    id: 'spit-btech',
    degree: 'Bachelor of Technology, Computer Engineering',
    institution: 'Sardar Patel Institute of Technology (SPIT), Mumbai University',
    location: 'Mumbai, India',
    start: 'Jul 2019',
    end: 'Jun 2022',
    gpa: '8.9 / 10.0',
    highlights: [
      'Research focus: social-network event detection, fake-news identification, and blockchain systems.',
      'Capstone research led to peer-reviewed ACM and Springer publications.',
    ],
  },
  {
    id: 'gpm-diploma',
    degree: 'Diploma, Information Technology',
    institution: 'Government Polytechnic Mumbai',
    location: 'Mumbai, India',
    start: 'Jun 2016',
    end: 'May 2019',
    highlights: [
      'Graduated with distinction; served as undergraduate teaching assistant in programming and IT courses.',
    ],
  },
];
