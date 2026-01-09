import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "about us", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "products", href: "/products" },
];

const CONTACT_INFO = [
  { icon: "mail", text: "info@3dgeoscan.com" },
  { icon: "phone", text: "+20 105 003 7275" },
  { icon: "phone", text: "+20 34 29 0191" },
  { icon: "phone", text: "+20 34 90 192" },
];

const SOCIALS = [
  { icon: "facebook", label: "3d geoscan", href: "#" },
  { icon: "youtube", label: "3d geoscan", href: "#" },
  { icon: "instagram", label: "@3dgeoscan", href: "#" },
  { icon: "linkedin", label: "3d geoscan", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2C2C31] text-white snap-end">
      
      {/* main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* navigation links */}
          <div>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">contact us</h3>
            <ul className="space-y-3">
              {CONTACT_INFO.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  {item.icon === "mail" ? (
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  )}
                  <span className="text-white/80">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* socials */}
          <div>
            <h3 className="text-lg font-semibold mb-4">socials</h3>
            <ul className="space-y-3">
              {SOCIALS.map((social, index) => (
                <li key={index}>
                  <Link href={social.href} className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                    {social.icon === "facebook" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    )}
                    {social.icon === "youtube" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#171717" />
                      </svg>
                    )}
                    {social.icon === "instagram" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                        <circle cx="17.5" cy="6.5" r="1.5" />
                      </svg>
                    )}
                    {social.icon === "linkedin" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    )}
                    <span>{social.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="3d geoscan logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-bold">
                <span className="text-orange-500">3D</span>
                <span className="text-white"> GEOSCAN</span>
              </span>
            </Link>

            {/* language selector */}
            <div className="flex items-center gap-2 text-white/80">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeWidth="2" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span>english</span>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}