import type { SkillCategory, TechTag } from '@/types';

export const skillCategories: SkillCategory[] = [
  { id: 'technical', title: 'Data & SQL', icon: '🗄️', accentColor: '#3b82f6', skills: [
    { name: 'SQL Server & T-SQL' }, { name: 'Relational schema design' },
    { name: 'Stored procedures & views' }, { name: 'Constraints & transactions' },
  ] },
  { id: 'bi', title: 'Business Intelligence', icon: '📊', accentColor: '#22c55e', skills: [
    { name: 'Power BI dashboards' }, { name: 'Excel reporting' },
    { name: 'KPI definition' }, { name: 'Data visualization' },
  ] },
  { id: 'core', title: 'Programming & Applications', icon: '💻', accentColor: '#a855f7', skills: [
    { name: 'C# & Windows Forms' }, { name: 'ADO.NET database access' },
    { name: 'MySQL' }, { name: 'Git version control' },
  ] },
  { id: 'analysis', title: 'Analytical Approach', icon: '🔎', accentColor: '#f97316', skills: [
    { name: 'Data cleaning & validation' }, { name: 'Business requirements' },
    { name: 'Rule-based analysis' }, { name: 'Explaining findings clearly' },
  ] },
];
export const techTags: TechTag[] = [
  ...['SQL Server', 'T-SQL', 'Power BI', 'Excel', 'C#'].map(name => ({ name, primary: true })),
  ...['MySQL', 'ADO.NET', 'Git', 'Database Design'].map(name => ({ name, primary: false })),
];
