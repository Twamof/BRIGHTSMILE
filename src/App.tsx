import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Login from './pages/Login';
import DoctorDashboard from './pages/DoctorDashboard';
import NurseDashboard from './pages/NurseDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function PublicWebsite() {
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

function App() {
    return (
        <Routes>
            {/* Public website */}
            <Route path="/" element={<PublicWebsite />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />

            {/* Doctor Dashboard — protected */}
            <Route path="/dashboard" element={
                <ProtectedRoute allowedRole="doctor">
                    <DoctorDashboard />
                </ProtectedRoute>
            } />

            {/* Nurse Dashboard — protected */}
            <Route path="/nurse" element={
                <ProtectedRoute allowedRole="nurse">
                    <NurseDashboard />
                </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
