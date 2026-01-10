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
  },
];