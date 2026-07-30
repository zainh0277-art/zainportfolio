'use client';

import Image from 'next/image';
import { personalInfo } from '@/data/personal';
import { educationList } from '@/data/experience';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import CountUp from '@/components/ui/CountUp';

const keyMetrics = [
  { label: 'Dashboards Delivered', value: '18+' },
  { label: 'Business KPIs Tracked', value: '42' },
  { label: 'Data Sources Modeled', value: '12' },
  { label: 'Analysis Accuracy', value: '97%' },
];

const trendPoints = [12, 18, 15, 22, 29, 31, 28, 36, 41, 38, 44, 52];
const barSeries = [74, 86, 68, 92, 78, 95];
const skillMix = [
  { label: 'SQL', value: 96, color: '#2563eb' },
  { label: 'Python', value: 88, color: '#0ea5e9' },
  { label: 'Excel', value: 91, color: '#14b8a6' },
  { label: 'Power BI', value: 94, color: '#8b5cf6' },
];

const chartWidth = 100;
const chartHeight = 56;

const trendPath = trendPoints
  .map((point, index) => {
    const x = (index / (trendPoints.length - 1)) * chartWidth;
    const y = chartHeight - (point / 60) * chartHeight;
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  })
  .join(' ');

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Business Data Analyst"
          title="Portfolio Dashboard"
          accentWord="Dashboard"
          description="Focused on SQL, Python, Excel, Tableau, Power BI, A/B testing, statistical modeling, and KPI storytelling."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-[minmax(300px,390px)_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
          {/* Candidate Info Card */}
          <Reveal direction="up" className="w-full md:sticky md:top-24 self-start">
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

                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-7">
                  {keyMetrics.map((metric, index) => (
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

                <div className="space-y-3 mb-7">
                  {[
                    { icon: '📍', text: personalInfo.location },
                    { icon: '✉️', text: personalInfo.email },
                    { icon: '📊', text: 'Business reporting, forecasting, and KPI monitoring' },
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

          {/* Dashboard Area */}
          <Reveal direction="up" delay={0.08} className="min-w-0">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { label: 'SQL Queries Optimized', value: '128', accent: '#2563eb' },
                  { label: 'Dashboards Published', value: '18', accent: '#0ea5e9' },
                  { label: 'A/B Tests Reviewed', value: '9', accent: '#14b8a6' },
                  { label: 'Stakeholder Sessions', value: '24', accent: '#8b5cf6' },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="rounded-3xl border border-gray-200 bg-white shadow-sm p-5"
                  >
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
                      {card.label}
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-gray-900">{card.value}</p>
                    <div className="mt-4 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ backgroundColor: card.accent, width: '78%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="rounded-[2rem] border border-gray-200 bg-white shadow-sm p-5 sm:p-7">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600">
                        Trend Analysis
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                        Monthly KPI Growth
                      </h3>
                    </div>
                    <span className="rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold">
                      +32% YoY
                    </span>
                  </div>

                  <div className="w-full overflow-hidden rounded-2xl bg-[#f8faff] border border-gray-100 p-3">
                    <svg viewBox="0 0 100 56" className="h-auto w-full" preserveAspectRatio="none" role="img" aria-label="Monthly KPI trend chart">
                      <defs>
                        <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                      <path d={`${trendPath} L 100 56 L 0 56 Z`} fill="url(#trendFill)" />
                      <path d={trendPath} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      {trendPoints.map((point, index) => {
                        const x = (index / (trendPoints.length - 1)) * chartWidth;
                        const y = chartHeight - (point / 60) * chartHeight;
                        return (
                          <circle key={`${point}-${index}`} cx={x} cy={y} r="1.8" fill="#0a0e3d" stroke="#ffffff" strokeWidth="1" />
                        );
                      })}
                    </svg>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-gray-500">
                    <span className="rounded-xl bg-gray-50 px-3 py-2">Lead volume</span>
                    <span className="rounded-xl bg-gray-50 px-3 py-2">Conversion rate</span>
                    <span className="rounded-xl bg-gray-50 px-3 py-2">Retention lift</span>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-gray-200 bg-white shadow-sm p-5 sm:p-7">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600">
                        Forecast Loop
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                        Performance Bar Graph
                      </h3>
                    </div>
                    <span className="rounded-full bg-teal-50 text-teal-700 px-3 py-1 text-xs font-semibold">
                      Stable
                    </span>
                  </div>

                  <div className="space-y-4">
                    {barSeries.map((value, index) => (
                      <div key={`${value}-${index}`} className="flex items-center gap-3">
                        <div className="w-14 text-xs font-semibold text-gray-500">
                          Q{index + 1}
                        </div>
                        <div className="flex-1 h-4 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${value}%`,
                              background:
                                'linear-gradient(90deg, rgba(14,165,233,1), rgba(37,99,235,1))',
                            }}
                          />
                        </div>
                        <div className="w-10 text-right text-xs font-semibold text-gray-700">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl bg-[#f8faff] border border-gray-100 p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-4">Skill coverage</p>
                    <div className="grid grid-cols-2 gap-4">
                      {skillMix.map((skill) => (
                        <div key={skill.label} className="rounded-2xl bg-white border border-gray-100 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-gray-700">{skill.label}</span>
                            <span className="text-sm font-bold" style={{ color: skill.color }}>
                              {skill.value}%
                            </span>
                          </div>
                          <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${skill.value}%`, backgroundColor: skill.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-20">
          {personalInfo.stats.map((stat, i) => {
            const colors = ['#2563eb', '#0ea5e9', '#14b8a6', '#f97316', '#8b5cf6'];
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
