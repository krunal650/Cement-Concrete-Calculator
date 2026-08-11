export type StructureType = 
  | 'slab'
  | 'column_rect'
  | 'column_round'
  | 'beam'
  | 'footing_rect'
  | 'footing_trap'
  | 'staircase'
  | 'retaining_wall'
  | 'direct_volume';

export type UnitSystem = 'metric' | 'imperial';

export type ConcreteGrade = 'M5' | 'M7.5' | 'M10' | 'M15' | 'M20' | 'M25' | 'M30' | 'M35' | 'M40' | 'custom';

export interface MixRatio {
  cement: number;
  sand: number;
  aggregate: number;
  description: string;
  recommendedUse: string;
}

export interface DimensionInputs {
  // Slab / Rect Column / Beam / Rect Footing / Wall
  length: number; // m or ft
  width: number;  // m or ft
  thickness: number; // m, cm, mm, ft, in
  quantity: number;

  // Round Column
  diameter: number; // m, cm, mm, ft, in
  height: number;   // m or ft

  // Trapezoidal Footing
  bottomLength: number;
  bottomWidth: number;
  bottomHeight: number;
  topLength: number;
  topWidth: number;
  trapezoidalHeight: number;

  // Staircase
  stepCount: number;
  riser: number;     // in or mm
  tread: number;     // in or mm
  stairWidth: number; // ft or m
  waistThickness: number; // in or mm

  // Direct volume
  directVolume: number;
  directUnit: 'm3' | 'cft' | 'cy' | 'liters';
}

export interface MaterialRates {
  currency: string;
  currencySymbol: string;
  cementBagPrice: number;    // Price per 50kg bag
  sandPricePerCft: number;    // Price per CFT
  aggregatePricePerCft: number; // Price per CFT
  waterPricePerLiter: number; // Price per Liter
  steelPricePerKg: number;    // Price per KG steel (optional)
  laborRatePerCft: number;    // Shuttering & labor cost
}

export interface CalculationResult {
  wetVolumeM3: number;
  wetVolumeCFT: number;
  wetVolumeYard3: number;
  
  dryVolumeM3: number;
  dryVolumeCFT: number;
  dryVolumeFactor: number; // 1.54
  
  wastagePercent: number;
  finalDryVolumeM3: number;
  
  // Cement
  cementVolumeM3: number;
  cementWeightKg: number;
  cementBags: number; // 50kg bags
  cementCost: number;

  // Sand (Fine Aggregate)
  sandVolumeM3: number;
  sandVolumeCFT: number;
  sandWeightTon: number;
  sandCost: number;

  // Aggregate (Coarse Aggregate)
  aggregateVolumeM3: number;
  aggregateVolumeCFT: number;
  aggregateWeightTon: number;
  aggregate10mmCFT: number; // 40% of aggregate
  aggregate20mmCFT: number; // 60% of aggregate
  aggregateCost: number;

  // Water
  waterLiters: number;
  waterCost: number;

  // Steel Reinforcement Estimate
  steelWeightKg: number;
  steelCost: number;

  // Labor
  laborCost: number;

  // Costs Summary
  totalMaterialCost: number;
  grandTotalCost: number;
  costPerM3: number;
  costPerCFT: number;

  // Ratio details used
  grade: ConcreteGrade;
  cementRatio: number;
  sandRatio: number;
  aggregateRatio: number;
  waterCementRatio: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'calculation' | 'grade' | 'site_tips' | 'cost';
}
