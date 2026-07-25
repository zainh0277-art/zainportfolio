'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import TypewriterText from '@/components/ui/TypewriterText';
import CountUp from '@/components/ui/CountUp';
import { personalInfo } from '@/data/personal';
import { scrollToSection } from '@/lib/utils';

// Positions are relative to the phone-sized wrapper div, so they always
// peek just outside the phone's own edges regardless of viewport width.
const skillCards = [
  { label: 'Data Analyst',       sublabel: 'Speciality', icon: '📊', position: 'top-[8%]    -right-[160px]' },
  { label: 'SQL Developer',      sublabel: 'Also',       icon: '🗄️', position: 'top-[42%]   -right-[160px]' },
  { label: 'Power BI Developer', sublabel: 'Also',       icon: '📈', position: 'bottom-[30%] -left-[160px]' },
  { label: 'Python Analyst',     sublabel: '',           icon: '🐍', position: 'bottom-[12%] -left-[160px]' },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden hero-gradient flex items-center min-h-screen min-h-[100dvh]"
    >
      {/* Animated decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-blob" style={{ animationDelay: '3s' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-28 pb-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        {/* Left: text content */}
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Upwork Top Rated badge */}
          <motion.div variants={item} className="mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-2.5 bg-[#14A800]/15 border border-[#14A800]/40 backdrop-blur-sm rounded-full pl-2 pr-4 py-1.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#14A800] shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="text-[#6FDA44] text-xs font-bold tracking-wide">Top Rated</span>
              <span className="text-gray-400 text-xs font-medium">Seller on Upwork</span>
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="text-[11px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-gray-300 mb-5 sm:mb-6 flex items-center gap-3"
          >
            <span className="inline-block w-8 sm:w-10 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shrink-0" />
            {personalInfo.tagline}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white mb-5 leading-[1.08] tracking-tight"
          >
            Hi, I&apos;m
            <br />
            {personalInfo.name}
          </motion.h1>

          <motion.div
            variants={item}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400 mb-5 sm:mb-6 h-8 sm:h-10"
          >
            <TypewriterText texts={personalInfo.titles} />
          </motion.div>

          <motion.p
            variants={item}
            className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg"
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-14">
            <button
              onClick={() => scrollToSection('projects')}
              className="group bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 sm:px-7 py-3.5 rounded-full transition-all shadow-xl shadow-blue-900/30 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              View My Work
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold px-6 sm:px-7 py-3.5 rounded-full transition-all backdrop-blur-sm cursor-pointer"
            >
              Hire Me
            </button>
          </motion.div>

          {/* Stats card centered under the hero text */}
          <motion.div
            variants={item}
            className="mx-auto max-w-fit rounded-3xl border border-white/15 bg-white/10 px-5 py-5 sm:px-6 sm:py-6 backdrop-blur-md shadow-2xl shadow-black/10"
          >
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 text-center justify-items-center">
              {personalInfo.stats.map((stat) => (
                <div key={stat.label} className="min-w-[4.5rem]">
                  <p className="text-2xl sm:text-3xl font-extrabold text-white">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: phone mockup with floating cards (desktop only) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="hidden lg:flex justify-center items-center"
        >
          {/*
           * Single relative wrapper sized to the phone.
           * Cards use absolute positioning relative to THIS div,
           * so they always peek the same amount outside the phone edges.
           */}
          <div className="relative w-[17rem] xl:w-[19rem]">
            {/* Phone frame */}
            <div className="relative w-full h-[560px] xl:h-[620px] rounded-[3.5rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden animate-float">
              <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
              {/* Dynamic-island notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black/50 rounded-full" />
              <div className="absolute top-[1.45rem] left-[calc(50%+28px)] w-2 h-2 rounded-full bg-black/60" />
              <div className="absolute top-6 left-6 text-white/70 text-xs font-medium tracking-wide">9:41</div>
              <div className="mt-[4.5rem] px-5 space-y-3">
                {/* hero app banner */}
                <div className="h-28 rounded-2xl bg-gradient-to-br from-blue-400/40 to-indigo-500/30 border border-white/10 flex items-center justify-center">
                  <span className="text-3xl">📱</span>
                </div>
                {/* content lines */}
                {[55, 73, 45].map((w, i) => (
                  <div key={i} className="h-3 rounded-full bg-white/15" style={{ width: `${w}%` }} />
                ))}
                {/* colorful app icon grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <div className="h-[4.5rem] rounded-2xl bg-gradient-to-br from-violet-400/70 to-purple-500/50" />
                  <div className="h-[4.5rem] rounded-2xl bg-gradient-to-br from-emerald-400/70 to-teal-500/50" />
                  <div className="h-[4.5rem] rounded-2xl bg-gradient-to-br from-sky-400/70 to-blue-500/50" />
                </div>
                {/* more content lines */}
                {[60, 80].map((w, i) => (
                  <div key={i} className="h-3 rounded-full bg-white/10" style={{ width: `${w}%` }} />
                ))}
                {/* bottom row */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="h-10 rounded-xl bg-white/10" />
                  <div className="h-10 rounded-xl bg-white/10" />
                </div>
              </div>
            </div>

            {/* Floating skill cards — absolute relative to the phone wrapper */}
            {skillCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, x: i < 2 ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                className={`absolute ${card.position} bg-white rounded-2xl shadow-xl shadow-black/10 px-3.5 py-2.5 flex items-center gap-2.5 w-[168px] animate-float z-10`}
                style={{ animationDelay: `${i * 0.9}s` }}
              >
                <span className="text-xl shrink-0 leading-none">{card.icon}</span>
                <div className="min-w-0">
                  {card.sublabel && (
                    <p className="text-[10px] text-gray-400 font-medium leading-none mb-0.5">{card.sublabel}</p>
                  )}
                  <p className="text-[13px] font-bold text-gray-900 leading-tight">{card.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 90L1440 90L1440 35C1180 80 760 0 0 55L0 90Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
