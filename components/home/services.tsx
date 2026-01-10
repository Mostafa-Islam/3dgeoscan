'use client';

export default function Services() {
    const services = [
        {
            title: "3D Scanning",
            description:
                "High-precision laser scanning technology to capture detailed spatial data of structures, terrain, and infrastructure. Create accurate 3D models for documentation, analysis, and planning.",
            dark: false,
            image: "/images/3dscans.png",
        },
        {
            title: "Underground Utilities",
            description:
                "Advanced detection and mapping of underground utilities including pipes, cables, and infrastructure. Prevent costly damages and ensure safe excavation with precise subsurface mapping.",
            dark: false,
            image: "/images/undergroundutil.jpg",
        },
        {
            title: "Digital Twin",
            description:
                "Create dynamic virtual replicas of physical assets and environments. Enable real-time monitoring, simulation, and predictive maintenance for enhanced decision-making and asset management.",
            dark: false,
            image: "/images/digitwin.jpg",
        },
        {
            title: "Geophysical Studies",
            description:
                "Comprehensive subsurface investigation using advanced geophysical methods. Analyze soil conditions, identify geological features, and assess site characteristics for construction and environmental projects.",
            image: "/images/geophysicstudies.png",
        },
    ]

    return (
        <section id="services" className="min-h-screen md:h-screen md:snap-start flex items-center bg-white py-10 md:pt-20 md:pb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <span className="text-sm font-bold text-orange-500 mb-8">Services</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">Comprehensive 3D Geospatial Solutions</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className={`group relative rounded-2xl p-6 md:p-8 bg-[#E9E9E9] text-black relative overflow-hidden transition-all hover:shadow-2xl`}
                        >
                            <div
                                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0">
                                <img src={service.image}
                                    className="h-full w-full object-cover" alt="Background" />
                                <div className="absolute inset-0 bg-black/50"></div>
                            </div>
                            <svg className="absolute top-0 right-8 opacity-0 -translate-y-10 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-30" width="127" height="129" viewBox="0 0 127 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M63.5 -42.5L127 -5.8606V91.8606L63.5 128.5L0 91.8606V67.3543L63.1157 103.85L105.844 79.6475V55.2212L42.328 18.5657L63.5 6.35256L105.844 30.7789V6.35256L63.5 -18.0736L21.172 6.35256V30.7789L84.8002 67.3543L63.5 79.6475L0 43.008V-5.8606L63.5 -42.5Z" fill="#cacacaff" />
                            </svg>
                            <div className="relative z-10">
                                <div
                                    className={`w-12 h-12 rounded-full bg-[#2C2C31] flex items-center justify-center mb-4 transition-all duration-500 opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100`}
                                >
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.0700073 3.73L10.96 0L21.72 3.7L22.1 4.48L21.97 16.54L10.97 22.27L0.380005 16.75L0 15.99L0.0700073 3.73ZM19.56 4.38C19.7 4.20001 19.04 3.89 18.87 3.81C16.59 2.72 13.55 2.15999 11.18 1.14999L2.80002 4L10.95 8L19.56 4.38ZM10.56 8.97L1.14999 4.84V15.84L10.56 20.66V8.97ZM20.9 5.07001L11.48 8.97V20.68L20.9 15.75V5.07001Z" fill="white" />
                                        <path d="M2.37985 12.8799C2.89985 13.2099 4.11986 13.2299 4.53986 13.5399C4.77986 13.7199 4.64987 14.1899 4.79987 14.4599C5.95987 16.5399 8.62985 13.7699 5.34985 12.9699V11.7299C6.40985 12.1899 7.07984 11.7299 6.61984 10.5699C5.00984 9.93993 5.06985 11.2899 3.34985 10.1699C2.50985 9.61992 2.69986 9.48992 3.50986 9.08992C5.85986 7.91992 9.85985 9.61993 8.96985 12.4899C8.85985 12.8399 8.27985 13.0599 8.34985 13.4199C8.41985 13.7799 9.96986 14.9299 9.13986 16.3199C6.34986 18.0599 2.83986 15.9499 2.35986 12.8799" fill="white" />
                                        <path d="M13.3799 10.3502C16.8099 8.79023 20.3799 7.02023 19.8199 12.7702C19.5599 15.4902 15.2899 16.5802 13.3799 18.1602V10.3502ZM15.4499 14.9402C18.2899 14.5802 18.9299 9.79022 15.4499 11.0402V14.9402Z" fill="white" />
                                    </svg>

                                </div>
                                <h3 className="text-white text-xl md:text-2xl font-bold mb-3 translate-y-28 md:translate-y-20 transition-all duration-500 group-hover:translate-y-0 group-hover:text-black">{service.title}</h3>
                                <p className="text-sm md:text-base text-white/90 transition-all duration-500 opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-gray-600">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
