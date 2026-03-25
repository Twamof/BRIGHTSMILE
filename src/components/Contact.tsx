import React, { useState } from 'react';
import { CONTACT_SCRIPT_URL } from '../config';
import { MessageService } from '../services/api';



const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        service: 'General Checkup',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('fullName', formData.fullName);
            data.append('email', formData.email);
            data.append('service', formData.service);
            data.append('message', formData.message);

            await fetch(CONTACT_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: data
            });

            // Save to localStorage for Dashboard
            MessageService.add({
                fullName: formData.fullName,
                email: formData.email,
                service: formData.service,
                message: formData.message,
            });

            setSubmitted(true);
            setFormData({
                fullName: '',
                email: '',
                service: 'General Checkup',
                message: ''
            });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            console.error('Error!', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Contact Info */}
                    <div className="lg:w-1/3 space-y-8">
                        <div>
                            <span className="text-teal-600 font-bold uppercase tracking-widest text-sm">Contact Us</span>
                            <h2 className="text-4xl font-extrabold text-gray-900 mt-4 leading-tight">
                                Get in Touch for a Brighter Smile
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm border border-gray-100 shrink-0">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Phone Number</h4>
                                    <p className="text-gray-500 font-medium">+1 (234) 567-890</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm border border-gray-100 shrink-0">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Email Address</h4>
                                    <p className="text-gray-500 font-medium">hello@brightsmile.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm border border-gray-100 shrink-0">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Our Location</h4>
                                    <p className="text-gray-500 font-medium">123 Dental Street, Sunshine City</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-teal-600 rounded-[32px] text-white">
                            <h4 className="font-bold mb-2">Emergency Service</h4>
                            <p className="text-teal-50 text-sm mb-4">Our experts are available for emergency dental care 24/7.</p>
                            <a href="tel:+1234567890" className="bg-white text-teal-600 px-6 py-2 rounded-full text-sm font-bold inline-block">
                                Call Now
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white p-10 rounded-[48px] shadow-2xl shadow-teal-900/5 border border-gray-100">
                            {submitted ? (
                                <div className="text-center py-12 space-y-4">
                                    <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Message Sent Successfully!</h3>
                                    <p className="text-gray-500">Thank you for reaching out. We'll get back to you shortly.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-teal-600 font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                required
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Service Required</label>
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium appearance-none"
                                        >
                                            <option>General Checkup</option>
                                            <option>Teeth Whitening</option>
                                            <option>Dental Implants</option>
                                            <option>Emergency Care</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Your Message</label>
                                        <textarea
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="How can we help you?"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium resize-none"
                                        ></textarea>
                                    </div>
                                    <button
                                        disabled={loading}
                                        className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-teal-600 transition-all shadow-xl hover:shadow-teal-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <i className="fa-solid fa-circle-notch animate-spin"></i> Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message <i className="fa-solid fa-paper-plane text-sm opacity-50"></i>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
