import React, { useState } from 'react';
import { Search, MapPin, Plus, SlidersHorizontal, BookOpen, Briefcase, Award } from 'lucide-react';
import { Job, UserProfile } from '../types';

interface HomeScreenProps {
  jobs: Job[];
  userProfile: UserProfile;
  onSelectJob: (job: Job) => void;
  onOpenFilter: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
  activeCityFilter: string;
}

export default function HomeScreen({
  jobs,
  userProfile,
  onSelectJob,
  onOpenFilter,
  searchText,
  setSearchText,
  activeCityFilter,
}: HomeScreenProps) {
  // Filter jobs based on both Search input text AND active filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company.toLowerCase().includes(searchText.toLowerCase());

    const matchesCity = activeCityFilter === '不限' || job.city === activeCityFilter;

    return matchesSearch && matchesCity;
  });

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden animate-in fade-in duration-300">
      
      {/* Top App Bar Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-blue-100">
            <img
              src={userProfile.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-display font-bold text-[#1E88E5] text-base tracking-tight leading-tight">职聘</h1>
            <p className="text-[10px] text-gray-400 font-medium">发现你的职业可能</p>
          </div>
        </div>
        <button
          onClick={onOpenFilter}
          className="p-1.5 rounded-full text-blue-600 bg-blue-50 border border-blue-100/50 hover:bg-blue-100 transition-colors flex items-center justify-center cursor-pointer"
        >
          <SlidersHorizontal size={15} />
        </button>
      </div>

      {/* Main Column */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 pb-20">
        
        {/* Dynamic Interactive Search Bar */}
        <div className="relative flex items-center bg-white border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] rounded-xl px-3.5 h-11 focus-within:border-blue-500 transition-all">
          <Search size={16} className="text-gray-400 mr-2.5" />
          <input
            type="text"
            placeholder="搜索职位或公司..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full text-xs outline-none text-gray-700 bg-transparent pr-8"
          />
          {searchText && (
            <button
              onClick={() => setSearchText('')}
              className="absolute right-3.5 text-xs text-gray-400 hover:text-gray-600 font-bold"
            >
              清除
            </button>
          )}
        </div>

        {/* Bento Featured Hero card banner matching stitch screen view */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 text-white relative overflow-hidden shadow-md shadow-blue-500/10">
          <div className="relative z-10 max-w-[70%]">
            <h3 className="font-display font-extrabold text-sm text-sky-100">职聘 · 职场新势力</h3>
            <p className="text-[11px] opacity-90 mt-1 leading-snug font-light">
              根据您的偏好，为您实时匹配了多项高匹配岗位
            </p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
              <span>立即探索</span>
              <span className="text-sky-200">→</span>
            </div>
          </div>
          {/* Decorative Background graphic */}
          <div className="absolute right-[-10px] bottom-[-15px] opacity-15 transform rotate-12 scale-110">
            <SlidersHorizontal size={140} className="stroke-[1]" />
          </div>
        </div>

        {/* Header summary of current lists */}
        <div className="flex items-center justify-between px-0.5">
          <h2 className="font-display font-bold text-gray-800 text-sm">
            {activeCityFilter !== '不限' ? `${activeCityFilter} · 热门推荐` : '热门招聘推荐'}
          </h2>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md font-mono">
            共 {filteredJobs.length} 个职位
          </span>
        </div>

        {/* Job Listings Loop */}
        <div className="space-y-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all hover:shadow-md hover:scale-[1.005] active:scale-[0.99] cursor-pointer"
              >
                {/* Upper line: Logo, title, salary */}
                <div className="flex gap-3 items-start justify-between">
                  <div className="flex gap-2.5 items-start">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-100/80 overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-gray-900 text-[14px] leading-tight hover:text-blue-600 transition-colors">
                        {job.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">{job.company}</p>
                    </div>
                  </div>
                  <span className="font-display font-bold text-blue-600 text-[14px] whitespace-nowrap">
                    {job.salary}
                  </span>
                </div>

                {/* Tags row */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-medium font-mono flex items-center gap-0.5">
                    <MapPin size={9} />
                    {job.city} · {job.district}
                  </span>
                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-medium font-mono flex items-center gap-0.5">
                    <Briefcase size={9} />
                    {job.experience}
                  </span>
                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-medium font-mono flex items-center gap-0.5">
                    <Award size={9} />
                    {job.education}
                  </span>
                </div>

                {/* Chips Row 2 */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {job.tags.slice(0, 2).map((tg, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-blue-50/50 text-blue-500/80 rounded border border-blue-100/10 text-[9px] font-bold">
                      {tg}
                    </span>
                  ))}
                </div>

                {/* Recruiter active stamp footer */}
                <div className="mt-3.5 pt-2.5 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-400 select-none">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200">
                      <img src={job.recruiterAvatar} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-medium text-gray-500">{job.recruiterName} · {job.recruiterTitle}</span>
                  </div>
                  <span className="text-[10px] text-green-500 bg-green-50 px-1.5 py-0.5 rounded-sm font-semibold scale-90">刚刚活跃</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center bg-white rounded-xl border border-gray-100">
              <p className="text-xs text-gray-400">没有找到匹配的职位招聘</p>
              <button
                onClick={() => { setSearchText(''); onOpenFilter(); }}
                className="mt-3 text-xs text-blue-600 font-bold hover:underline"
              >
                重置检索并重新筛选
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <button
        onClick={() => {
          alert("发布新职位功能处于演示中，请选择职位体验完成投递链路！");
        }}
        className="absolute right-4 bottom-20 w-12 h-12 bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 text-white rounded-full shadow-lg shadow-blue-500/20 flex items-center justify-center transition-all z-20 cursor-pointer"
      >
        <Plus size={20} />
      </button>

    </div>
  );
}
