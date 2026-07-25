'use client';

import Image from 'next/image';
import { personalInfo } from '@/data/personal';
import { educationList } from '@/data/experience';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import CountUp from '@/components/ui/CountUp';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="Who I Am" title="About Me" accentWord="Me" centered />

        <div className="flex justify-center">
          {/* Profile Card */}
          <Reveal direction="up" className="w-full max-w-md">
            <div className="relative rounded-3xl p-[2px] gradient-ring shadow-xl">
              <div className="bg-[#0a0e3d] rounded-3xl p-8 text-white">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-8">
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
                  <h3 className="text-xl font-bold">{personalInfo.name}</h3>
                  <span className="mt-2 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full">
                    Data Analyst
                  </span>
                </div>

                {/* Stats row — Years, Projects, Countries (like reference) */}
                <div className="grid grid-cols-3 gap-4 mb-8 bg-white/5 rounded-2xl p-4">
                  {[personalInfo.stats[0], personalInfo.stats[2], personalInfo.stats[4]].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-extrabold text-white">
                        <CountUp value={stat.value} />
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{stat.label.split(' ')[0]}</p>
                    </div>
                  ))}
                </div>

                {/* Info rows */}
                <div className="space-y-3 mb-8">
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
                      <span className="text-sm text-gray-300">{row.text}</span>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="mb-6">
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

                {/* CV button */}
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
