import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FloatingWhatsApp() {
  const { dir } = useLanguage();

  const handleWhatsAppClick = () => {
    const phoneNumber = "966568652222";
    const message = encodeURIComponent(
      dir === "rtl" 
        ? "مرحباً، أرغب في الاستفسار عن خدماتكم" 
        : "Hello, I would like to inquire about your services"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <motion.button
        onClick={handleWhatsAppClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 group"
        title={dir === "rtl" ? "تواصل معنا عبر الواتساب" : "Contact us via WhatsApp"}
      >
        <FaWhatsapp size={28} />
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap"
        >
          {dir === "rtl" ? "تواصل معنا" : "Contact us"}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}