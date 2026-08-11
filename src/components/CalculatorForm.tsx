import React from 'react';
import { 
  Building2, 
  Box, 
  CircleDot, 
  Layers, 
  Boxes, 
  Scaling, 
  Milestone, 
  ShieldCheck, 
  Zap, 
  DollarSign, 
  SlidersHorizontal,
  Info,
  RotateCcw
} from 'lucide-react';
import { 
  StructureType, 
  UnitSystem, 
  ConcreteGrade, 
  DimensionInputs, 
  MaterialRates 
} from '../types';
import { CONCRETE_GRADES } from '../utils/calculator';

interface CalculatorFormProps {
  structure: StructureType;
  setStructure: (s: StructureType) => void;
  unitSystem: UnitSystem;
  setUnitSystem: (u: UnitSystem) => void;
  inputs: DimensionInputs;
  setInputs: React.Dispatch<React.SetStateAction<DimensionInputs>>;
  grade: ConcreteGrade;
  setGrade: (g: ConcreteGrade) => void;
  customMix: { cement: number; sand: number; aggregate: number };
  setCustomMix: React.Dispatch<React.SetStateAction<{ cement: number; sand: number; aggregate: number }>>;
  waterCementRatio: number;
  setWaterCementRatio: (r: number) => void;
  wastagePercent: number;
  setWastagePercent: (w: number) => void;
  rates: MaterialRates;
  setRates: React.Dispatch<React.SetStateAction<MaterialRates>>;
  includeSteel: boolean;
  setIncludeSteel: (b: boolean) => void;
  steelPercent: number;
  setSteelPercent: (s: number) => void;
  onReset: () => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  structure,
  setStructure,
  unitSystem,
  setUnitSystem,
  inputs,
  setInputs,
  grade,
  setGrade,
  customMix,
  setCustomMix,
  waterCementRatio,
  setWaterCementRatio,
  wastagePercent,
  setWastagePercent,
  rates,
  setRates,
  includeSteel,
  setIncludeSteel,
  steelPercent,
  setSteelPercent,
  onReset
}) => {
  const isMetric = unitSystem === 'metric';

  const handleInputChange = (field: keyof DimensionInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: isNaN(value) ? 0 : value
    }));
  };

  const handleRateChange = (field: keyof MaterialRates, value: number) => {
    setRates(prev => ({
      ...prev,
      [field]: isNaN(value) ? 0 : value
    }));
  };

  const structures: { id: StructureType; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'slab', label: 'Slab / Floor', icon: <Layers className="h-5 w-5" />, desc: 'Roof slab, patio, floor' },
    { id: 'column_rect', label: 'Square Column', icon: <Box className="h-5 w-5" />, desc: 'Rectangular RCC column' },
    { id: 'column_round', label: 'Round Column', icon: <CircleDot className="h-5 w-5" />, desc: 'Circular pillar / pier' },
    { id: 'beam', label: 'Beam / Lintel', icon: <Scaling className="h-5 w-5" />, desc: 'Structural beam & lintels' },
    { id: 'footing_rect', label: 'Rect Footing', icon: <Boxes className="h-5 w-5" />, desc: 'Isolated foundation pad' },
    { id: 'footing_trap', label: 'Trap Footing', icon: <Milestone className="h-5 w-5" />, desc: 'Sloped trapezoidal footing' },
    { id: 'staircase', label: 'Staircase', icon: <Building2 className="h-5 w-5" />, desc: 'Steps & waist slab' },
    { id: 'retaining_wall', label: 'Wall / Tank', icon: <ShieldCheck className="h-5 w-5" />, desc: 'Retaining wall or water tank' },
    { id: 'direct_volume', label: 'Direct Volume', icon: <Zap className="h-5 w-5" />, desc: 'Enter total m³ / CFT' }
  ];

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Structure Selector */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-black uppercase tracking-wider text-slate-800">
            1. Select Structural Element:
          </label>
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            Civil Engineering Presets
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
          {structures.map((item) => (
            <button
              key={item.id}
              onClick={() => setStructure(item.id)}
              className={`flex items-start gap-2.5 rounded-xl border p-3 text-left transition-all ${
                structure === item.id
                  ? 'border-amber-500 bg-amber-50/70 text-slate-900 shadow-xs ring-2 ring-amber-400/40 font-bold'
                  : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              <div className={`mt-0.5 rounded-lg p-1.5 ${structure === item.id ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-600'}`}>
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold truncate">{item.label}</div>
                <div className="text-[10px] text-slate-500 truncate">{item.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions Input Section */}
      <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Scaling className="h-4 w-4 text-amber-600" />
            2. Enter Dimensions ({isMetric ? 'Metric: Meters / CM' : 'Imperial: Feet / Inches'}):
          </h3>
          <span className="text-[11px] text-slate-500">
            {isMetric ? 'Metric Units (m, cm)' : 'Imperial Units (ft, in)'}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* SLAB / RECT COLUMN / BEAM / RECT FOOTING / WALL */}
          {(structure === 'slab' || structure === 'column_rect' || structure === 'beam' || structure === 'footing_rect' || structure === 'retaining_wall') && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Length ({isMetric ? 'Meters' : 'Feet'}):
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={inputs.length || ''}
                  onChange={(e) => handleInputChange('length', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 10 m' : 'e.g. 30 ft'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  {structure === 'retaining_wall' ? `Height (${isMetric ? 'Meters' : 'Feet'})` : `Width (${isMetric ? 'Meters' : 'Feet'})`}:
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={structure === 'retaining_wall' ? (inputs.height || '') : (inputs.width || '')}
                  onChange={(e) => handleInputChange(structure === 'retaining_wall' ? 'height' : 'width', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 5 m' : 'e.g. 20 ft'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  {structure === 'column_rect' 
                    ? `Height (${isMetric ? 'Meters' : 'Feet'})` 
                    : `Thickness / Depth (${isMetric ? 'Meters' : 'Inches'})`}:
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={structure === 'column_rect' ? (inputs.height || '') : (inputs.thickness || '')}
                  onChange={(e) => handleInputChange(structure === 'column_rect' ? 'height' : 'thickness', parseFloat(e.target.value))}
                  placeholder={
                    structure === 'column_rect' 
                      ? (isMetric ? 'e.g. 3 m' : 'e.g. 10 ft')
                      : (isMetric ? 'e.g. 0.125 m (12.5 cm)' : 'e.g. 5 inches')
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Quantity (Number of Nos):
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={inputs.quantity || 1}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                />
              </div>
            </>
          )}

          {/* ROUND COLUMN */}
          {structure === 'column_round' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Column Diameter ({isMetric ? 'Meters' : 'Inches'}):
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={inputs.diameter || ''}
                  onChange={(e) => handleInputChange('diameter', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 0.45 m (45 cm)' : 'e.g. 18 inches'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Column Height ({isMetric ? 'Meters' : 'Feet'}):
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={inputs.height || ''}
                  onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 3.2 m' : 'e.g. 10.5 ft'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Number of Columns:
                </label>
                <input
                  type="number"
                  min="1"
                  value={inputs.quantity || 1}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                />
              </div>
            </>
          )}

          {/* TRAPEZOIDAL FOOTING */}
          {structure === 'footing_trap' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Bottom Box Length ({isMetric ? 'Meters' : 'Feet'}):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={inputs.bottomLength || ''}
                  onChange={(e) => handleInputChange('bottomLength', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 1.8 m' : 'e.g. 6 ft'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Bottom Box Width ({isMetric ? 'Meters' : 'Feet'}):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={inputs.bottomWidth || ''}
                  onChange={(e) => handleInputChange('bottomWidth', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 1.8 m' : 'e.g. 6 ft'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Bottom Box Height ({isMetric ? 'Meters' : 'Feet'}):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={inputs.bottomHeight || ''}
                  onChange={(e) => handleInputChange('bottomHeight', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 0.3 m' : 'e.g. 1 ft'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Top Box Length ({isMetric ? 'Meters' : 'Feet'}):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={inputs.topLength || ''}
                  onChange={(e) => handleInputChange('topLength', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 0.45 m' : 'e.g. 1.5 ft'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Top Box Width ({isMetric ? 'Meters' : 'Feet'}):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={inputs.topWidth || ''}
                  onChange={(e) => handleInputChange('topWidth', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 0.45 m' : 'e.g. 1.5 ft'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Slope Height ({isMetric ? 'Meters' : 'Feet'}):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={inputs.trapezoidalHeight || ''}
                  onChange={(e) => handleInputChange('trapezoidalHeight', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 0.45 m' : 'e.g. 1.5 ft'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs"
                />
              </div>
            </>
          )}

          {/* STAIRCASE */}
          {structure === 'staircase' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Number of Steps (Nos):
                </label>
                <input
                  type="number"
                  min="1"
                  value={inputs.stepCount || ''}
                  onChange={(e) => handleInputChange('stepCount', parseInt(e.target.value))}
                  placeholder="e.g. 12 steps"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Riser Height ({isMetric ? 'mm' : 'Inches'}):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.riser || ''}
                  onChange={(e) => handleInputChange('riser', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 150 mm' : 'e.g. 6 inches'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Tread Length ({isMetric ? 'mm' : 'Inches'}):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.tread || ''}
                  onChange={(e) => handleInputChange('tread', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 250 mm' : 'e.g. 10 inches'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Staircase Width ({isMetric ? 'Meters' : 'Feet'}):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.stairWidth || ''}
                  onChange={(e) => handleInputChange('stairWidth', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 1.2 m' : 'e.g. 4 ft'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Waist Slab Thickness ({isMetric ? 'mm' : 'Inches'}):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.waistThickness || ''}
                  onChange={(e) => handleInputChange('waistThickness', parseFloat(e.target.value))}
                  placeholder={isMetric ? 'e.g. 125 mm' : 'e.g. 5 inches'}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs"
                />
              </div>
            </>
          )}

          {/* DIRECT VOLUME */}
          {structure === 'direct_volume' && (
            <>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700">
                  Direct Wet Concrete Volume:
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={inputs.directVolume || ''}
                    onChange={(e) => handleInputChange('directVolume', parseFloat(e.target.value))}
                    placeholder="e.g. 10 m3 or 350 CFT"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-2xs"
                  />
                  <select
                    value={inputs.directUnit}
                    onChange={(e) => setInputs(prev => ({ ...prev, directUnit: e.target.value as any }))}
                    className="rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-800"
                  >
                    <option value="m3">m³ (Cubic Meter)</option>
                    <option value="cft">CFT (Cubic Feet)</option>
                    <option value="cy">Cubic Yards</option>
                    <option value="liters">Liters</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Concrete Mix Grade Selector */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Boxes className="h-4 w-4 text-amber-600" />
            3. Concrete Mix Grade (Proportion Ratio):
          </label>
          <span className="text-[11px] font-semibold text-slate-500">
            Ratio = Cement : Sand : Aggregate
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {(['M5', 'M7.5', 'M10', 'M15', 'M20', 'M25', 'M30', 'M35', 'M40', 'custom'] as ConcreteGrade[]).map((g) => {
            const details = g === 'custom' ? { description: 'Custom Mix' } : CONCRETE_GRADES[g];
            return (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`rounded-xl border p-2.5 text-center transition-all ${
                  grade === g
                    ? 'border-amber-500 bg-amber-500 text-slate-950 font-black shadow-xs ring-2 ring-amber-400/40'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-slate-50 font-semibold'
                }`}
              >
                <div className="text-sm font-extrabold">{g}</div>
                <div className="text-[10px] opacity-90 truncate">{details.description}</div>
              </button>
            );
          })}
        </div>

        {/* Custom Mix Inputs */}
        {grade === 'custom' && (
          <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50/60 p-3">
            <div className="text-xs font-bold text-amber-900 mb-2">Enter Custom Concrete Mix Ratio:</div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700">Cement Parts:</label>
                <input
                  type="number"
                  step="0.1"
                  value={customMix.cement}
                  onChange={(e) => setCustomMix(prev => ({ ...prev, cement: parseFloat(e.target.value) || 1 }))}
                  className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1 text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700">Sand Parts:</label>
                <input
                  type="number"
                  step="0.1"
                  value={customMix.sand}
                  onChange={(e) => setCustomMix(prev => ({ ...prev, sand: parseFloat(e.target.value) || 0 }))}
                  className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1 text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700">Aggregate Parts:</label>
                <input
                  type="number"
                  step="0.1"
                  value={customMix.aggregate}
                  onChange={(e) => setCustomMix(prev => ({ ...prev, aggregate: parseFloat(e.target.value) || 0 }))}
                  className="mt-1 w-full rounded border border-slate-300 bg-white px-2 py-1 text-xs font-bold"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Parameters: Water-Cement Ratio, Wastage %, Steel Toggle */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <SlidersHorizontal className="h-4 w-4 text-amber-600" />
            4. Site Constants & Wastage Factors:
          </h4>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-amber-600 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Water Cement Ratio Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Water-Cement Ratio:</span>
              <span className="text-amber-600 font-mono">{waterCementRatio.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.38"
              max="0.65"
              step="0.01"
              value={waterCementRatio}
              onChange={(e) => setWaterCementRatio(parseFloat(e.target.value))}
              className="mt-2 w-full accent-amber-500"
            />
            <span className="text-[10px] text-slate-500">Standard IS Code: 0.45 - 0.50 L/kg</span>
          </div>

          {/* Material Wastage Factor */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Site Material Wastage:</span>
              <span className="text-amber-600 font-mono">+{wastagePercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={wastagePercent}
              onChange={(e) => setWastagePercent(parseInt(e.target.value))}
              className="mt-2 w-full accent-amber-500"
            />
            <span className="text-[10px] text-slate-500">Recommended site allowance: 5%</span>
          </div>

          {/* Steel Reinforcement Toggle */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSteel}
                  onChange={(e) => setIncludeSteel(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <span>Steel Rebar Estimate</span>
              </label>
              {includeSteel && (
                <span className="text-amber-600 font-mono">{steelPercent}% vol</span>
              )}
            </div>
            {includeSteel ? (
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={steelPercent}
                onChange={(e) => setSteelPercent(parseFloat(e.target.value))}
                className="mt-2 w-full accent-amber-500"
              />
            ) : (
              <div className="mt-2 text-[11px] text-slate-600 italic">PCC (Plain concrete - no rebar)</div>
            )}
          </div>
        </div>
      </div>

      {/* Material Market Rates Input Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 mb-3">
          <DollarSign className="h-4 w-4 text-emerald-600" />
          5. Local Material Rates ({rates.currencySymbol}):
        </h4>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div>
            <label className="block text-[11px] font-bold text-slate-700">Cement / 50kg Bag:</label>
            <input
              type="number"
              value={rates.cementBagPrice}
              onChange={(e) => handleRateChange('cementBagPrice', parseFloat(e.target.value))}
              className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-xs font-bold text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700">Sand / CFT:</label>
            <input
              type="number"
              value={rates.sandPricePerCft}
              onChange={(e) => handleRateChange('sandPricePerCft', parseFloat(e.target.value))}
              className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-xs font-bold text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700">Aggregate / CFT:</label>
            <input
              type="number"
              value={rates.aggregatePricePerCft}
              onChange={(e) => handleRateChange('aggregatePricePerCft', parseFloat(e.target.value))}
              className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-xs font-bold text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700">Water / Liter:</label>
            <input
              type="number"
              step="0.01"
              value={rates.waterPricePerLiter}
              onChange={(e) => handleRateChange('waterPricePerLiter', parseFloat(e.target.value))}
              className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-xs font-bold text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700">Steel / KG:</label>
            <input
              type="number"
              value={rates.steelPricePerKg}
              onChange={(e) => handleRateChange('steelPricePerKg', parseFloat(e.target.value))}
              className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-xs font-bold text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700">Labor / CFT:</label>
            <input
              type="number"
              value={rates.laborRatePerCft}
              onChange={(e) => handleRateChange('laborRatePerCft', parseFloat(e.target.value))}
              className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-xs font-bold text-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
