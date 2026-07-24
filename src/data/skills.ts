import type { SkillCategory, TechTag } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'database',
    title: 'Database & SQL',
    icon: '🗄️',
    accentColor: '#3b82f6',
    skills: [
      { name: 'SQL (PostgreSQL / T-SQL)', percentage: 85 },
      { name: 'Database Design & Normalization', percentage: 80 },
      { name: 'Stored Procedures, Views & Triggers', percentage: 75 },
      { name: 'Query Optimization & Indexing', percentage: 70 },
    ],
  },
  {
    id: 'analytics',
    title: 'Data Analysis',
    icon: '📊',
    accentColor: '#22c55e',
    skills: [
      { name: 'Python (Pandas, NumPy)', percentage: 75 },
      { name: 'Data Cleaning & Wrangling', percentage: 80 },
      { name: 'Exploratory Data Analysis', percentage: 78 },
      { name: 'Statistics Fundamentals', percentage: 70 },
    ],
  },
  {
    id: 'visualization',
    title: 'Visualization & BI',
    icon: '📈',
    accentColor: '#a855f7',
    skills: [
      { name: 'Power BI', percentage: 78 },
      { name: 'Excel (Advanced Formulas, Pivot Tables)', percentage: 82 },
      { name: 'Dashboard Design', percentage: 75 },
      { name: 'Data Storytelling', percentage: 72 },
    ],
  },
  {
    id: 'devtools',
    title: 'Development & Tools',
    icon: '🔧',
    accentColor: '#f97316',
    skills: [
      { name: 'C# (.NET / WinForms)', percentage: 78 },
      { name: 'Git / GitHub', percentage: 80 },
      { name: 'QuickBooks (Bookkeeping)', percentage: 65 },
      { name: 'Jupyter Notebook', percentage: 75 },
    ],
  },
];

export const techTags: TechTag[] = [
  { name: 'SQL', primary: true },
  { name: 'PostgreSQL', primary: true },
  { name: 'T-SQL', primary: true },
  { name: 'Python', primary: true },
  { name: 'Power BI', primary: true },
  { name: 'Excel', primary: true },
  { name: 'C#', primary: true },
  { name: 'Pandas', primary: false },
  { name: 'NumPy', primary: false },
  { name: 'Git', primary: false },
  { name: 'QuickBooks', primary: false },
  { name: 'Jupyter', primary: false },
  { name: 'SQL Server', primary: false },
  { name: 'Data Modeling', primary: false },
  { name: 'DAX', primary: false },
  { name: 'ETL', primary: false },
];
