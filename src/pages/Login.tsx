import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
    const [role, setRole] = useState<UserRole>('doctor');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 600)); // محاكاة شبكة
        const success = login(username, password, role);
        setLoading(false);
        if (success) {
            toast.success(`Welcome back, ${role === 'doctor' ? 'Doctor' : ''} ${username}! 👋`);
            navigate(role === 'doctor' ? '/dashboard' : '/nurse');
        } else {
            toast.error('Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-teal-950 to-gray-900 flex items-center justify-center p-6">

            {/* Background circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center shadow-xl shadow-teal-500/30">
                            <i className="fa-solid fa-tooth text-white text-2xl" />
                        </div>
                        <div className="text-left">
                            <span className="block text-2xl font-extrabold text-white tracking-tight">BRIGHTSMILE</span>
                            <span className="text-xs text-teal-400 font-semibold uppercase tracking-widest">Staff Portal</span>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm">Sign in to access your dashboard</p>
                </div>

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl">

                    {/* Role Toggle */}
                    <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl mb-8">
                        {(['doctor', 'nurse'] as UserRole[]).map(r => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => { setRole(r); setUsername(''); setPassword(''); }}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                                    role === r
                                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                <i className={`fa-solid ${r === 'doctor' ? 'fa-user-doctor' : 'fa-user-nurse'}`} />
                                {r === 'doctor' ? 'Doctor' : 'Nurse'}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-teal-300 uppercase tracking-widest">Username</label>
                            <div className="relative">
                                <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder={role === 'doctor' ? 'DrAhmed' : 'Sara'}
                                    className="w-full bg-white/10 border border-white/10 rounded-2xl pl-11 pr-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-teal-300 uppercase tracking-widest">Password</label>
                            <div className="relative">
                                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/10 border border-white/10 rounded-2xl pl-11 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-400 transition-colors"
                                >
                                    <i className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'}`} />
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-70 text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-teal-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-2"
                        >
                            {loading ? (
                                <><i className="fa-solid fa-circle-notch animate-spin" /> Signing in...</>
                            ) : (
                                <><i className="fa-solid fa-right-to-bracket" /> Sign In</>
                            )}
                        </button>
                    </form>

                    {/* Back to website */}
                    <div className="mt-6 text-center">
                        <a href="/" className="text-xs text-gray-500 hover:text-teal-400 transition-colors">
                            <i className="fa-solid fa-arrow-left mr-1" /> Back to website
                        </a>
                    </div>
                </div>

                {/* Hint */}
                <p className="text-center text-xs text-gray-600 mt-6">
                    BrightSmile Staff Portal • Authorized personnel only
                </p>
            </div>
        </div>
    );
};

export default Login;
