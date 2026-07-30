'use client';

import Image from 'next/image';
import { personalInfo } from '@/data/personal';
import { educationList, experienceList } from '@/data/experience';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import CountUp from '@/components/ui/CountUp';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="Who I Am" title="About Me" accentWord="Me" centered />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,390px)_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
          {/* Candidate Info Card */}
          <Reveal direction="up" className="w-full lg:sticky lg:top-24 self-start">
            <div className="relative rounded-3xl p-[2px] gradient-ring shadow-xl">
              <div className="bg-[#0a0e3d] rounded-3xl p-6 sm:p-8 text-white">
                <div className="flex flex-col items-center mb-7">
                  <div className="relative w-28 h-28 mb-4">
                    <div className="w-full h-full rounded-full gradient-ring p-[3px] animate-float">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <Image
                          src="/avatar.jpeg"
                          alt={personalInfo.name}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover object-top"
                          priority
                        />
                      </div>
                    </div>
                    <span className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-teal-400 border-4 border-[#0a0e3d]" />
                  </div>
                  <h3 className="text-xl font-bold text-center">{personalInfo.name}</h3>
                  <span className="mt-2 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full">
                    Data Analyst
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-7 bg-white/5 rounded-2xl p-4">
                  {[personalInfo.stats[0], personalInfo.stats[2], personalInfo.stats[4]].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-extrabold text-white leading-none">
                        <CountUp value={stat.value} />
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-400 mt-1">{stat.label.split(' ')[0]}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-7">
                  {[
                    { icon: '📍', text: personalInfo.location },
                    { icon: '✉️', text: personalInfo.email },
                    { icon: '🌍', text: personalInfo.regions },
                  ].map((row) => (
                    <div
                      key={row.text}
                      className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                    >
                      <span>{row.icon}</span>
                      <span className="text-sm text-gray-300 break-words">{row.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-7">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3">
                    Education
                  </p>
                  {educationList.map((edu) => (
                    <div
                      key={edu.degree}
                      className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 mb-2"
                    >
                      <span className="text-lg">🎓</span>
                      <div>
                        <p className="text-sm font-semibold">{edu.degree}</p>
                        <p className="text-xs text-gray-400">{edu.university}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={personalInfo.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
                >
                  ⬇️ Download CV
                </a>
              </div>
            </div>
          </Reveal>

          {/* Experience Timeline/List */}
          <Reveal direction="up" delay={0.08} className="min-w-0">
            <div className="rounded-[2rem] border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-gray-100">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 mb-2">
                  Experience Timeline
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Experience List</h3>
                <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl">
                  A compact, responsive summary of the work I build around data analysis, SQL,
                  Python, and dashboard delivery.
                </p>
              </div>

              <div className="p-5 sm:p-8 space-y-4 sm:space-y-5">
                {experienceList.map((item) => (
                  <article
                    key={item.id}
                    className="relative rounded-2xl border border-gray-200/80 bg-[#f8faff] px-4 sm:px-5 py-4 sm:py-5"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-sm"
                        style={{ backgroundColor: item.companyColor }}
                      >
                        {item.flag}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="text-base sm:text-lg font-bold text-gray-900">
                              {item.role}
                            </h4>
                            <p className="text-sm text-gray-600">{item.company}</p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                              item.current
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-500 border border-gray-200'
                            }`}
                          >
                            {item.period}
                          </span>
                        </div>

                        <ul className="mt-4 space-y-2 text-sm text-gray-600 leading-6">
                          {item.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.companyColor }} />
                              <span className="min-w-0">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats bar with colored top borders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-20">
          {personalInfo.stats.map((stat, i) => {
            const colors = ['#2563eb', '#ec4899', '#10b981', '#f97316', '#8b5cf6'];
            return (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="relative bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: colors[i] }}
                  />
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-3xl font-extrabold" style={{ color: colors[i] }}>
                    <CountUp value={stat.value} />
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
