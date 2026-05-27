import React, { useState } from 'react';
import { Smartphone, Lock, Eye, EyeOff, MessageSquare, Shield, ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onLoginSuccess: (phone: string) => void;
  onNavigateToRegister: () => void;
}

export default function LoginScreen({ onLoginSuccess, onNavigateToRegister }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      setErrorMsg('请输入手机号');
      return;
    }
    if (!password) {
      setErrorMsg('请输入密码');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    // Simulate authentication lag
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(phoneNumber);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-in fade-in duration-300">
      {/* Branding Header Area */}
      <div className="text-center mt-10 mb-8">
        <h1 className="font-display text-3xl font-extrabold text-blue-600 tracking-tight">职聘</h1>
        <p className="text-[11px] text-gray-500 font-medium tracking-wider uppercase mt-1">专业的职业招聘平台</p>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-6">欢迎登录</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Phone Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 block pl-0.5">手机号</label>
              <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl transition-all h-12 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:bg-white">
                <Smartphone size={16} className="text-gray-400 absolute left-3.5" />
                <input
                  type="tel"
                  placeholder="请输入手机号"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full text-sm pl-11 pr-4 bg-transparent outline-none text-gray-800"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 block pl-0.5">密码</label>
              <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl transition-all h-12 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:bg-white">
                <Lock size={16} className="text-gray-400 absolute left-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm pl-11 pr-12 bg-transparent outline-none text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-500 text-center">{errorMsg}</p>
            )}

            {/* Forgot password */}
            <div className="flex justify-end pr-0.5">
              <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-blue-600 hover:underline">
                忘记密码？
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm disabled:bg-blue-400"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>立即登录</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Alternatives / OAuth / Register Toggle */}
        <div className="space-y-4 mt-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-x-0 h-[1px] bg-gray-200" />
            <span className="relative px-3 bg-white text-xs text-gray-400 font-medium">其他登录方式</span>
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => onLoginSuccess("13812345678")}
              className="w-11 h-11 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <MessageSquare size={16} className="fill-gray-500" />
            </button>
            <button
              onClick={() => onLoginSuccess("15912345678")}
              className="w-11 h-11 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <Shield size={16} />
            </button>
          </div>

          {/* Footer toggle */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              没有账号？
              <button
                type="button"
                onClick={onNavigateToRegister}
                className="text-blue-600 font-bold ml-1 hover:underline outline-none"
              >
                立即注册
              </button>
            </p>
          </div>

          {/* Policy Agreement Footnote */}
          <div className="text-center">
            <p className="text-[10px] text-gray-400 leading-tight">
              登录即代表您已阅读并同意 <br className="xs:hidden" />
              <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-500/80 hover:underline">《用户协议》</a> 与 <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-500/80 hover:underline">《隐私政策》</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
