import type { Experience, Education } from '@/types';

export const experienceList: Experience[] = [
  {
    id: 'sql-data-modeling',
    role: 'SQL & Data Modeling',
    company: 'Analytics Foundation',
    companyColor: '#2563eb',
    period: 'Foundation',
    current: false,
    flag: '01',
    bullets: [
      'Designing clean schemas and writing optimized SQL queries for reliable reporting.',
      'Turning raw tables into structured datasets that are easy to analyze and reuse.',
    ],
  },
  {
    id: 'python-automation',
    role: 'Python Cleaning & Automation',
    company: 'Data Pipeline Workflows',
    companyColor: '#0ea5e9',
    period: 'Build Stage',
    current: false,
    flag: '02',
    bullets: [
      'Cleaning messy datasets and automating repetitive preparation steps with Python.',
      'Creating reproducible workflows that keep analysis consistent across projects.',
    ],
  },
  {
    id: 'powerbi-reporting',
    role: 'Power BI Reporting',
    company: 'Insight Delivery',
    companyColor: '#14b8a6',
    period: 'Visualization',
    current: false,
    flag: '03',
    bullets: [
      'Building dashboard layouts that surface KPIs clearly and stay readable on different screens.',
      'Using charts, cards, and filters to present business trends without visual clutter.',
    ],
  },
  {
    id: 'portfolio-projects',
    role: 'Portfolio Projects',
    company: 'Current Focus',
    companyColor: '#8b5cf6',
    period: 'Present',
    current: true,
    flag: '04',
    bullets: [
      'Combining SQL, Python, and BI tools into end-to-end portfolio case studies.',
      'Refining presentations so the work reads well to both technical and non-technical viewers.',
    ],
  },
];

export const educationList: Education[] = [
  {
    degree: 'BS Business Data Analytics',
    university: 'University of Engineering and Technology (UET), Lahore',
  },
];
