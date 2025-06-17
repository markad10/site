import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock, Globe, Send, MessageCircle, Calendar } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useTranslation();
  const { dir, language } = useLanguage();
  
  // Use translation values or fallback to values for the current language
  const contactT = t.contactPage || {
    hero: {
      title: language === 'ar' ? "تواصل معنا" : "Contact Us",
      subtitle: language === 'ar' ? "ابدأ رحلتك نحو النجاح مع خبراء المتحدة - نحن هنا لخدمتك" : "Start your journey to success with United Experts"
    },
    quickActions: {
      bookAppointment: {
        title: language === 'ar' ? "احجز موعد" : "Book Appointment",
        description: language === 'ar' ? "احجز موعد استشاري مع خبرائنا" : "Book a consultation with our experts"
      },
      liveChat: {
        title: language === 'ar' ? "دردشة مباشرة" : "Live Chat",
        description: language === 'ar' ? "تحدث مع فريق الدعم مباشرة" : "Talk directly with our support team"
      }
    },
    contactInfo: {
      title: language === 'ar' ? "معلومات التواصل" : "Contact Information",
      subtitle: language === 'ar' ? "تواصل معنا عبر القنوات المختلفة أو زرنا في مكاتبنا" : "Reach us through various channels or visit our offices",
      address: {
        title: language === 'ar' ? "العنوان" : "Address",
        details: language === 'ar' ? ["الرياض، المملكة العربية السعودية", "حي الملز، شارع الملك فهد"] : ["Riyadh, Kingdom of Saudi Arabia", "Al Malz District, King Fahd Road"]
      },
      phone: {
        title: language === 'ar' ? "الهاتف" : "Phone",
        details: ["+966 56 865 2222"]
      },
      email: {
        title: language === 'ar' ? "البريد الإلكتروني" : "Email",
        details: ["info@uexperts.sa", "contact@uexperts.sa"]
      }
    },
    offices: {
      title: language === 'ar' ? "مكاتبنا في المملكة" : "Our Offices in the Kingdom",
      mainOffice: language === 'ar' ? "المكتب الرئيسي" : "Main Office",
      riyadh: {
        city: language === 'ar' ? "الرياض" : "Riyadh",
        address: language === 'ar' ? "حي الملز، شارع الملك فهد" : "Al Malz District, King Fahd Road"
      },
      jeddah: {
        city: language === 'ar' ? "جدة" : "Jeddah",
        address: language === 'ar' ? "حي الروضة، طريق الملك عبدالعزيز" : "Al Rawdah District, King Abdulaziz Road"
      },
      dammam: {
        city: language === 'ar' ? "الدمام" : "Dammam",
        address: language === 'ar' ? "حي الفيصلية، شارع الأمير محمد بن فهد" : "Al Faisaliyah District, Prince Mohammed bin Fahd Road"
      }
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="text-white" size={24} />,
      title: contactT.contactInfo.address.title,
      details: contactT.contactInfo.address.details,
      color: "from-dusty-blue to-sage-green"
    },
    {
      icon: <Phone className="text-white" size={24} />,
      title: contactT.contactInfo.phone.title,
      details: contactT.contactInfo.phone.details,
      color: "from-warm-terracotta to-dusty-blue"
    },
    {
      icon: <Mail className="text-white" size={24} />,
      title: contactT.contactInfo.email.title,
      details: contactT.contactInfo.email.details,
      color: "from-sage-green to-warm-terracotta"
    },
  ];

  const quickActions = [
    {
      icon: <Calendar className="text-white" size={20} />,
      title: contactT.quickActions.bookAppointment.title,
      description: contactT.quickActions.bookAppointment.description,
      action: "book-appointment",
      color: "bg-dusty-blue hover:bg-soft-navy"
    },
    {
      icon: <MessageCircle className="text-white" size={20} />,
      title: contactT.quickActions.liveChat.title,
      description: contactT.quickActions.liveChat.description,
      action: "live-chat",
      color: "bg-sage-green hover:bg-dusty-blue"
    },
  ];

  const offices = [
    {
      city: contactT.offices.riyadh.city,
      address: contactT.offices.riyadh.address,
      phone: "+966 56 865 2222",
      isMain: true
    },
    {
      city: contactT.offices.jeddah.city,
      address: contactT.offices.jeddah.address,
      phone: "+966 56 865 2222",
      isMain: false
    },
    {
      city: contactT.offices.dammam.city,
      address: contactT.offices.dammam.address,
      phone: "+966 56 865 2222",
      isMain: false
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-soft-navy to-dusty-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-36 h-36 bg-sage-green rounded-full animate-float delay-1"></div>
          <div className="absolute bottom-20 left-20 w-28 h-28 bg-warm-terracotta rounded-full animate-float delay-3"></div>
          <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-white rounded-full animate-float delay-2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {contactT.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              {contactT.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white border-b border-light-gray">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl text-white text-right transition-all duration-300 shadow-lg hover:shadow-xl ${action.color}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-soft-navy mb-6">
              {contactT.contactInfo.title}
            </h2>
            <p className="text-xl text-charcoal-gray max-w-3xl mx-auto leading-relaxed">
              {contactT.contactInfo.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-light-gray text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  {info.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-soft-navy mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-charcoal-gray text-sm leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Offices */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-light-gray"
          >
            <h3 className="text-2xl font-bold text-soft-navy mb-8 text-center">{contactT.offices.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    office.isMain 
                      ? "border-dusty-blue bg-dusty-blue/5" 
                      : "border-light-gray hover:border-dusty-blue"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-soft-navy">{office.city}</h4>
                    {office.isMain && (
                      <span className="text-xs bg-dusty-blue text-white px-2 py-1 rounded-full">
                        {contactT.offices.mainOffice}
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 text-dusty-blue mt-0.5" />
                      <span className="text-sm text-charcoal-gray">{office.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 text-sage-green" />
                      <span className="text-sm text-charcoal-gray font-mono tracking-wide" dir="ltr" style={{ fontFamily: 'monospace', letterSpacing: '0.5px' }}>{office.phone}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  );
}
