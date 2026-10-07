'use client';

import type { MouseEvent } from 'react';
import Image from 'next/image';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.focus();
        onSelect(project);
      }}
      aria-label={`Read ${project.title} case study`}
      className="group w-full h-full min-w-0 text-left bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      <div className="relative w-full bg-slate-100 border-b border-gray-100">
        <Image src={project.screenshots[0].src} alt={project.screenshots[0].alt} width={1440} height={900} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="w-full h-auto" />
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1 w-full min-w-0">
        <div className="flex flex-wrap gap-2 items-center mb-4 text-xs font-semibold">
          <span className="rounded-full bg-blue-50 text-blue-800 px-2.5 py-1">Demo · Sample Data</span>
          <span className="text-gray-500">{project.category}</span>
        </div>
        <h3 className="text-xl font-bold text-navy group-hover:text-blue-700 leading-tight mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>
        <div className="grid grid-cols-3 gap-2 mb-5" aria-hidden="true">
          {project.screenshots.map((shot, index) => (
            <div key={shot.src} className="overflow-hidden rounded-lg border border-gray-200 bg-slate-50">
              <Image src={shot.src} alt="" width={1440} height={900} sizes="120px" className="w-full h-auto" />
              <span className="block text-center text-[10px] py-1 text-gray-600">View 0{index + 1}</span>
            </div>
          ))}
        </div>
        <span className="flex justify-between gap-2 items-center text-sm font-semibold text-blue-700">
          Read case study <span aria-hidden="true">↗</span>
        </span>
      </div>
    </button>
  );
}
