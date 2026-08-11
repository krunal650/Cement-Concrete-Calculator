import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { DetailedCalculationGuide } from './components/DetailedCalculationGuide';
import { CivilEngineeringArticles } from './components/CivilEngineeringArticles';
import { AdUnit } from './components/AdUnit';
import { Footer } from './components/Footer';

import { 
  StructureType, 
  UnitSystem, 
  ConcreteGrade, 
  DimensionInputs, 
  MaterialRates 
} from './types';
import { calculateConcreteMaterials } from './utils/calculator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'guide' | 'grades' | 'proscons'>('calculator');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [currency, setCurrency] = useState<string>('₹');

  // Selected Structure Type
  const [structure, setStructure] = useState<StructureType>('slab');

  // Default Dimension Inputs
  const [inputs, setInputs] = useState<DimensionInputs>({
    length: 10,       // 10 meters
    width: 6,         // 6 meters
    thickness: 0.125, // 0.125m (12.5cm / 5 inches)
    quantity: 1,

    diameter: 0.45,   // 45cm diameter for round column
    height: 3.2,      // 3.2m height

    bottomLength: 1.8,
    bottomWidth: 1.8,
    bottomHeight: 0.3,
    topLength: 0.45,
    topWidth: 0.45,
    trapezoidalHeight: 0.45,

    stepCount: 12,
    riser: 150,       // mm
    tread: 250,       // mm
    stairWidth: 1.2,  // m
    waistThickness: 125, // mm

    directVolume: 10,
    directUnit: 'm3'
  });

  // Selected Concrete Grade
  const [grade, setGrade] = useState<ConcreteGrade>('M20');
  const [customMix, setCustomMix] = useState({ cement: 1, sand: 1.5, aggregate: 3 });

  // Site constants
  const [waterCementRatio, setWaterCementRatio] = useState<number>(0.45);
  const [wastagePercent, setWastagePercent] = useState<number>(5);
  const [includeSteel, setIncludeSteel] = useState<boolean>(true);
  const [steelPercent, setSteelPercent] = useState<number>(1.0);

  // Material Market Rates
  const [rates, setRates] = useState<MaterialRates>({
    currency: 'INR',
    currencySymbol: '₹',
    cementBagPrice: 380,    // ₹380 per bag
    sandPricePerCft: 55,     // ₹55 per CFT
    aggregatePricePerCft: 45,// ₹45 per CFT
    waterPricePerLiter: 0.20,// ₹0.20 per Liter
    steelPricePerKg: 68,     // ₹68 per KG
    laborRatePerCft: 25      // ₹25 per CFT
  });

  // Update rate symbol when currency changes
  const handleCurrencyChange = (newCurr: string) => {
    setCurrency(newCurr);
    setRates(prev => ({
      ...prev,
      currencySymbol: newCurr,
      // Adjust default rate placeholders slightly if USD/EUR
      ...(newCurr === '$' ? {
        cementBagPrice: 10,
        sandPricePerCft: 1.5,
        aggregatePricePerCft: 1.2,
        waterPricePerLiter: 0.01,
        steelPricePerKg: 1.1,
        laborRatePerCft: 0.8
      } : {})
    }));
  };

  // Calculate results dynamically
  const calculationResult = useMemo(() => {
    return calculateConcreteMaterials(
      structure,
      inputs,
      unitSystem,
      grade,
      customMix,
      waterCementRatio,
      wastagePercent,
      rates,
      includeSteel,
      steelPercent
    );
  }, [
    structure,
    inputs,
    unitSystem,
    grade,
    customMix,
    waterCementRatio,
    wastagePercent,
    rates,
    includeSteel,
    steelPercent
  ]);

  const handleResetDefaults = () => {
    setInputs({
      length: unitSystem === 'metric' ? 10 : 30,
      width: unitSystem === 'metric' ? 6 : 20,
      thickness: unitSystem === 'metric' ? 0.125 : 5,
      quantity: 1,
      diameter: unitSystem === 'metric' ? 0.45 : 18,
      height: unitSystem === 'metric' ? 3.2 : 10.5,
      bottomLength: 1.8,
      bottomWidth: 1.8,
      bottomHeight: 0.3,
      topLength: 0.45,
      topWidth: 0.45,
      trapezoidalHeight: 0.45,
      stepCount: 12,
      riser: unitSystem === 'metric' ? 150 : 6,
      tread: unitSystem === 'metric' ? 250 : 10,
      stairWidth: unitSystem === 'metric' ? 1.2 : 4,
      waistThickness: unitSystem === 'metric' ? 125 : 5,
      directVolume: unitSystem === 'metric' ? 10 : 350,
      directUnit: unitSystem === 'metric' ? 'm3' : 'cft'
    });
    setGrade('M20');
    setWaterCementRatio(0.45);
    setWastagePercent(5);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans">
      {/* Header Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unitSystem={unitSystem}
        setUnitSystem={setUnitSystem}
        currency={currency}
        setCurrency={handleCurrencyChange}
        onPrint={handlePrint}
      />

      {/* Main App Body */}
      <main className="mx-auto max-w-7xl flex-1 px-4 py-6 w-full space-y-6">
        {/* Top Google AdSense Banner */}
        <AdUnit slot="9287959002" label="Google AdSense Banner - Top" />

        {/* TAB 1: CALCULATOR & RESULTS VIEW */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Column: Form Inputs */}
            <div className="lg:col-span-6 space-y-6">
              <CalculatorForm
                structure={structure}
                setStructure={setStructure}
                unitSystem={unitSystem}
                setUnitSystem={setUnitSystem}
                inputs={inputs}
                setInputs={setInputs}
                grade={grade}
                setGrade={setGrade}
                customMix={customMix}
                setCustomMix={setCustomMix}
                waterCementRatio={waterCementRatio}
                setWaterCementRatio={setWaterCementRatio}
                wastagePercent={wastagePercent}
                setWastagePercent={setWastagePercent}
                rates={rates}
                setRates={setRates}
                includeSteel={includeSteel}
                setIncludeSteel={setIncludeSteel}
                steelPercent={steelPercent}
                setSteelPercent={setSteelPercent}
                onReset={handleResetDefaults}
              />
            </div>

            {/* Right Column: Instant Results & Breakdown */}
            <div className="lg:col-span-6 space-y-6">
              <ResultsDisplay
                result={calculationResult}
                rates={rates}
                onPrint={handlePrint}
              />
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED FORMULAS & CALCULATION GUIDE */}
        {activeTab === 'guide' && (
          <DetailedCalculationGuide
            result={calculationResult}
            rates={rates}
          />
        )}

        {/* TAB 3 & 4: ARTICLES, GRADES & ADVANTAGES/DISADVANTAGES */}
        {(activeTab === 'grades' || activeTab === 'proscons') && (
          <CivilEngineeringArticles />
        )}

        {/* Middle AdSense Banner */}
        <AdUnit slot="9287959002" label="Google AdSense Banner - In-Article" />

        {/* Embedded SEO Rich Content Articles below calculator for continuous search ranking */}
        {activeTab === 'calculator' && (
          <div className="pt-6 border-t border-slate-200">
            <CivilEngineeringArticles />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
