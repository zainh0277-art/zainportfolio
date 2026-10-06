'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeView, setActiveView] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shot = project.screenshots[activeView];

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="case-study-title"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose();
      }}
      className="fixed inset-0 m-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-6xl max-h-[92dvh] overflow-y-auto overscroll-contain rounded-2xl sm:rounded-3xl bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-navy/80"
    >
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 sm:px-8 py-4">
        <p className="text-xs sm:text-sm font-semibold text-blue-700">Portfolio Lab / {project.category}</p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close case study" className="shrink-0 w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 text-xl cursor-pointer">×</button>
      </header>
      <div className="p-4 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-3">Demo · Sample Data</p>
        <h2 id="case-study-title" className="text-2xl sm:text-4xl font-bold text-navy mb-3">{project.title}</h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mb-6">{project.description}</p>

        <div role="group" aria-label="Dashboard views" className="flex flex-wrap gap-2 mb-4">
          {project.screenshots.map((view, index) => (
            <button key={view.src} type="button" aria-pressed={activeView === index} onClick={() => setActiveView(index)} className={`rounded-full px-4 py-2.5 text-sm font-semibold cursor-pointer transition-colors ${activeView === index ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}>
              {index + 1}. {view.title}
            </button>
          ))}
        </div>
        <figure className="mb-8 overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-slate-50">
          <a href={shot.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${shot.title} dashboard image at full size`}>
            <Image src={shot.src} alt={shot.alt} width={1440} height={900} sizes="(max-width: 768px) 100vw, 1100px" className="w-full h-auto" />
          </a>
          <figcaption aria-live="polite" className="p-4 sm:p-5 border-t border-gray-200 bg-white">
            <p className="font-bold text-navy mb-1">{shot.title}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{shot.caption}</p>
            <p className="text-xs text-blue-700 mt-2">Select the image to inspect it at full size.</p>
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <section className="rounded-2xl bg-blue-50 p-5 sm:p-6">
            <h3 className="text-xl font-bold text-navy mb-3">Problem statement</h3>
            <p className="text-gray-700 leading-relaxed">{project.problem}</p>
          </section>
          <section className="rounded-2xl border border-gray-200 p-5 sm:p-6">
            <h3 className="text-xl font-bold text-navy mb-3">Solution approach</h3>
            <ol className="list-decimal pl-5 space-y-3 text-gray-700 leading-relaxed">
              {project.solutionApproach.map(step => <li key={step}>{step}</li>)}
            </ol>
          </section>
        </div>
        <section className="mb-8">
          <h3 className="text-xl font-bold text-navy mb-4">Findings from the sample</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.findings.map((finding, index) => <li key={finding} className="rounded-xl border border-gray-200 p-5 text-sm text-gray-700 leading-relaxed"><span className="block font-bold text-blue-700 mb-2">0{index + 1}</span>{finding}</li>)}
          </ul>
        </section>
        <section className="mb-8 rounded-2xl bg-navy p-5 sm:p-6 text-white">
          <h3 className="text-xl font-bold mb-3">Suggested next step</h3>
          <p className="text-blue-100 leading-relaxed">{project.recommendation}</p>
        </section>
        <section className="mb-8 text-sm text-gray-600 leading-relaxed">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Data & scope</h3>
          <p className="mb-2">{project.implementation}</p>
          <p>{project.limitation}</p>
          <a href={project.datasetUrl} download className="inline-block mt-4 py-2 text-blue-700 font-semibold underline">Download sample data (JSON)</a>
        </section>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600">Need a dashboard for your own business?</p>
          <a href="#contact" onClick={onClose} className="inline-flex bg-blue-600 text-white font-semibold rounded-full px-5 py-3 hover:bg-blue-700">Discuss your requirements →</a>
        </div>
      </div>
    </dialog>
  );
}
