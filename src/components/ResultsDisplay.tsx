import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Download, 
  Printer, 
  Share2, 
  Info, 
  Sparkles, 
  Boxes, 
  Droplet, 
  CircleDollarSign, 
  ArrowRight,
  ChevronDown,
  Layers
} from 'lucide-react';
import { CalculationResult, MaterialRates } from '../types';
import { formatCurrency, formatNumber } from '../utils/calculator';

interface ResultsDisplayProps {
  result: CalculationResult;
  rates: MaterialRates;
  onPrint: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  result,
  rates,
  onPrint
}) => {
  const [copied, setCopied] = useState(false);

  // Generate text report summary
  const generateTextSummary = () => {
    return `================================================
CIVILJUNGLES.COM - CEMENT CONCRETE CALCULATION REPORT
================================================
Concrete Grade: ${result.grade} (Ratio ${result.cementRatio}:${result.sandRatio}:${result.aggregateRatio})
Total Wet Concrete Volume: ${formatNumber(result.wetVolumeM3, 3)} m³ (${formatNumber(result.wetVolumeCFT, 2)} CFT)
Total Dry Concrete Volume (1.54 factor): ${formatNumber(result.dryVolumeM3, 3)} m³ (${formatNumber(result.dryVolumeCFT, 2)} CFT)
Wastage Factor Applied: +${result.wastagePercent}%
------------------------------------------------
MATERIAL BREAKDOWN REQUIREMENTS:
------------------------------------------------
1. CEMENT:
   - Bags (50kg): ${Math.ceil(result.cementBags)} Bags
   - Total Weight: ${formatNumber(result.cementWeightKg, 1)} KG (${formatNumber(result.cementWeightKg / 1000, 2)} Tonnes)
   - Estimated Cost: ${formatCurrency(result.cementCost, rates.currencySymbol)}

2. SAND (FINE AGGREGATE):
   - Volume: ${formatNumber(result.sandVolumeCFT, 2)} CFT (${formatNumber(result.sandVolumeM3, 3)} m³)
   - Weight: ${formatNumber(result.sandWeightTon, 2)} Metric Tonnes
   - Estimated Cost: ${formatCurrency(result.sandCost, rates.currencySymbol)}

3. COARSE AGGREGATE (10mm & 20mm):
   - Total Volume: ${formatNumber(result.aggregateVolumeCFT, 2)} CFT (${formatNumber(result.aggregateVolumeM3, 3)} m³)
   - 10mm Aggregate: ${formatNumber(result.aggregate10mmCFT, 2)} CFT
   - 20mm Aggregate: ${formatNumber(result.aggregate20mmCFT, 2)} CFT
   - Total Weight: ${formatNumber(result.aggregateWeightTon, 2)} Metric Tonnes
   - Estimated Cost: ${formatCurrency(result.aggregateCost, rates.currencySymbol)}

4. WATER:
   - Required Water: ${formatNumber(result.waterLiters, 1)} Liters (W/C ratio: ${result.waterCementRatio})
   - Estimated Cost: ${formatCurrency(result.waterCost, rates.currencySymbol)}

5. STEEL REINFORCEMENT (If RCC):
   - Weight: ${formatNumber(result.steelWeightKg, 1)} KG
   - Estimated Cost: ${formatCurrency(result.steelCost, rates.currencySymbol)}

6. LABOR & SHUTTERING:
   - Estimated Cost: ${formatCurrency(result.laborCost, rates.currencySymbol)}
------------------------------------------------
GRAND TOTAL ESTIMATED COST: ${formatCurrency(result.grandTotalCost, rates.currencySymbol)}
Cost Per m³: ${formatCurrency(result.costPerM3, rates.currencySymbol)} / m³
Cost Per CFT: ${formatCurrency(result.costPerCFT, rates.currencySymbol)} / CFT
================================================
Calculated via CivilJungles Concrete Calculator (https://civiljungles.com)
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateTextSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCsv = () => {
    const text = generateTextSummary();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CivilJungles_Concrete_Estimate_${result.grade}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Percentage shares for visual bar
  const totalCost = Math.max(1, result.grandTotalCost);
  const cementPct = (result.cementCost / totalCost) * 100;
  const sandPct = (result.sandCost / totalCost) * 100;
  const aggPct = (result.aggregateCost / totalCost) * 100;
  const steelPct = (result.steelCost / totalCost) * 100;
  const laborPct = (result.laborCost / totalCost) * 100;

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Top Banner with Primary Metrics */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              Material Requirement & Cost Breakdown
            </h2>
            <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-500/20">
              Grade {result.grade}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Calculated for <span className="font-bold text-slate-800">{formatNumber(result.wetVolumeM3, 3)} m³</span> ({formatNumber(result.wetVolumeCFT, 1)} CFT) wet concrete volume
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs"
          >
            {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-500" />}
            <span>{copied ? 'Copied Report!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs"
          >
            <Download className="h-4 w-4 text-slate-500" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Cement Card */}
        <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50/80 to-amber-100/40 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-amber-800">
            <span className="text-xs font-bold uppercase tracking-wider">Cement Required</span>
            <Boxes className="h-5 w-5 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">{Math.ceil(result.cementBags)}</span>
            <span className="text-xs font-bold text-slate-600">Bags (50kg)</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-600 border-t border-amber-200/60 pt-2">
            <span>{formatNumber(result.cementWeightKg, 0)} KG</span>
            <span className="font-bold text-amber-900">{formatCurrency(result.cementCost, rates.currencySymbol)}</span>
          </div>
        </div>

        {/* Sand Card */}
        <div className="rounded-xl border border-amber-200/80 bg-gradient-to-br from-orange-50/80 to-amber-50/40 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-amber-900">
            <span className="text-xs font-bold uppercase tracking-wider">Sand (Fine Agg)</span>
            <Layers className="h-5 w-5 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">{formatNumber(result.sandVolumeCFT, 1)}</span>
            <span className="text-xs font-bold text-slate-600">CFT</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-600 border-t border-amber-200/60 pt-2">
            <span>{formatNumber(result.sandWeightTon, 2)} Ton</span>
            <span className="font-bold text-amber-900">{formatCurrency(result.sandCost, rates.currencySymbol)}</span>
          </div>
        </div>

        {/* Aggregate Card */}
        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100/90 to-slate-50 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider">Coarse Aggregate</span>
            <Boxes className="h-5 w-5 text-slate-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">{formatNumber(result.aggregateVolumeCFT, 1)}</span>
            <span className="text-xs font-bold text-slate-600">CFT</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-200 pt-2">
            <span>{formatNumber(result.aggregateWeightTon, 2)} Ton</span>
            <span className="font-bold text-slate-900">{formatCurrency(result.aggregateCost, rates.currencySymbol)}</span>
          </div>
        </div>

        {/* Grand Total Cost Card */}
        <div className="rounded-xl border border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100/60 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-900">
            <span className="text-xs font-bold uppercase tracking-wider">Estimated Total Cost</span>
            <CircleDollarSign className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-950">
            {formatCurrency(result.grandTotalCost, rates.currencySymbol)}
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-emerald-800 border-t border-emerald-200 pt-2 font-medium">
            <span>{formatCurrency(result.costPerCFT, rates.currencySymbol)} / CFT</span>
            <span>{formatCurrency(result.costPerM3, rates.currencySymbol)} / m³</span>
          </div>
        </div>
      </div>

      {/* Visual Cost Distribution Progress Bar */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
          <span>Cost Distribution Breakdown:</span>
          <span>Grand Total: {formatCurrency(result.grandTotalCost, rates.currencySymbol)}</span>
        </div>

        <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div style={{ width: `${cementPct}%` }} className="bg-amber-500" title={`Cement: ${cementPct.toFixed(1)}%`}></div>
          <div style={{ width: `${sandPct}%` }} className="bg-amber-400" title={`Sand: ${sandPct.toFixed(1)}%`}></div>
          <div style={{ width: `${aggPct}%` }} className="bg-slate-600" title={`Aggregate: ${aggPct.toFixed(1)}%`}></div>
          <div style={{ width: `${steelPct}%` }} className="bg-blue-600" title={`Steel: ${steelPct.toFixed(1)}%`}></div>
          <div style={{ width: `${laborPct}%` }} className="bg-emerald-600" title={`Labor: ${laborPct.toFixed(1)}%`}></div>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-600">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span> Cement ({cementPct.toFixed(0)}%)
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span> Sand ({sandPct.toFixed(0)}%)
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-600"></span> Aggregate ({aggPct.toFixed(0)}%)
          </span>
          {result.steelWeightKg > 0 && (
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span> Steel ({steelPct.toFixed(0)}%)
            </span>
          )}
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600"></span> Labor ({laborPct.toFixed(0)}%)
          </span>
        </div>
      </div>

      {/* Detailed Material Breakdown Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-slate-100 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-4 py-3 font-extrabold">Material Item</th>
              <th className="px-4 py-3 font-extrabold">Quantity Required</th>
              <th className="px-4 py-3 font-extrabold">Weight / Volume</th>
              <th className="px-4 py-3 font-extrabold">Unit Rate</th>
              <th className="px-4 py-3 font-extrabold text-right">Subtotal Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white font-medium text-slate-700">
            {/* Cement Row */}
            <tr className="hover:bg-amber-50/50 transition-colors">
              <td className="px-4 py-3">
                <div className="font-bold text-slate-900">Cement (OPC / PPC)</div>
                <div className="text-[10px] text-slate-500">50kg Standard Bags (Density 1440 kg/m³)</div>
              </td>
              <td className="px-4 py-3 font-bold text-amber-900">
                {Math.ceil(result.cementBags)} Bags
              </td>
              <td className="px-4 py-3">
                {formatNumber(result.cementWeightKg, 0)} KG ({formatNumber(result.cementWeightKg / 1000, 2)} Ton)
              </td>
              <td className="px-4 py-3 text-slate-600">
                {formatCurrency(rates.cementBagPrice, rates.currencySymbol)} / Bag
              </td>
              <td className="px-4 py-3 font-bold text-slate-900 text-right">
                {formatCurrency(result.cementCost, rates.currencySymbol)}
              </td>
            </tr>

            {/* Sand Row */}
            <tr className="hover:bg-amber-50/50 transition-colors">
              <td className="px-4 py-3">
                <div className="font-bold text-slate-900">Fine Aggregate (Sand / M-Sand)</div>
                <div className="text-[10px] text-slate-500">River Sand or Manufactured Sand (Zone II)</div>
              </td>
              <td className="px-4 py-3 font-bold text-slate-800">
                {formatNumber(result.sandVolumeCFT, 1)} CFT
              </td>
              <td className="px-4 py-3">
                {formatNumber(result.sandVolumeM3, 2)} m³ ({formatNumber(result.sandWeightTon, 2)} Ton)
              </td>
              <td className="px-4 py-3 text-slate-600">
                {formatCurrency(rates.sandPricePerCft, rates.currencySymbol)} / CFT
              </td>
              <td className="px-4 py-3 font-bold text-slate-900 text-right">
                {formatCurrency(result.sandCost, rates.currencySymbol)}
              </td>
            </tr>

            {/* Coarse Aggregate Row */}
            <tr className="hover:bg-amber-50/50 transition-colors">
              <td className="px-4 py-3">
                <div className="font-bold text-slate-900">Coarse Aggregate (Grit / Jelly)</div>
                <div className="text-[10px] text-slate-500">
                  10mm: {formatNumber(result.aggregate10mmCFT, 1)} CFT | 20mm: {formatNumber(result.aggregate20mmCFT, 1)} CFT
                </div>
              </td>
              <td className="px-4 py-3 font-bold text-slate-800">
                {formatNumber(result.aggregateVolumeCFT, 1)} CFT
              </td>
              <td className="px-4 py-3">
                {formatNumber(result.aggregateVolumeM3, 2)} m³ ({formatNumber(result.aggregateWeightTon, 2)} Ton)
              </td>
              <td className="px-4 py-3 text-slate-600">
                {formatCurrency(rates.aggregatePricePerCft, rates.currencySymbol)} / CFT
              </td>
              <td className="px-4 py-3 font-bold text-slate-900 text-right">
                {formatCurrency(result.aggregateCost, rates.currencySymbol)}
              </td>
            </tr>

            {/* Water Row */}
            <tr className="hover:bg-amber-50/50 transition-colors">
              <td className="px-4 py-3">
                <div className="font-bold text-slate-900">Mixing Water</div>
                <div className="text-[10px] text-slate-500">Water-Cement Ratio: {result.waterCementRatio}</div>
              </td>
              <td className="px-4 py-3 font-bold text-slate-800">
                {formatNumber(result.waterLiters, 0)} Liters
              </td>
              <td className="px-4 py-3">
                {formatNumber(result.waterLiters / 1000, 2)} m³ (Water)
              </td>
              <td className="px-4 py-3 text-slate-600">
                {formatCurrency(rates.waterPricePerLiter, rates.currencySymbol)} / Liter
              </td>
              <td className="px-4 py-3 font-bold text-slate-900 text-right">
                {formatCurrency(result.waterCost, rates.currencySymbol)}
              </td>
            </tr>

            {/* Steel Row if RCC */}
            {result.steelWeightKg > 0 && (
              <tr className="hover:bg-amber-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-900">Steel Rebar (Fe500 / Fe550)</div>
                  <div className="text-[10px] text-slate-500">Estimated Reinforcement (1% of Concrete Vol)</div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-800">
                  {formatNumber(result.steelWeightKg, 1)} KG
                </td>
                <td className="px-4 py-3">
                  {formatNumber(result.steelWeightKg / 1000, 3)} Metric Ton
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {formatCurrency(rates.steelPricePerKg, rates.currencySymbol)} / KG
                </td>
                <td className="px-4 py-3 font-bold text-slate-900 text-right">
                  {formatCurrency(result.steelCost, rates.currencySymbol)}
                </td>
              </tr>
            )}

            {/* Labor & Shuttering Row */}
            <tr className="hover:bg-amber-50/50 transition-colors">
              <td className="px-4 py-3">
                <div className="font-bold text-slate-900">Labor & Shuttering / Centering</div>
                <div className="text-[10px] text-slate-500">Mixing, placing, compaction & curing charges</div>
              </td>
              <td className="px-4 py-3 font-bold text-slate-800">
                {formatNumber(result.wetVolumeCFT, 1)} CFT Volume
              </td>
              <td className="px-4 py-3 text-slate-500">-</td>
              <td className="px-4 py-3 text-slate-600">
                {formatCurrency(rates.laborRatePerCft, rates.currencySymbol)} / CFT
              </td>
              <td className="px-4 py-3 font-bold text-slate-900 text-right">
                {formatCurrency(result.laborCost, rates.currencySymbol)}
              </td>
            </tr>
          </tbody>

          <tfoot className="bg-slate-900 text-slate-100 font-black text-sm">
            <tr>
              <td colSpan={4} className="px-4 py-3 uppercase tracking-wider">
                Grand Total Estimated Concrete Cost:
              </td>
              <td className="px-4 py-3 text-right text-amber-400 font-black text-base">
                {formatCurrency(result.grandTotalCost, rates.currencySymbol)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Dry Volume Factor Explanation Note */}
      <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-xs text-amber-950 flex items-start gap-3">
        <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold uppercase">Civil Engineering Fact: 1.54 Dry Factor Explanation</span>
          <p className="mt-1 leading-relaxed text-amber-900/90">
            Wet concrete volume = <span className="font-bold">{formatNumber(result.wetVolumeM3, 3)} m³</span>. When dry cement, sand, and aggregate are mixed without water, air voids exist between particles. When water is added, the volume shrinks by ~35% (or 54% dry-to-wet expansion factor). Therefore:
            <span className="block font-mono font-bold mt-1 text-slate-900 bg-white/80 p-1.5 rounded border border-amber-200">
              Dry Volume Required = Wet Volume ({formatNumber(result.wetVolumeM3, 3)} m³) × 1.54 factor = {formatNumber(result.dryVolumeM3, 3)} m³
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
