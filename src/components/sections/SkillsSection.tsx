'use client';

import { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import ProgressBar from '@/components/ui/ProgressBar';
import Reveal from '@/components/ui/Reveal';
import { skillCategories, techTags } from '@/data/skills';

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Skills', dotColor: '#2563eb' },
    { id: 'mobile', label: 'Mobile Apps', dotColor: '#3b82f6' },
    { id: 'backend', label: 'Backend APIs', dotColor: '#22c55e' },
    { id: 'frontend', label: 'Cross-Platform', dotColor: '#a855f7' },
    { id: 'devops', label: 'DevOps & Tools', dotColor: '#f97316' },
  ];

  const visibleCategories =
    activeFilter === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeFilter);

  return (
    <section id="skills" className="py-24 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Full Stack Skill Set"
          title="My Skills"
          accentWord="Skills"
          description="Primarily a Flutter specialist — backed by Node.js for backend, React & Next.js when the project calls for it."
          centered
        />

        {/* Filter Pills */}
        <Reveal className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: f.dotColor }} />
              {f.label}
            </button>
          ))}
        </Reveal>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {visibleCategories.map((category, i) => (
            <Reveal key={category.id} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl bg-gray-50 rounded-xl w-12 h-12 flex items-center justify-center">
                    {category.icon}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900">{category.title}</h3>
                    <div
                      className="h-0.5 w-8 mt-1 rounded-full"
                      style={{ backgroundColor: category.accentColor }}
                    />
                  </div>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-400 font-medium">
                          {skill.percentage}%
                        </span>
                      </div>
                      <ProgressBar percentage={skill.percentage} color={category.accentColor} />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <Reveal className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-6">
            Full Technology Stack
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {techTags.map((tag) => (
              <span
                key={tag.name}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                  tag.primary
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {tag.name}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              Primary stack
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              Additional skills
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
