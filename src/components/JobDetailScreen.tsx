import React from 'react';
import { ChevronLeft, Share2, MoreHorizontal, MapPin, Calendar, Clock, Bookmark, Send, Navigation, Briefcase, Award } from 'lucide-react';
import { Job } from '../types';

interface JobDetailScreenProps {
  job: Job;
  onBack: () => void;
  isCollected: boolean;
  onToggleCollect: (job: Job) => void;
  isApplied: boolean;
  onApplyJob: (job: Job) => void;
}

export default function JobDetailScreen({
  job,
  onBack,
  isCollected,
  onToggleCollect,
  isApplied,
  onApplyJob,
}: JobDetailScreenProps) {
  
  const handleShare = () => {
    alert(`[分享职位成功] 已经复制分享链接: https://boss-recruit/jobs/${job.id}`);
  };

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 relative h-full bg-slate-50">
      
      {/* Top Bar Navigation */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1 rounded-full text-gray-700 hover:bg-gray-100 flex items-center justify-center">
            <ChevronLeft size={18} className="stroke-[2.5]" />
          </button>
          <span className="font-display font-semibold text-gray-800 text-xs">职位详情</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleShare} className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100">
            <Share2 size={15} />
          </button>
          <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100">
            <MoreHorizontal size={15} />
          </button>
        </div>
      </div>

      {/* Main Container Core (Scrollable) */}
      <div className="flex-1 overflow-y-auto pb-20 space-y-3">
        
        {/* Job Header Info card */}
        <div className="bg-white px-4 py-5 shadow-[0_4px_12px_rgba(0,0,0,0.015)] border-b border-gray-100">
          <div className="flex justify-between items-start mb-2.5">
            <h1 className="font-display font-bold text-gray-900 text-lg leading-tight tracking-tight">
              {job.title}
            </h1>
            <span className="font-display font-extrabold text-[#1E88E5] text-[15px] pl-2 whitespace-nowrap">
              {job.salary}
            </span>
          </div>

          {/* Quick specs chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-mono rounded font-medium">{job.city} · {job.district}</span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-mono rounded font-medium">{job.experience}</span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-mono rounded font-medium">{job.education}</span>
          </div>

          {/* Recruiter Active Details */}
          <div className="flex items-center justify-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100/50">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
              <img src={job.recruiterAvatar} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 leading-tight">
                {job.recruiterName} <span className="font-medium text-[10px] text-gray-400 font-mono">· {job.recruiterTitle}</span>
              </p>
              <span className="text-[9px] text-green-500 bg-green-50 px-1 py-0.2 rounded-sm font-semibold inline-block mt-1">
                刚刚活跃
              </span>
            </div>
          </div>
        </div>

        {/* Company Card Block */}
        <div className="bg-white p-4 border-y border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.015)] flex gap-3.5 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[50px] rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center shrink-0 border border-gray-100">
              <img src={job.companyLogo} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-800 text-xs">
                {job.company}
              </h4>
              <p className="text-[10px] text-gray-400 mt-1 leading-snug">
                {job.companyDetail}
              </p>
            </div>
          </div>
          <ChevronLeft size={16} className="text-gray-300 rotate-180" />
        </div>

        {/* Job detailed descriptions */}
        <div className="bg-white p-4 border-y border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.015)] space-y-4">
          <h3 className="font-display font-bold text-gray-800 text-xs tracking-wide">
            职位详情
          </h3>

          <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
            {/* duties */}
            <div>
              <h4 className="font-bold text-gray-800 mb-1.5 flex items-center gap-1">
                <span className="w-1 h-3 rounded bg-[#1E88E5]" />
                岗位职责：
              </h4>
              <ul className="list-disc list-inside space-y-1.5 pl-1.5 text-gray-600">
                {job.jobDuties.map((duty, idx) => (
                  <li key={idx}>{duty}</li>
                ))}
              </ul>
            </div>

            {/* requirements */}
            <div>
              <h4 className="font-bold text-gray-800 mb-1.5 flex items-center gap-1">
                <span className="w-1 h-3 rounded bg-[#1E88E5]" />
                任职要求：
              </h4>
              <ul className="list-disc list-inside space-y-1.5 pl-1.5 text-gray-600">
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-50 flex gap-2">
            <div className="flex-1 p-2 bg-gray-50 rounded-lg text-center border border-gray-100">
              <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <MapPin size={10} />
                工作城市
              </span>
              <p className="text-xs font-bold text-gray-700 mt-1">{job.city}市</p>
            </div>
            <div className="flex-1 p-2 bg-gray-50 rounded-lg text-center border border-gray-100">
              <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <Clock size={10} />
                工作时间
              </span>
              <p className="text-xs font-bold text-gray-700 mt-1">{job.workHours}</p>
            </div>
          </div>
        </div>

        {/* Maps Visual Segment Area */}
        <div className="bg-white p-4 border-y border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.015)] space-y-2">
          <h3 className="font-display font-bold text-gray-800 text-xs">
            工作地址
          </h3>
          <div className="h-[100px] w-full rounded-xl overflow-hidden relative border border-gray-100">
            {/* Visual map styled using map placeholders */}
            <div className="absolute inset-0 bg-sky-50 flex flex-col items-center justify-center font-mono opacity-80 select-none pointer-events-none">
              <Navigation size={22} className="text-[#1E88E5] animate-bounce shrink-0 mb-1" />
              <span className="text-[9px] text-[#1E88E5] font-semibold">COORDINATE PREVIEW MAP</span>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-1.5 bg-black/50 backdrop-blur-[1px] flex justify-between items-center text-white text-[9px] px-2.5 selection:bg-transparent">
              <span className="truncate pr-4">{job.locationDetails}</span>
              <span className="shrink-0 font-bold bg-white/25 px-1.5 py-0.5 rounded-md hover:bg-white/35 cursor-pointer">导航</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer sticky Apply Bar Panel */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-gray-100 px-4 flex items-center gap-3 shadow-md z-10 select-none pb-safe">
        {/* Collection toggle button */}
        <button
          onClick={() => onToggleCollect(job)}
          className={`flex flex-col items-center justify-center w-12 h-11 rounded-xl border transition-all shrink-0 ${
            isCollected
              ? 'border-blue-600 bg-blue-50 text-blue-600'
              : 'border-gray-200 bg-white text-gray-400 hover:text-gray-600'
          }`}
        >
          <Bookmark size={16} className={`${isCollected ? 'fill-blue-600' : ''}`} />
          <span className="text-[9px] mt-0.5 leading-none transition-colors">
            {isCollected ? '已收藏' : '收藏'}
          </span>
        </button>

        {/* Apply Trigger button */}
        <button
          onClick={() => onApplyJob(job)}
          disabled={isApplied}
          className={`flex-1 h-11 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
            isApplied
              ? 'bg-green-500 hover:bg-green-600 shadow-green-500/10'
              : 'bg-[#1E88E5] hover:bg-blue-600 shadow-blue-500/10 active:scale-[0.99]'
          }`}
        >
          <Send size={13} className="stroke-[2.5]" />
          <span>{isApplied ? '已成功投递该职位' : '立即投递简历'}</span>
        </button>
      </div>

    </div>
  );
}
