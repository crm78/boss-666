import React, { useState } from 'react';
import { ChevronRight, Calendar, Search } from 'lucide-react';
import { DeliveryRecord } from '../types';

interface RecordsScreenProps {
  records: DeliveryRecord[];
  onSelectJobById: (id: string) => void;
}

export default function RecordsScreen({ records, onSelectJobById }: RecordsScreenProps) {
  const [statusFilter, setStatusFilter] = useState<string>('全部');

  const filteredRecords = records.filter((rec) => {
    if (statusFilter === '全部') return true;
    return rec.status === statusFilter;
  });

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden animate-in fade-in duration-300 bg-slate-50">
      
      {/* Top App Bar header */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between shadow-sm z-10 shrink-0">
        <h1 className="font-display font-bold text-gray-800 text-sm">投递记录</h1>
        <div className="flex items-center gap-1.5 selection:bg-transparent">
          {/* Status selector micro dropdown / buttons */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-[10px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 border-none outline-none rounded-lg px-2.5 py-1.5 cursor-pointer appearance-none text-center"
          >
            <option value="全部">全部状态</option>
            <option value="邀请面试">邀请面试</option>
            <option value="已查看">已查看</option>
            <option value="不合适">不合适</option>
          </select>
        </div>
      </div>

      {/* Main timeline listing */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-20">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((rec) => {
            // Sourced visual status mapping configurations from stitch screenshots
            let badgeBg = 'bg-blue-50 text-blue-600';
            if (rec.status === '已查看') {
              badgeBg = 'bg-green-50 text-green-600';
            } else if (rec.status === '不合适') {
              badgeBg = 'bg-red-50 text-red-600';
            }

            return (
              <div
                key={rec.id}
                onClick={() => onSelectJobById(rec.jobId)}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between space-y-3"
              >
                {/* Upper line: image details, job metrics name, status tag */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-2.5 items-start">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100/60 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={rec.companyLogo} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-gray-900 text-xs leading-none">
                        {rec.jobTitle}
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-1.5">{rec.company} · {rec.city}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold select-none whitespace-nowrap ${badgeBg}`}>
                    {rec.status}
                  </span>
                </div>

                {/* Footer mapping: timestamp delivery log details */}
                <div className="border-t border-gray-50 pt-2.5 flex justify-between items-center text-[10px] text-gray-400 select-none">
                  <span className="font-mono flex items-center gap-1 text-[9px]">
                    <Calendar size={10} />
                    投递于 {rec.appliedDate}
                  </span>

                  <button className="text-[#1E88E5] font-bold flex items-center gap-0.5 hover:underline outline-none text-[9px]">
                    <span>详情</span>
                    <ChevronRight size={10} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-16 text-center bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
            <h3 className="font-display font-bold text-gray-700 text-xs mt-2">暂无投递记录</h3>
            <p className="text-[10px] text-gray-400 mt-1 tracking-wide">
              您选择的产品经历在所选状态下没有记录
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
