'use client';

import { cn } from '@/lib/utils';
import Reveal from './Reveal';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  accentWord?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  accentWord,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  const titleParts = accentWord ? title.split(accentWord) : [title];

  return (
    <Reveal className={cn(centered && 'text-center', 'mb-14', className)}>
      {eyebrow && (
        <p className="text-sm font-bold tracking-[0.2em] uppercase text-blue-600 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
        {accentWord ? (
          <>
            {titleParts[0]}
            <span className="text-gradient-blue">{accentWord}</span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          {description}
        </p>
      )}
    </Reveal>
  );
}
