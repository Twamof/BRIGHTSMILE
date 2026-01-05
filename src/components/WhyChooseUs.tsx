import React from 'react';

const WhyChooseUs: React.FC = () => {
    const benefits = [
        { title: 'Modern Equipment', desc: 'We use the latest 3D imaging and laser tech.', icon: 'fa-laptop-medical' },
        { title: 'Expert Team', desc: 'Over 20+ years of collective dental experience.', icon: 'fa-user-nurse' },
        { title: 'Affordable Care', desc: 'Flexible payment plans for every budget.', icon: 'fa-credit-card' },
        { title: 'Painless Treatment', desc: 'Gentle procedures for max patient comfort.', icon: 'fa-heart-pulse' }
    ];

    return (
        <section id="why-us" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Main Image on Left */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800&h=1000"
                                alt="Our Modern Clinic"
                                className="w-full h-auto object-cover max-h-[600px]"
                            />
                        </div>
                        {/* Floating Info Card */}
                        <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[32px] shadow-2xl shadow-teal-900/10 border border-gray-100 hidden md:block max-w-[280px]">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                                    <i className="fa-solid fa-certificate text-xl"></i>
                                </div>
                                <span className="font-bold text-gray-800">Certified Elite Practice</span>
                            </div>
                            <p className="text-sm text-gray-500 italic">"Consistently recognized for excellence in patient safety."</p>
                        </div>
                    </div>

                    {/* Text Content on Right */}
                    <div className="lg:w-1/2 space-y-8">
                        <div className="space-y-4">
                            <span className="text-teal-600 font-bold uppercase tracking-widest text-xs">About Us</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                                A Simple Way to Save on Dental Care
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our team of skilled and experienced dental professionals strives to create a comfortable and welcoming environment for each and every patient. We offer a wide range of services designed to keep your smile healthy and vibrant.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="shrink-0 w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                                        <i className={`fa-solid ${benefit.icon}`}></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">{benefit.title}</h4>
                                        <p className="text-sm text-gray-500 leading-snug">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <a
                                href="#booking"
                                className="inline-flex items-center gap-3 bg-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-700 shadow-xl shadow-teal-600/30 transition-all group"
                            >
                                Book Your First Visit
                                <i className="fa-regular fa-calendar-check transition-transform group-hover:scale-110"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
