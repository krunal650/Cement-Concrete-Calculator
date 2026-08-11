import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const AdUnit: React.FC<AdUnitProps> = ({
  slot = '9287959002',
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Advertisement - CivilJungles'
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && adRef.current) {
        if (!isLoaded.current) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isLoaded.current = true;
        }
      }
    } catch (e) {
      console.log('AdSense init notice:', e);
    }
  }, []);

  return (
    <div className={`my-6 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100/60 p-3 text-center transition-all ${className}`}>
      <div className="mb-2 flex items-center justify-between px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
        <span className="flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500"></span>
          {label}
        </span>
        <span className="text-slate-600 font-mono">Google AdSense ID: ca-pub-9616095780084968</span>
      </div>
      
      <div className="flex min-h-[90px] w-full items-center justify-center overflow-hidden rounded-lg bg-white shadow-xs">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client="ca-pub-9616095780084968"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        ></ins>
      </div>
    </div>
  );
};
