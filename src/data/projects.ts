import type { Project } from '@/types';
import demoProjects from './demo-projects.json';

export const projects: Project[] = demoProjects;
export const projectCategories = ['All', ...new Set(projects.map(project => project.category))];
