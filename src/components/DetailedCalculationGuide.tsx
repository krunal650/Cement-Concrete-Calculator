import React from 'react';
import { 
  Calculator, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  Boxes, 
  Droplets, 
  ArrowRight,
  Flame,
  FileText
} from 'lucide-react';
import { CalculationResult, MaterialRates } from '../types';
import { formatNumber, formatCurrency } from '../utils/calculator';

interface DetailedCalculationGuideProps {
  result: CalculationResult;
  rates: MaterialRates;
}

export const DetailedCalculationGuide: React.FC<DetailedCalculationGuideProps> = ({
  result,
  rates
}) => {
  return (
    <div className="space-y-8">
      {/* Header Title Banner */}
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 p-6 text-white shadow-md">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="h-4 w-4" />
          <span>Civil Engineering Manual Formula Step-by-Step Guide</span>
        </div>
        <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
          Detailed Material Calculation Guide & Math Formulas
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          Learn exactly how civil engineers calculate Cement Bags, Sand CFT, Aggregate, Water, and Steel quantities manually on site using standard Indian Standard (IS 456) and International Building Codes.
        </p>
      </div>

      {/* Interactive Step-by-Step Manual Math with Current Values */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <Calculator className="h-5 w-5 text-amber-600" />
            Step-by-Step Manual Calculation for Your Inputs (Grade {result.grade})
          </h3>
          <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
            Ratio = {result.cementRatio} : {result.sandRatio} : {result.aggregateRatio}
          </span>
        </div>

        {/* STEP 1: WET VOLUME */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-amber-400 font-extrabold">1</span>
            <span>Step 1: Calculate Total Wet Concrete Volume (V_wet)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pl-8">
            The wet volume is the physical volume occupied by wet concrete inside formwork or shuttering.
          </p>
          <div className="ml-8 font-mono text-xs bg-white p-3 rounded-lg border border-slate-200 text-slate-800">
            <div className="text-slate-500">// Your Calculation Result:</div>
            <div className="font-bold text-amber-900">
              Wet Volume (V_wet) = <span className="text-slate-900">{formatNumber(result.wetVolumeM3, 3)} m³</span> = <span className="text-slate-900">{formatNumber(result.wetVolumeCFT, 2)} CFT</span>
            </div>
          </div>
        </div>

        {/* STEP 2: DRY VOLUME & 1.54 FACTOR */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-amber-400 font-extrabold">2</span>
            <span>Step 2: Convert Wet Volume to Dry Volume (V_dry) using 1.54 Factor</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pl-8">
            Dry materials (cement powder, dry sand, stone chips) contain voids. When water is added, air escapes and volume reduces by 35% (or dry factor = 1.54).
          </p>
          <div className="ml-8 font-mono text-xs bg-white p-3 rounded-lg border border-slate-200 text-slate-800 space-y-1">
            <div className="text-slate-500">// Formula: V_dry = V_wet × 1.54</div>
            <div>V_dry = {formatNumber(result.wetVolumeM3, 3)} m³ × 1.54 = <span className="font-bold text-amber-900">{formatNumber(result.dryVolumeM3, 3)} m³</span></div>
            <div className="text-slate-500 mt-1">// Including +{result.wastagePercent}% Site Wastage Allowance:</div>
            <div className="font-bold text-emerald-800">Final Dry Volume (V_final) = {formatNumber(result.finalDryVolumeM3, 3)} m³ ({formatNumber(result.finalDryVolumeM3 * 35.3147, 2)} CFT)</div>
          </div>
        </div>

        {/* STEP 3: CEMENT BAGS CALCULATION */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-950">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs text-slate-950 font-black">3</span>
            <span>Step 3: Cement Bags Calculation Formula</span>
          </div>
          <div className="ml-8 font-mono text-xs bg-white p-3 rounded-lg border border-amber-200 text-slate-800 space-y-2">
            <div><span className="text-slate-500">Sum of Ratio Parts = </span> {result.cementRatio} + {result.sandRatio} + {result.aggregateRatio} = <span className="font-bold">{result.cementRatio + result.sandRatio + result.aggregateRatio}</span></div>
            <div>
              <span className="text-slate-500">Cement Volume (m³) = </span> (V_final × Cement Ratio) / Sum Ratio
            </div>
            <div>Cement Volume = ({formatNumber(result.finalDryVolumeM3, 3)} × {result.cementRatio}) / {result.cementRatio + result.sandRatio + result.aggregateRatio} = <span className="font-bold text-amber-900">{formatNumber(result.cementVolumeM3, 3)} m³</span></div>
            <div className="text-slate-500">// Cement Density = 1440 kg/m³, 1 Bag = 50 kg</div>
            <div>Cement Weight (kg) = {formatNumber(result.cementVolumeM3, 3)} × 1440 = <span className="font-bold">{formatNumber(result.cementWeightKg, 1)} KG</span></div>
            <div className="text-amber-950 font-black text-sm bg-amber-100 p-2 rounded border border-amber-300">
              Cement Bags Required = {formatNumber(result.cementWeightKg, 1)} / 50 = {result.cementBags.toFixed(2)} ≈ {Math.ceil(result.cementBags)} Bags
            </div>
          </div>
        </div>

        {/* STEP 4: SAND CALCULATION */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-amber-400 font-extrabold">4</span>
            <span>Step 4: Fine Aggregate / Sand Calculation (CFT & Ton)</span>
          </div>
          <div className="ml-8 font-mono text-xs bg-white p-3 rounded-lg border border-slate-200 text-slate-800 space-y-2">
            <div><span className="text-slate-500">Sand Volume (m³) = </span> (V_final × Sand Ratio) / Sum Ratio</div>
            <div>Sand Volume = ({formatNumber(result.finalDryVolumeM3, 3)} × {result.sandRatio}) / {result.cementRatio + result.sandRatio + result.aggregateRatio} = <span className="font-bold">{formatNumber(result.sandVolumeM3, 3)} m³</span></div>
            <div>Sand Volume (CFT) = {formatNumber(result.sandVolumeM3, 3)} × 35.3147 = <span className="font-bold text-amber-900">{formatNumber(result.sandVolumeCFT, 2)} CFT</span></div>
            <div className="text-slate-500">// Sand Density = 1550 kg/m³ (~1.55 Tonnes/m³)</div>
            <div className="font-bold text-slate-900">Sand Weight = {formatNumber(result.sandVolumeM3, 3)} × 1.55 = {formatNumber(result.sandWeightTon, 2)} Metric Tonnes</div>
          </div>
        </div>

        {/* STEP 5: COARSE AGGREGATE CALCULATION */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-amber-400 font-extrabold">5</span>
            <span>Step 5: Coarse Aggregate Calculation (10mm & 20mm split)</span>
          </div>
          <div className="ml-8 font-mono text-xs bg-white p-3 rounded-lg border border-slate-200 text-slate-800 space-y-2">
            <div><span className="text-slate-500">Aggregate Volume (m³) = </span> (V_final × Aggregate Ratio) / Sum Ratio</div>
            <div>Aggregate Volume = ({formatNumber(result.finalDryVolumeM3, 3)} × {result.aggregateRatio}) / {result.cementRatio + result.sandRatio + result.aggregateRatio} = <span className="font-bold">{formatNumber(result.aggregateVolumeM3, 3)} m³</span></div>
            <div>Aggregate Volume (CFT) = {formatNumber(result.aggregateVolumeM3, 3)} × 35.3147 = <span className="font-bold text-amber-900">{formatNumber(result.aggregateVolumeCFT, 2)} CFT</span></div>
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200">
              <div className="bg-slate-100 p-2 rounded">
                <span className="font-bold">20mm Aggregate (60%):</span> {formatNumber(result.aggregate20mmCFT, 1)} CFT
              </div>
              <div className="bg-slate-100 p-2 rounded">
                <span className="font-bold">10mm Aggregate (40%):</span> {formatNumber(result.aggregate10mmCFT, 1)} CFT
              </div>
            </div>
          </div>
        </div>

        {/* STEP 6: WATER CALCULATION */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-amber-400 font-extrabold">6</span>
            <span>Step 6: Water Calculation Formula</span>
          </div>
          <div className="ml-8 font-mono text-xs bg-white p-3 rounded-lg border border-slate-200 text-slate-800 space-y-1">
            <div><span className="text-slate-500">Water (Liters) = </span> Cement Weight (kg) × Water-Cement Ratio</div>
            <div>Water = {formatNumber(result.cementWeightKg, 1)} KG × {result.waterCementRatio} = <span className="font-bold text-blue-700 text-sm">{formatNumber(result.waterLiters, 0)} Liters</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
