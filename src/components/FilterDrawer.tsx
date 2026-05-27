import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCity: string;
  setActiveCity: (city: string) => void;
  activeDegree: string;
  setActiveDegree: (degree: string) => void;
  salaryMin: string;
  setSalaryMin: (val: string) => void;
  salaryMax: string;
  setSalaryMax: (val: string) => void;
  onApplyFilters: () => void;
}

const CITIES = ['不限', '北京', '上海', '深圳', '杭州'];
const DEGREES = ['不限', '本科及以上', '本科', '硕士'];

export default function FilterDrawer({
  isOpen,
  onClose,
  activeCity,
  setActiveCity,
  activeDegree,
  setActiveDegree,
  salaryMin,
  setSalaryMin,
  salaryMax,
  setSalaryMax,
  onApplyFilters,
}: FilterDrawerProps) {
  if (!isOpen) return null;

  const handleReset = () => {
    setActiveCity('不限');
    setActiveDegree('不限');
    setSalaryMin('');
    setSalaryMax('');
  };

  return (
    <div className="absolute inset-0 z-50 overflow-hidden select-none">
      {/* Dimmed static backdrop with quick blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet panel raised from bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-2xl flex flex-col max-h-[85%] overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Draw Indicator Handle */}
        <div className="w-full flex justify-center pt-2 pb-1.5 cursor-pointer" onClick={onClose}>
          <div className="w-8 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Head Bar */}
        <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-display font-bold text-gray-800 text-sm">筛选</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={16} />
          </button>
        </div>

        {/* Form elements body (Scrollable) */}
        <div className="p-4 space-y-6 overflow-y-auto max-h-[400px]">
          {/* City list row */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-bold text-gray-400 pl-0.5 tracking-wide uppercase">城市选择</h3>
            <div className="flex gap-2 overflow-x-auto pb-1.5 -mx-4 px-4 no-scrollbar">
              {CITIES.map((city) => {
                const selected = activeCity === city;
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setActiveCity(city)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all select-none border ${
                      selected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/10'
                        : 'bg-gray-50 text-gray-600 border-gray-200/60 hover:bg-gray-100'
                    }`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Salary Ranges Inputs */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-bold text-gray-400 pl-0.5 tracking-wide uppercase">薪资范围 (k / 月薪)</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex items-center h-10 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-sm">
                <input
                  type="number"
                  placeholder="最低"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="w-full text-xs outline-none text-gray-800 bg-transparent"
                />
              </div>
              <div className="w-3 h-[1px] bg-gray-300 shrink-0" />
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex items-center h-10 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-sm">
                <input
                  type="number"
                  placeholder="最高"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  className="w-full text-xs outline-none text-gray-800 bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Education list row */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-bold text-gray-400 pl-0.5 tracking-wide uppercase">学历要求</h3>
            <div className="grid grid-cols-2 gap-2">
              {DEGREES.map((deg) => {
                const selected = activeDegree === deg;
                return (
                  <button
                    key={deg}
                    type="button"
                    onClick={() => setActiveDegree(deg)}
                    className={`py-2 rounded-xl text-xs font-semibold select-none text-center border transition-all ${
                      selected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/10'
                        : 'bg-gray-50 text-gray-600 border-gray-200/60 hover:bg-gray-100'
                    }`}
                  >
                    {deg}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Button Segment (Foot aligned) */}
        <div className="p-4 border-t border-gray-100 flex gap-3 bg-white selection:bg-transparent">
          <button
            onClick={handleReset}
            className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-500 font-semibold text-xs active:scale-95 transition-transform shrink-0"
          >
            重置
          </button>
          <button
            onClick={() => {
              onApplyFilters();
              onClose();
            }}
            className="flex-[2] h-11 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/15 active:scale-95 transition-transform"
          >
            确定筛选
          </button>
        </div>

      </div>
    </div>
  );
}
