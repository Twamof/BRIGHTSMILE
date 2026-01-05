import React, { useState } from 'react';
import type { BookingFormData } from '../types';

const Hero: React.FC = () => {
    const [formData, setFormData] = useState<BookingFormData>({
        date: '',
        service: '',
        name: '',
        phone: ''
    });

    const [isBooked, setIsBooked] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsBooked(true);
        setTimeout(() => setIsBooked(false), 3000);
    };

    return (
        <section id="booking" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* FULL-SIZE BACKGROUND IMAGE: Represents all dental services with a modern, clean look */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=90&w=2400"
                    className="w-full h-full object-cover"
                    alt="Modern Dental Clinic"
                />
                {/* Dark/Teal Overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/60 via-gray-900/40 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Left Column: Headline & Info with Transparent Backdrop */}
                    <div className="lg:w-[55%] space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-teal-400/20 backdrop-blur-md border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-widest mb-2">
                            Premium Dental Experience
                        </div>
                        <h1 className="text-6xl lg:text-[6rem] font-extrabold text-white leading-[1] tracking-tight drop-shadow-2xl">
                            Seamless <span className="text-teal-400">Dental Care</span> For Your Family
                        </h1>
                        <p className="text-xl text-teal-50 max-w-xl leading-relaxed font-medium drop-shadow-md">
                            From advanced implants to routine cleanings, our state-of-the-art facility provides comprehensive care for a lifetime of healthy smiles.
                        </p>

                        <div className="flex items-center gap-6 pt-4 bg-white/10 backdrop-blur-lg p-6 rounded-[32px] border border-white/10 w-fit">
                            <div className="flex items-center -space-x-4">
                                {[
                                    'photo-1438761681033-6461ffad8d80',
                                    'photo-1544005313-94ddf0286df2',
                                    'photo-1552374196-c4e7ffc6e126',
                                    'photo-1507003211169-0a1dd7228f2d'
                                ].map((id, i) => (
                                    <img
                                        key={i}
                                        src={`https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=80&h=80`}
                                        className="w-12 h-12 rounded-full border-2 border-white/50 shadow-sm object-cover"
                                        alt="Patient"
                                    />
                                ))}
                                <div className="w-12 h-12 rounded-full border-2 border-white/50 bg-teal-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                                    10K+
                                </div>
                            </div>
                            <p className="text-xs font-bold text-teal-100 uppercase tracking-wider">
                                10,000+ Happy Patients
                            </p>
                        </div>
                    </div>

                    {/* Right Column: TRANSPARENT GLASSMORPHIC FORM */}
                    <div className="lg:w-[40%] w-full max-w-lg animate-in fade-in slide-in-from-right-8 duration-700">
                        <div className="bg-white/10 backdrop-blur-3xl p-10 rounded-[48px] shadow-2xl border border-white/20">
                            <h2 className="text-3xl font-bold mb-8 text-white">Book an Appointment</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-teal-200 uppercase tracking-[0.1em]">Appointment Date</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-teal-400/20 focus:border-teal-400 transition-all placeholder-white/40"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-teal-200 uppercase tracking-[0.1em]">Service Type</label>
                                        <div className="relative">
                                            <select
                                                required
                                                className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-teal-400/20 focus:border-teal-400 transition-all appearance-none"
                                                value={formData.service}
                                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                            >
                                                <option value="" className="text-gray-900">Select Service</option>
                                                <option value="cleaning" className="text-gray-900">Teeth Cleaning</option>
                                                <option value="whitening" className="text-gray-900">Whitening</option>
                                                <option value="ortho" className="text-gray-900">Orthodontics</option>
                                                <option value="implant" className="text-gray-900">Dental Implants</option>
                                            </select>
                                            <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"></i>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-teal-200 uppercase tracking-[0.1em]">Your Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-teal-400/20 focus:border-teal-400 transition-all placeholder-white/30"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-teal-200 uppercase tracking-[0.1em]">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        required
                                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-teal-400/20 focus:border-teal-400 transition-all placeholder-white/30"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isBooked}
                                    className={`w-full py-5 rounded-2xl font-bold text-lg text-white transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 ${isBooked ? 'bg-green-500' : 'bg-teal-500 hover:bg-teal-400 hover:shadow-teal-500/40'
                                        }`}
                                >
                                    {isBooked ? (
                                        <>
                                            <i className="fa-solid fa-circle-check"></i> Booking Confirmed!
                                        </>
                                    ) : (
                                        <>
                                            Book Appointment Now <i className="fa-solid fa-arrow-right text-sm opacity-50"></i>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle Bottom Stats Overlay */}
            <div className="absolute bottom-10 left-0 right-0 z-10 px-6 hidden md:block">
                <div className="container mx-auto">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-4 text-white/80 bg-black/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                            <span className="text-2xl font-black text-teal-400">98%</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Success<br />Rate</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/80 bg-black/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                            <span className="text-2xl font-black text-teal-400">24/7</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Emergency<br />Care</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
