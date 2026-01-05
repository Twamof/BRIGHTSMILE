import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white">
                                <i className="fa-solid fa-tooth text-xl"></i>
                            </div>
                            <span className="text-2xl font-bold tracking-tight">BRIGHTSMILE</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Providing exceptional dental care since 1998. Your smile is our priority, and we're committed to delivering excellence.
                        </p>
                        <div className="flex gap-4">
                            {['facebook', 'instagram', 'twitter', 'linkedin'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-600 transition-colors"
                                >
                                    <i className={`fa-brands fa-${social}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-bold mb-8">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'About Us', 'Services', 'Doctor Consultations', 'Latest Insights', 'Privacy Policy'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2 group">
                                        <i className="fa-solid fa-chevron-right text-[10px] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"></i>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Services */}
                    <div>
                        <h4 className="text-xl font-bold mb-8">Our Services</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li>Root Canal Treatment</li>
                            <li>Cavity Protection</li>
                            <li>Teeth Whitening</li>
                            <li>Cosmetic Dentistry</li>
                            <li>Orthodontic Services</li>
                            <li>Children's Dentistry</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-bold mb-8">Contact Info</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 text-teal-400">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <span className="text-gray-400">123 Dental Street, Medical Plaza, Suite 400, New York, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 text-teal-400">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <span className="text-gray-400">+1 (234) 567-890</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center shrink-0 text-teal-400">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <span className="text-gray-400">hello@brightsmile.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-500 text-sm">
                            © 2024 BrightSmile Dental Clinic. All rights reserved.
                        </p>
                        <p className="text-gray-600 text-[10px] font-medium tracking-widest uppercase flex items-center gap-2">
                            Designed & Developed by
                            <a
                                href="https://vertex-digital-digital.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-500 font-bold hover:text-white transition-all duration-300 relative group"
                            >
                                VERTEX DIGITAL
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </p>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
