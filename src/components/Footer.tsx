import React from 'react';
import { 
  Calculator, 
  ExternalLink, 
  Globe, 
  ShieldCheck, 
  Heart,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-black">
                <Calculator className="h-5 w-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                CIVIL<span className="text-amber-500">JUNGLES</span>.COM
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              CivilJungles.com is a premier online portal for civil engineering notes, structural calculators, building material estimations, IS Code standards, and construction site guides.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://civiljungles.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Visit Main Portal: CivilJungles.com</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Civil Tools Column */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Civil Engineering Tools
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><span className="text-amber-400">✓</span> Cement Concrete Calculator</li>
              <li><span className="text-slate-500">•</span> Brick & Mortar Quantity Calculator</li>
              <li><span className="text-slate-500">•</span> Plastering Material Calculator</li>
              <li><span className="text-slate-500">•</span> Steel Weight Bar Bending Schedule</li>
              <li><span className="text-slate-500">•</span> Excavation Earthwork Calculator</li>
            </ul>
          </div>

          {/* AdSense & Legal Disclaimer Column */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Disclaimer & AdSense
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              This calculator provides estimates based on standard dry volume expansion (1.54 multiplier) and IS 456 nominal mix proportions. Site conditions, moisture in sand (bulking factor), and aggregate sizes may alter exact batching.
            </p>
            <div className="pt-2 text-[10px] text-slate-500">
              Monetized via Google AdSense (ca-pub-9616095780084968)
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300">CivilJungles.com</strong>. All Rights Reserved. Designed for Civil Engineers & Construction Contractors.
          </div>

          <button
            onClick={scrollToTop}
            className="mt-4 flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all sm:mt-0"
          >
            <ArrowUp className="h-3.5 w-3.5 text-amber-400" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
