import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
    return (
        <section id="services" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-xl space-y-4">
                        <span className="text-teal-600 font-bold uppercase tracking-widest text-sm">Our Services</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            Comprehensive Dental Solutions for All Ages
                        </h2>
                    </div>
                    <button className="bg-gray-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-gray-800 transition-all flex items-center gap-2">
                        View All Services <i className="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SERVICES.map((service) => (
                        <div
                            key={service.id}
                            className="p-8 rounded-[32px] border border-gray-100 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-900/5 transition-all group"
                        >
                            <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform`}>
                                <i className={`fa-solid ${service.icon}`}></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                {service.description}
                            </p>
                            <a href="#" className="text-sm font-bold text-gray-900 flex items-center gap-2 group-hover:text-teal-600 transition-colors">
                                Read More <i className="fa-solid fa-arrow-right-long transition-transform group-hover:translate-x-1"></i>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
