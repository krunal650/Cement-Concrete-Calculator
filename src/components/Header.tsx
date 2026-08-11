import React from 'react';
import { 
  Calculator, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  ExternalLink, 
  Printer
} from 'lucide-react';
import { UnitSystem } from '../types';

interface HeaderProps {
  activeTab: 'calculator' | 'guide' | 'grades' | 'proscons';
  setActiveTab: (tab: 'calculator' | 'guide' | 'grades' | 'proscons') => void;
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;
  currency: string;
  setCurrency: (c: string) => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  unitSystem,
  setUnitSystem,
  currency,
  setCurrency,
  onPrint
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      {/* Top Banner */}
      <div className="bg-slate-900 px-4 py-1.5 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-400 border border-amber-500/30">
              OFFICIAL CIVIL ENGINEERING TOOL
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline font-medium text-slate-200">CivilJungles.com</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Unit System Switcher */}
            <div className="flex items-center rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                onClick={() => setUnitSystem('metric')}
                className={`px-2.5 py-0.5 text-[11px] font-medium transition-all rounded-md ${
                  unitSystem === 'metric'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Metric (Meters / m³)
              </button>
              <button
                onClick={() => setUnitSystem('imperial')}
                className={`px-2.5 py-0.5 text-[11px] font-medium transition-all rounded-md ${
                  unitSystem === 'imperial'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Imperial (Feet / CFT)
              </button>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400 hidden md:inline">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-amber-300 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                <option value="₹">₹ INR (India)</option>
                <option value="$">$ USD (USA/Global)</option>
                <option value="€">€ EUR (Europe)</option>
                <option value="£">£ GBP (UK)</option>
                <option value="AED">AED (Dubai)</option>
                <option value="PKR">PKR (Pakistan)</option>
                <option value="BDT">BDT (Bangladesh)</option>
                <option value="NPR">NPR (Nepal)</option>
              </select>
            </div>

            <a
              href="https://civiljungles.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Visit CivilJungles.com</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 font-black ring-2 ring-amber-400/40">
              <Calculator className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  CIVIL<span className="text-amber-600">JUNGLES</span>
                </span>
              </div>
              <h1 className="text-xs font-semibold text-slate-500">
                Cement Concrete Material & Cost Estimator Calculator
              </h1>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" />
              <span>Print Estimate</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-3 flex space-x-1 overflow-x-auto border-t border-slate-100 pt-2 no-scrollbar">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === 'calculator'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Calculator className="h-4 w-4" />
            <span>Concrete Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === 'guide'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>How to Calculate (Formula)</span>
          </button>

          <button
            onClick={() => setActiveTab('grades')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === 'grades'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Concrete Mix Grades (M5-M40)</span>
          </button>

          <button
            onClick={() => setActiveTab('proscons')}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === 'proscons'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Advantages & Disadvantages</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
