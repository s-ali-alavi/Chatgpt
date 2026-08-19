'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { APP_NAME, APP_CREDIT } from '@mojbahman/shared';
import { apiLogin } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiLogin(email, password);

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'خطا در ورود. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 pb-16 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">{APP_NAME}</h1>
          <p className="text-slate-500">ورود به سیستم مدیریت مشتریان</p>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">ایمیل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="admin@mojbahman.ir"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition shadow-sm"
            >
              {loading ? 'در حال ورود...' : 'ورود به سیستم'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 space-y-1">
            <p className="font-medium text-slate-600 dark:text-slate-400">حساب‌های آزمایشی:</p>
            <p>مدیر: admin@mojbahman.ir / Admin@123456</p>
            <p>اپراتور: operator@mojbahman.ir / Operator@123</p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          {APP_CREDIT}
        </p>
      </div>
    </main>
  );
}
