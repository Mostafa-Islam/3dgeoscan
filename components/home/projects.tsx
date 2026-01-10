export default function Projects() {
    const projects = [
        { name :"El Morssi Abo El Abbas Mosque ", tag: "3D scan to BIM", image: "/images/almorssimosque.png" },
        { name: "Saudi Consulate", tag: "3D scan to BIM", image: "/images/saudiconsulate.jpg" },
        { name: "Knauf Gypsum Factory", tag: "3D scan to BIM", image: "/images/knauf.png" },
        { name: "Movenpick", tag: "3D scan to BIM", image: "/images/movenpick.jpg" },
        { name: "Steel Warehouse", tag: "3D scan to BIM", image: "/images/steelwarehouse.jpg" },
        { name: "Monorail", tag: "3D scan to BIM", image: "/images/monorail.jpg" },
    ]

    return (
        <section id="projects" className="min-h-screen md:h-screen md:snap-start flex items-center bg-white py-10 md:pt-20 md:pb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <span className="text-sm font-bold text-orange-500 mb-8">Projects</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">Highlighted Projects</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    From UNESCO heritage sites to modern industrial complexes, explore our portfolio of precision scanning
                    projects.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 [&:has(.card:hover)_.card:not(:hover)]:opacity-70 
                [&:has(.card:hover)_.card:not(:hover)]:blur-[1px] 
                transition-all duration-500">
                    <div className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer h-48 md:h-64 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-4 border-transparent hover:border-orange-500 card">
                        <img src={projects[0].image || "/placeholder.svg"} alt="Project" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                            <div>
                                <span className="inline-block bg-[#E55C24] text-white text-xs px-3 py-1 rounded-lg mb-2">
                                    {projects[0].tag}
                                </span>
                                <h3 className="text-white text-2xl font-bold">{projects[0].name}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer h-48 md:h-64 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-4 border-transparent hover:border-orange-500 card">
                        <img src={projects[1].image || "/placeholder.svg"} alt="Project" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                            <div>
                                <span className="inline-block bg-[#E55C24] text-white text-xs px-3 py-1 rounded-lg mb-2">
                                    {projects[1].tag}
                                </span>
                                <h3 className="text-white text-2xl font-bold">{projects[1].name}</h3>
                            </div>
                        </div>
                    </div>

                    {projects.slice(2).map((project, idx) => (
                        <div key={idx} className="relative rounded-2xl overflow-hidden group cursor-pointer h-40 md:h-48 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-4 border-transparent hover:border-orange-500 card">
                            <img src={project.image || "/placeholder.svg"} alt="Project" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                <div>
                                    <span className="inline-block bg-[#E55C24] text-white text-xs px-2 py-1 rounded-lg mb-1">
                                        {project.tag}
                                    </span>
                                    <h3 className="text-white font-bold">{project.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}