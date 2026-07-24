'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';
import { getCategoryTheme } from '@/lib/categoryThemes';
import PhoneShowcase from './PhoneShowcase';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const theme = getCategoryTheme(project.category);
  const screenshots = project.images ?? project.phoneScreenshots ?? [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      /* No backdrop-blur — it forces a full-page GPU repaint on every frame */
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain bg-white rounded-3xl shadow-2xl"
        /* translateY only — no scale, which avoids layout recalculation on every frame */
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        style={{ willChange: 'transform, opacity' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={cn('relative h-56 overflow-hidden bg-gradient-to-b', theme.modalHeader)}>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
          {project.iconUrl ? (
            <Image
              src={project.iconUrl}
              alt={`${project.title} app icon`}
              width={88}
              height={88}
              priority
              className="absolute top-6 left-1/2 -translate-x-1/2 z-10 rounded-[22px] shadow-xl ring-1 ring-black/5"
            />
          ) : (
            <PhoneShowcase
              accentColor={theme.solid}
              size="modal"
              className="absolute inset-x-0 top-5"
            />
          )}
          <div className="absolute bottom-4 left-6 z-20">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>{project.flag}</span>
              {project.title}
            </h3>
            <p className="text-sm font-medium text-gray-600">{project.subtitle}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {/* Screenshot gallery */}
          {screenshots.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">
                App Screenshots
              </p>
              {/* overscroll-x-contain stops horizontal scroll from hijacking the page/modal vertical scroll */}
              <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory overscroll-x-contain">
                {screenshots.map((src, idx) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`${project.title} screenshot`}
                    width={198}
                    height={378}
                    sizes="198px"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="shrink-0 snap-start rounded-2xl border border-gray-100 shadow-md"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Case study */}
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-3 flex items-center gap-2">
            <span className={cn('inline-block w-1 h-4 rounded-full', theme.badge)} />
            Case Study
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">{project.caseStudy}</p>

          {/* Key highlights */}
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">
            Key Highlights
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {project.highlights.map((h) => (
              <div key={h} className={cn('flex items-center gap-2.5 rounded-xl px-4 py-3', theme.ring)}>
                <span
                  className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] shrink-0',
                    theme.badge,
                  )}
                >
                  ✓
                </span>
                <span className="text-sm font-medium text-gray-700">{h}</span>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">Tech Stack</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={cn('text-sm px-3 py-1.5 rounded-full font-semibold', theme.tag)}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Store buttons */}
          {(project.playStoreUrl || project.appStoreUrl) && (
            <div
              className={cn(
                'grid gap-3',
                project.playStoreUrl && project.appStoreUrl
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1',
              )}
            >
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center justify-center gap-2 text-white font-semibold py-3.5 rounded-xl bg-gradient-to-r transition-all hover:-translate-y-0.5 shadow-lg',
                    theme.button,
                  )}
                >
                  ▶ Play Store
                </a>
              )}
              {project.appStoreUrl && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-white font-semibold py-3.5 rounded-xl bg-[#0a0e3d] hover:bg-[#161b54] transition-all hover:-translate-y-0.5 shadow-lg"
                >
                   App Store
                </a>
              )}
            </div>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80',
                theme.accent,
              )}
            >
              Visit website
              <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
