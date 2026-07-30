'use client';

import Image from 'next/image';
import { personalInfo } from '@/data/personal';
import { educationList } from '@/data/experience';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import CountUp from '@/components/ui/CountUp';

const performanceMetrics = [
  { label: 'Projects Completed', value: '10+' },
  { label: 'Shipped Work', value: '14+' },
  { label: 'Insights Delivered', value: '32+' },
  { label: 'Business Impact', value: '28%' },
];

const actionVerbs = ['Analyzed', 'Forecasted', 'Quantified', 'Segmented', 'Validated', 'Optimized'];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          eyebrow="Full-Stack Data Analyst"
          title="Business Data Analyst Portfolio"
          accentWord="Data Analyst"
          description="I translate data into business insight, turning raw signals into decisions that improve performance, reporting, and stakeholder alignment."
          centered
        />

        <div className="mx-auto max-w-3xl">
          <Reveal direction="up" className="w-full">
            <div className="relative rounded-3xl p-[2px] gradient-ring shadow-xl">
              <div className="bg-[#0a0e3d] rounded-3xl p-6 sm:p-8 text-white text-center">
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
                  <h3 className="text-2xl font-bold">{personalInfo.name}</h3>
                  <p className="mt-2 text-sm sm:text-base text-blue-100 max-w-2xl">
                    Full-Stack Data Analyst focused on SQL, Python, Excel, Tableau, Power BI,
                    statistical modeling, A/B testing, and KPI dashboarding.
                  </p>
                  <span className="mt-4 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full">
                    {personalInfo.tagline}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-gray-300 leading-7 max-w-2xl mx-auto">
                  {personalInfo.bio}
                </p>

                <div className="mt-8 text-left">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4 text-center">
                    Performance Snapshot
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {performanceMetrics.map((metric, index) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl bg-white/5 border border-white/10 p-4"
                      >
                        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                          {metric.label}
                        </p>
                        <p className="text-2xl font-extrabold mt-2 text-white">
                          <CountUp value={metric.value} />
                        </p>
                        <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${70 + index * 7}%`,
                              background:
                                'linear-gradient(90deg, rgba(37,99,235,1), rgba(56,189,248,1))',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
                    Analytical Actions
                  </p>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {actionVerbs.map((verb) => (
                      <span
                        key={verb}
                        className="px-4 py-2 rounded-full text-sm font-semibold bg-white/5 border border-white/10 text-gray-200"
                      >
                        {verb}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mt-8 text-left">
                  {[
                    { icon: '📍', text: personalInfo.location },
                    { icon: '✉️', text: personalInfo.email },
                    { icon: '📊', text: 'Reporting, forecasting, and KPI optimization' },
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

                <div className="mt-7">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-3 text-center">
                    Education
                  </p>
                  {educationList.map((edu) => (
                    <div
                      key={edu.degree}
                      className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 mb-2 text-left"
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
                  className="mt-7 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
                >
                  ⬇️ Download CV
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-16 justify-items-center">
          {personalInfo.stats.map((stat, i) => {
            const colors = ['#2563eb', '#0ea5e9', '#14b8a6', '#f97316', '#8b5cf6'];
            return (
              <Reveal key={stat.label} delay={i * 0.08} className="w-full max-w-xs">
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
