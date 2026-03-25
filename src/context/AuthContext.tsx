import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AuthUser, UserRole, Booking, Message, NursePermissions } from '../types';
import { CREDENTIALS } from '../config';
import { BookingService, MessageService, PermissionService } from '../services/api';

interface AuthContextValue {
    currentUser: AuthUser | null;
    bookings: Booking[];
    messages: Message[];
    nursePermissions: NursePermissions;
    login: (username: string, password: string, role: UserRole) => boolean;
    logout: () => void;
    addBooking: (data: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void;
    addMessage: (data: Omit<Message, 'id' | 'isRead' | 'createdAt'>) => void;
    updateBookingStatus: (id: string, status: Booking['status']) => void;
    markMessageRead: (id: string) => void;
    togglePermission: (key: keyof NursePermissions) => void;
    refreshData: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = 'bs_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
        const saved = sessionStorage.getItem(SESSION_KEY);
        return saved ? JSON.parse(saved) : null;
    });

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [nursePermissions, setNursePermissions] = useState<NursePermissions>(PermissionService.get());

    const refreshData = useCallback(() => {
        setBookings(BookingService.getAll());
        setMessages(MessageService.getAll());
        setNursePermissions(PermissionService.get());
    }, []);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    const login = (username: string, password: string, role: UserRole): boolean => {
        const cred = CREDENTIALS[role];
        if (cred.username === username && cred.password === password) {
            const user: AuthUser = { username, displayName: cred.displayName, role };
            setCurrentUser(user);
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
            refreshData();
            return true;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem(SESSION_KEY);
    };

    const addBooking = (data: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
        BookingService.add(data);
        setBookings(BookingService.getAll());
    };

    const addMessage = (data: Omit<Message, 'id' | 'isRead' | 'createdAt'>) => {
        MessageService.add(data);
        setMessages(MessageService.getAll());
    };

    const updateBookingStatus = (id: string, status: Booking['status']) => {
        BookingService.updateStatus(id, status);
        setBookings(BookingService.getAll());
    };

    const markMessageRead = (id: string) => {
        MessageService.markRead(id);
        setMessages(MessageService.getAll());
    };

    const togglePermission = (key: keyof NursePermissions) => {
        const updated = PermissionService.toggle(key);
        setNursePermissions(updated);
    };

    return (
        <AuthContext.Provider value={{
            currentUser, bookings, messages, nursePermissions,
            login, logout, addBooking, addMessage,
            updateBookingStatus, markMessageRead, togglePermission, refreshData,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
