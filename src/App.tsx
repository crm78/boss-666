import React, { useState } from 'react';
import PhoneFrame from './components/PhoneFrame';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import FilterDrawer from './components/FilterDrawer';
import JobDetailScreen from './components/JobDetailScreen';
import CollectionsScreen from './components/CollectionsScreen';
import RecordsScreen from './components/RecordsScreen';
import ProfileEditScreen from './components/ProfileEditScreen';
import ResumeEditScreen from './components/ResumeEditScreen';

import { MOCK_JOBS, INITIAL_USER_PROFILE, INITIAL_DELIVERY_RECORDS } from './mockData';
import { Job, UserProfile, DeliveryRecord, ApplicationStatus } from './types';
import { Home, Bookmark, Send, User, ChevronRight, Edit2, FileText, CheckCircle, LogOut } from 'lucide-react';

type ScreenState =
  | 'login'
  | 'register'
  | 'home'
  | 'jobDetail'
  | 'collections'
  | 'records'
  | 'profile'
  | 'profileEdit'
  | 'resumeEdit';

export default function App() {
  // Navigation states
  const [screen, setScreen] = useState<ScreenState>('login');
  
  // Tab states for footer
  const [activeTab, setActiveTab] = useState<'home' | 'collections' | 'records' | 'profile'>('home');
  
  // Interactive global storage
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [collectedJobs, setCollectedJobs] = useState<Job[]>([MOCK_JOBS[0]]); // Initial preloaded collection
  const [deliveryRecords, setDeliveryRecords] = useState<DeliveryRecord[]>(INITIAL_DELIVERY_RECORDS);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);

  // Filters state
  const [searchText, setSearchText] = useState('');
  const [activeCity, setActiveCity] = useState('不限');
  const [activeDegree, setActiveDegree] = useState('不限');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter application pipeline
  const [appliedCityFilter, setAppliedCityFilter] = useState('不限');

  // Trigger filters conversion
  const handleApplyFilters = () => {
    setAppliedCityFilter(activeCity);
    alert(`【系统筛选条件已应用】 城市: ${activeCity} | 学历: ${activeDegree} | 薪酬最低: ${salaryMin || '未限'}k`);
  };

  // Login handler
  const handleLoginSuccess = (phone: string) => {
    setUserPhone(phone);
    setScreen('home');
    setActiveTab('home');
  };

  // Register success handler
  const handleRegisterSuccess = (phone: string) => {
    alert('「注册成功！立即为您登录并同步初始化职位推荐」');
    setUserPhone(phone);
    setScreen('home');
    setActiveTab('home');
  };

  // Action: toggle job collection
  const handleToggleCollect = (job: Job) => {
    const isCollected = collectedJobs.some((item) => item.id === job.id);
    if (isCollected) {
      setCollectedJobs(collectedJobs.filter((item) => item.id !== job.id));
    } else {
      setCollectedJobs([...collectedJobs, job]);
    }
  };

  // Action: remove collection directly from Swiped Card
  const handleRemoveCollection = (jobId: string) => {
    setCollectedJobs(collectedJobs.filter((item) => item.id !== jobId));
  };

  // Action: apply for a job
  const handleApplyJob = (job: Job) => {
    const alreadyApplied = deliveryRecords.some((rec) => rec.jobId === job.id);
    if (alreadyApplied) {
      alert('「该招聘职位您已投递过简历，请勿重复申请。可在简历管理中更新履历后等待面试。」');
      return;
    }

    const statuses: ApplicationStatus[] = ['已查看', '邀请面试'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    const mockRecord: DeliveryRecord = {
      id: `rec-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyLogo: job.companyLogo,
      city: job.city,
      status: randomStatus,
      appliedDate: new Date().toISOString().split('T')[0],
    };

    setDeliveryRecords([mockRecord, ...deliveryRecords]);
    alert(`「简历投递成功！已使用您的最新在线简历 [${userProfile.name}-个人简历] 通知HR李经理，可在 投递记录 菜单跟踪面试邀请通知。」`);
  };

  // Profile save update setter
  const handleSaveProfile = (updated: UserProfile) => {
    setUserProfile(updated);
  };

  // Check state trackers
  const isCurrentlyCollected = (jobId: string) => collectedJobs.some((item) => item.id === jobId);
  const isCurrentlyApplied = (jobId: string) => deliveryRecords.some((rec) => rec.jobId === jobId);

  // Tab switching routers
  const handleTabClick = (tab: 'home' | 'collections' | 'records' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') setScreen('home');
    else if (tab === 'collections') setScreen('collections');
    else if (tab === 'records') setScreen('records');
    else if (tab === 'profile') setScreen('profile');
  };

  // Action: select work job details
  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setScreen('jobDetail');
  };

  const handleSelectJobById = (id: string) => {
    const target = jobs.find((j) => j.id === id);
    if (target) {
      handleSelectJob(target);
    }
  };

  return (
    <PhoneFrame>
      {/* Dynamic Screen Routing */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden relative h-full bg-slate-50">
        
        {/* Render View Sheet based on routing states */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {screen === 'login' && (
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              onNavigateToRegister={() => setScreen('register')}
            />
          )}

          {screen === 'register' && (
            <RegisterScreen
              onRegisterSuccess={handleRegisterSuccess}
              onNavigateToLogin={() => setScreen('login')}
            />
          )}

          {screen === 'home' && (
            <HomeScreen
              jobs={jobs}
              userProfile={userProfile}
              onSelectJob={handleSelectJob}
              onOpenFilter={() => setIsFilterOpen(true)}
              searchText={searchText}
              setSearchText={setSearchText}
              activeCityFilter={appliedCityFilter}
            />
          )}

          {screen === 'jobDetail' && selectedJob && (
            <JobDetailScreen
              job={selectedJob}
              onBack={() => {
                // If they came from bookmarks, back to collections; if records, back to records; else home
                if (activeTab === 'collections') setScreen('collections');
                else if (activeTab === 'records') setScreen('records');
                else setScreen('home');
              }}
              isCollected={isCurrentlyCollected(selectedJob.id)}
              onToggleCollect={handleToggleCollect}
              isApplied={isCurrentlyApplied(selectedJob.id)}
              onApplyJob={handleApplyJob}
            />
          )}

          {screen === 'collections' && (
            <CollectionsScreen
              collectedJobs={collectedJobs}
              onSelectJob={handleSelectJob}
              onRemoveCollection={handleRemoveCollection}
            />
          )}

          {screen === 'records' && (
            <RecordsScreen
              records={deliveryRecords}
              onSelectJobById={handleSelectJobById}
            />
          )}

          {screen === 'profile' && (
            <div className="flex-1 flex flex-col overflow-y-auto animate-in fade-in duration-300">
              
              {/* Profile Main Header Top Area block */}
              <div className="bg-white px-4 py-6 border-b border-gray-100 flex items-center justify-between shadow-sm shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-blue-100">
                    <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-slate-800 text-sm leading-tight">
                      {userProfile.name}
                    </h2>
                    <p className="text-[10px] text-[#1E88E5] font-semibold mt-1">已启程 · 开启理想职场</p>
                  </div>
                </div>
                <button
                  onClick={() => setScreen('profileEdit')}
                  className="px-2.5 py-1 text-[10px] font-bold text-[#1E88E5] bg-blue-50 hover:bg-blue-100 rounded-md flex items-center gap-1 transition-all outline-none border border-blue-100/30"
                >
                  <Edit2 size={10} />
                  <span>修改信息</span>
                </button>
              </div>

              {/* Central candidate dashboard settings */}
              <div className="p-4 space-y-4">
                
                {/* Visual expectations table statistics */}
                <div className="bg-gradient-to-r from-blue-500/10 to-[#1E88E5]/5 rounded-xl p-4 flex gap-4 text-center border border-blue-100/20">
                  <div className="flex-1 border-r border-gray-200/40">
                    <span className="text-[9px] text-gray-400 capitalize">意向岗位</span>
                    <p className="text-[11px] font-bold text-gray-800 truncate mt-0.5">{userProfile.expectJob}</p>
                  </div>
                  <div className="flex-1 border-r border-gray-200/40">
                    <span className="text-[9px] text-gray-400 capitalize">工作城市</span>
                    <p className="text-[11px] font-bold text-gray-800 mt-0.5">{userProfile.city}</p>
                  </div>
                  <div className="flex-1">
                    <span className="text-[9px] text-gray-400 capitalize">薪酬期望</span>
                    <p className="text-[11px] font-bold text-blue-600 mt-0.5">{userProfile.salaryExpectation}</p>
                  </div>
                </div>

                {/* Sub Menu sheets lists as mockups */}
                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase pl-1 tracking-wider">简历履历管理</h3>
                  
                  {/* Option 1: Resume Edit */}
                  <button
                    onClick={() => setScreen('resumeEdit')}
                    className="w-full bg-white p-3.5 rounded-xl border border-gray-100 hover:border-blue-500 transition-all flex items-center justify-between text-left active:translate-x-0.5 shadow-sm shadow-slate-100/50"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText size={16} className="text-[#1E88E5]" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-800 leading-none">在线简历管理</h4>
                        <p className="text-[9px] text-gray-400 mt-1.5 leading-none">同步清华学历，工作经验一对多管理</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-gray-400" />
                  </button>

                  {/* Option 2: Resume Completion Tracker */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-100 flex items-center justify-between text-left shadow-sm shadow-slate-100/50">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle size={16} className="text-green-500" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-800 leading-none">实名身份核验</h4>
                        <p className="text-[9px] text-gray-400 mt-1.5 leading-none">已通过实名核验，处于活跃招聘候选人池中</p>
                      </div>
                    </div>
                    <span className="text-[8px] bg-green-50 text-green-600 px-1 py-0.5 rounded font-bold">已核验</span>
                  </div>
                </div>

                {/* Log out option */}
                <div className="pt-4">
                  <button
                    onClick={() => {
                      if (confirm('确定退回登录页演示登出流程吗？')) {
                        setUserPhone(null);
                        setScreen('login');
                      }
                    }}
                    className="w-full h-11 border border-red-200 bg-red-50/50 text-red-500 text-xs font-bold flex items-center justify-center gap-1.5 rounded-xl hover:bg-red-50 active:scale-95 transition-all"
                  >
                    <LogOut size={13} />
                    <span>退出当前账号登录</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {screen === 'profileEdit' && (
            <ProfileEditScreen
              userProfile={userProfile}
              onSave={handleSaveProfile}
              onBack={() => setScreen('profile')}
            />
          )}

          {screen === 'resumeEdit' && (
            <ResumeEditScreen
              userProfile={userProfile}
              onUpdateResume={handleSaveProfile}
              onBack={() => setScreen('profile')}
            />
          )}

        </div>

        {/* Global Bottom Ribbon Navigation Tab block (shown ONLY for logged-in general list tabs) */}
        {userPhone &&
          screen !== 'login' &&
          screen !== 'register' &&
          screen !== 'jobDetail' &&
          screen !== 'profileEdit' &&
          screen !== 'resumeEdit' && (
            <div className="bg-white border-t border-gray-100 h-[56px] flex items-center justify-around text-center shrink-0 absolute bottom-0 inset-x-0 z-40 select-none pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.015)]">
              {/* Tab Item 1: Home */}
              <button
                type="button"
                onClick={() => handleTabClick('home')}
                className={`flex flex-col items-center justify-center flex-1 h-full outline-none transition-colors border-none bg-transparent ${
                  activeTab === 'home' ? 'text-[#1E88E5]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Home size={16} className={activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
                <span className="text-[9px] mt-1 font-semibold leading-none">首页推荐</span>
              </button>

              {/* Tab Item 2: Collection */}
              <button
                type="button"
                onClick={() => handleTabClick('collections')}
                className={`flex flex-col items-center justify-center flex-1 h-full outline-none transition-colors border-none bg-transparent ${
                  activeTab === 'collections' ? 'text-[#1E88E5]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Bookmark size={16} className={activeTab === 'collections' ? 'stroke-[2.5] fill-blue-600' : 'stroke-[1.8]'} />
                <span className="text-[9px] mt-1 font-semibold leading-none">我的收藏</span>
              </button>

              {/* Tab Item 3: Delivery log tracker */}
              <button
                type="button"
                onClick={() => handleTabClick('records')}
                className={`flex flex-col items-center justify-center flex-1 h-full outline-none transition-colors border-none bg-transparent relative ${
                  activeTab === 'records' ? 'text-[#1E88E5]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Send size={15} className={activeTab === 'records' ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
                <span className="text-[9px] mt-1 font-semibold leading-none">投递记录</span>
                {/* Little red unread notification bubble dot */}
                <span className="absolute top-2 right-6 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>

              {/* Tab Item 4: Profile */}
              <button
                type="button"
                onClick={() => handleTabClick('profile')}
                className={`flex flex-col items-center justify-center flex-1 h-full outline-none transition-colors border-none bg-transparent ${
                  activeTab === 'profile' ? 'text-[#1E88E5]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <User size={16} className={activeTab === 'profile' ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
                <span className="text-[9px] mt-1 font-semibold leading-none">个人中心</span>
              </button>
            </div>
          )}

      </div>

      {/* Slide-out Bottom Filtering Drawer Sheet */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeCity={activeCity}
        setActiveCity={setActiveCity}
        activeDegree={activeDegree}
        setActiveDegree={setActiveDegree}
        salaryMin={salaryMin}
        setSalaryMin={setSalaryMin}
        salaryMax={salaryMax}
        setSalaryMax={setSalaryMax}
        onApplyFilters={handleApplyFilters}
      />

    </PhoneFrame>
  );
}
