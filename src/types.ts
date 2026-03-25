export interface BookingFormData {
    date: string;
    service: string;
    name: string;
    phone: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    color: string;
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    avatar: string;
    rating: number;
}

// ─── Dashboard Types ──────────────────────────────────────────────────────────
export type UserRole = 'doctor' | 'nurse';

export interface AuthUser {
    username: string;
    displayName: string;
    role: UserRole;
}

export interface Booking {
    id: string;
    patientName: string;
    phone: string;
    service: string;
    date: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: string;
}

export interface Message {
    id: string;
    fullName: string;
    email: string;
    service: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export interface NursePermissions {
    viewBookings: boolean;
    manageBookings: boolean;
    viewMessages: boolean;
    viewStats: boolean;
    useWhatsApp: boolean;
}
