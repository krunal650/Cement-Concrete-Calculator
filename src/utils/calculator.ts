import { 
  ConcreteGrade, 
  DimensionInputs, 
  MaterialRates, 
  MixRatio, 
  StructureType, 
  UnitSystem, 
  CalculationResult 
} from '../types';

export const CONCRETE_GRADES: Record<ConcreteGrade, MixRatio> = {
  M5: {
    cement: 1,
    sand: 5,
    aggregate: 10,
    description: '1 : 5 : 10 (Lean Concrete)',
    recommendedUse: 'Sub-base leveling, non-structural bed'
  },
  'M7.5': {
    cement: 1,
    sand: 4,
    aggregate: 8,
    description: '1 : 4 : 8 (PCC Bedding)',
    recommendedUse: 'Foundation bedding, PCC under footings'
  },
  M10: {
    cement: 1,
    sand: 3,
    aggregate: 6,
    description: '1 : 3 : 6 (Plain Concrete)',
    recommendedUse: 'Pathway, patio slabs, boundary walls'
  },
  M15: {
    cement: 1,
    sand: 2,
    aggregate: 4,
    description: '1 : 2 : 4 (Standard PCC)',
    recommendedUse: 'Driveways, flooring, light footings'
  },
  M20: {
    cement: 1,
    sand: 1.5,
    aggregate: 3,
    description: '1 : 1.5 : 3 (Standard RCC - Most Common)',
    recommendedUse: 'RCC Slabs, Beams, Columns, Staircase & Footings'
  },
  M25: {
    cement: 1,
    sand: 1,
    aggregate: 2,
    description: '1 : 1 : 2 (High Strength RCC)',
    recommendedUse: 'Heavy loaded RCC Columns, Water Tanks, Beams'
  },
  M30: {
    cement: 1,
    sand: 0.75,
    aggregate: 1.5,
    description: '1 : 0.75 : 1.5 (Structural Design Mix)',
    recommendedUse: 'Commercial Slabs, Bridges, High-rise Columns'
  },
  M35: {
    cement: 1,
    sand: 0.5,
    aggregate: 1.25,
    description: '1 : 0.5 : 1.25 (Heavy Commercial)',
    recommendedUse: 'Pre-stressed Concrete Girders, Heavy Industrial'
  },
  M40: {
    cement: 1,
    sand: 0.4,
    aggregate: 1.0,
    description: '1 : 0.4 : 1.0 (High Performance)',
    recommendedUse: 'Flyovers, Piers, Marine Structures'
  },
  custom: {
    cement: 1,
    sand: 1.5,
    aggregate: 3,
    description: 'Custom Ratio Input',
    recommendedUse: 'Special site specifications'
  }
};

// Unit Conversion Helpers
export const M3_TO_CFT = 35.3147;
export const M3_TO_YARD3 = 1.30795;
export const CEMENT_DENSITY_KG_M3 = 1440; // kg/m3
export const CEMENT_BAG_WEIGHT_KG = 50;   // 50kg bag
export const SAND_DENSITY_KG_M3 = 1550;   // kg/m3
export const AGGREGATE_DENSITY_KG_M3 = 1520; // kg/m3
export const DRY_VOLUME_FACTOR = 1.54;   // Dry shrinkage factor

/**
 * Calculates Wet Volume in Cubic Meters based on structure type and inputs
 */
