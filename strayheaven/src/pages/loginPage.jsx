import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-8">
              <div className="w-6 h-6 bg-white rounded-full" />
            </div>

            <h2 className="text-4xl font-bold leading-tight mb-4">
              Save Lives with Us 🐾
            </h2>

            <p className="text-blue-100 text-lg">
              Join StrayHaven and help rescue animals in need. Every report matters.
            </p>
          </div>

          {/* Decorations */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500 rounded-full opacity-40" />
          <div className="absolute top-1/2 -right-20 w-40 h-40 bg-blue-400 rounded-full opacity-30" />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-slate-800">
              Welcome to StrayHaven 🐾
            </h1>
            <p className="text-slate-500 mt-2">
              Sign in to continue rescuing lives.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-500">
                  Forgot?
                </a>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
              <label className="ml-2 text-sm text-slate-600">
                Remember me
              </label>
            </div>

            {/* Button */}
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
              onClick={() => navigate('/')}
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200"></span>
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-white px-2 text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google */}
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
          </form>

          <p className="text-center text-slate-600 mt-8">
            Don’t have an account?{" "}
            <a href="#" className="font-semibold text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;