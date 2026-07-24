/**
 * Single source of truth for per-category visual theming.
 * Consumed by ProjectCard and ProjectModal so colors stay consistent.
 * Class strings are written in full (not constructed) so Tailwind keeps them.
 */
export interface CategoryTheme {
  /** hex used for inline styles (phone header tint) */
  solid: string;
  /** category badge background */
  badge: string;
  /** card header gradient */
  header: string;
  /** modal header gradient */
  modalHeader: string;
  /** tech tag pill */
  tag: string;
  /** subtitle / "view case study" text color */
  accent: string;
  /** primary store button gradient */
  button: string;
  /** light tint background for highlight rows */
  ring: string;
}

const themes: Record<string, CategoryTheme> = {
  Marketplace: {
    solid: '#2563eb',
    badge: 'bg-blue-600',
    header: 'from-blue-100 via-blue-50 to-white',
    modalHeader: 'from-blue-200 via-blue-100 to-blue-50',
    tag: 'bg-blue-50 text-blue-700',
    accent: 'text-blue-600',
    button: 'from-blue-600 to-blue-500',
    ring: 'bg-blue-50',
  },
  'E-Commerce': {
    solid: '#db2777',
    badge: 'bg-pink-600',
    header: 'from-pink-100 via-pink-50 to-white',
    modalHeader: 'from-pink-200 via-pink-100 to-pink-50',
    tag: 'bg-pink-50 text-pink-700',
    accent: 'text-pink-600',
    button: 'from-pink-600 to-rose-500',
    ring: 'bg-pink-50',
  },
  Inspection: {
    solid: '#059669',
    badge: 'bg-emerald-600',
    header: 'from-emerald-100 via-emerald-50 to-white',
    modalHeader: 'from-emerald-200 via-emerald-100 to-emerald-50',
    tag: 'bg-emerald-50 text-emerald-700',
    accent: 'text-emerald-600',
    button: 'from-emerald-500 to-teal-500',
    ring: 'bg-emerald-50',
  },
  Health: {
    solid: '#db2777',
    badge: 'bg-pink-500',
    header: 'from-pink-100 via-rose-50 to-white',
    modalHeader: 'from-pink-200 via-pink-100 to-rose-50',
    tag: 'bg-pink-50 text-pink-700',
    accent: 'text-pink-600',
    button: 'from-pink-500 to-rose-500',
    ring: 'bg-pink-50',
  },
  Emergency: {
    solid: '#dc2626',
    badge: 'bg-red-500',
    header: 'from-red-100 via-orange-50 to-white',
    modalHeader: 'from-red-200 via-red-100 to-orange-50',
    tag: 'bg-red-50 text-red-700',
    accent: 'text-red-600',
    button: 'from-red-500 to-orange-500',
    ring: 'bg-red-50',
  },
  'Food & Delivery': {
    solid: '#ea580c',
    badge: 'bg-orange-500',
    header: 'from-orange-100 via-amber-50 to-white',
    modalHeader: 'from-orange-200 via-orange-100 to-amber-50',
    tag: 'bg-orange-50 text-orange-700',
    accent: 'text-orange-600',
    button: 'from-orange-500 to-amber-500',
    ring: 'bg-orange-50',
  },
  Social: {
    solid: '#7c3aed',
    badge: 'bg-violet-500',
    header: 'from-violet-100 via-purple-50 to-white',
    modalHeader: 'from-violet-200 via-violet-100 to-purple-50',
    tag: 'bg-violet-50 text-violet-700',
    accent: 'text-violet-600',
    button: 'from-violet-500 to-purple-500',
    ring: 'bg-violet-50',
  },
  Fitness: {
    solid: '#2563eb',
    badge: 'bg-blue-500',
    header: 'from-sky-100 via-blue-50 to-white',
    modalHeader: 'from-sky-200 via-sky-100 to-blue-50',
    tag: 'bg-sky-50 text-sky-700',
    accent: 'text-sky-600',
    button: 'from-sky-500 to-blue-500',
    ring: 'bg-sky-50',
  },
  Finance: {
    solid: '#ca8a04',
    badge: 'bg-amber-500',
    header: 'from-amber-100 via-yellow-50 to-white',
    modalHeader: 'from-amber-200 via-amber-100 to-yellow-50',
    tag: 'bg-amber-50 text-amber-700',
    accent: 'text-amber-600',
    button: 'from-amber-500 to-yellow-500',
    ring: 'bg-amber-50',
  },
  Education: {
    solid: '#4f46e5',
    badge: 'bg-indigo-500',
    header: 'from-indigo-100 via-indigo-50 to-white',
    modalHeader: 'from-indigo-200 via-indigo-100 to-indigo-50',
    tag: 'bg-indigo-50 text-indigo-700',
    accent: 'text-indigo-600',
    button: 'from-indigo-500 to-blue-500',
    ring: 'bg-indigo-50',
  },
  Security: {
    solid: '#0891b2',
    badge: 'bg-cyan-600',
    header: 'from-cyan-100 via-teal-50 to-white',
    modalHeader: 'from-cyan-200 via-cyan-100 to-teal-50',
    tag: 'bg-cyan-50 text-cyan-700',
    accent: 'text-cyan-600',
    button: 'from-cyan-600 to-teal-500',
    ring: 'bg-cyan-50',
  },
  Aviation: {
    solid: '#CC0000',
    badge: 'bg-red-600',
    header: 'from-red-100 via-rose-50 to-white',
    modalHeader: 'from-red-200 via-red-100 to-rose-50',
    tag: 'bg-red-50 text-red-700',
    accent: 'text-red-600',
    button: 'from-red-600 to-rose-500',
    ring: 'bg-red-50',
  },
  'Water Utility': {
    solid: '#6d28d9',
    badge: 'bg-violet-600',
    header: 'from-violet-200 via-violet-100 to-white',
    modalHeader: 'from-violet-200 via-violet-100 to-violet-50',
    tag: 'bg-violet-50 text-violet-700',
    accent: 'text-violet-600',
    button: 'from-violet-600 to-indigo-500',
    ring: 'bg-violet-50',
  },
  Music: {
    solid: '#7C3AED',
    badge: 'bg-violet-600',
    header: 'from-violet-200 via-purple-100 to-white',
    modalHeader: 'from-violet-300 via-violet-200 to-purple-100',
    tag: 'bg-violet-50 text-violet-700',
    accent: 'text-violet-600',
    button: 'from-violet-600 to-purple-500',
    ring: 'bg-violet-50',
  },
  Productivity: {
    solid: '#00C853',
    badge: 'bg-[#00C853]',
    header: 'from-emerald-100 via-green-50 to-white',
    modalHeader: 'from-emerald-200 via-emerald-100 to-green-50',
    tag: 'bg-emerald-50 text-emerald-700',
    accent: 'text-[#00C853]',
    button: 'from-[#00C853] to-emerald-500',
    ring: 'bg-emerald-50',
  },
  Logistics: {
    solid: '#FF7F00',
    badge: 'bg-[#FF7F00]',
    header: 'from-orange-100 via-amber-50 to-white',
    modalHeader: 'from-orange-200 via-orange-100 to-amber-50',
    tag: 'bg-orange-50 text-orange-700',
    accent: 'text-[#FF7F00]',
    button: 'from-[#FF7F00] to-orange-500',
    ring: 'bg-orange-50',
  },
  Services: {
    solid: '#16a34a',
    badge: 'bg-green-600',
    header: 'from-green-100 via-emerald-50 to-white',
    modalHeader: 'from-green-200 via-green-100 to-emerald-50',
    tag: 'bg-green-50 text-green-700',
    accent: 'text-green-600',
    button: 'from-green-600 to-emerald-500',
    ring: 'bg-green-50',
  },
  Lifestyle: {
    solid: '#0d9488',
    badge: 'bg-teal-500',
    header: 'from-teal-100 via-teal-50 to-white',
    modalHeader: 'from-teal-200 via-teal-100 to-teal-50',
    tag: 'bg-teal-50 text-teal-700',
    accent: 'text-teal-600',
    button: 'from-teal-500 to-emerald-500',
    ring: 'bg-teal-50',
  },
};

const fallback: CategoryTheme = {
  solid: '#2563eb',
  badge: 'bg-blue-600',
  header: 'from-blue-100 via-blue-50 to-white',
  modalHeader: 'from-blue-200 via-blue-100 to-blue-50',
  tag: 'bg-blue-50 text-blue-700',
  accent: 'text-blue-600',
  button: 'from-blue-600 to-blue-500',
  ring: 'bg-blue-50',
};

export function getCategoryTheme(category: string): CategoryTheme {
  return themes[category] ?? fallback;
}
