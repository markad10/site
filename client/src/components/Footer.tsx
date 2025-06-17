import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();
  const { dir } = useLanguage();

  // Return a loading state or null if translations are not yet available
  if (!t) {
    return null; // Or a loading spinner
  }

  const serviceLinks = [
    { href: "/services", label: t.footer.serviceLinks.legal },
    { href: "/services", label: t.footer.serviceLinks.financial },
    { href: "/services", label: t.footer.serviceLinks.engineering },
  ];

  const companyLinks = [
    { href: "/about", label: t.footer.companyLinks.about },
    { href: "/team", label: t.footer.companyLinks.team },
    { href: "/contact", label: t.footer.contact.title },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-brand-blue mb-2">
              United Experts
            </h3>
            <p className="text-brand-secondary-text leading-relaxed mb-6 max-w-md">
              {t.footer.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-brand-text mb-4">{t.footer.services}</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-brand-secondary-text hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold text-brand-text mb-4">{t.footer.company}</h4>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-brand-secondary-text hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className={`text-brand-secondary-text text-sm w-full ${dir === 'rtl' ? 'md:text-right' : 'md:text-left'} text-center`}>
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
