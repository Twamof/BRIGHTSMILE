import type { Service, Testimonial } from './types';

export const SERVICES: Service[] = [
    {
        id: 1,
        title: 'Cavity Protection',
        description: 'Advanced treatments to prevent and repair tooth decay using high-quality materials.',
        icon: 'fa-tooth',
        color: 'bg-green-100 text-green-600'
    },
    {
        id: 2,
        title: 'Root Canal Treatment',
        description: 'Painless procedures to save damaged teeth and eliminate infection effectively.',
        icon: 'fa-bacteria',
        color: 'bg-purple-100 text-purple-600'
    },
    {
        id: 3,
        title: 'Teeth Straightening',
        description: 'Invisalign and traditional braces to give you the perfect, aligned smile you deserve.',
        icon: 'fa-teeth-open',
        color: 'bg-blue-100 text-blue-600'
    },
    {
        id: 4,
        title: 'Dental Implants',
        description: 'Permanent solutions for missing teeth that look and feel completely natural.',
        icon: 'fa-pencil',
        color: 'bg-orange-100 text-orange-600'
    }
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: 'Kevin Martin',
        role: 'Patient',
        content: 'The best dental experience I have ever had. The team is professional and the facility is top-notch. My smile has never looked better!',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80',
        rating: 5
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        role: 'Patient',
        content: 'I used to be terrified of dentists, but BrightSmile changed that. They are so gentle and caring. Highly recommend for anxious patients.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=80&h=80',
        rating: 5
    },
    {
        id: 3,
        name: 'Michael Chen',
        role: 'Patient',
        content: 'Quick, efficient, and great results. The booking process was seamless and I was in and out for my cleaning in no time.',
        avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=80&h=80',
        rating: 5
    }
];
