import React, { useState } from 'react';
import { ChevronLeft, Plus, Award, Briefcase, Trash2, Calendar, FileText } from 'lucide-react';
import { UserProfile, Education, WorkExperience } from '../types';

interface ResumeEditScreenProps {
  userProfile: UserProfile;
  onUpdateResume: (updated: UserProfile) => void;
  onBack: () => void;
}

export default function ResumeEditScreen({ userProfile, onUpdateResume, onBack }: ResumeEditScreenProps) {
  const [activeTab, setActiveTab] = useState<'edu' | 'work'>('edu');

  // Edu states
  const [schools, setSchools] = useState<Education[]>(userProfile.educationList);
  // Work states
  const [works, setWorks] = useState<WorkExperience[]>(userProfile.workList);

  const handleAddEdu = () => {
    const school = prompt('请输入学校名称:');
    if (!school) return;
    const major = prompt('请输入专业:') || '未填';
    const degree = prompt('请输入学历级别 (如: 本科, 硕士, 博士, 大专):') || '本科';
    const startYear = prompt('请输入入学年份 (如: 2016):') || '2016';
    const endYear = prompt('请输入毕业年份 (如: 2020):') || '2020';

    const newEdu: Education = {
      id: String(Date.now()),
      school,
      major,
      degree,
      startYear,
      endYear,
    };
    const updated = [...schools, newEdu];
    setSchools(updated);
    onUpdateResume({
      ...userProfile,
      educationList: updated,
    });
  };

  const handleRemoveEdu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('确定要删除这档教育背景吗？')) return;
    const updated = schools.filter((item) => item.id !== id);
    setSchools(updated);
    onUpdateResume({
      ...userProfile,
      educationList: updated,
    });
  };

  const handleAddWork = () => {
    const company = prompt('请输入公司名称:');
    if (!company) return;
    const role = prompt('请输入职位角色:') || '未指定';
    const description = prompt('请输入工作描述:') || '未填';
    const startDate = prompt('请输入开始时间 (如: 2020.07):') || '2020.07';
    const endDate = prompt('请输入结束时间 (如: 至今):') || '至今';

    const newWork: WorkExperience = {
      id: String(Date.now()),
      company,
      role,
      description,
      startDate,
      endDate,
    };
    const updated = [...works, newWork];
    setWorks(updated);
    onUpdateResume({
      ...userProfile,
      workList: updated,
    });
  };

  const handleRemoveWork = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('确定要删除这档工作履历吗？')) return;
    const updated = works.filter((item) => item.id !== id);
    setWorks(updated);
    onUpdateResume({
      ...userProfile,
      workList: updated,
    });
  };

  // Compute resume score
  const score = Math.min(
    40 + schools.length * 15 + works.length * 15 + (userProfile.name ? 15 : 0),
    100
  );

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 bg-slate-50 h-full">
      {/* Top App Bar Navigation */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1 rounded-full text-slate-700 hover:bg-gray-100 flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>
          <span className="font-display font-semibold text-gray-800 text-xs">编辑简历</span>
        </div>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Main Container block */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {/* Toggle navigation bar segment tabs */}
        <div className="bg-gray-100/80 rounded-xl p-1 relative flex gap-1 border border-gray-200/20 shadow-inner select-none shrink-0">
          <button
            onClick={() => setActiveTab('edu')}
            className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold whitespace-nowrap outline-none transition-all ${
              activeTab === 'edu' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            教育经历
          </button>
          <button
            onClick={() => setActiveTab('work')}
            className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold whitespace-nowrap outline-none transition-all ${
              activeTab === 'work' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            工作经历
          </button>
        </div>

        {/* Tab content listings */}
        <div className="space-y-3">
          {activeTab === 'edu' ? (
            <>
              {schools.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex gap-3.5 items-start justify-between"
                >
                  <div className="flex gap-2.5 items-start">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Award size={16} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-gray-900 text-xs">{edu.school}</h4>
                      <p className="text-[10px] text-gray-400 mt-1">{edu.major} · {edu.degree}</p>
                      <span className="text-[9px] text-gray-400 flex items-center gap-1 mt-1 font-mono">
                        <Calendar size={9} />
                        {edu.startYear} - {edu.endYear}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleRemoveEdu(edu.id, e)}
                    className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddEdu}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-1.5 text-gray-400 hover:border-blue-600 hover:text-blue-500 hover:bg-blue-50/20 active:scale-[0.99] transition-all text-xs font-semibold"
              >
                <Plus size={14} />
                <span>添加教育经历</span>
              </button>
            </>
          ) : (
            <>
              {works.map((wk) => (
                <div
                  key={wk.id}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex gap-3.5 items-start justify-between"
                >
                  <div className="flex gap-2.5 items-start">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Briefcase size={16} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-gray-900 text-xs">{wk.company}</h4>
                      <p className="text-[10px] text-blue-500 font-bold mt-1">{wk.role}</p>
                      <p className="text-[10px] text-gray-400 mt-1.5 leading-snug break-all line-clamp-3">
                        {wk.description}
                      </p>
                      <span className="text-[9px] text-gray-400 flex items-center gap-1 mt-2 font-mono">
                        <Calendar size={9} />
                        {wk.startDate} - {wk.endDate}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleRemoveWork(wk.id, e)}
                    className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddWork}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-1.5 text-gray-400 hover:border-blue-600 hover:text-blue-500 hover:bg-blue-50/20 active:scale-[0.99] transition-all text-xs font-semibold"
              >
                <Plus size={14} />
                <span>添加工作经历</span>
              </button>
            </>
          )}
        </div>

        {/* Profile score and completeness panel */}
        <div className="bg-white p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.01)] border border-gray-100 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-700">
            <span className="font-semibold text-gray-500">简历完成度</span>
            <span className="font-mono font-bold text-blue-600">{score}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${score}%` }} />
          </div>
        </div>

        {/* Attachment Resume module segment as in stitch design mockup */}
        <div className="bg-white p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.015)] border border-gray-100 space-y-2 select-none">
          <div className="flex justify-between items-center pr-0.5">
            <h4 className="text-xs font-bold text-gray-800">简历附件</h4>
            <button
              onClick={() => alert("沙盒演示环境简历附件锁定为初始清华大学及高级产品简历数据。")}
              className="text-xs text-[#1E88E5] font-bold hover:underline"
            >
              更新
            </button>
          </div>
          <div className="flex items-center gap-3 p-2.5 bg-gray-50 border border-gray-100 rounded-xl select-none">
            <FileText size={20} className="text-red-500 shrink-0" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-gray-800 truncate leading-none">
                {userProfile.name}-个人简历-2026.pdf
              </p>
              <p className="text-[9px] text-gray-400 mt-1 leading-none font-mono">
                1.2 MB · 2026-05-27
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-gray-100 px-4 flex items-center gap-3 shadow-md z-10 select-none pb-safe">
        <button
          onClick={() => {
            alert(`候选人: ${userProfile.name} | 意向城市: ${userProfile.city} | 意向岗位: ${userProfile.expectJob} | 学历: ${schools.map((e)=>e.school).join(', ')} | 经历: ${works.map((w)=>w.company).join(', ')}`);
          }}
          className="flex-1 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 font-semibold text-xs active:scale-95 transition-transform"
        >
          预览
        </button>
        <button
          onClick={() => {
            alert('「简历更改成功保存并同步到云端数据库」');
            onBack();
          }}
          className="flex-[2] h-11 bg-[#1E88E5] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/15 active:scale-95 transition-transform"
        >
          保存并发布
        </button>
      </div>

    </div>
  );
}
