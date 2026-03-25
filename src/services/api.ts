/**
 * API Service Layer — Adapter Pattern
 * ─────────────────────────────────────
 * الآن:   يقرأ/يكتب من localStorage
 * لاحقاً: نغيّر التنفيذ الداخلي فقط → axios.get('/api/...') بدون تغيير أي مكوّن
 */

import type { Booking, Message, NursePermissions } from '../types';

const LS = {
    BOOKINGS:    'bs_bookings',
    MESSAGES:    'bs_messages',
    PERMISSIONS: 'bs_nurse_permissions',
};

// ─── Default Nurse Permissions ────────────────────────────────────────────────
const DEFAULT_PERMISSIONS: NursePermissions = {
    viewBookings:    true,
    manageBookings:  false,
    viewMessages:    false,
    viewStats:       false,
    useWhatsApp:     true,
};

// ─── Booking Service ──────────────────────────────────────────────────────────
export const BookingService = {
    getAll(): Booking[] {
        return JSON.parse(localStorage.getItem(LS.BOOKINGS) || '[]');
    },
    add(booking: Omit<Booking, 'id' | 'status' | 'createdAt'>): Booking {
        const newBooking: Booking = {
            ...booking,
            id: crypto.randomUUID(),
            status: 'pending',
            createdAt: new Date().toISOString(),
        };
        const all = this.getAll();
        localStorage.setItem(LS.BOOKINGS, JSON.stringify([newBooking, ...all]));
        return newBooking;
    },
    updateStatus(id: string, status: Booking['status']): void {
        const all = this.getAll().map(b => b.id === id ? { ...b, status } : b);
        localStorage.setItem(LS.BOOKINGS, JSON.stringify(all));
    },
    delete(id: string): void {
        const all = this.getAll().filter(b => b.id !== id);
        localStorage.setItem(LS.BOOKINGS, JSON.stringify(all));
    },
};

// ─── Message Service ──────────────────────────────────────────────────────────
export const MessageService = {
    getAll(): Message[] {
        return JSON.parse(localStorage.getItem(LS.MESSAGES) || '[]');
    },
    add(msg: Omit<Message, 'id' | 'isRead' | 'createdAt'>): Message {
        const newMsg: Message = {
            ...msg,
            id: crypto.randomUUID(),
            isRead: false,
            createdAt: new Date().toISOString(),
        };
        const all = this.getAll();
        localStorage.setItem(LS.MESSAGES, JSON.stringify([newMsg, ...all]));
        return newMsg;
    },
    markRead(id: string): void {
        const all = this.getAll().map(m => m.id === id ? { ...m, isRead: true } : m);
        localStorage.setItem(LS.MESSAGES, JSON.stringify(all));
    },
};

// ─── Permission Service ───────────────────────────────────────────────────────
export const PermissionService = {
    get(): NursePermissions {
        const saved = localStorage.getItem(LS.PERMISSIONS);
        return saved ? { ...DEFAULT_PERMISSIONS, ...JSON.parse(saved) } : DEFAULT_PERMISSIONS;
    },
    set(permissions: NursePermissions): void {
        localStorage.setItem(LS.PERMISSIONS, JSON.stringify(permissions));
    },
    toggle(key: keyof NursePermissions): NursePermissions {
        const current = this.get();
        const updated = { ...current, [key]: !current[key] };
        this.set(updated);
        return updated;
    },
};
