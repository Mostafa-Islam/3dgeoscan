export type Product = {
  id: number;
  slug: string;
  title: string;
  logos: string[];
  description: string;
  productImage: string;
  packageIncludes: string[];
  software: string;
  sketchfabUrl: string;
  keyFeatures?: string[];  // Add this
};

export const products: Product[] = [
  {
    id: 1,
    slug: "zeb-horizon",
    title: "ZEB Horizon",
    logos: ["GeoSLAM"],
    description:
      "The ZEB Horizon is a handheld mobile mapping scanner that captures highly accurate 3D data in any environment.",
    productImage: "/images/product-1.png",
    packageIncludes: [
      "ZEB Horizon Scanner",
      "Rechargeable Battery",
      "Charging Dock",
      "Protective Carry Case",
    ],
    software: "GeoSLAM Hub",
    sketchfabUrl:
      "https://sketchfab.com/models/282954bbc43c416fac30eb458a6afd0e/embed",
    keyFeatures: [
      "Highly accurate 3D data capture",
      "Works in any environment",
    ],
  },
  {
    id: 2,
    slug: "zeb-vision",
    title: "ZEB Vision",
    logos: ["GeoSLAM"],
    description:
      "Vision is the perfect addition to the ZEB Horizon with immersive colorized point clouds.",
    productImage: "/images/product-2.png",
    packageIncludes: [
      "ZEB Vision Camera",
      "Mounting Bracket",
      "Connection Cables",
    ],
    software: "GeoSLAM Connect",
    sketchfabUrl:
      "https://sketchfab.com/models/282954bbc43c416fac30eb458a6afd0e/embed",
    keyFeatures: [
      "Immersive colorized point clouds",
      "Perfect ZEB Horizon addition",
    ],
  },
  {
    id: 3,
    slug: "faro-blink",
    title: "FARO® Blink™",
    logos: ["FARO"],
    description:
      "Fast and accurate laser scanning for any project.",
    productImage: "/images/product-4.png",
    packageIncludes: [
      "FARO Blink Scanner",
      "Mounting Bracket",
      "Connection Cables",
    ],
    software: "FARO Connect",
    sketchfabUrl:
      "https://sketchfab.com/models/282954bbc43c416fac30eb458a6afd0e/embed",
    keyFeatures: [
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
    ],
  },
  {
    id: 4,
    slug: "faro-blink-pro",
    title: "FARO® Blink™ Pro",
    logos: ["FARO"],
    description:
      "Professional grade laser scanning solution.",
    productImage: "/images/product-4.png",
    packageIncludes: [
      "FARO Blink Pro Scanner",
      "Mounting Bracket",
      "Connection Cables",
    ],
    software: "FARO Connect Pro",
    sketchfabUrl:
      "https://sketchfab.com/models/282954bbc43c416fac30eb458a6afd0e/embed",
    keyFeatures: [
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
    ],
  },
];