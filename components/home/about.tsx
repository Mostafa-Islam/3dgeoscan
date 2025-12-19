import Image from "next/image";

const AWARDS = [
  { title: "the most award award", icon: "/images/icon-award.png" },
  { title: "the most award award", icon: "/images/icon-award.png" },
  { title: "the most award award", icon: "/images/icon-award.png" },
];

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* left side - text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-8">
              about us
            </h2>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              we are the architects of precision
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
              a gateway to unlocking the earth's potential in ways never
              before imagined.
              <br /><br />
              from the great pyramid to intricate artifacts, we capture the
              world in stunning detail, millimeter by millimeter.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              a world transformed by
              <br />
              <span className="text-orange-500">3d geo-intelligence</span>
            </h3>

            <p className="text-gray-600 leading-relaxed">
              3d geoscan envisions a future where the earth's every
              dimension is unlocked and understood, empowering
              informed decision-making and sustainable progress for all.
            </p>
          </div>

          {/* right side - logo with icons */}
          <div className="flex justify-center">
            <div className="relative w-80 h-80">
              
              {/* center logo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
                <Image
                  src="/images/logo.png"
                  alt="3d geoscan logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* circular border */}
              <div className="absolute inset-0 border-2 border-dashed border-orange-300 rounded-full" />

              {/* icon - top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full p-2">
                <Image
                  src="/images/icon-monument.png"
                  alt="monument"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* icon - top right */}
              <div className="absolute top-8 right-0 w-12 h-12 bg-white rounded-full p-2">
                <Image
                  src="/images/icon-bim.png"
                  alt="bim"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* icon - bottom right */}
              <div className="absolute bottom-8 right-0 w-12 h-12 bg-white rounded-full p-2">
                <Image
                  src="/images/icon-globe.png"
                  alt="globe"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* icon - bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white rounded-full p-2">
                <Image
                  src="/images/icon-3d.png"
                  alt="3d"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* icon - bottom left */}
              <div className="absolute bottom-8 left-0 w-12 h-12 bg-white rounded-full p-2">
                <Image
                  src="/images/icon-building.png"
                  alt="building"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

            </div>
          </div>
        </div>

        {/* awards section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {AWARDS.map((award, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-6 border border-gray-200 rounded-xl"
            >
              <Image
                src={award.icon}
                alt={award.title}
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="text-gray-700 font-medium">{award.title}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}