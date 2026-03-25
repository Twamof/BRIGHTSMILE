import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Booking } from '../types';
import { sendConfirmation, sendReminder, sendReviewRequest } from '../utils/whatsapp';
import toast from 'react-hot-toast';

const NurseDashboard: React.FC = () => {
    const { currentUser, bookings, messages, nursePermissions, updateBookingStatus, markMessageRead, logout } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<string>('overview');

    const handleLogout = () => { logout(); navigate('/login'); };

    const pending  = bookings.filter(b => b.status === 'pending').length;
    const unread   = messages.filter(m => !m.isRead).length;
    const accepted = bookings.filter(b => b.status === 'accepted').length;

    // Only show sections the doctor has enabled
    const navItems = [
        { id: 'overview',  label: 'Overview',  icon: 'fa-house',          show: true },
        { id: 'bookings',  label: 'Bookings',  icon: 'fa-calendar-check', show: nursePermissions.viewBookings },
        { id: 'messages',  label: 'Messages',  icon: 'fa-envelope',       show: nursePermissions.viewMessages },
    ].filter(n => n.show);

    const handleStatus = (id: string, status: Booking['status']) => {
        if (!nursePermissions.manageBookings) {
            toast.error('You don\'t have permission to manage bookings');
            return;
        }
        updateBookingStatus(id, status);
        toast.success(status === 'accepted' ? '✅ Booking accepted' : '❌ Booking rejected');
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">

            {/* Sidebar */}
            <aside className="w-64 bg-gray-900/80 backdrop-blur border-r border-white/5 flex flex-col fixed top-0 left-0 h-full z-40">
                <div className="flex items-center gap-3 p-5 border-b border-white/5">
                    <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-tooth text-white" />
                    </div>
                    <div>
                        <span className="font-extrabold text-white block leading-tight">BRIGHTSMILE</span>
                        <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Nurse Portal</span>
                    </div>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                activeSection === item.id
                                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <i className={`fa-solid ${item.icon} w-5 text-center`} />
                            <span className="flex-1 text-left">
                                {item.label}
                                {item.id === 'bookings' && pending > 0 && (
                                    <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white text-[10px] rounded-full">{pending}</span>
                                )}
                                {item.id === 'messages' && unread > 0 && (
                                    <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-[10px] rounded-full">{unread}</span>
                                )}
                            </span>
                        </button>
                    ))}

                    {/* Locked sections indicator */}
                    {(!nursePermissions.viewBookings || !nursePermissions.viewMessages) && (
                        <div className="mt-4 px-4 py-3 rounded-xl bg-white/2 border border-white/5">
                            <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-2">Restricted</p>
                            {!nursePermissions.viewBookings && (
                                <div className="flex items-center gap-2 text-xs text-gray-600 py-1">
                                    <i className="fa-solid fa-lock text-[10px]" /> Bookings
                                </div>
                            )}
                            {!nursePermissions.viewMessages && (
                                <div className="flex items-center gap-2 text-xs text-gray-600 py-1">
                                    <i className="fa-solid fa-lock text-[10px]" /> Messages
                                </div>
                            )}
                        </div>
                    )}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400">
                            <i className="fa-solid fa-user-nurse text-sm" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white">{currentUser?.displayName}</p>
                            <p className="text-[10px] text-orange-400 uppercase">Nurse</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-xs transition-colors">
                        <i className="fa-solid fa-right-from-bracket" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 ml-64 p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white">
                            {navItems.find(n => n.id === activeSection)?.label ?? 'Overview'}
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <a href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-teal-400 transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                        <i className="fa-solid fa-globe" /> Public Site
                    </a>
                </div>

                {/* OVERVIEW */}
                {activeSection === 'overview' && (
                    <div className="space-y-6">
                        {nursePermissions.viewStats && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {[
                                    { label: 'Total Bookings', value: bookings.length, icon: 'fa-calendar',     color: 'teal' },
                                    { label: 'Pending',        value: pending,         icon: 'fa-clock',        color: 'orange' },
                                    { label: 'Accepted',       value: accepted,        icon: 'fa-circle-check', color: 'green' },
                                ].map(stat => (
                                    <div key={stat.label} className="bg-gray-900/60 border border-white/5 rounded-[24px] p-6">
                                        <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-2xl flex items-center justify-center text-${stat.color}-400 mb-4`}>
                                            <i className={`fa-solid ${stat.icon} text-lg`} />
                                        </div>
                                        <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                                        <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Locked notice if limited access */}
                        {!nursePermissions.viewStats && !nursePermissions.viewBookings && !nursePermissions.viewMessages && (
                            <div className="bg-gray-900/60 border border-white/5 rounded-[24px] p-12 text-center">
                                <i className="fa-solid fa-lock text-5xl text-gray-700 mb-4 block" />
                                <h3 className="text-xl font-bold text-gray-400 mb-2">Limited Access</h3>
                                <p className="text-gray-600 text-sm">The doctor hasn't granted you any permissions yet. Please contact Dr. {' '}
                                    to enable your access.</p>
                            </div>
                        )}

                        {nursePermissions.viewBookings && bookings.length > 0 && (
                            <div className="bg-gray-900/60 border border-white/5 rounded-[24px] p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-white">Recent Bookings</h2>
                                    <button onClick={() => setActiveSection('bookings')} className="text-orange-400 text-sm hover:underline">View all</button>
                                </div>
                                <div className="space-y-3">
                                    {bookings.slice(0, 3).map(b => (
                                        <NurseBookingRow
                                            key={b.id}
                                            booking={b}
                                            canManage={nursePermissions.manageBookings}
                                            canWhatsApp={nursePermissions.useWhatsApp}
                                            onStatus={handleStatus}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* BOOKINGS */}
                {activeSection === 'bookings' && nursePermissions.viewBookings && (
                    <div className="bg-gray-900/60 border border-white/5 rounded-[24px] p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="font-bold text-white flex-1">All Bookings</h2>
                            <span className="text-xs px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/20">{bookings.length} total</span>
                        </div>
                        {bookings.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">
                                <i className="fa-solid fa-calendar-xmark text-5xl mb-4 block opacity-20" />
                                <p>No bookings yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {bookings.map(b => (
                                    <NurseBookingRow
                                        key={b.id}
                                        booking={b}
                                        canManage={nursePermissions.manageBookings}
                                        canWhatsApp={nursePermissions.useWhatsApp}
                                        onStatus={handleStatus}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* MESSAGES */}
                {activeSection === 'messages' && nursePermissions.viewMessages && (
                    <div className="bg-gray-900/60 border border-white/5 rounded-[24px] p-6">
                        <h2 className="font-bold text-white mb-6">Contact Messages</h2>
                        {messages.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">
                                <i className="fa-solid fa-inbox text-5xl mb-4 block opacity-20" />
                                <p>No messages yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {messages.map(m => (
                                    <div
                                        key={m.id}
                                        onClick={() => markMessageRead(m.id)}
                                        className={`p-5 rounded-2xl border transition-all cursor-pointer ${m.isRead ? 'border-white/5' : 'border-orange-500/20 bg-orange-500/5'}`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                                                <i className="fa-solid fa-user text-sm" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-white">{m.fullName}</span>
                                                    {!m.isRead && <span className="w-2 h-2 bg-orange-400 rounded-full" />}
                                                    <span className="ml-auto text-xs text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-xs text-orange-400 mb-2">{m.email} • {m.service}</p>
                                                <p className="text-sm text-gray-300">{m.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

// ── Nurse Booking Row ─────────────────────────────────────────────────────────
interface NurseBookingRowProps {
    booking: Booking;
    canManage: boolean;
    canWhatsApp: boolean;
    onStatus: (id: string, status: Booking['status']) => void;
}

const NurseBookingRow: React.FC<NurseBookingRowProps> = ({ booking, canManage, canWhatsApp, onStatus }) => {
    const statusStyle = {
        pending:  'bg-orange-500/20 text-orange-300 border-orange-500/20',
        accepted: 'bg-green-500/20 text-green-300 border-green-500/20',
        rejected: 'bg-red-500/20 text-red-300 border-red-500/20',
    }[booking.status];

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-white">{booking.patientName}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase ${statusStyle}`}>{booking.status}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <span className="text-xs text-gray-400"><i className="fa-solid fa-tooth mr-1" />{booking.service}</span>
                    <span className="text-xs text-gray-400"><i className="fa-solid fa-calendar mr-1" />{booking.date}</span>
                    <span className="text-xs text-gray-400"><i className="fa-solid fa-phone mr-1" />{booking.phone}</span>
                </div>
            </div>
            <div className="flex gap-2 flex-wrap shrink-0">
                {canManage && booking.status === 'pending' && (
                    <>
                        <button onClick={() => onStatus(booking.id, 'accepted')} className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-xl text-xs font-bold border border-green-500/20 transition-all">
                            <i className="fa-solid fa-check mr-1" />Accept
                        </button>
                        <button onClick={() => onStatus(booking.id, 'rejected')} className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl text-xs font-bold border border-red-500/20 transition-all">
                            <i className="fa-solid fa-xmark mr-1" />Reject
                        </button>
                    </>
                )}
                {canWhatsApp && (
                    <>
                        <button onClick={() => sendConfirmation(booking.phone, booking.patientName, booking.service, booking.date)} className="px-3 py-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded-xl text-xs font-bold border border-[#25D366]/20 transition-all">
                            <i className="fa-brands fa-whatsapp mr-1" />Confirm
                        </button>
                        <button onClick={() => sendReminder(booking.phone, booking.patientName, booking.service, booking.date)} className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-xl text-xs font-bold border border-blue-500/20 transition-all">
                            <i className="fa-solid fa-bell mr-1" />Remind
                        </button>
                        <button onClick={() => sendReviewRequest(booking.phone, booking.patientName)} className="px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded-xl text-xs font-bold border border-yellow-500/20 transition-all">
                            <i className="fa-solid fa-star mr-1" />Review
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default NurseDashboard;
