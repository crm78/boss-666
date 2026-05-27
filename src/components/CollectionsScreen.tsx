import React, { useState } from 'react';
import { Trash2, Search, Swipe, MessageSquare } from 'lucide-react';
import { Job } from '../types';

interface CollectionsScreenProps {
  collectedJobs: Job[];
  onSelectJob: (job: Job) => void;
  onRemoveCollection: (jobId: string) => void;
}

export default function CollectionsScreen({
  collectedJobs,
  onSelectJob,
  onRemoveCollection,
}: CollectionsScreenProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'highPay'>('all');
  
  // Swipe state simulators for specific card IDs
  const [swipedCardId, setSwipedCardId] = useState<string | null>(null);

  // Filters
  const filteredCollections = collectedJobs.filter((job) => {
    if (activeTab === 'highPay') {
      return job.salaryMin >= 30; // High salary tag
    }
    return true; // Simple mock filter
  });

  const handleToggleSwipe = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (swipedCardId === id) {
      setSwipedCardId(null);
    } else {
      setSwipedCardId(id);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden animate-in fade-in duration-300 bg-slate-50">
      
      {/* Top App Bar header */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
        <h1 className="font-display font-bold text-gray-800 text-sm">我的收藏</h1>
        <button
          onClick={() => alert("可在首页顶部输入关键词进行全局检索！")}
          className="p-1.5 rounded-full text-blue-600 bg-blue-50 border border-blue-100/50 hover:bg-blue-100 transition-colors flex items-center justify-center"
        >
          <Search size={15} />
        </button>
      </div>

      {/* Chips Filter Row */}
      <div className="px-4 py-3 bg-white border-b border-gray-100/60 flex gap-2 overflow-x-auto shrink-0 no-scrollbar select-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all border ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-gray-50 text-gray-500 border-gray-200/50 hover:bg-gray-100'
          }`}
        >
          全部收藏 ({collectedJobs.length})
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all border ${
            activeTab === 'active'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-gray-50 text-gray-500 border-gray-200/50 hover:bg-gray-100'
          }`}
        >
          近期活跃
        </button>
        <button
          onClick={() => setActiveTab('highPay')}
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all border ${
            activeTab === 'highPay'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-gray-50 text-gray-500 border-gray-200/50 hover:bg-gray-100'
          }`}
        >
          高薪职位
        </button>
      </div>

      {/* Main List column */}
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-20 space-y-3">
        {filteredCollections.length > 0 ? (
          filteredCollections.map((job) => {
            const isSwiped = swipedCardId === job.id;

            return (
              <div
                key={job.id}
                className="relative overflow-hidden rounded-xl bg-red-500 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.015)] border border-gray-100 h-[142px]"
              >
                {/* Swipe Underlay Action (Red delete panel slide-in as in stitch screen screenshot) */}
                <div className="absolute inset-y-0 right-0 w-20 flex flex-col items-center justify-center bg-red-600 text-white select-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveCollection(job.id);
                    }}
                    className="w-full h-full flex flex-col gap-1 items-center justify-center text-white active:bg-red-700 outline-none hover:text-white"
                  >
                    <Trash2 size={16} />
                    <span className="text-[10px] font-bold">删除</span>
                  </button>
                </div>

                {/* Swipe Overlay Content card holding listings details */}
                <div
                  onClick={() => onSelectJob(job)}
                  className={`absolute inset-0 bg-white p-4 transition-transform duration-300 h-full cursor-pointer flex flex-col justify-between ${
                    isSwiped ? '-translate-x-20' : 'translate-x-0'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-2.5 items-start">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center shrink-0">
                        <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-gray-900 text-xs leading-none">
                          {job.title}
                        </h3>
                        <p className="text-[10px] text-gray-400 mt-1.5">{job.company} · {job.city}市</p>
                      </div>
                    </div>
                    
                    {/* Salary alignment and swipe toggler */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="font-display font-extrabold text-blue-600 text-xs">
                        {job.salary}
                      </span>
                      {/* Swipe reveal button overlay indicator */}
                      <button
                        onClick={(e) => handleToggleSwipe(job.id, e)}
                        className="px-1.5 py-0.5 rounded bg-gray-100 text-slate-400 font-bold hover:text-red-500 scale-90 text-[8px]"
                      >
                        {isSwiped ? '收回' : '左滑'}
                      </button>
                    </div>
                  </div>

                  {/* Tag clips */}
                  <div className="flex flex-wrap gap-1 mt-1 truncate">
                    {job.tags.slice(0, 2).map((tg, idx) => (
                      <span key={idx} className="px-1.5 py-0.2 bg-gray-50 text-gray-400 border border-gray-100 text-[8px] rounded font-medium">
                        {tg}
                      </span>
                    ))}
                  </div>

                  {/* Footer metadata segment row for active recruiter stamp */}
                  <div className="border-t border-gray-50 pt-2 flex justify-between items-center text-[10px] text-gray-400 select-none">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200">
                        <img src={job.recruiterAvatar} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-gray-500">{job.recruiterName} · {job.recruiterTitle}</span>
                    </div>
                    <span className="text-[9px] text-gray-400">目前活跃</span>
                  </div>

                </div>

              </div>
            );
          })
        ) : (
          <div className="py-16 text-center bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 mb-4 text-gray-300">
              <Trash2 size={28} />
            </div>
            <h3 className="font-display font-bold text-gray-700 text-sm">暂无收藏职位</h3>
            <p className="text-[11px] text-gray-400 mt-1 max-w-[200px] leading-relaxed">
              收藏心仪职位，随时掌握动态详情，左滑可撤销
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
