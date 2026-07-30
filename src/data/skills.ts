import type { SkillCategory, TechTag } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'database',
    title: 'Technical',
    icon: '🗄️',
    accentColor: '#3b82f6',
    skills: [
      { name: 'SQL (PostgreSQL, BigQuery)', percentage: 90 },
      { name: 'Python (Pandas, NumPy, Scikit-Learn)', percentage: 88 },
      { name: 'Excel (VBA / PowerQuery)', percentage: 86 },
      { name: 'Data Cleaning & ETL', percentage: 89 },
    ],
  },
  {
    id: 'analytics',
    title: 'Business Intelligence',
    icon: '📊',
    accentColor: '#22c55e',
    skills: [
      { name: 'Tableau', percentage: 84 },
      { name: 'Power BI', percentage: 92 },
      { name: 'Data Storytelling', percentage: 87 },
      { name: 'KPI Dashboarding', percentage: 90 },
    ],
  },
  {
    id: 'visualization',
    title: 'Core Competencies',
    icon: '📈',
    accentColor: '#a855f7',
    skills: [
      { name: 'Statistical Modeling', percentage: 83 },
      { name: 'A/B Testing', percentage: 81 },
      { name: 'Data Cleansing', percentage: 92 },
      { name: 'ETL', percentage: 88 },
    ],
  },
  {
    id: 'devtools',
    title: 'Analytical Delivery',
    icon: '🔧',
    accentColor: '#f97316',
    skills: [
      { name: 'Forecasting', percentage: 84 },
      { name: 'Segmentation', percentage: 86 },
      { name: 'Validation', percentage: 91 },
      { name: 'Optimization', percentage: 88 },
    ],
  },
];

export const techTags: TechTag[] = [
  { name: 'SQL', primary: true },
  { name: 'PostgreSQL', primary: true },
  { name: 'BigQuery', primary: true },
  { name: 'Python', primary: true },
  { name: 'R', primary: true },
  { name: 'Power BI', primary: true },
  { name: 'Tableau', primary: true },
  { name: 'Excel', primary: true },
  { name: 'Pandas', primary: false },
  { name: 'NumPy', primary: false },
  { name: 'Scikit-Learn', primary: false },
  { name: 'Jupyter', primary: false },
  { name: 'ETL', primary: false },
  { name: 'A/B Testing', primary: false },
  { name: 'Data Storytelling', primary: false },
  { name: 'KPI Dashboards', primary: false },
];
