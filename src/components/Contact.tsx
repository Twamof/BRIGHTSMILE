import React from 'react';

const Contact: React.FC = () => {
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
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Service Required</label>
                                    <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium appearance-none">
                                        <option>General Checkup</option>
                                        <option>Teeth Whitening</option>
                                        <option>Dental Implants</option>
                                        <option>Emergency Care</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Your Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="How can we help you?"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium resize-none"
                                    ></textarea>
                                </div>
                                <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-teal-600 transition-all shadow-xl hover:shadow-teal-600/20 active:scale-[0.98]">
                                    Send Message <i className="fa-solid fa-paper-plane ml-2 text-sm opacity-50"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
