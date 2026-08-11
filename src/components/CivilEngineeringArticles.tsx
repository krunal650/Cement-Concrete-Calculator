import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Boxes, 
  ShieldCheck, 
  Building2, 
  Info, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  FileCheck2,
  Share2
} from 'lucide-react';
import { CONCRETE_GRADES } from '../utils/calculator';
import { FAQItem } from '../types';

export const CivilEngineeringArticles: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How many cement bags are required for 1 m³ of M20 grade concrete?",
      answer: "For 1 m³ of M20 grade concrete (mix ratio 1 : 1.5 : 3), approximately 8 bags of cement (50kg each, total 400 kg) are required after multiplying by the 1.54 dry volume conversion factor.",
      category: 'calculation'
    },
    {
      question: "What is the 1.54 factor in concrete volume calculation?",
      answer: "The 1.54 factor converts wet concrete volume to dry volume. Dry ingredients (cement powder, dry sand, stone gravel) contain air voids between particles. When water is added, the volume reduces by about 35%. Hence, Dry Volume = Wet Volume × 1.54.",
      category: 'calculation'
    },
    {
      question: "What is the nominal concrete mix ratio for RCC slab construction?",
      answer: "For RCC slabs, beams, and columns, M20 (1 : 1.5 : 3) or M25 (1 : 1 : 2) concrete mix ratio is standard as per IS 456:2000 civil engineering code.",
      category: 'grade'
    },
    {
      question: "How much water is needed per bag of cement in concrete?",
      answer: "With a standard water-cement ratio of 0.45 to 0.50, approximately 22.5 to 25 Liters of clean water is required per 50kg bag of cement.",
      category: 'site_tips'
    },
    {
      question: "How much sand and aggregate are needed for 100 CFT of M20 concrete?",
      answer: "For 100 CFT of wet M20 concrete (which equals 154 CFT dry volume), you will need roughly 28 Bags of Cement, 42 CFT of Sand, and 84 CFT of Coarse Aggregate.",
      category: 'cost'
    }
  ];

  return (
    <div className="space-y-10 py-4">
      {/* SECTION 1: WHAT IS CONCRETE CALCULATOR & HOW TO USE */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Guide by CivilJungles.com
          </span>
          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
            What is a Cement Concrete Calculator and How to Use It?
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            A <strong>Cement Concrete Calculator</strong> is an essential online civil engineering material estimation tool designed for contractors, structural engineers, builders, and home owners to calculate exact quantities of <strong>Cement Bags, Sand (CFT/Ton), Coarse Aggregate (10mm/20mm), Water (Liters), and Steel Reinforcement</strong> required for any concrete construction work.
          </p>
        </div>

        {/* How to Use Step Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 relative overflow-hidden">
            <span className="absolute -right-2 -top-2 text-4xl font-black text-slate-200/60 font-mono">01</span>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Step 1</div>
            <h3 className="text-sm font-bold text-slate-900 mt-1">Select Structure Type</h3>
            <p className="text-xs text-slate-600 mt-1 leading-normal">
              Choose your member: Slab, Square Column, Round Pillar, Beam, Footing, Staircase, or Retaining Wall.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 relative overflow-hidden">
            <span className="absolute -right-2 -top-2 text-4xl font-black text-slate-200/60 font-mono">02</span>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Step 2</div>
            <h3 className="text-sm font-bold text-slate-900 mt-1">Enter Dimensions</h3>
            <p className="text-xs text-slate-600 mt-1 leading-normal">
              Input Length, Width, Height, Diameter, or Thickness in Metric (Meters/CM) or Imperial (Feet/Inches).
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 relative overflow-hidden">
            <span className="absolute -right-2 -top-2 text-4xl font-black text-slate-200/60 font-mono">03</span>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Step 3</div>
            <h3 className="text-sm font-bold text-slate-900 mt-1">Select Grade Mix</h3>
            <p className="text-xs text-slate-600 mt-1 leading-normal">
              Choose nominal concrete mix grade (M5, M7.5, M10, M15, M20, M25) or input custom mix ratios.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 relative overflow-hidden">
            <span className="absolute -right-2 -top-2 text-4xl font-black text-slate-200/60 font-mono">04</span>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Step 4</div>
            <h3 className="text-sm font-bold text-slate-900 mt-1">Get Instant Cost</h3>
            <p className="text-xs text-slate-600 mt-1 leading-normal">
              View exact material breakdown, total bags, CFT volume, steel weight, and estimated project cost.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY CONCRETE CALCULATION IS IMPORTANT */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-emerald-600" />
          Why Concrete Calculation is Essential Before Construction (Civil Engineering Insight)
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 pt-2">
          <div className="rounded-xl border border-slate-200 bg-emerald-50/40 p-4 space-y-1">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Prevents Material Wastage & Over-Ordering
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ordering excess cement bags leads to setting and lump formation due to moisture. Accurate estimation saves up to 15-20% project cost.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-emerald-50/40 p-4 space-y-1">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Ensures Correct Structural Strength (IS 456)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Maintaining the precise proportion of cement, sand, and aggregate ensures the design compressive strength (e.g. 20 N/mm² for M20) is achieved after 28 days curing.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-emerald-50/40 p-4 space-y-1">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Budget Planning & Labor Scheduling
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get an accurate cash-flow estimate for raw materials, transit mixer deliveries, concrete pump hiring, and shuttering labor costs.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: CONCRETE GRADES MATRIX TABLE */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Standard Concrete Mix Grades Table & Applications (IS 456 Standards)
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            In civil engineering, 'M' stands for Mix and the number denotes Characteristic Compressive Strength in N/mm² after 28 days of curing on a 15cm cube test.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-100 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3 font-extrabold">Grade Designation</th>
                <th className="px-4 py-3 font-extrabold">Mix Ratio (Cement : Sand : Agg)</th>
                <th className="px-4 py-3 font-extrabold">Compressive Strength (28 Days)</th>
                <th className="px-4 py-3 font-extrabold">Recommended Site Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-amber-900">M5 Grade</td>
                <td className="px-4 py-2.5 font-mono">1 : 5 : 10</td>
                <td className="px-4 py-2.5">5 N/mm² (725 psi)</td>
                <td className="px-4 py-2.5 text-slate-600">Lean concrete base under foundations, sub-grade leveling</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-amber-900">M7.5 Grade</td>
                <td className="px-4 py-2.5 font-mono">1 : 4 : 8</td>
                <td className="px-4 py-2.5">7.5 N/mm² (1087 psi)</td>
                <td className="px-4 py-2.5 text-slate-600">PCC bedding, pipe encasements, trench bottoms</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-amber-900">M10 Grade</td>
                <td className="px-4 py-2.5 font-mono">1 : 3 : 6</td>
                <td className="px-4 py-2.5">10 N/mm² (1450 psi)</td>
                <td className="px-4 py-2.5 text-slate-600">Patio flooring, boundary walls, unreinforced footings</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-amber-900">M15 Grade</td>
                <td className="px-4 py-2.5 font-mono">1 : 2 : 4</td>
                <td className="px-4 py-2.5">15 N/mm² (2175 psi)</td>
                <td className="px-4 py-2.5 text-slate-600">Driveways, residential flooring, bed blocks</td>
              </tr>
              <tr className="hover:bg-amber-50/60 bg-amber-50/30">
                <td className="px-4 py-2.5 font-black text-amber-950">M20 Grade (Standard)</td>
                <td className="px-4 py-2.5 font-mono font-bold text-amber-900">1 : 1.5 : 3</td>
                <td className="px-4 py-2.5 font-bold">20 N/mm² (2900 psi)</td>
                <td className="px-4 py-2.5 font-semibold text-slate-900">RCC Roof Slabs, Columns, Beams, Staircase & Footings (Most Popular)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-amber-900">M25 Grade</td>
                <td className="px-4 py-2.5 font-mono">1 : 1 : 2</td>
                <td className="px-4 py-2.5">25 N/mm² (3625 psi)</td>
                <td className="px-4 py-2.5 text-slate-600">Heavy RCC Columns, Water Tanks, Retaining Walls</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-bold text-amber-900">M30 - M40 Grade</td>
                <td className="px-4 py-2.5 font-mono">Design Mix (e.g. 1 : 0.75 : 1.5)</td>
                <td className="px-4 py-2.5">30 - 40 N/mm²</td>
                <td className="px-4 py-2.5 text-slate-600">Commercial High-Rise, Bridges, Flyovers & Pre-stressed concrete</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: ADVANTAGES AND DISADVANTAGES OF CONCRETE */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Civil Engineering Analysis</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Advantages and Disadvantages of Cement Concrete
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Understanding the structural pros and cons of concrete helps engineers make informed material choices for buildings, roads, and dams.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* ADVANTAGES CARD */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-5 space-y-3">
            <h3 className="text-base font-black text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              Key Advantages of Concrete
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>High Compressive Strength:</strong> Concrete withstands heavy loads, making it ideal for foundations, piers, and columns.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Mouldability & Versatility:</strong> Plastic concrete can be poured into virtually any formwork shape, arch, or curvature.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Fire & Weather Resistance:</strong> Non-combustible material with high fire resistance up to 4-6 hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Low Maintenance Cost:</strong> Does not rust, decay, or rot over decades compared to timber or structural steel.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span><strong>Abundant Raw Materials:</strong> Sand, gravel, water, and limestone cement are available globally at low transportation cost.</span>
              </li>
            </ul>
          </div>

          {/* DISADVANTAGES CARD */}
          <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-5 space-y-3">
            <h3 className="text-base font-black text-rose-950 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-rose-600" />
              Key Disadvantages of Concrete
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Low Tensile Strength:</strong> Plain concrete is brittle in tension (only 10% of compressive strength). Requires steel rebar (RCC) for bending loads.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Drying Shrinkage & Cracking:</strong> Volumetric shrinkage during setting can cause micro-cracks if curing is neglected.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Requires Formwork & Curing:</strong> Demands shuttering timber/steel plates and continuous water curing for 14-28 days.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>High Self-Weight:</strong> Dense material (2400 kg/m³ for PCC, 2500 kg/m³ for RCC) increases dead load on foundations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Efflorescence & Carbonation:</strong> Poor quality aggregates or porous concrete can cause salt leaching or rebar corrosion over time.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 5: FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Frequently Asked Questions</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Civil Engineering FAQs on Concrete Material Calculations
          </h2>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="rounded-xl border border-slate-200 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full items-center justify-between bg-slate-50 px-4 py-3 text-left text-xs font-bold text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-amber-600 shrink-0" />
                  {faq.question}
                </span>
                {openFaq === index ? <ChevronUp className="h-4 w-4 text-slate-500 shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />}
              </button>

              {openFaq === index && (
                <div className="bg-white p-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
