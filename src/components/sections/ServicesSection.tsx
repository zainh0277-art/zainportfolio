import SectionHeader from '@/components/ui/SectionHeader';

const services = [
  { title: 'SQL & Database Support', description: 'Organize operational data with relational tables, queries, views, and stored procedures.', deliverable: 'A documented schema, reusable queries, and validation checks.' },
  { title: 'Power BI & Excel Reporting', description: 'Make sales, costs, and operational performance easier to understand with focused reporting.', deliverable: 'A dashboard or report with agreed KPIs and clear usage notes.' },
  { title: 'Data Cleaning & Preparation', description: 'Bring structure to inconsistent spreadsheets and prepare data for dependable analysis.', deliverable: 'A cleaned dataset, documented assumptions, and a summary of data issues.' },
];
export default function ServicesSection() {
  return <section id="services" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeader eyebrow="How I Can Help" title="Practical Data Services" accentWord="Data Services" description="Start with a business question. We will agree on the scope, deliverables, and timeline before work begins." centered />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map(service => <article key={service.title} className="rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col">
          <h3 className="text-xl font-bold text-navy mb-4">{service.title}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-6"><strong className="text-gray-900">Deliverable:</strong> {service.deliverable}</p>
          <a href="#contact" className="mt-auto font-semibold text-blue-700 py-2">Discuss your requirements →</a>
        </article>)}
      </div>
      <div className="mt-12 rounded-2xl bg-blue-50 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-navy mb-3">A clear process from question to handover</h3>
        <p className="text-gray-700 leading-relaxed">Share your goal and data format → agree on a focused scope → review the work together → receive the deliverables and documentation.</p>
        <p className="mt-3 text-gray-600">Hiring for an analytics role? <a className="text-blue-700 underline" href="#about">View my background</a> or <a className="text-blue-700 underline" href="#contact">send the role details</a>.</p>
      </div>
    </div>
  </section>;
}
