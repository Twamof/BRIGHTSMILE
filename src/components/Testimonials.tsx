import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-24 bg-teal-50/50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="text-teal-600 font-bold uppercase tracking-widest text-sm">Patient Stories</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">What Our Clients Say</h2>
                    <p className="text-gray-500 text-lg">
                        Join thousands of satisfied patients who have transformed their smiles with our expert dental team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-2xl hover:shadow-teal-900/10 transition-all border border-gray-100 flex flex-col"
                        >
                            <div className="flex gap-1 text-orange-400 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <i key={i} className="fa-solid fa-star text-sm"></i>
                                ))}
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg italic mb-8 flex-grow">
                                {testimonial.content}
                            </p>
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500 font-medium">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-teal-600 rounded-[40px] p-8 md:p-12 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-bold text-white">Ready for a brighter smile?</h3>
                            <p className="text-teal-100">Schedule your free consultation today and start your journey.</p>
                        </div>
                        <a href="#booking" className="whitespace-nowrap bg-white text-teal-600 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:bg-teal-50 transition-all">
                            Book Appointment Now
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
