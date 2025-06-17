import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import ModernNavbar from "./components/ModernNavbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { FloatingWhatsAppButton } from "./components/FloatingWhatsAppButton";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <ModernNavbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsAppButton />
      </Router>
    </LanguageProvider>
  );
}

export default App;
