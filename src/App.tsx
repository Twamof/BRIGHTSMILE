import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Contact from './components/Contact';

function App() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <Services />
                <WhyChooseUs />
                <Testimonials />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
