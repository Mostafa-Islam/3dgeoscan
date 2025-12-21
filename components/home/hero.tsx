import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center snap-start">

      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          transform: "scaleX(-1)"
        }}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* small tag */}
        <div className="inline-flex items-center gap-2 bg-orange-500/10 backdrop-blur-sm rounded-full border border-orange-500 px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          <span className="text-white text-sm font-medium">
            A jump into the future
          </span>
        </div>

        {/* main title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
          A World
          <br />
          Transformed by
          <br />
          <span className="text-orange-500">3d Geo-Intelligence</span>
        </h1>

        {/* description */}
        <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
          utilizing cutting-edge laser scanning technology and expert analysis, we capture
          reality in unparalleled detail — enabling smarter design, faster construction, and
          precise heritage preservation.
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/videos"
            className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-6 py-3 rounded-lg text-base font-medium hover:from-orange-500 hover:to-orange-700 transition-colors text-center"
          >
            Watch our videos
          </Link>
          <Link
            href="/videos"
            className="border border-white text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-white hover:text-gray-900 transition-colors text-center"
          >
            Watch our videos
          </Link>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/70 text-sm">scroll for more</span>
        <svg
          className="w-5 h-5 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}