export function calculateWetVolumeM3(
  structure: StructureType,
  inputs: DimensionInputs,
  unitSystem: UnitSystem
): number {
  const isMetric = unitSystem === 'metric';

  switch (structure) {
    case 'slab': {
      // Length, Width, Thickness
      // If imperial: Length (ft), Width (ft), Thickness (inches or ft)
      const l = isMetric ? inputs.length : inputs.length * 0.3048;
      const w = isMetric ? inputs.width : inputs.width * 0.3048;
      const t = isMetric ? inputs.thickness : inputs.thickness * 0.0254; // thickness in inches
      const q = Math.max(1, inputs.quantity || 1);
      return Math.max(0, l * w * t * q);
    }

    case 'column_rect': {
      const l = isMetric ? inputs.length : inputs.length * 0.3048;
      const w = isMetric ? inputs.width : inputs.width * 0.3048;
      const h = isMetric ? inputs.height : inputs.height * 0.3048;
      const q = Math.max(1, inputs.quantity || 1);
      return Math.max(0, l * w * h * q);
    }

    case 'column_round': {
      // Diameter and Height
      const d = isMetric ? inputs.diameter : inputs.diameter * 0.0254; // Diameter in inches if imperial
      const h = isMetric ? inputs.height : inputs.height * 0.3048;     // Height in ft if imperial
      const r = d / 2;
      const q = Math.max(1, inputs.quantity || 1);
      return Math.max(0, Math.PI * r * r * h * q);
    }

    case 'beam': {
      const l = isMetric ? inputs.length : inputs.length * 0.3048;
      const w = isMetric ? inputs.width : inputs.width * 0.0254; // width in inches if imperial
      const d = isMetric ? inputs.thickness : inputs.thickness * 0.0254; // depth in inches
      const q = Math.max(1, inputs.quantity || 1);
      return Math.max(0, l * w * d * q);
    }

    case 'footing_rect': {
      const l = isMetric ? inputs.length : inputs.length * 0.3048;
      const w = isMetric ? inputs.width : inputs.width * 0.3048;
      const d = isMetric ? inputs.thickness : inputs.thickness * 0.3048;
      const q = Math.max(1, inputs.quantity || 1);
      return Math.max(0, l * w * d * q);
    }

    case 'footing_trap': {
      // Trapezoidal footing: Bottom Box (L1 x W1 x H1) + Sloped pyramid (H2 / 3 * (A1 + A2 + sqrt(A1 * A2)))
      const bL = isMetric ? inputs.bottomLength : inputs.bottomLength * 0.3048;
      const bW = isMetric ? inputs.bottomWidth : inputs.bottomWidth * 0.3048;
      const bH = isMetric ? inputs.bottomHeight : inputs.bottomHeight * 0.3048;

      const tL = isMetric ? inputs.topLength : inputs.topLength * 0.3048;
      const tW = isMetric ? inputs.topWidth : inputs.topWidth * 0.3048;
      const tH = isMetric ? inputs.trapezoidalHeight : inputs.trapezoidalHeight * 0.3048;

      const v1 = bL * bW * bH; // Bottom box
      const a1 = bL * bW;
      const a2 = tL * tW;
      const v2 = (tH / 3) * (a1 + a2 + Math.sqrt(a1 * a2)); // Sloped part

      const q = Math.max(1, inputs.quantity || 1);
      return Math.max(0, (v1 + v2) * q);
    }

    case 'staircase': {
      // Steps + Waist slab
      const stepCount = Math.max(1, inputs.stepCount || 1);
      const riserM = isMetric ? inputs.riser / 1000 : inputs.riser * 0.0254; // mm or in to m
      const treadM = isMetric ? inputs.tread / 1000 : inputs.tread * 0.0254;
      const stairW = isMetric ? inputs.stairWidth : inputs.stairWidth * 0.3048;
      const waistT = isMetric ? inputs.waistThickness / 1000 : inputs.waistThickness * 0.0254;

      // Triangular volume per step = 0.5 * Riser * Tread * Width * StepCount
      const stepVol = 0.5 * riserM * treadM * stairW * stepCount;

      // Waist slab length = sqrt((Riser * count)^2 + (Tread * count)^2)
      const totalRise = riserM * stepCount;
      const totalRun = treadM * stepCount;
      const waistLength = Math.sqrt(totalRise * totalRise + totalRun * totalRun);
      const waistVol = waistLength * stairW * waistT;

      return Math.max(0, stepVol + waistVol);
    }

    case 'retaining_wall': {
      const l = isMetric ? inputs.length : inputs.length * 0.3048;
      const h = isMetric ? inputs.height : inputs.height * 0.3048;
      const t = isMetric ? inputs.thickness : inputs.thickness * 0.0254; // in inches
      const q = Math.max(1, inputs.quantity || 1);
      return Math.max(0, l * h * t * q);
    }

    case 'direct_volume': {
      const vol = inputs.directVolume || 0;
      switch (inputs.directUnit) {
        case 'cft':
          return vol / M3_TO_CFT;
        case 'cy':
          return vol / M3_TO_YARD3;
        case 'liters':
          return vol / 1000;
        case 'm3':
        default:
          return vol;
      }
    }

    default:
      return 0;
  }
}

/**
 * Main Calculator function - Returns full material breakdown and costs
 */
