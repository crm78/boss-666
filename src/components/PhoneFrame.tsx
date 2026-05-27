import React from 'react';
import { Wifi, Signal, Battery, Smartphone } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  // Live simulated digital clock in Beijing time or relative metadata time
  const getSimulatedTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center py-6 px-4 selection:bg-blue-100 relative overflow-hidden">
      {/* Dynamic atmospheric ambient gradients in background */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Decorative Brand Header above frame on Wide screen */}
      <div className="hidden lg:flex items-center gap-3 mb-4 select-none">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <span className="font-display font-extrabold text-xl tracking-tight">职</span>
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-slate-800 tracking-tight leading-none">职聘 Boss Recruit</h1>
          <p className="text-xs text-slate-400 mt-1">Stitch UI / 移动端高保真交互模拟</p>
        </div>
      </div>

      {/* Actual phone device layer */}
      <div className="w-full max-w-[390px] h-[844px] bg-white rounded-[44px] shadow-[0_24px_50px_rgba(0,0,0,0.1)] border-8 border-slate-900/95 overflow-hidden relative flex flex-col select-none">
        
        {/* Notch container */}
        <div className="absolute top-0 inset-x-0 h-7 flex items-center justify-between px-6 z-50 text-slate-900 text-xs font-semibold pointer-events-none">
          {/* Time display */}
          <div className="flex-1 text-left select-none text-[12px]">{getSimulatedTime()}</div>
          
          {/* Physical camera notch visual */}
          <div className="w-32 h-4.5 bg-slate-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800/80 mr-12" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700/60" />
          </div>
          
          {/* Network symbols */}
          <div className="flex-1 flex items-center justify-end gap-1.5 select-none text-slate-800 scale-90 origin-right">
            <Signal size={12} className="stroke-[2.5]" />
            <span className="text-[10px] scale-90 -mr-0.5">5G</span>
            <Wifi size={12} className="stroke-[2.5]" />
            <Battery size={14} className="stroke-[2] rotate-0 -ml-0.5 fill-slate-800" />
          </div>
        </div>

        {/* Dynamic page content container */}
        <div className="flex-1 flex flex-col pt-7 pb-5 bg-[#F5F7FA] overflow-hidden relative">
          {children}
        </div>

        {/* Operating system home indicator bar */}
        <div className="absolute bottom-1 left-12 right-12 h-1 bg-slate-900/40 rounded-full z-50 pointer-events-none" />
      </div>

      {/* Floating hints/tips */}
      <div className="mt-4 text-center max-w-[375px] px-4">
        <p className="text-[11px] text-slate-400 font-mono">
          [提示] 点击下方的导航栏或投递按钮可触发交互，简历与投递状态实时流转
        </p>
      </div>
    </div>
  );
}
