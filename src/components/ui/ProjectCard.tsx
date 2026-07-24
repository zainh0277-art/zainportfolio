'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';
import { getCategoryTheme } from '@/lib/categoryThemes';
import PhoneShowcase from './PhoneShowcase';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const theme = getCategoryTheme(project.category);
  const visibleTags = project.stack.slice(0, 3);
  const extra = project.stack.length - visibleTags.length;
  const allShots = project.phoneScreenshots ?? [];

  // Start at a random position so cards are naturally out of sync without needing a stagger timeout
  const [activeIdx, setActiveIdx] = useState(() =>
    allShots.length > 1 ? Math.floor(Math.random() * allShots.length) : 0,
  );
  const cardRef = useRef<HTMLButtonElement>(null);
  const isVisible = useRef(false);

  // Pause cycling when the card is off-screen to avoid unnecessary re-renders
  useEffect(() => {
    const el = cardRef.current;
    if (!el || allShots.length <= 1) return;
    const obs = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { rootMargin: '100px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [allShots.length]);

  // All cards cycle at the same pace; random initial index above keeps them out of sync
  useEffect(() => {
    if (allShots.length <= 1) return;
    const id = setInterval(() => {
      if (isVisible.current) setActiveIdx(i => (i + 1) % allShots.length);
    }, 3500);
    return () => clearInterval(id);
  }, [allShots.length]);

  const shots3: string[] | undefined =
    allShots.length > 0
      ? [
          allShots[activeIdx % allShots.length],
          allShots[(activeIdx + 1) % allShots.length],
          allShots[(activeIdx + 2) % allShots.length],
        ]
      : undefined;

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onSelect(project)}
      className="group w-full text-left bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      <div className={cn('relative z-10 h-56 bg-gradient-to-b', theme.header)}>
        {/* Flag chip */}
        <span className="absolute top-3 left-3 z-20 w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center text-lg shadow-sm">
          {project.flag}
        </span>

        {/* Category badge */}
        <span
          className={cn(
            'absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm',
            theme.badge,
          )}
        >
          {project.category}
        </span>

        {/* Phones — CSS float animation (compositor thread), no Framer Motion rAF loop */}
        <div className="absolute inset-x-0 bottom-0 translate-y-12 group-hover:translate-y-8 transition-transform duration-500 ease-out">
          <div className="animate-float">
            <PhoneShowcase
              accentColor={theme.solid}
              size="card"
              screenshots={shots3}
            />
          </div>
        </div>
      </div>

      <div className="relative z-0 pt-16 px-5 pb-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-0.5">
          {project.title}
        </h3>

        <p className={cn('text-sm font-semibold mb-2 truncate', theme.accent)}>
          {project.subtitle}
        </p>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {visibleTags.map((tech) => (
            <span
              key={tech}
              className={cn('text-xs px-2.5 py-1 rounded-full font-medium', theme.tag)}
            >
              {tech}
            </span>
          ))}
          {extra > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-500">
              +{extra}
            </span>
          )}
        </div>

        <span
          className={cn('text-sm font-semibold inline-flex items-center gap-1 self-end', theme.accent)}
        >
          View case study
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </button>
  );
}
