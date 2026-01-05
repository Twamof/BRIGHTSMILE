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
