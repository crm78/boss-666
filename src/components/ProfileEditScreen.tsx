import React, { useState } from 'react';
import { User, Briefcase, MapPin, DollarSign, Camera, ChevronLeft } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileEditScreenProps {
  userProfile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
  onBack: () => void;
}

export default function ProfileEditScreen({ userProfile, onSave, onBack }: ProfileEditScreenProps) {
  const [name, setName] = useState(userProfile.name);
  const [expectJob, setExpectJob] = useState(userProfile.expectJob);
  const [city, setCity] = useState(userProfile.city);
  const [salaryExpectation, setSalaryExpectation] = useState(userProfile.salaryExpectation);
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('姓名不能为空');
      return;
    }

    setSaving(true);
    setTimeout(() => {
      onSave({
        ...userProfile,
        name,
        expectJob,
        city,
        salaryExpectation,
      });
      setSaving(false);
      alert('「个人资料变更已成功保存」');
      onBack();
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 bg-slate-50 h-full">
      {/* Top Bar Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1 rounded-full text-slate-700 hover:bg-gray-100 flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>
          <span className="font-display font-semibold text-gray-800 text-xs">编辑个人信息</span>
        </div>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Main Body (Form) */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profile Large Header Card block */}
        <div className="bg-white rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.01)] border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[64px] h-[64px] rounded-full overflow-hidden border-2 border-blue-100 relative group shrink-0">
              <img src={userProfile.avatar} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera size={14} />
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900 text-sm">个人信息</h3>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-none">完善资料，开启理想职场</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => alert("本演示项目预载了符合 Stitched 规范的专业候选人写真，目前不支持在沙盒上传新媒体资源。")}
            className="text-xs text-[#1E88E5] font-bold hover:underline outline-none"
          >
            更换头像
          </button>
        </div>

        {/* Form Inputs lists */}
        <div className="space-y-3">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 pl-0.5 uppercase tracking-wider block">姓名</label>
            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3.5 h-11 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-sm">
              <User size={14} className="text-gray-400 mr-2.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入您的真实姓名"
                className="w-full text-xs outline-none text-gray-800 bg-transparent"
              />
            </div>
          </div>

          {/* Expect job */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 pl-0.5 uppercase tracking-wider block">期望职位</label>
            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3.5 h-11 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-sm">
              <Briefcase size={14} className="text-gray-400 mr-2.5" />
              <input
                type="text"
                value={expectJob}
                onChange={(e) => setExpectJob(e.target.value)}
                placeholder="请输入您的期望职位"
                className="w-full text-xs outline-none text-gray-800 bg-transparent"
              />
            </div>
          </div>

          {/* City */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 pl-0.5 uppercase tracking-wider block">希望工作城市</label>
            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3.5 h-11 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-sm">
              <MapPin size={14} className="text-gray-400 mr-2.5" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="请输入希望工作的城市"
                className="w-full text-xs outline-none text-gray-800 bg-transparent"
              />
            </div>
          </div>

          {/* SalaryExpectation */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 pl-0.5 uppercase tracking-wider block">期望月薪</label>
            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3.5 h-11 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-sm">
              <DollarSign size={14} className="text-gray-400 mr-2.5" />
              <input
                type="text"
                value={salaryExpectation}
                onChange={(e) => setSalaryExpectation(e.target.value)}
                placeholder="例如: 25k-35k"
                className="w-full text-xs outline-none text-gray-800 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={saving}
            className="w-full h-11 bg-[#1E88E5] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/15 active:scale-95 transition-all disabled:opacity-75 flex items-center justify-center"
          >
            {saving ? '正在保存...' : '保存设置'}
          </button>
        </div>
      </form>
    </div>
  );
}