export function calculateConcreteMaterials(
  structure: StructureType,
  inputs: DimensionInputs,
  unitSystem: UnitSystem,
  grade: ConcreteGrade,
  customMix: { cement: number; sand: number; aggregate: number },
  waterCementRatio: number = 0.45,
  wastagePercent: number = 5,
  rates: MaterialRates,
  includeSteel: boolean = true,
  steelPercent: number = 1.0 // 1% by volume
): CalculationResult {
  const wetVolumeM3 = calculateWetVolumeM3(structure, inputs, unitSystem);
  const wetVolumeCFT = wetVolumeM3 * M3_TO_CFT;
  const wetVolumeYard3 = wetVolumeM3 * M3_TO_YARD3;

  // Dry Volume conversion with 1.54 multiplier
  const dryVolumeM3 = wetVolumeM3 * DRY_VOLUME_FACTOR;
  const dryVolumeCFT = dryVolumeM3 * M3_TO_CFT;

  // Apply Wastage Factor
  const wastageFactor = 1 + Math.max(0, wastagePercent) / 100;
  const finalDryVolumeM3 = dryVolumeM3 * wastageFactor;

  // Mix Ratio parts
  const ratioDetails = grade === 'custom' ? customMix : CONCRETE_GRADES[grade];
  const cementR = Math.max(0.1, ratioDetails.cement);
  const sandR = Math.max(0, ratioDetails.sand);
  const aggregateR = Math.max(0, ratioDetails.aggregate);
  const sumRatio = cementR + sandR + aggregateR;

  // 1. CEMENT CALCULATION
  const cementVolumeM3 = (finalDryVolumeM3 * cementR) / sumRatio;
  const cementWeightKg = cementVolumeM3 * CEMENT_DENSITY_KG_M3;
  const cementBags = cementWeightKg / CEMENT_BAG_WEIGHT_KG;
  const cementCost = Math.ceil(cementBags) * rates.cementBagPrice;

  // 2. SAND (FINE AGGREGATE) CALCULATION
  const sandVolumeM3 = (finalDryVolumeM3 * sandR) / sumRatio;
  const sandVolumeCFT = sandVolumeM3 * M3_TO_CFT;
  const sandWeightTon = (sandVolumeM3 * SAND_DENSITY_KG_M3) / 1000;
  const sandCost = sandVolumeCFT * rates.sandPricePerCft;

  // 3. COARSE AGGREGATE CALCULATION
  const aggregateVolumeM3 = (finalDryVolumeM3 * aggregateR) / sumRatio;
  const aggregateVolumeCFT = aggregateVolumeM3 * M3_TO_CFT;
  const aggregateWeightTon = (aggregateVolumeM3 * AGGREGATE_DENSITY_KG_M3) / 1000;
  
  // Aggregate breakdown into 20mm (60%) and 10mm (40%) standard proportions
  const aggregate10mmCFT = aggregateVolumeCFT * 0.40;
  const aggregate20mmCFT = aggregateVolumeCFT * 0.60;
  const aggregateCost = aggregateVolumeCFT * rates.aggregatePricePerCft;

  // 4. WATER CALCULATION
  // Water in Liters = Cement Weight (kg) * Water-Cement Ratio
  const waterLiters = cementWeightKg * waterCementRatio;
  const waterCost = waterLiters * rates.waterPricePerLiter;

  // 5. STEEL REINFORCEMENT CALCULATION (If selected)
  // Density of steel = 7850 kg/m3. Steel weight = Wet Volume * (Steel % / 100) * 7850
  const steelWeightKg = includeSteel ? wetVolumeM3 * (steelPercent / 100) * 7850 : 0;
  const steelCost = steelWeightKg * rates.steelPricePerKg;

  // 6. LABOR & SHUTTERING COST
  const laborCost = wetVolumeCFT * rates.laborRatePerCft;

  // 7. TOTAL COSTS
  const totalMaterialCost = cementCost + sandCost + aggregateCost + waterCost + steelCost;
  const grandTotalCost = totalMaterialCost + laborCost;

  const costPerM3 = wetVolumeM3 > 0 ? grandTotalCost / wetVolumeM3 : 0;
  const costPerCFT = wetVolumeCFT > 0 ? grandTotalCost / wetVolumeCFT : 0;

  return {
    wetVolumeM3,
    wetVolumeCFT,
    wetVolumeYard3,
    dryVolumeM3,
    dryVolumeCFT,
    dryVolumeFactor: DRY_VOLUME_FACTOR,
    wastagePercent,
    finalDryVolumeM3,

    cementVolumeM3,
    cementWeightKg,
    cementBags,
    cementCost,

    sandVolumeM3,
    sandVolumeCFT,
    sandWeightTon,
    sandCost,

    aggregateVolumeM3,
    aggregateVolumeCFT,
    aggregateWeightTon,
    aggregate10mmCFT,
    aggregate20mmCFT,
    aggregateCost,

    waterLiters,
    waterCost,

    steelWeightKg,
    steelCost,

    laborCost,

    totalMaterialCost,
    grandTotalCost,
    costPerM3,
    costPerCFT,

    grade,
    cementRatio: cementR,
    sandRatio: sandR,
    aggregateRatio: aggregateR,
    waterCementRatio
  };
}

/**
 * Format currency nicely
 */
export function formatCurrency(amount: number, symbol: string = '₹'): string {
  if (isNaN(amount) || amount === null) return `${symbol}0`;
  return `${symbol}${amount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  })}`;
}

/**
 * Format standard numbers
 */
export function formatNumber(num: number, decimals: number = 2): string {
  if (isNaN(num) || num === null) return '0';
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}
