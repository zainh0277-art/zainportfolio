'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PhoneShowcaseProps {
  accentColor: string;
  size?: 'card' | 'modal';
  className?: string;
  /**
   * Up to 3 real device screenshots to render inside the phone screens.
   * Index 0 → centre phone, 1 → left phone, 2 → right phone.
   */
  screenshots?: string[];
}

function Phone({
  accentColor,
  width,
  height,
  className,
  screenshotUrl,
}: {
  accentColor: string;
  width: number;
  height: number;
  className?: string;
  screenshotUrl?: string;
}) {
  return (
    <div
      className={cn('rounded-[1.5rem] bg-gray-900 p-1 shadow-2xl', className)}
      style={{ width, height }}
    >
      <div className="relative w-full h-full rounded-[1.25rem] bg-white overflow-hidden">
        {/* notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-gray-900 rounded-full z-20" />

        {/* Generic stylised content — always underneath */}
        <div className="absolute inset-0">
          <div
            className="h-[34%]"
            style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)` }}
          />
          <div className="px-2 -mt-5 space-y-1.5">
            <div className="h-9 rounded-lg bg-white shadow-md" />
            <div className="h-1.5 rounded-full bg-gray-200 w-3/4" />
            <div className="h-1.5 rounded-full bg-gray-200 w-1/2" />
            <div className="h-1.5 rounded-full bg-gray-200 w-2/3" />
            <div className="grid grid-cols-3 gap-1 pt-1">
              <div className="h-6 rounded-md bg-gray-100" />
              <div className="h-6 rounded-md bg-gray-100" />
              <div className="h-6 rounded-md bg-gray-100" />
            </div>
          </div>
        </div>

        {/* Screenshot fades in on top — key change triggers CSS animation, no Framer Motion */}
        {screenshotUrl && (
          <div
            key={screenshotUrl}
            className="absolute inset-0 z-10"
            style={{ animation: 'fadeInScreen 0.6s ease' }}
          >
            <Image
              src={screenshotUrl}
              alt="App screenshot"
              fill
              sizes="128px"
              className="object-cover object-top"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function PhoneShowcase({ accentColor, size = 'card', className, screenshots }: PhoneShowcaseProps) {
  const center = size === 'card' ? { w: 96, h: 196 } : { w: 116, h: 238 };
  const side = { w: Math.round(center.w * 0.84), h: Math.round(center.h * 0.84) };

  return (
    <div className={cn('relative flex items-end justify-center', className)} aria-hidden="true">
      <Phone
        accentColor={accentColor}
        width={side.w}
        height={side.h}
        className="absolute bottom-0 -translate-x-[60%] rotate-[-16deg] origin-bottom opacity-90"
        screenshotUrl={screenshots?.[1]}
      />
      <Phone
        accentColor={accentColor}
        width={side.w}
        height={side.h}
        className="absolute bottom-0 translate-x-[60%] rotate-[16deg] origin-bottom opacity-90"
        screenshotUrl={screenshots?.[2]}
      />
      <Phone
        accentColor={accentColor}
        width={center.w}
        height={center.h}
        className="relative z-10"
        screenshotUrl={screenshots?.[0]}
      />
    </div>
  );
}
