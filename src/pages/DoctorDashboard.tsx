import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Booking, NursePermissions } from '../types';
import { sendConfirmation, sendReminder, sendReviewRequest } from '../utils/whatsapp';
import toast from 'react-hot-toast';

type Tab = 'overview' | 'bookings' | 'messages' | 'permissions' | 'schedule';

const DoctorDashboard: React.FC = () => {
    const { currentUser, bookings, messages, nursePermissions, updateBookingStatus, markMessageRead, togglePermission, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => { logout(); navigate('/login'); };

    const pending   = bookings.filter(b => b.status === 'pending').length;
    const unread    = messages.filter(m => !m.isRead).length;
    const accepted  = bookings.filter(b => b.status === 'accepted').length;

    const tabs: { id: Tab; label: string; icon: string }[] = [
        { id: 'overview',     label: 'Overview',    icon: 'fa-chart-pie' },
        { id: 'bookings',     label: 'Bookings',    icon: 'fa-calendar-check' },
        { id: 'messages',     label: 'Messages',    icon: 'fa-envelope' },
        { id: 'permissions',  label: 'Nurse Access', icon: 'fa-user-shield' },
        { id: 'schedule',     label: 'Schedule',    icon: 'fa-clock' },
    ];

    const handleStatus = (id: string, status: Booking['status']) => {
        updateBookingStatus(id, status);
        toast.success(status === 'accepted' ? '✅ Booking accepted' : '❌ Booking rejected');
    };

    const PERMISSION_LABELS: Record<keyof NursePermissions, string> = {
        viewBookings:   'View Bookings',
        manageBookings: 'Accept / Reject Bookings',
        viewMessages:   'View Messages',
        viewStats:      'View Statistics',
        useWhatsApp:    'Use WhatsApp Buttons',
    };

    const PERM_ICONS: Record<keyof NursePermissions, string> = {
        viewBookings:   'fa-calendar',
        manageBookings: 'fa-calendar-check',
        viewMessages:   'fa-envelope',
        viewStats:      'fa-chart-bar',
        useWhatsApp:    'fa-whatsapp',
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">

            {/* ── Sidebar ─────────────────────────────────────────── */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900/80 backdrop-blur border-r border-white/5 flex flex-col transition-all duration-300 fixed top-0 left-0 h-full z-40`}>

                {/* Logo */}
                <div className="flex items-center gap-3 p-5 border-b border-white/5">
                    <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-tooth text-white" />
                    </div>
                    {sidebarOpen && <span className="font-extrabold text-white tracking-tight">BRIGHTSMILE</span>}
                </div>

                {/* Nav */}
                <nav className="flex-1 py-6 px-3 space-y-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                activeTab === tab.id
                                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <i className={`fa-solid ${tab.icon} w-5 text-center`} />
                            {sidebarOpen && (
                                <span className="flex-1 text-left">
                                    {tab.label}
                                    {tab.id === 'bookings' && pending > 0 && (
                                        <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white text-[10px] rounded-full">{pending}</span>
                                    )}
                                    {tab.id === 'messages' && unread > 0 && (
                                        <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-[10px] rounded-full">{unread}</span>
                                    )}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* User + Logout */}
                <div className="p-4 border-t border-white/5">
                    {sidebarOpen && (
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400">
                                <i className="fa-solid fa-user-doctor text-sm" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white">{currentUser?.displayName}</p>
                                <p className="text-[10px] text-teal-400 uppercase">Doctor</p>
                            </div>
                        </div>
                    )}
                    <button onClick={handleLogout} className={`w-full flex items-center gap-2 text-gray-400 hover:text-red-400 text-xs transition-colors ${sidebarOpen ? 'justify-start' : 'justify-center'}`}>
                        <i className="fa-solid fa-right-from-bracket" />
                        {sidebarOpen && 'Sign Out'}
                    </button>
                </div>

                {/* Collapse button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute -right-3 top-24 w-6 h-6 bg-gray-800 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white text-[10px]"
                >
                    <i className={`fa-solid ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`} />
                </button>
            </aside>

            {/* ── Main Content ─────────────────────────────────────── */}
            <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white">
                            {tabs.find(t => t.id === activeTab)?.label}
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <a
                        href="/"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-teal-400 transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/5"
                    >
                        <i className="fa-solid fa-globe" /> Public Site
                    </a>
                </div>

                {/* ── OVERVIEW ── */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Total Bookings',   value: bookings.length, icon: 'fa-calendar',       color: 'teal' },
                                { label: 'Pending',          value: pending,         icon: 'fa-clock',          color: 'orange' },
                                { label: 'Accepted',         value: accepted,        icon: 'fa-circle-check',   color: 'green' },
                                { label: 'Unread Messages',  value: unread,          icon: 'fa-envelope',       color: 'purple' },
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

                        {/* Recent Bookings Preview */}
                        <div className="bg-gray-900/60 border border-white/5 rounded-[24px] p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-bold text-white">Recent Bookings</h2>
                                <button onClick={() => setActiveTab('bookings')} className="text-teal-400 text-sm hover:underline">View all</button>
                            </div>
                            {bookings.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <i className="fa-solid fa-calendar-xmark text-4xl mb-3 block opacity-30" />
                                    <p>No bookings yet. They'll appear here when patients book from the website.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {bookings.slice(0, 5).map(b => (
                                        <BookingRow key={b.id} booking={b} onStatus={handleStatus} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── BOOKINGS ── */}
                {activeTab === 'bookings' && (
                    <div className="bg-gray-900/60 border border-white/5 rounded-[24px] p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="font-bold text-white flex-1">All Bookings</h2>
                            <span className="text-xs px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full border border-teal-500/20">{bookings.length} total</span>
                        </div>
                        {bookings.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">
                                <i className="fa-solid fa-calendar-xmark text-5xl mb-4 block opacity-20" />
                                <p className="text-lg font-medium">No bookings yet</p>
                                <p className="text-sm mt-1">Patient bookings from the website appear here automatically.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {bookings.map(b => (
                                    <BookingRow key={b.id} booking={b} onStatus={handleStatus} full />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── MESSAGES ── */}
                {activeTab === 'messages' && (
                    <div className="bg-gray-900/60 border border-white/5 rounded-[24px] p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="font-bold text-white flex-1">Contact Messages</h2>
                            {unread > 0 && <span className="text-xs px-3 py-1 bg-red-500/20 text-red-300 rounded-full border border-red-500/20">{unread} unread</span>}
                        </div>
                        {messages.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">
                                <i className="fa-solid fa-inbox text-5xl mb-4 block opacity-20" />
                                <p className="text-lg font-medium">No messages yet</p>
                                <p className="text-sm mt-1">Messages from the contact form appear here.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {messages.map(m => (
                                    <div
                                        key={m.id}
                                        onClick={() => markMessageRead(m.id)}
                                        className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                                            m.isRead ? 'border-white/5 bg-white/2' : 'border-teal-500/20 bg-teal-500/5'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                                                <i className="fa-solid fa-user text-sm" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-white">{m.fullName}</span>
                                                    {!m.isRead && <span className="w-2 h-2 bg-teal-400 rounded-full" />}
                                                    <span className="ml-auto text-xs text-gray-500">{new Date(m.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-xs text-teal-400 mb-2">{m.email} • {m.service}</p>
                                                <p className="text-sm text-gray-300 truncate">{m.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── PERMISSIONS ── */}
                {activeTab === 'permissions' && (
                    <div className="max-w-2xl">
                        <div className="bg-gray-900/60 border border-white/5 rounded-[24px] p-6 mb-6">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400">
                                    <i className="fa-solid fa-user-nurse" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-white">Nurse Access Control</h2>
                                    <p className="text-sm text-gray-400">Control what the nurse can see and do</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {(Object.keys(PERMISSION_LABELS) as (keyof NursePermissions)[]).map(key => (
                                <div key={key} className="bg-gray-900/60 border border-white/5 rounded-2xl p-5 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                            nursePermissions[key] ? 'bg-teal-500/20 text-teal-400' : 'bg-gray-800 text-gray-500'
                                        }`}>
                                            <i className={`fa-${key === 'useWhatsApp' ? 'brands' : 'solid'} ${PERM_ICONS[key]} text-sm`} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white text-sm">{PERMISSION_LABELS[key]}</p>
                                            <p className="text-xs text-gray-500">{nursePermissions[key] ? 'Enabled' : 'Disabled'}</p>
                                        </div>
                                    </div>
                                    {/* Toggle Switch */}
                                    <button
                                        onClick={() => { togglePermission(key); toast.success(`${PERMISSION_LABELS[key]} ${nursePermissions[key] ? 'disabled' : 'enabled'}`); }}
                                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${nursePermissions[key] ? 'bg-teal-500' : 'bg-gray-700'}`}
                                    >
                                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${nursePermissions[key] ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── SCHEDULE ── */}
                {activeTab === 'schedule' && (
                    <div className="max-w-2xl bg-gray-900/60 border border-white/5 rounded-[24px] p-6">
                        <h2 className="font-bold text-white mb-6">Weekly Schedule</h2>
                        <div className="space-y-3">
                            {[
                                { day: 'Monday',    hours: '09:00 – 17:00', active: true },
                                { day: 'Tuesday',   hours: '09:00 – 17:00', active: true },
                                { day: 'Wednesday', hours: '09:00 – 13:00', active: true },
                                { day: 'Thursday',  hours: '09:00 – 17:00', active: true },
                                { day: 'Friday',    hours: 'Off',           active: false },
                                { day: 'Saturday',  hours: '10:00 – 14:00', active: true },
                                { day: 'Sunday',    hours: 'Off',           active: false },
                            ].map(({ day, hours, active }) => (
                                <div key={day} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                    <span className={`font-medium ${active ? 'text-white' : 'text-gray-600'}`}>{day}</span>
                                    <span className={`text-sm px-4 py-1.5 rounded-full ${active ? 'bg-teal-500/20 text-teal-300' : 'bg-gray-800 text-gray-600'}`}>
                                        {hours}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-4">* Schedule customization coming in Phase 2</p>
                    </div>
                )}
            </main>
        </div>
    );
};

// ── Booking Row Component ──────────────────────────────────────────────────────
interface BookingRowProps {
    booking: Booking;
    onStatus: (id: string, status: Booking['status']) => void;
    full?: boolean;
}

const BookingRow: React.FC<BookingRowProps> = ({ booking, onStatus, full = false }) => {
    const statusStyle = {
        pending:  'bg-orange-500/20 text-orange-300 border-orange-500/20',
        accepted: 'bg-green-500/20 text-green-300 border-green-500/20',
        rejected: 'bg-red-500/20 text-red-300 border-red-500/20',
    }[booking.status];

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-white">{booking.patientName}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase ${statusStyle}`}>
                        {booking.status}
                    </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <span className="text-xs text-gray-400"><i className="fa-solid fa-tooth mr-1" />{booking.service}</span>
                    <span className="text-xs text-gray-400"><i className="fa-solid fa-calendar mr-1" />{booking.date}</span>
                    {full && (
                        <span className="text-xs text-gray-400">
                            <i className="fa-solid fa-phone mr-1" />
                            <a href={`tel:${booking.phone}`} className="hover:text-teal-400 transition-colors">{booking.phone}</a>
                        </span>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap shrink-0">
                {booking.status === 'pending' && (
                    <>
                        <button onClick={() => onStatus(booking.id, 'accepted')} className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-xl text-xs font-bold border border-green-500/20 transition-all">
                            <i className="fa-solid fa-check mr-1" />Accept
                        </button>
                        <button onClick={() => onStatus(booking.id, 'rejected')} className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl text-xs font-bold border border-red-500/20 transition-all">
                            <i className="fa-solid fa-xmark mr-1" />Reject
                        </button>
                    </>
                )}
                {/* WhatsApp buttons */}
                <button
                    onClick={() => sendConfirmation(booking.phone, booking.patientName, booking.service, booking.date)}
                    className="px-3 py-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded-xl text-xs font-bold border border-[#25D366]/20 transition-all"
                    title="Send confirmation"
                >
                    <i className="fa-brands fa-whatsapp mr-1" />Confirm
                </button>
                <button
                    onClick={() => sendReminder(booking.phone, booking.patientName, booking.service, booking.date)}
                    className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-xl text-xs font-bold border border-blue-500/20 transition-all"
                    title="Send reminder"
                >
                    <i className="fa-solid fa-bell mr-1" />Remind
                </button>
                <button
                    onClick={() => sendReviewRequest(booking.phone, booking.patientName)}
                    className="px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded-xl text-xs font-bold border border-yellow-500/20 transition-all"
                    title="Request review"
                >
                    <i className="fa-solid fa-star mr-1" />Review
                </button>
            </div>
        </div>
    );
};

export default DoctorDashboard;
