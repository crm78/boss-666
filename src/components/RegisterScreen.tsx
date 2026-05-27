import React, { useState, useEffect } from 'react';
import { Smartphone, Shield, Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react';

interface RegisterScreenProps {
  onRegisterSuccess: (phone: string) => void;
  onNavigateToLogin: () => void;
}

export default function RegisterScreen({ onRegisterSuccess, onNavigateToLogin }: RegisterScreenProps) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  // Sourced from standard countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = () => {
    if (!phone) {
      setErrorMsg('请先输入手机号');
      return;
    }
    setErrorMsg('');
    setCountdown(60);
    // Alert the simulated verification code
    alert('验证码已发送，密码登录演示可用任何六位数，或验证码使用：123456');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setErrorMsg('请输入手机号');
      return;
    }
    if (!code) {
      setErrorMsg('请输入验证码');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('设置的密码必须在6位以上');
      return;
    }
    if (!agreed) {
      setErrorMsg('请先勾选同意用户服务协议');
      return;
    }

    setErrorMsg('');
    onRegisterSuccess(phone);
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-in slide-in-from-right duration-300 relative">
      {/* Absolute top alignment matching stitched header screen */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 -mx-6 px-6 -mt-3 mb-6 bg-white">
        <button onClick={onNavigateToLogin} className="p-1 rounded-full text-gray-700 hover:bg-gray-100 flex items-center justify-center">
          <ChevronLeft size={18} />
        </button>
        <span className="font-display font-extrabold text-blue-600 text-sm">职聘</span>
        <div className="w-6" /> {/* Balance center title */}
      </div>

      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-gray-900 leading-tight">创建新账号</h2>
        <p className="text-xs text-gray-400 mt-1">加入职聘，开启你的职业发展新篇章</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Phone */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 pl-0.5">手机号码</label>
            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3.5 h-12 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-sm">
              <Smartphone size={16} className="text-gray-400 mr-2.5" />
              <input
                type="tel"
                placeholder="请输入您的手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-sm outline-none text-gray-800 bg-transparent"
              />
            </div>
          </div>

          {/* Verification Code */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 pl-0.5">验证码</label>
            <div className="flex gap-2">
              <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3.5 h-12 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all flex-1 shadow-sm">
                <Shield size={16} className="text-gray-400 mr-2.5" />
                <input
                  type="number"
                  placeholder="请输入验证码"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full text-sm outline-none text-gray-800 bg-transparent"
                />
              </div>
              <button
                type="button"
                onClick={handleSendCode}
                disabled={countdown > 0}
                className="h-12 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:text-gray-400 disabled:bg-gray-50 rounded-xl text-xs font-semibold transition-colors shrink-0 outline-none"
              >
                {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 pl-0.5">设置密码</label>
            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3.5 h-12 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all shadow-sm">
              <Lock size={16} className="text-gray-400 mr-2.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入6-16位密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm outline-none text-gray-800 bg-transparent"
              />
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500 text-center">{errorMsg}</p>
          )}

          {/* Checkbox agreements */}
          <div className="flex items-start gap-2 pt-2 px-0.5">
            <input
              id="agreeCheck"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <label htmlFor="agreeCheck" className="text-xs text-gray-500 leading-tight">
              我已阅读并同意 <span className="text-blue-600 hover:underline">《用户服务协议》</span> 和 <span className="text-blue-600 hover:underline">《隐私保护政策》</span>
            </label>
          </div>
        </div>

        {/* Form CTA & login toggler */}
        <div className="space-y-4 pt-6">
          <button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold text-sm tracking-wide hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-500/10"
          >
            注册并登录
          </button>

          <footer className="text-center pt-2">
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-xs text-gray-500 hover:text-blue-600"
            >
              已有账号？ <span className="text-blue-600 font-bold">去登录</span>
            </button>
          </footer>
        </div>
      </form>
    </div>
  );
}
